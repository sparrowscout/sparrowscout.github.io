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
  translateY: number;
  isFocus: boolean;
}

export default function Card({ post, idx, translateY, isFocus }: CardProps) {
  const [rotation] = React.useState(getRandomNumber2(3, -2));

  return (
    <CardContainer>
      <Link to={`/blog/${post.fields.slug}`}>
        <CardContent
          className="stack-card"
          key={idx}
          data-index={idx}
          $rotation={isFocus ? 0 : rotation}
          $translateY={isFocus ? translateY - 100 : translateY}
        >
          <DateTag>{formatSmartDate(post.frontmatter.date)}</DateTag>
          <CardLabels title={post.frontmatter.title} isFocusing={isFocus} />
          {post.excerpt}
        </CardContent>
      </Link>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  position: relative;
  margin-top: -150px;
  cursor: pointer;

  @media screen and (max-width: 760px) {
    margin-top: 0px;
  }
`;

const DateTag = styled.div`
  position: absolute;
  right: 10px;
  top: -8px;
  rotate: 0deg;
  display: flex;
  width: max-content;
  padding: 8px;
  font-size: 0.75rem;
  justify-content: center;
  background-color: #000;
  color: #fff;
`;

const CardContent = styled.div<{ $rotation: number; $translateY: number }>`
  position: relative;
  background: #fff;
  border: 1px solid black;
  height: 200px;
  /* filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.25)); */
  position: relative;
  padding: 60px 20px;
  color: #5d5d5d;

  will-change: transform;
  transition: transform 0.1s ease, rotate 0.1s ease-out;
  rotate: ${(props) => props.$rotation}deg;
  transform: translateY(0);

  @media screen and (min-width: 761px) {
    &:hover {
      transform: translateY(-100px);
      rotate: 0deg;
    }
  }

  @media screen and (max-width: 760px) {
    padding: 32px 16px;
    width: 100%;
    transform: ${({ $translateY }) => `translateY(${$translateY}px)`};
    rotate: ${(props) => props.$rotation}deg;
    transition: transform 0.3s ease rotate 0.3 ease;
    position: absolute;
  }
`;
