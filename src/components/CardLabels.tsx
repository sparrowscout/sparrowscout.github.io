import * as React from 'react';
import styled, { css } from 'styled-components';
import { getRandomNumber } from '../utils/css-utils';

interface LabelsProps {
  title: string;
  isFocusing: boolean;
}

// todo 이거 추후에 node 단으로 옮겨서 포스트 하나하나 당 컬러 지정을 해놓는게 좋을 것 같음
const colorArray = [
  '#fff8b9', // 옐로우
  '#d3eaf2',
  '#dcf0d7',
  '#cbefe9',
  '#e3d8f0',
  '#fee4e9', // 로즈 핑크
  '#ffddbb',
];

export default function CardLabels({ title, isFocusing }: LabelsProps) {
  const [labelConfig] = React.useState<{ yPosition: number; bgColor: string; rotation: number }>({
    yPosition: getRandomNumber(20, 40),
    rotation: getRandomNumber(5, -5),
    bgColor: colorArray[getRandomNumber(colorArray.length)],
  });

  return (
    <>
      <CardTag
        $bgColor={labelConfig.bgColor}
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
  $bgColor: string;
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
  background-color: ${(props) => props.$bgColor};
  rotate: ${(props) => props.$rotation}deg;

  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.4);
  font-weight: 500;

  @media screen and (min-width: 761px) {
    .stack-card:hover & {
      rotate: 0deg;
      transform: translateX(10px);
    }
  }

  @media screen and (max-width: 760px) {
    padding: 8px;

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
