import * as React from 'react';

import styled from 'styled-components';
import { formatSmartDate } from '../utils/formatDate';
import { getRandomNumber } from '../utils/css-utils';

interface LabelsProps {
  title: string;
}

export default function CardLabels({ title }: LabelsProps) {
  const colorArray = [
    '#fff8b9', // 옐로우
    '#d3eaf2',
    '#dcf0d7',
    '#cbefe9',
    '#e3d8f0',
    '#fee4e9', // 로즈 핑크
    '#ffddbb',
  ];

  return (
    <>
      <CardTag
        $bgColor={colorArray[getRandomNumber(colorArray.length)]}
        $yPosition={getRandomNumber(50, 20)}
        $rotation={getRandomNumber(10, -10)}
      >
        <CardTitle>{title}</CardTitle>
      </CardTag>
    </>
  );
}

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
  backdrop-filter: blur(5px);
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
