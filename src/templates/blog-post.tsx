import * as React from 'react';
import { graphql } from 'gatsby';

interface BlogPostProps {
  data: {
    mdx: {
      body: string;
      frontmatter: {
        title: string;
        date: string;
      };
    };
  };
  children: React.ReactNode;
}

export default function BlogPost({ data: { mdx }, children }: BlogPostProps) {
  const { frontmatter, body } = mdx;
  return (
    <section>
      <h1 className="text-2xl font-bold mb-2">{frontmatter.title}</h1>
      <p className="text-sm text-gray-500">{frontmatter.date}</p>
      <article className="prose max-w-none">{body}</article>
    </section>
  );
}
export const query = graphql`
  query BlogPost($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
      }
      body
    }
  }
`;
