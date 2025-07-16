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

  return (
    <Link to={`/blog/${post.fields.slug}`}>
      <CardContainer>
        <CardContent className="stack-card" key={idx} data-index={idx} $rotation={rotation}>
          <DateTag>{formatSmartDate(post.frontmatter.date)}</DateTag>
          <CardLabels title={post.frontmatter.title} />
          {post.frontmatter.excerpt ?? post.excerpt}
        </CardContent>
      </CardContainer>
    </Link>
  );
}

const CardContainer = styled.div`
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

const CardContent = styled.div<{ $rotation: number }>`
  position: relative;
  background: #fff;
  height: 200px;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
  position: relative;
  padding: 60px 20px;
  color: #5d5d5d;

  will-change: transform;
  transition: transform 0.3s ease, rotate 0.3s ease;
  rotate: ${(props) => props.$rotation}deg;
  transform: translateY(0);

  &:hover {
    transform: translateY(-100px);
    rotate: 0deg;
  }
`;
