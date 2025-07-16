import * as React from 'react';
import { Link } from 'gatsby';
import { BlogPost } from '../types/blogTypes';
import { getRandomNumber2 } from '../utils/css-utils';
import styled from 'styled-components';
import CardLabels from './CardLabels';
import { formatSmartDate } from '../utils/formatDate';

interface CardProps {
  post: BlogPost;
  idx: number;
}

export default function Card({ post, idx }: CardProps) {
  const [rotation] = React.useState(getRandomNumber2(3, -2));
  const [isHover, setIsHover] = React.useState<boolean>(false);

  const onCardHover = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const element = e.currentTarget;
    element.style.transform = `translateY(${idx - 100}px)`;
    element.style.rotate = '0deg';
    setIsHover(true);
  };

  const onCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    element.style.transform = `translateY(0px)`;
    element.style.rotate = `${rotation}deg`;
    setIsHover(false);
  };

  return (
    <Link to={`/blog/${post.fields.slug}`}>
      <CardContainer
        className="stack-card"
        key={idx}
        data-index={idx}
        onMouseEnter={(e) => onCardHover(e, idx)}
        onMouseLeave={(e) => onCardLeave(e)}
        $rotation={rotation}
      >
        <CardContent>
          <DateTag>{formatSmartDate(post.frontmatter.date)}</DateTag>
          <CardLabels title={post.frontmatter.title} isHover={isHover} />
          {post.frontmatter.excerpt ?? post.excerpt}
        </CardContent>
      </CardContainer>
    </Link>
  );
}

const CardContainer = styled.div<{ $rotation: number }>`
  position: relative;
  margin-top: -170px;
  cursor: pointer;
  will-change: transform;
  transition: transform 0.1s ease;
  rotate: ${(props) => props.$rotation}deg;
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

const CardContent = styled.div`
  position: relative;
  background: #fff;
  height: 200px;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
  position: relative;
  padding: 60px 20px;
  color: #5d5d5d;
`;
