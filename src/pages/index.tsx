import * as React from 'react';
import { graphql, Link, type HeadFC, type PageProps } from 'gatsby';
import { DataProps } from '../types/blogTypes';

const IndexPage = ({ data }: PageProps<DataProps>) => {
  return (
    <section>
      {data.allMdx.nodes.map((post, idx) => (
        <li key={idx} className="border p-4 rounded hover:shadow-md transition">
          <Link to={`/blog/${post.fields.slug}`}>
            <h2 className="text-xl font-semibold">{post.frontmatter.title}</h2>
            <p className="text-sm text-gray-600">{post.frontmatter.date}</p>
          </Link>
        </li>
      ))}
    </section>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>my-cabinet</title>;

export const query = graphql`
  query IndexPosts {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD")
        }
        fields {
          slug
        }
      }
    }
  }
`;
