import * as React from 'react';
import { graphql, Link, type HeadFC, type PageProps } from 'gatsby';
import { DataProps } from '../types/blogTypes';
import CardStack from '../components/CardStack';
import styled from 'styled-components';
import Layout from '../layout';

const IndexPage = ({ data }: PageProps<DataProps>) => {
  console.log(data);
  return (
    <Layout>
      <div>
        <CardStack data={data} />
      </div>
    </Layout>
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
          excerpt
        }
        excerpt
        fields {
          slug
          category
        }
      }
    }
  }
`;
