import * as React from 'react';
import { graphql, type HeadFC, type PageProps } from 'gatsby';
import { DataProps } from '../types/blogTypes';
import CardStack from '../components/CardStack';
import Layout from '../layout';
import styled from 'styled-components';

const IndexPage = ({ data }: PageProps<DataProps>) => {
  const scrollContainer = React.useRef<null | HTMLDivElement>(null);
  return (
    <Layout>
      <Container ref={scrollContainer}>
        <CardStack data={data} scrollContainer={scrollContainer} />
      </Container>
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

const Container = styled.div`
  width: 100%;
  height: 100dvh;
  overflow-y: scroll;
  overflow-x: hidden;

  @media screen and (max-width: 760px) {
    padding: 20px 0px;
    overflow-y: hidden;
  }
`;
