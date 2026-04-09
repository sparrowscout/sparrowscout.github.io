import { visit } from 'unist-util-visit'
import type { Root, Blockquote, Paragraph, Text } from 'mdast'

/**
 * Obsidian 스타일 callout을 지원하는 remark 플러그인
 *
 * 사용법 (MDX):
 *   > [!note] 제목
 *   > 내용
 *
 * 접기/펼치기:
 *   > [!tip]+ 기본 열림
 *   > [!warning]- 기본 닫힘
 *
 * 동작 원리:
 *   blockquote 노드의 첫 텍스트에서 [!type] 패턴을 감지하고,
 *   data-callout-* 속성을 blockquote 요소에 추가한다.
 *   BlockQuoteComponent에서 이 속성을 읽어 Callout으로 렌더링한다.
 */
export function remarkCallout() {
  return (tree: Root) => {
    visit(tree, 'blockquote', (node: Blockquote) => {
      const firstChild = node.children[0]
      if (!firstChild || firstChild.type !== 'paragraph') return

      const firstInline = (firstChild as Paragraph).children[0]
      if (!firstInline || firstInline.type !== 'text') return

      const textNode = firstInline as Text
      const match = textNode.value.match(
        /^\[!(\w+)\]([+-])?\s*(.*)/,
      )
      if (!match) return

      const [, type, foldModifier, title] = match

      // [!type] 마커를 텍스트에서 제거
      const remaining = textNode.value
        .substring(match[0].length)
        .replace(/^\n/, '')

      if (remaining) {
        // 마커 뒤에 텍스트가 남아있으면 유지
        textNode.value = remaining
      } else if ((firstChild as Paragraph).children.length === 1) {
        // paragraph에 마커 텍스트만 있었으면 paragraph 자체 제거
        node.children.shift()
      } else {
        // paragraph에 다른 인라인 노드가 있으면 텍스트 노드만 제거
        ;(firstChild as Paragraph).children.shift()
      }

      // blockquote에 data 속성 추가 → React 컴포넌트에서 props로 접근 가능
      const data = (node.data = node.data || {})
      const hProperties = ((data as Record<string, unknown>)
        .hProperties = ((data as Record<string, unknown>)
        .hProperties || {}) as Record<string, string>)

      hProperties['data-callout-type'] = type.toLowerCase()
      hProperties['data-callout-title'] = title || ''
      if (foldModifier) {
        hProperties['data-callout-foldable'] = 'true'
        hProperties['data-callout-default-open'] =
          foldModifier === '-' ? 'false' : 'true'
      }
    })
  }
}
