/**
 * 리드마그넷 1호 — "Claude 블로그 초안 프롬프트 10개" 전문
 * Source: ~/lifecarelog-blog/content/ai/claude-blog-draft-prompt-10-examples.mdx
 * 빌드 시 정적 하드코딩 (런타임 파일 읽기 없음).
 */

export interface LibraryPrompt {
  title: string
  prompt: string
}

export const BLOG_PROMPTS_10: LibraryPrompt[] = [
  {
    title: '1. 역할과 독자 지정',
    prompt: '너는 5년 차 개발 블로거야. 코딩을 막 시작한 독자에게 [주제]를 설명하는 글을 쓸 거야.',
  },
  {
    title: '2. 개요 먼저 요청',
    prompt: '[주제]로 소제목 5개짜리 개요만 보여줘. 본문은 아직 쓰지 마.',
  },
  {
    title: '3. 도입부 후보 받기',
    prompt: '위 개요의 도입부를 질문형, 경험담형, 통계형으로 각각 3문장씩 써줘.',
  },
  {
    title: '4. 소제목 단위 작성',
    prompt: '개요의 2번 소제목만 400자 내외로 써줘.',
  },
  {
    title: '5. 예시 강제',
    prompt: '각 문단마다 실제 상황 예시를 하나씩 넣어줘.',
  },
  {
    title: '6. 말투 학습',
    prompt: '내가 쓴 글 한 편을 붙여넣고, 이 말투를 그대로 유지해서 써줘.',
  },
  {
    title: '7. 대조 구조',
    prompt: '처음 하는 사람의 방식과 익숙한 사람의 방식을 비교하는 구조로 써줘.',
  },
  {
    title: '8. 퇴고 요청',
    prompt: '번역투와 반복되는 종결어미만 찾아서 고쳐줘. 수치는 바꾸지 마.',
  },
  {
    title: '9. 요약 생성',
    prompt: '이 글을 검색 결과에 보일 120자 요약으로 줄여줘.',
  },
  {
    title: '10. 검증 목록 뽑기',
    prompt: '이 글에서 사실 확인이 필요한 주장만 목록으로 뽑아줘.',
  },
]
