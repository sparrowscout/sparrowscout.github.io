import * as React from 'react';
import { graphql } from 'gatsby';
import { DataProps } from '../types/blogTypes';
import styled from 'styled-components';
import FolderLabel from '../assets/icons/folder-label.svg';
import Card from './Card';

export default function CardStack({ data }: { data: DataProps }) {
  const sortedPosts = [...data.allMdx.nodes].sort((a, b) =>
    a.fields.category.localeCompare(b.fields.category)
  );

  let lastCategory = '';

  return (
    <Container>
      {sortedPosts.map((post, idx) => {
        const categoryChanged = post.fields.category !== lastCategory;

        console.log(categoryChanged);
        lastCategory = post.fields.category;
        return (
          <>
            {categoryChanged ? (
              <CategoryCard>
                <div
                  style={{
                    position: 'absolute',
                    display: 'inline-block',
                    padding: '4px 30px', // 텍스트 padding 조절
                    top: '-43px', // 텍스트 위치 조정
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: 0,
                      width: '100%',
                      height: '100%',
                      pointerEvents: 'none', // 클릭 이벤트 막음
                      filter: 'drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.2))',
                    }}
                  >
                    <FolderLabel width="100%" height="100%" preserveAspectRatio="none" />
                  </div>
                  <NameSticker>{post.fields.category}</NameSticker>
                </div>

                <CategoryBody />
              </CategoryCard>
            ) : null}
            <Card post={post} idx={idx} />
          </>
        );
      })}
      <ClosingBody />
    </Container>
  );
}

export const query = graphql`
  query IndexPosts {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD")
          excerpt
        }
        excerpt(pruneLength: 140)
        fields {
          slug
          category
        }
      }
    }
  }
`;
const Container = styled.div`
  padding-top: 300px;
  padding-bottom: 200px;
  max-width: 1000px;
  margin: auto;
`;

const CategoryCard = styled.div`
  position: relative;
  pointer-events: none;
  cursor: default;
  margin-top: -160px;
`;

const CategoryBody = styled.div`
  background-color: #dec0a4;
  /* background: linear-gradient(#dec0a4 0%, #dec0a4 6%, #edd4bc 100%); */
  height: 200px;
  border-radius: 12px;
  position: relative;
  /* filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25)); */
`;

const NameSticker = styled.div`
  background-color: #fffefb;
  min-width: 80px;
  max-width: 250px;
  position: relative;

  align-items: center;
  font-weight: 600;
  border-radius: 8px;
  outline: 2px solid #5d5d5d;
  padding: 8px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 24px;
  outline-offset: -5px;

  position: 'relative';

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

const ClosingBody = styled(CategoryBody)`
  margin-top: -160px;
  background: linear-gradient(#dec0a4 0%, #dec0a4 6%, #edd4bc 100%);
`;
