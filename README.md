# my-cabinet-next

MDX 기반 개인 블로그. 캐비넷 뷰(카드 스택)와 블로그 뷰 두 가지 모드로 포스트를 탐색할 수 있다.

## 새 포스트 작성하기

### 1. 파일 생성

`app/(content)/` 아래 카테고리 폴더에 `.mdx` 파일을 만든다.

```
app/(content)/
├── Claude/
│   └── reading-doc-first.mdx    ← 이 파일명이 곧 URL
├── DevOps/
│   └── jenkins.mdx              ← /jenkins
├── Next.js/
├── SDK/
└── ...
```

### 2. frontmatter 작성 — `newmdx` 스니펫

VSCode에서 `newmdx`를 입력하면 아래 템플릿이 자동 생성된다. (`.vscode/mdx.code-snippets`)

```mdx
---
title: "reading-doc-first"     ← 파일명이 기본값으로 들어감 (수정 가능)
date: "2026-04-09"             ← 오늘 날짜 자동
excerpt: ""                    ← 캐비넷 뷰에서 카드에 표시되는 한 줄 미리보기
---
```

### 3. frontmatter 필드 설명

| 필드      | 역할                                                                                                 |
| --------- | ---------------------------------------------------------------------------------------------------- |
| `title`   | 포스트 제목. 포스트 상단에 `<h1>`으로 렌더링                                                         |
| `date`    | 정렬 기준. 최신순/오래된순 필터에 사용                                                               |
| `excerpt` | **캐비넷 뷰**에서 카드를 열었을 때 보이는 한 줄 미리보기 텍스트. 비워두면 카드에 아무 설명도 안 뜬다 |

## 파일명 = 라우팅

이 프로젝트는 `output: 'export'` (정적 빌드) 설정이다. 빌드 시 모든 페이지를 미리 생성해야 하므로 `generateStaticParams()`가 전체 포스트 목록을 반환한다.

**라우팅 흐름:**

```
app/(content)/Claude/reading-doc-first.mdx
        ↓
lib/posts.ts — getPostFilePath()가 fast-glob으로 모든 .md/.mdx 수집
        ↓
parsePost() — 파일 경로에서 slug 추출
  경로: Claude/reading-doc-first.mdx
  slug: "reading-doc-first"  (마지막 / 이후, 확장자 제거)
  category: "Claude"          (첫 번째 / 이전)
        ↓
generateStaticParams() — [{ slug: "reading-doc-first" }, ...] 반환
        ↓
/reading-doc-first 로 접근 가능
```

**주의: 파일명은 영문으로.** `output: 'export'`에서 한글 파일명은 URL 인코딩 문제로 `generateStaticParams()`와 매칭되지 않아 빌드가 실패한다.

## 이미지

`public/img/` 아래에 카테고리별 폴더를 만들어 저장한다.

```
public/img/
├── claude/
│   └── reading-doc-first_1.png
├── jenkins(2).png
└── ...
```

MDX에서는 아래처럼 사용:

```mdx
![설명](/img/claude/reading-doc-first_1.png)
```

## 커스텀 MDX 문법

remark 플러그인으로 추가된 커스텀 문법들. 일반 마크다운 문법과 함께 MDX 파일에서 사용 가능.

| 문법             | 결과                    | 플러그인                      |
| ---------------- | ----------------------- | ----------------------------- |
| `==텍스트==`     | 연한 노란 형광펜 강조   | `remark-mark-highlight` (npm) |
| `//텍스트//`     | 연핑크 작은 글씨 (주석) | `remarkAsideText` (커스텀)    |
| `> [!note] 제목` | Obsidian 스타일 콜아웃  | `remarkCallout` (커스텀)      |

### 콜아웃 상세

```mdx
> [!note] 제목
> 내용

> [!warning]+ 접기/펼치기 (기본 열림)
> [!danger]- 접기/펼치기 (기본 닫힘)
```

지원 타입: `note`, `tip`, `info`, `warning`, `danger`, `success`, `question`, `example`, `quote`, `bug`, `abstract`, `todo`, `important`, `caution`, `error`, `failure` 등 28종

VSCode 스니펫: `callout` (일반), `calloutf` (접기/펼치기)

## 플러그인 추가 방법

remark/rehype 플러그인을 추가할 때 수정이 필요한 파일과 순서.

### 1. 플러그인 작성 — `lib/` 에 생성

`lib/remarkXxx.ts` 파일을 만든다. remark 플러그인은 MDAST(마크다운 AST)를 받아 변환하는 함수를 반환하는 구조.

```typescript
// lib/remarkExample.ts
import { visit } from 'unist-util-visit' // 이미 설치됨
import type { Root } from 'mdast'

export function remarkExample() {
  return (tree: Root) => {
    visit(tree, '노드타입', (node, index, parent) => {
      // AST 노드를 변환
    })
  }
}
```

**두 가지 변환 패턴:**

| 패턴                           | 언제                                                    | 예시                                                    |
| ------------------------------ | ------------------------------------------------------- | ------------------------------------------------------- |
| `data.hProperties`에 속성 추가 | 기존 HTML 요소를 유지하면서 React 컴포넌트에 props 전달 | `remarkCallout` — blockquote에 `data-callout-type` 추가 |
| `mdxJsxTextElement` 노드 생성  | 텍스트 노드를 새 인라인 요소로 교체                     | `remarkAsideText` — `//text//`를 `<span>` 으로 교체     |

### 2. 플러그인 등록 — 두 곳에 추가

플러그인은 **두 곳 모두**에 등록해야 한다. `withMDX.ts`는 `@next/mdx`가 직접 처리하는 MDX 파일용, `page.tsx`는 `next-mdx-remote`가 동적으로 컴파일하는 용도.

```typescript
// withMDX.ts
import { remarkExample } from './lib/remarkExample'

remarkPlugins: [remarkGfm, remarkMark, remarkCallout, remarkAsideText, remarkExample],
```

```typescript
// app/(content)/[slug]/page.tsx
import { remarkExample } from '@/lib/remarkExample'

remarkPlugins: [remarkGfm, remarkMark, remarkCallout, remarkAsideText, remarkExample],
```

### 3. (선택) React 컴포넌트 연결 — `mdx-components.tsx`

플러그인이 기존 HTML 요소를 변환하는 경우 (예: blockquote → Callout), 해당 요소의 컴포넌트를 등록한다.

```typescript
// mdx-components.tsx
export const mdxComponents = {
  blockquote: (props) => <BlockQuoteComponent {...props} />,
  // 새 요소 매핑 추가
} satisfies MDXComponents
```

### 4. (선택) CSS 추가 — `app/globals.css`

플러그인이 생성하는 요소에 스타일이 필요하면 `globals.css`에 추가.

```css
/* 예: .aside-text 클래스 스타일 */
.aside-text {
  color: #999;
  font-size: 0.85em;
}
```

### 요약: 체크리스트

- [ ] `lib/remarkXxx.ts` — 플러그인 로직 작성
- [ ] `withMDX.ts` — `remarkPlugins` 배열에 추가
- [ ] `app/(content)/[slug]/page.tsx` — `remarkPlugins` 배열에 추가
- [ ] (컴포넌트 필요 시) `components/design-system/` — 컴포넌트 생성
- [ ] (컴포넌트 필요 시) `mdx-components.tsx` — 컴포넌트 매핑
- [ ] (스타일 필요 시) `app/globals.css` — CSS 추가
- [ ] (편의) `.vscode/mdx.code-snippets` — 스니펫 추가

## 개발

```bash
npm run dev     # 개발 서버
npm run build   # 정적 빌드 (output: export)
```
