import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layout';
import styled from 'styled-components';
import LeftArrow from '../assets/icons/left-arrow.svg';
import { navigate } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import {
  AnchorComponent,
  BlockQuoteComponent,
  OrderedListComponent,
} from '../components/design-system';

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

const components = {
  blockquote: BlockQuoteComponent,
  ol: OrderedListComponent,
  a: AnchorComponent,
};

export default function BlogPost({ data: { mdx }, children }: BlogPostProps) {
  const { frontmatter } = mdx;

  const onClickBack = () => {
    navigate('/');
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
          <PostDivider />
          <ArticleContainer>
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
  padding: 16px 8px;
  padding-bottom: 100px;

  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;

  &::selection {
    background-color: #181818;
    color: #fff;
  }
`;

const Post = styled.div`
  padding: 20px;
  border: 1px solid black;
  background-color: #fff;
  /* filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25)); */
  line-height: 1.5;
  box-sizing: border-box;
`;

const ArticleContainer = styled.div`
  margin-top: 20px;
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

  & > p {
    margin: 0;
    color: #5e5e5e;
  }
`;

const PostDivider = styled.hr`
  margin-top: 1rem;
`;
