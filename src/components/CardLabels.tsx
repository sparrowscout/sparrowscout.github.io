import * as React from 'react';

import styled from 'styled-components';
import { getRandomNumber } from '../utils/css-utils';

interface LabelsProps {
  title: string;
  isHover: boolean;
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

export default function CardLabels({ title, isHover }: LabelsProps) {
  const [labelConfig] = React.useState<{ yPosition: number; bgColor: string; rotation: number }>({
    yPosition: getRandomNumber(50, 20),
    rotation: getRandomNumber(10, -10),
    bgColor: colorArray[getRandomNumber(colorArray.length)],
  });

  return (
    <>
      <CardTag
        $bgColor={labelConfig.bgColor}
        $yPosition={labelConfig.yPosition}
        $rotation={labelConfig.rotation}
        $isHover={isHover}
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
  $isHover: boolean;
}>`
  position: absolute;
  left: ${(props) => (props.$isHover ? 10 : `${props.$yPosition}%`)};
  /* height: 32px; */
  top: -12px;
  min-width: 100px;
  text-align: center;
  padding: 16px;
  background-color: ${(props) => props.$bgColor};
  rotate: ${(props) => (props.$isHover ? 0 : props.$rotation)}deg;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.4);
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
