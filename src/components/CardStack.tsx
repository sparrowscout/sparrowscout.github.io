import * as React from 'react';
import { graphql } from 'gatsby';
import { DataProps } from '../types/blogTypes';
import styled from 'styled-components';
import Card from './Card';
import CategoryFolder, { CategoryBody } from './CategoryFolder';

interface CardStackProps {
  scrollContainer: React.MutableRefObject<null | HTMLDivElement>;
  data: DataProps;
}

export default function CardStack({ data }: CardStackProps) {
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [touchList, setTouchList] = React.useState<number[]>([]);
  const [postsGap, setPostsGap] = React.useState<number>();
  const containerRef = React.useRef<null | HTMLDivElement>(null);

  const sortedPosts = [...data.allMdx.nodes].sort((a, b) => {
    return a.fields.category.localeCompare(b.fields.category);
  });
  const total = sortedPosts.length;

  const getPostsGap = () => {
    if (!containerRef.current) return;

    const { clientHeight } = containerRef.current;
    setPostsGap((clientHeight - 100) / total);
  };

  const onContainerTouchStart = (event: React.TouchEvent) => {
    const { touches } = event;
    setTouchList([touches[0].clientY]);
  };

  React.useEffect(() => {
    getPostsGap();
  }, []);

  const onContainerTouchMove = (event: React.TouchEvent) => {
    const { touches } = event;
    const currentY = touches[0].clientY;
    setTouchList((prev) => [...prev, currentY]);

    const firstThumb = touchList[0];
    const distance = currentY - firstThumb;
    const dragThreshold = 5;

    if (Math.abs(distance) > dragThreshold) {
      if (distance < 0) {
        setCurrentIdx((prev) => Math.min(prev + 1, total - 1));
      } else if (distance > 0) {
        setCurrentIdx((prev) => Math.max(prev - 1, 0));
      }
      setTouchList([]);
    }
  };

  const onContainerTouchEnd = () => {
    setTouchList([]);
  };

  const onContainerWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      setCurrentIdx((prev) => Math.min(prev + 1, total - 1));
    } else {
      setCurrentIdx((prev) => Math.max(prev - 1, 0));
    }
  };

  let lastCategory = '';

  return (
    <Container
      onWheel={onContainerWheel}
      onTouchStart={onContainerTouchStart}
      onTouchMove={onContainerTouchMove}
      onTouchEnd={onContainerTouchEnd}
      ref={containerRef}
    >
      {sortedPosts.map((post, idx) => {
        const categoryChanged = post.fields.category !== lastCategory;
        lastCategory = post.fields.category;

        const offset = idx * (postsGap ?? 0); // 카드 간 간격
        console.log(offset);
        const folderOffest = offset - 10;
        const isFocus = idx === currentIdx;

        return (
          <>
            {/* {categoryChanged ? (
              // todo 포스트 카드가 위로 올라오면 오히려 현재 폴더 이름이 안보이는데 보여주는 방식을 수정해야할듯
              <CategoryFolder categoryName={post.fields.category} translateY={folderOffest} />
            ) : null} */}
            <Card post={post} idx={idx} translateY={offset} isFocus={isFocus} />
          </>
        );
      })}
      {/* <ClosingFolder>
        <ClosingBody />
      </ClosingFolder> */}
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
  padding: 300px 16px 200px 16px;
  max-width: 90%;
  margin: auto;
  touch-action: none;
  height: 100%;

  @media screen and (max-width: 760px) {
    padding: 0px 8px;
    overflow: unset;
    max-width: 100%;
    position: relative;
    padding-top: 100px;
  }
`;

const ClosingFolder = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ClosingBody = styled(CategoryBody)`
  position: relative;
  margin-top: -160px;
  background: linear-gradient(#dec0a4 0%, #dec0a4 6%, #edd4bc 100%);

  @media screen and (max-width: 760px) {
    position: absolute;
    width: 100%;
    bottom: -120px;
  }
`;
