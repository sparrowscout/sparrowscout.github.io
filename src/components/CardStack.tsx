import * as React from 'react';
import { graphql } from 'gatsby';
import { BlogPost, DataProps } from '../types/blogTypes';
import styled from 'styled-components';
import Card from './Card';
import { colorArray } from '../enum/categoryColor';
import { useMediaQuery } from 'react-responsive';

interface CardStackProps {
  scrollContainer: React.MutableRefObject<null | HTMLDivElement>;
  data: DataProps;
}

export default function CardStack({ data }: CardStackProps) {
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [touchList, setTouchList] = React.useState<number[]>([]);
  const [postsGap, setPostsGap] = React.useState<number>();
  const containerRef = React.useRef<null | HTMLDivElement>(null);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 760px)' });
  const categoryList = new Map<string, string>();

  const categoryMap = new Map<string, BlogPost[]>();

  data.allMdx.nodes.forEach((node, index) => {
    const category = node.fields.category || 'Uncategorized';
    if (!categoryList.has(category)) {
      categoryList.set(category, colorArray[index]);
    }

    if (!categoryMap.has(category)) {
      categoryMap.set(category, []);
    }

    categoryMap.get(category)?.push(node);
  });

  const sortedCategoryKeys = [...categoryMap.keys()].sort();

  const sortedPosts = sortedCategoryKeys.flatMap((key) => categoryMap.get(key)!);

  const total = sortedPosts.length;

  const getPostsGap = () => {
    if (!containerRef.current) return;

    const { clientHeight } = containerRef.current;
    setPostsGap((clientHeight - 140) / total);
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
    if (window.innerWidth > 760) return;
    if (e.deltaY > 0) {
      setCurrentIdx((prev) => Math.min(prev + 1, total - 1));
    } else {
      setCurrentIdx((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <Container
      onWheel={onContainerWheel}
      onTouchStart={onContainerTouchStart}
      onTouchMove={onContainerTouchMove}
      onTouchEnd={onContainerTouchEnd}
      ref={containerRef}
    >
      {sortedPosts.map((post, idx) => {
        const offset = idx * (postsGap ?? 0); // 카드 간 간격
        const isFocus = isTabletOrMobile ? idx === currentIdx : false;
        const category = post.fields.category || 'Uncategorized';

        return (
          <Card
            post={post}
            idx={idx}
            translateY={offset}
            isFocus={isFocus}
            categoryColor={categoryList.get(category)}
            key={post.frontmatter.title}
          />
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
  padding: 350px 16px 200px 16px;
  max-width: 90%;
  margin: auto;
  touch-action: none;
  height: 100%;

  @media screen and (max-width: 760px) {
    padding: 0px 8px;
    overflow: unset;
    max-width: 100%;
    position: relative;
    padding-top: 140px;
  }
`;
