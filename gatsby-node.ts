import { GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
import path from 'path';

// 모든 노드 생성이 끝난 후 한번
// 역할: 실제 페이지(.html) 파일 생성 (예: 글 상세 페이지 만들기)
export const createPages: GatsbyNode['createPages'] = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMdx {
        nodes {
          frontmatter {
            title
            date
          }
          fields {
            slug
            category
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (!result || result.errors) {
    throw new Error(result.errors?.[0]?.message ?? 'GraphQL query failed in createPages');
  }

  const posts = (result as any).data.allMdx.nodes;

  console.log('Posts:', posts);
  const postTemplate = path.resolve(`./src/templates/blog-post.tsx`);

  posts.forEach((post: any) => {
    createPage({
      path: `/blog/${post.fields.slug}`,
      component: `${postTemplate}?__contentFilePath=${post.internal.contentFilePath}`,
      context: {
        slug: post.fields.slug,
        category: post.fields.category,
      },
    });
  });
};

// 각 데이터 노드가 생성될 때마다 실행
// 역할:  노드에 커스텀 필드 추가 (예: slug 생성)
export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode, basePath: 'content/blog', trailingSlash: false });
    const cleanSlug = value.replace(/^\/|\/$/g, '');

    const parent = getNode(node.parent as string);
    const relativeDirectory = (parent as any).relativeDirectory;

    createNodeField({
      name: 'slug',
      node,
      value: cleanSlug,
    });

    createNodeField({
      name: 'category',
      node,
      value: relativeDirectory,
    });
  }
};
