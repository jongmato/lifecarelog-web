#!/usr/bin/env node
// Guards the deployed Worker bundle against esbuild's `keepNames` helper.
//
// Why: `wrangler deploy` re-bundles `.open-next/worker.js` with esbuild and defaults
// `keep_names` to true, which rewrites functions as `__name(fn, "fn")`. Libraries that
// inline a script through `fn.toString()` (next-themes' ThemeScript) then serialize those
// calls into the HTML, where the helper does not exist:
//   ReferenceError: __name is not defined
// Run after `pnpm cf:build`.
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, readdirSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const WORKER = '.open-next/worker.js'

if (!existsSync(WORKER)) {
  console.error(`${WORKER} 가 없어요. 먼저 \`pnpm cf:build\` 를 실행해 주세요.`)
  process.exit(1)
}

const outdir = mkdtempSync(join(tmpdir(), 'wrangler-dryrun-'))
execFileSync('pnpm', ['exec', 'wrangler', 'deploy', '--dry-run', `--outdir=${outdir}`], {
  stdio: 'inherit',
})

const offenders = []
for (const entry of readdirSync(outdir, { recursive: true })) {
  if (!/\.(js|mjs)$/.test(entry)) continue
  const hits = readFileSync(join(outdir, entry), 'utf8').match(/__name\(/g)
  if (hits) offenders.push(`${entry}: ${hits.length}회`)
}

if (offenders.length > 0) {
  console.error('\n[FAIL] 배포 번들에 esbuild keepNames 헬퍼(__name)가 남아 있어요:')
  for (const offender of offenders) console.error(`  - ${offender}`)
  console.error('\n`fn.toString()` 로 인라인되는 스크립트가 깨집니다.')
  console.error('wrangler.jsonc 의 "keep_names": false 설정을 확인해 주세요.')
  process.exit(1)
}

console.log('[OK] 배포 번들에 __name 헬퍼가 없어요.')
