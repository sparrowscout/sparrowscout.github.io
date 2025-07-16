import * as React from 'react';

import styled from 'styled-components';
import { getRandomNumber } from '../utils/css-utils';

interface LabelsProps {
  title: string;
}

const colorArray = [
  '#fff8b9', // 옐로우
  '#d3eaf2',
  '#dcf0d7',
  '#cbefe9',
  '#e3d8f0',
  '#fee4e9', // 로즈 핑크
  '#ffddbb',
];

export default function CardLabels({ title }: LabelsProps) {
  const [labelConfig] = React.useState<{ yPosition: number; bgColor: string; rotation: number }>({
    yPosition: getRandomNumber(90, 40),
    rotation: getRandomNumber(5, -5),
    bgColor: colorArray[getRandomNumber(colorArray.length)],
  });

  return (
    <>
      <CardTag
        $bgColor={labelConfig.bgColor}
        $yPosition={labelConfig.yPosition}
        $rotation={labelConfig.rotation}
      >
        <CardTitle>{title}</CardTitle>
      </CardTag>
    </>
  );
}

const CardTag = styled.div<{
  $bgColor: string;
  $yPosition: number;
  $rotation: number;
}>`
  pointer-events: none;
  position: absolute;
  transform: ${({ $yPosition }) => `translateX(${$yPosition}%)`};
  /* height: 32px; */
  transition: transform 0.3s ease;
  top: -8px;
  min-width: 100px;
  text-align: center;
  padding: 16px;
  background-color: ${(props) => props.$bgColor};
  rotate: ${(props) => props.$rotation}deg;

  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.4);
  font-weight: 500;

  .stack-card:hover & {
    rotate: 0deg;
    transform: translateX(10px);
  }
`;

const CardTitle = styled.h2`
  font-size: 1rem;
  font-weight: 500;
  margin: 0px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;
