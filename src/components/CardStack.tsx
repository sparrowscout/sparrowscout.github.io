import * as React from 'react';
import { graphql, Link, PageProps } from 'gatsby';
import { hex, motion } from 'framer-motion';
import { DataProps } from '../types/blogTypes';
import styled from 'styled-components';
import FolderLabel from '../assets/icons/folder-label.svg';
import { getRandomNumber, getRandomNumber2 } from '../util/css-utils';

export default function CardStack({ data }: { data: DataProps }) {
  const colorArray = [
    '#FFF275', // 옐로우
    '#A0E7E5', // 민트
    '#FFB5E8', // 핑크
    '#FFD6A5', // 오렌지
    '#CBAACB', // 라벤더
    '#B5EAD7', // 블루그린
    '#D0F4DE', // 라임
    '#8bb9ff', // 블루그린
    '#FFC1CC', // 연핑크
    '#FF8B8B', // 코랄
    '#FF6B6B', // 체리 레드
    '#F497A9', // 로즈 핑크
  ];

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

                  {/* 텍스트 */}
                  <NameSticker>{post.fields.category}</NameSticker>
                </div>

                <CategoryBody />

                {/* <CategoryTag>
                    <div>{post.fields.category}</div>
                  </CategoryTag> */}
              </CategoryCard>
            ) : null}
            <Link to={`/blog/${post.fields.slug}`}>
              <Card
                className="stack-card"
                key={idx}
                initial={{ rotate: getRandomNumber2(3, -3) }}
                whileHover={{ y: idx - 50 }}
                transition={{ type: 'spring', stiffness: 200, mass: 0.5 }}
                style={{ cursor: 'pointer' }}
              >
                <CardContent>
                  <CardTag
                    $bgColor={colorArray[getRandomNumber(colorArray.length)]}
                    $yPosition={getRandomNumber(50, 20)}
                    $rotation={getRandomNumber(10, -10)}
                  >
                    <CardTitle>{post.frontmatter.title}</CardTitle>
                  </CardTag>
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
        }
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

const CategoryCard = styled.div`
  position: relative;
  pointer-events: none;
  cursor: default;
  margin-top: -160px;
`;

const CardTag = styled.div<{ $bgColor: string; $yPosition: number; $rotation: number }>`
  position: absolute;
  left: ${(props) => `calc(${props.$yPosition}%)`};
  /* height: 32px; */
  top: -12px;
  rotate: -10deg;
  min-width: 100px;
  text-align: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  padding: 16px;
  background-color: ${(props) => props.$bgColor};
  rotate: ${(props) => props.$rotation}deg;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  backdrop-filter: blur(5px);
`;

const CardTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0px;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

const CardContent = styled.div`
  position: relative;
  background: #fff;
  height: 200px;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
  position: relative;
  /* &::before {
    content: '';
    position: absolute;
    top: -4px;
    width: 100%;
    height: 100%;
    border-radius: 22px;
    background: #eaeaea;
    z-index: -1;
  } */
`;

const CategoryBody = styled.div`
  background-color: #dec0a4;
  /* background: linear-gradient(#dec0a4 0%, #dec0a4 6%, #edd4bc 100%); */
  height: 200px;
  border-radius: 12px;
  position: relative;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
`;

const CategoryTag = styled.div`
  position: absolute;
  background-color: #d4a373;
  /* clip-path: polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%);
  border-radius: 20px; */
  height: fit-content;
  top: -45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px 8px 0px;
  padding: 8px;
  left: 10px;
  min-width: 140px;

  & > div {
    background-color: #fff;
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border-radius: 8px;
    outline: 2px solid black;
    padding: 8px;
    outline-offset: -5px; /* 음수면 안쪽으로 들어감 */
  }
`;

const NameSticker = styled.div`
  background-color: #fffefb;
  min-width: 80px;
  max-width: 250px;
  position: relative;

  color: #5d5d5d;

  align-items: center;
  font-weight: bold;
  border-radius: 8px;
  outline: 2px solid #5d5d5d;
  padding: 8px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 24px;
  outline-offset: -5px; /* 음수면 안쪽으로 들어감 */

  position: 'relative';
  /* z-index: 1;
                      whiteSpace: 'nowrap',
                      fontWeight: 'bold', */

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

const CategoryLabelContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: inline-flex;
`;
