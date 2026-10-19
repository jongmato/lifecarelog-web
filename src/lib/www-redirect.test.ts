import { test } from 'node:test'
import assert from 'node:assert/strict'
import { wwwRedirectTarget } from './www-redirect.ts'

test('www host redirects to apex keeping path and query', () => {
  assert.equal(
    wwwRedirectTarget(new URL('https://www.lifecarelog.co.kr/x?y=1')),
    'https://lifecarelog.co.kr/x?y=1',
  )
})

test('www root and locale paths keep their path', () => {
  assert.equal(wwwRedirectTarget(new URL('https://www.lifecarelog.co.kr/')), 'https://lifecarelog.co.kr/')
  assert.equal(
    wwwRedirectTarget(new URL('https://www.lifecarelog.co.kr/en/plan-t?utm_source=a&b=%20c')),
    'https://lifecarelog.co.kr/en/plan-t?utm_source=a&b=%20c',
  )
})

test('www host match ignores case and http scheme still lands on https apex', () => {
  assert.equal(wwwRedirectTarget(new URL('http://WWW.LifeCareLog.co.kr/a')), 'https://lifecarelog.co.kr/a')
})

test('apex and other hosts are not redirected', () => {
  assert.equal(wwwRedirectTarget(new URL('https://lifecarelog.co.kr/x?y=1')), null)
  assert.equal(wwwRedirectTarget(new URL('http://localhost:3000/')), null)
  assert.equal(wwwRedirectTarget(new URL('https://www.example.com/')), null)
  assert.equal(wwwRedirectTarget(new URL('https://www.lifecarelog.co.kr.evil.com/')), null)
})
