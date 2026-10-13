import { readdir, readFile, stat } from 'node:fs/promises'
import { dirname, extname, relative, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const sourceExtensions = new Set(['.css', '.js', '.jsx', '.mjs', '.ts', '.tsx'])

const rules = [
  ['T1', /\bborder-[tlrb]-(?:[2-9]\d*|\[[^\]]+\])/gi, 'one-sided border thicker than 1px'],
  ['T1', /\bborder-(?:top|left|right|bottom)(?:-width)?\s*:\s*[^;}]*\b(?:[2-9]\d*(?:\.\d+)?)px\b/gi, 'CSS one-sided border thicker than 1px'],
  ['T1', /\bborder(?:Top|Left|Right|Bottom)(?:Width)?\s*:\s*[^,;}]*\b(?:[2-9]\d*(?:\.\d+)?)px\b/gi, 'inline one-sided border thicker than 1px'],
  ['T2', /(?:linear|conic|radial)-gradient|\bbg-gradient\b|\b(?:from|via)-[^\s"'`]+|\bbg-clip-text\b/gi, 'gradient'],
  ['T3', /\b(?:backdrop-)?blur-|\bbackdropFilter\b|\bglow\b|\bdot-grid\b|\bnoise-overlay\b/gi, 'blob, glow, or glass effect'],
  ['T4', /#(?:000(?:000)?|fff(?:fff)?|888(?:888)?)\b|\bbg-(?:black|white)\b|oklch\(\s*(?:0(?:\.0+)?|1(?:\.0+)?)\s/gi, 'pure black, white, or gray'],
  ['T5', /\b(?:p|m|gap|space)(?:-[xytrbl])?-(?:0\.5|1\.5|2\.5|3|5|7|9|11)\b/gi, 'spacing outside the 8px grid'],
  ['T6', /\bfont-(?:thin|light|medium|bold|extrabold|black)\b|\b(?:Inter|Roboto|Arial|system-ui|Georgia)\b/gi, 'disallowed weight or primary font'],
  ['T7', /<(?:Badge|Chip|Tag)\b[^>]*(?:primary|accent)|<h[1-6]\b[^>]*text-(?:primary|accent)|\buppercase\b/gi, 'accent misuse or uppercase label'],
  ['T8', /\bwhileHover\b|\bhover:-translate|:has\(\.bento-card:hover\)|bento-card[^\n]*(?:opacity|dim)/gi, 'scattered hover motion or bento dimming'],
]

function isAllowed(line, id) {
  return new RegExp(`allow-${id.toLowerCase()}:\\s*\\S+`, 'i').test(line)
}

function addMatches(violations, line, lineNumber, id, pattern, message) {
  pattern.lastIndex = 0
  if (pattern.test(line) && !isAllowed(line, id)) {
    violations.push({ id, line: lineNumber, message })
  }
}

export function findBanViolations(source) {
  const violations = []
  const weights = new Set()

  for (const [index, line] of source.split('\n').entries()) {
    const lineNumber = index + 1

    for (const [id, pattern, message] of rules) {
      addMatches(violations, line, lineNumber, id, pattern, message)
    }

    const hasHorizontalBar = /\babsolute\b/.test(line)
      && /\b(?:top|bottom)-0\b/.test(line)
      && /\b(?:inset-x-0|w-full)\b|\bleft-0\b.*\bright-0\b|\bright-0\b.*\bleft-0\b/.test(line)
      && /\bh-(?:[2-9]\d*|\[[^\]]+\])/.test(line)
    const hasVerticalBar = /\babsolute\b/.test(line)
      && /\b(?:left|right)-0\b/.test(line)
      && /\b(?:inset-y-0|h-full)\b|\btop-0\b.*\bbottom-0\b|\bbottom-0\b.*\btop-0\b/.test(line)
      && /\bw-(?:[2-9]\d*|\[[^\]]+\])/.test(line)
    if ((hasHorizontalBar || hasVerticalBar) && !isAllowed(line, 'T1')) {
      violations.push({ id: 'T1', line: lineNumber, message: 'absolute fake accent bar' })
    }

    for (const match of line.matchAll(/\[(\d+(?:\.\d+)?)px\]/g)) {
      const isMinimumTouchTarget = Number(match[1]) === 44
        && /\bmin-[hw]-$/.test(line.slice(0, match.index))
      if (!isMinimumTouchTarget && Number(match[1]) % 8 !== 0 && !isAllowed(line, 'T5')) {
        violations.push({ id: 'T5', line: lineNumber, message: `arbitrary ${match[1]}px spacing` })
      }
    }

    for (const match of line.matchAll(/oklch\(\s*[-+]?(?:\d+(?:\.\d+)?|\.\d+)%?\s+[-+]?(?:\d+(?:\.\d+)?|\.\d+)%?\s+([-+]?(?:\d+(?:\.\d+)?|\.\d+))(deg|grad|rad|turn)?(?:\s*\/[^)]*)?\)/gi)) {
      const unit = match[2]?.toLowerCase()
      const degrees = unit === 'turn'
        ? Number(match[1]) * 360
        : unit === 'grad'
          ? Number(match[1]) * 0.9
          : unit === 'rad'
            ? Number(match[1]) * 180 / Math.PI
            : Number(match[1])
      const hue = ((degrees % 360) + 360) % 360
      if (hue >= 260 && hue <= 340 && !isAllowed(line, 'T2')) {
        violations.push({ id: 'T2', line: lineNumber, message: `purple oklch hue ${hue}` })
      }
    }

    if (!isAllowed(line, 'T6')) {
      for (const match of line.matchAll(/\bfont-(normal|semibold|thin|light|medium|bold|extrabold|black)\b/g)) {
        const value = { normal: 400, semibold: 600, thin: 100, light: 300, medium: 500, bold: 700, extrabold: 800, black: 900 }[match[1]]
        weights.add(value)
      }
      for (const match of line.matchAll(/font(?:-weight|Weight)\s*[:=]\s*['"]?(\d{3})/g)) {
        weights.add(Number(match[1]))
      }
    }
  }

  if (weights.size > 2) {
    violations.push({ id: 'T6', line: 1, message: `more than two font weights (${[...weights].sort().join(', ')})` })
  }

  return violations.filter((violation, index, all) => (
    all.findIndex((item) => item.id === violation.id && item.line === violation.line && item.message === violation.message) === index
  ))
}

function parseScope(css, selector) {
  const match = css.match(new RegExp(`${selector}\\s*\\{([^}]*)\\}`))
  if (!match) return new Map()

  const tokens = new Map()
  for (const token of match[1].matchAll(/--([\w-]+)\s*:\s*oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.-]+)\s*\)/g)) {
    tokens.set(token[1], token.slice(2).map(Number))
  }
  return tokens
}

function oklchLuminance([lightness, chroma, hue]) {
  const radians = hue * Math.PI / 180
  const a = chroma * Math.cos(radians)
  const b = chroma * Math.sin(radians)
  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3
  const red = Math.min(1, Math.max(0, 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s))
  const green = Math.min(1, Math.max(0, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s))
  const blue = Math.min(1, Math.max(0, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s))
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

function contrast(first, second) {
  const lighter = Math.max(oklchLuminance(first), oklchLuminance(second))
  const darker = Math.min(oklchLuminance(first), oklchLuminance(second))
  return (lighter + 0.05) / (darker + 0.05)
}

export function checkContrast(css) {
  const light = parseScope(css, ':root')
  const dark = parseScope(css, '\\.dark')
  const pairs = [
    ['fg / bg', light, 'fg', 'bg', 4.5],
    ['fg-muted / bg', light, 'fg-muted', 'bg', 4.5],
    ['fg-muted / surface', light, 'fg-muted', 'surface', 4.5],
    ['fg-subtle / bg', light, 'fg-subtle', 'bg', 4.5],
    ['fg-subtle / surface', light, 'fg-subtle', 'surface', 4.5],
    ['on-primary / primary', light, 'on-primary', 'primary', 4.5],
    ['accent / bg', light, 'accent', 'bg', 4.5],
    ['accent / surface', light, 'accent', 'surface', 4.5],
    ['accent / accent-muted', light, 'accent', 'accent-muted', 4.5],
    ['error / bg', light, 'error', 'bg', 4.5],
    ['success / bg', light, 'success', 'bg', 4.5],
    ['border-input / bg', light, 'border-input', 'bg', 3],
    ['dark fg / bg', dark, 'fg', 'bg', 4.5],
    ['dark fg-muted / bg', dark, 'fg-muted', 'bg', 4.5],
    ['dark accent / bg', dark, 'accent', 'bg', 4.5],
  ]

  return pairs.flatMap(([pair, tokens, foreground, background, minimum]) => {
    if (!tokens.has(foreground) || !tokens.has(background)) {
      return [{ pair, ratio: null, minimum, message: 'missing token' }]
    }
    const ratio = contrast(tokens.get(foreground), tokens.get(background))
    return ratio < minimum ? [{ pair, ratio, minimum, message: 'contrast below threshold' }] : []
  })
}

async function collectFiles(inputPath) {
  const absolutePath = resolve(repoRoot, inputPath)
  const details = await stat(absolutePath)
  if (details.isFile()) return sourceExtensions.has(extname(absolutePath)) ? [absolutePath] : []

  const entries = await readdir(absolutePath, { withFileTypes: true })
  const nested = await Promise.all(entries.map((entry) => collectFiles(resolve(absolutePath, entry.name))))
  return nested.flat()
}

async function run() {
  const inputs = process.argv.slice(2)
  const targets = inputs.length > 0 ? inputs : ['src']
  const files = (await Promise.all(targets.map(collectFiles))).flat().sort()
  const violations = []

  const globalsPath = resolve(repoRoot, 'src/app/globals.css')
  const css = await readFile(globalsPath, 'utf8')
  for (const violation of checkContrast(css)) {
    const ratio = violation.ratio === null ? 'missing' : violation.ratio.toFixed(2)
    violations.push(`T0 src/app/globals.css ${violation.pair}: ${ratio} < ${violation.minimum}`)
  }

  for (const file of files) {
    const source = await readFile(file, 'utf8')
    for (const violation of findBanViolations(source)) {
      violations.push(`${violation.id} ${relative(repoRoot, file)}:${violation.line} ${violation.message}`)
    }
  }

  if (violations.length > 0) {
    console.error(`Design ban check failed (${violations.length}):`)
    console.error(violations.join('\n'))
    process.exitCode = 1
    return
  }

  console.log(`Design ban check passed (${files.length} files, T0-T8).`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  run().catch((error) => {
    console.error(error.message)
    process.exitCode = 2
  })
}
