import * as React from 'react';
import { graphql, Link } from 'gatsby';
import { motion } from 'framer-motion';
import { DataProps } from '../types/blogTypes';
import styled from 'styled-components';
import FolderLabel from '../assets/icons/folder-label.svg';
import { getRandomNumber2 } from '../utils/css-utils';
import { formatSmartDate } from '../utils/formatDate';
import CardLabels from './CardLabels';

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
                      filter: 'drop-shadow(2px -2px 2px rgba(0, 0, 0, 0.15))',
                    }}
                  >
                    <FolderLabel width="100%" height="100%" preserveAspectRatio="none" />
                  </div>
                  <NameSticker>{post.fields.category}</NameSticker>
                </div>

                <CategoryBody />
              </CategoryCard>
            ) : null}
            <Link to={`/blog/${post.fields.slug}`}>
              <Card
                className="stack-card"
                key={idx}
                initial={{ rotate: getRandomNumber2(3, -3) }}
                whileHover={{ y: idx - 100 }}
                transition={{ type: 'spring', stiffness: 200, mass: 0.5 }}
                style={{ cursor: 'pointer' }}
              >
                <CardContent>
                  <DateTag>{formatSmartDate(post.frontmatter.date)}</DateTag>

                  <CardLabels title={post.frontmatter.title} />
                  {post.frontmatter.excerpt ?? post.excerpt}
                </CardContent>
              </Card>
            </Link>
          </>
        );
      })}
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
`;

const Card = styled(motion.div)`
  position: relative;
  margin-top: -170px;
  cursor: pointer;
`;

const DateTag = styled.div`
  position: absolute;

  right: 10px;
  top: -16px;
  rotate: 0deg;
  display: flex;
  width: max-content;
  padding: 8px;
  border-radius: 16px;
  font-size: 0.75rem;

  justify-content: center;
  background-color: #ffffff;
`;

const CategoryCard = styled.div`
  position: relative;
  pointer-events: none;
  cursor: default;
  margin-top: -160px;
`;

const CardContent = styled.div`
  position: relative;
  background: #fff;
  height: 200px;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
  position: relative;
  padding: 60px 20px;
  color: #5d5d5d;
`;

const CategoryBody = styled.div`
  background-color: #dec0a4;
  /* background: linear-gradient(#dec0a4 0%, #dec0a4 6%, #edd4bc 100%); */
  height: 200px;
  border-radius: 12px;
  position: relative;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
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
