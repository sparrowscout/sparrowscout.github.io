import { visit, SKIP } from 'unist-util-visit'
import type { Root, Text, PhrasingContent } from 'mdast'

/**
 * //text// 문법을 회색 작은 글씨로 변환하는 remark 플러그인
 *
 * MDX에서 사용:
 *   //이건 작은 회색 글씨//
 *
 * 결과: <span class="aside-text">이건 작은 회색 글씨</span>
 */
export function remarkAsideText() {
  return (tree: Root) => {
    visit(tree, 'text', (node: Text, index, parent) => {
      if (index === undefined || !parent) return

      const value = node.value
      const regex = /\/\/(.*?)\/\//g
      let match: RegExpExecArray | null
      let lastIndex = 0
      const newNodes: PhrasingContent[] = []

      while ((match = regex.exec(value)) !== null) {
        // 매치 전 텍스트
        if (match.index > lastIndex) {
          newNodes.push({
            type: 'text',
            value: value.slice(lastIndex, match.index),
          })
        }

        // //text// → <span class="aside-text">text</span>
        newNodes.push({
          type: 'mdxJsxTextElement' as never,
          name: 'span',
          attributes: [
            {
              type: 'mdxJsxAttribute',
              name: 'className',
              value: 'aside-text',
            },
          ],
          children: [{ type: 'text', value: match[1] }],
        } as never)

        lastIndex = match.index + match[0].length
      }

      if (newNodes.length === 0) return

      // 매치 후 남은 텍스트
      if (lastIndex < value.length) {
        newNodes.push({
          type: 'text',
          value: value.slice(lastIndex),
        })
      }

      // 원본 텍스트 노드를 새 노드들로 교체
      parent.children.splice(index, 1, ...newNodes)
      return [SKIP, index + newNodes.length] as const
    })
  }
}
