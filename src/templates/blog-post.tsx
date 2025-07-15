import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layout';
import styled from 'styled-components';
import LeftArrow from '../assets/icons/left-arrow.svg';
import { navigate } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';

interface BlogPostProps {
  data: {
    mdx: {
      body: any;
      frontmatter: {
        title: string;
        date: string;
        excerpt?: string;
      };
      excerpt?: string;
    };
  };
  children: React.ReactNode;
}

const components = {};

export default function BlogPost({ data: { mdx }, children }: BlogPostProps) {
  const { frontmatter, body } = mdx;

  const onClickBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <DocumentContainer>
        <BackIconContainer onClick={onClickBack}>
          <LeftArrow />
        </BackIconContainer>

        <Post>
          <PostHeader>
            <h1>{frontmatter.title}</h1>
            <p>{frontmatter.date}</p>
          </PostHeader>

          <ArticleContainer>
            <Divider />
            <MDXProvider components={components}>{children}</MDXProvider>
          </ArticleContainer>
        </Post>
      </DocumentContainer>
    </Layout>
  );
}
export const query = graphql`
  query BlogPost($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "YYYY/MM/DD")
        excerpt
      }
      excerpt
      body
    }
  }
`;

const DocumentContainer = styled.section`
  padding-top: 16px;
`;

const Post = styled.div`
  padding: 20px;
  background-color: #fff;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25));
  line-height: 1.5;
  box-sizing: border-box;
`;

const ArticleContainer = styled.div`
  margin-top: 20px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin: 20px 0;
`;

const BackIconContainer = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 12px;

  & > svg {
    width: 100%;
    height: 100%;
  }
`;

const PostHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
