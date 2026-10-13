import assert from 'node:assert/strict'
import test from 'node:test'

import { checkContrast, findBanViolations } from './check-design-bans.mjs'

const validTokens = `
:root {
  --bg: oklch(0.985 0.004 85);
  --surface: oklch(0.955 0.012 82);
  --fg: oklch(0.20 0.006 80);
  --fg-muted: oklch(0.45 0.008 80);
  --fg-subtle: oklch(0.52 0.008 80);
  --border-input: oklch(0.620 0.008 80);
  --primary: oklch(0.22 0.006 80);
  --on-primary: oklch(0.985 0.004 85);
  --accent: oklch(0.50 0.14 8);
  --accent-muted: oklch(0.940 0.030 8);
  --error: oklch(0.52 0.17 27);
  --success: oklch(0.50 0.11 150);
}
.dark {
  --bg: oklch(0.17 0.006 80);
  --fg: oklch(0.93 0.005 85);
  --fg-muted: oklch(0.70 0.006 80);
  --accent: oklch(0.78 0.10 8);
}
`

test('T0 accepts the WEB-SPEC contrast tokens', () => {
  assert.deepEqual(checkContrast(validTokens), [])
})

test('T0 rejects a low-contrast foreground', () => {
  const violations = checkContrast(validTokens.replace(
    '--fg: oklch(0.20 0.006 80);',
    '--fg: oklch(0.90 0.006 80);',
  ))

  assert.ok(violations.some(({ pair }) => pair === 'fg / bg'))
})

const bannedFixtures = [
  ['T1', '<div className="border-t-4" />'],
  ['T1', "style={{ borderLeft: '3px solid red' }}"],
  ['T1', "style={{ borderTopWidth: '4px' }}"],
  ['T1', 'border-left-width: 3px'],
  ['T1', '<div className="absolute inset-x-0 top-0 h-[3px]" />'],
  ['T2', "background: 'linear-gradient(red, blue)'"],
  ['T2', 'color: oklch(0.5 0.1 280)'],
  ['T2', 'color: oklch(50% 0.1 280 / 50%)'],
  ['T3', '<div className="backdrop-blur-sm" />'],
  ['T4', 'color: #fff'],
  ['T5', '<div className="px-3 mt-[13px]" />'],
  ['T6', '<p className="font-bold">text</p>'],
  ['T7', '<h2 className="text-accent">Title</h2>'],
  ['T8', '<motion.div whileHover={{ y: -4 }} />'],
]

test('T1-T8 reject negative fixtures', () => {
  for (const [id, source] of bannedFixtures) {
    assert.ok(
      findBanViolations(source).some((violation) => violation.id === id),
      `${id} should reject: ${source}`,
    )
  }
})

test('T1-T8 accept a positive fixture and same-line exemptions', () => {
  const source = `
    <main className="bg-bg p-4 font-normal">
      <div className="border border-border p-6 font-semibold">Hello</div>
      <span className="absolute top-0 h-4 w-4" />
      <button className="min-h-[44px]">Tap</button>
      <div className="border-t-4" /> {/* allow-t1: legacy legal document */}
    </main>
  `

  assert.deepEqual(findBanViolations(source), [])
})

test('T6 rejects more than two explicit weights in one file', () => {
  const source = '<p className="font-normal font-semibold" style={{ fontWeight: 500 }} />'

  assert.ok(findBanViolations(source).some(({ id }) => id === 'T6'))
})

test('T6 excludes an allowed line from the weight count', () => {
  const source = `
    <p className="font-normal" />
    <p className="font-semibold" />
    <p style={{ fontWeight: 500 }} /> {/* allow-t6: required legal mark */}
  `

  assert.deepEqual(findBanViolations(source), [])
})
