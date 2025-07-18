import * as React from 'react';
import styled, { css } from 'styled-components';
import { getRandomNumber } from '../utils/css-utils';

interface LabelsProps {
  title: string;
  isFocusing: boolean;
  categoryColor: string;
}

export default function CardLabels({ title, isFocusing, categoryColor }: LabelsProps) {
  const [labelConfig] = React.useState<{
    yPosition: number;
    categoryColor: string;
    rotation: number;
  }>({
    yPosition: getRandomNumber(-30, 50),
    rotation: getRandomNumber(5, -5),
    categoryColor,
  });

  return (
    <>
      <CardTag
        $categoryColor={labelConfig.categoryColor}
        $yPosition={labelConfig.yPosition}
        $rotation={labelConfig.rotation}
        $isFocusing={isFocusing}
      >
        <CardTitle>{title}</CardTitle>
      </CardTag>
    </>
  );
}

const CardTag = styled.div<{
  $categoryColor: string;
  $yPosition: number;
  $rotation: number;
  $isFocusing: boolean;
}>`
  pointer-events: none;
  position: absolute;
  transform: ${({ $yPosition }) => `translateX(${$yPosition}%)`};
  transition: transform 0.2s ease;
  top: -8px;
  min-width: 100px;
  text-align: center;
  padding: 16px;
  background-color: ${(props) => props.$categoryColor};
  rotate: ${(props) => props.$rotation}deg;
  border: 1px solid black;

  display: flex;
  align-items: center;
  justify-content: center;
  /* box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.4); */
  font-weight: 500;

  @media screen and (min-width: 761px) {
    .stack-card:hover & {
      rotate: 0deg;
      transform: translateX(10px);
    }
  }

  @media screen and (max-width: 760px) {
    padding: 8px;
    height: 33px;

    ${({ $isFocusing }) =>
      $isFocusing &&
      css`
        rotate: 0deg;
        transform: translateX(-5px);
      `}
  }
`;

const CardTitle = styled.span`
  font-weight: 500;
  margin: 0px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;
