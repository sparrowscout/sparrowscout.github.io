import * as React from 'react';
import styled from 'styled-components';
import Clip from '../assets/icons/clip.svg';

interface CategoryLabelProps {
  categoryName: string;
  categoryColor: string;
}

export default function CategoryLabel({ categoryName, categoryColor }: CategoryLabelProps) {
  if (categoryName)
    return (
      <CategoryLabelContainer $categoryColor={categoryColor || 'transparent'}>
        {categoryName}
        <ClipIcon>
          <Clip />
        </ClipIcon>
      </CategoryLabelContainer>
    );
}

const ClipIcon = styled.div`
  position: absolute;
  rotate: 120deg;
  top: 4px;
  right: -16px;
  width: 30px;
  height: 30px;
  & > svg {
    width: 100%;
    height: 100%;
  }
`;

const CategoryLabelContainer = styled.div<{ $categoryColor: string }>`
  position: absolute;
  z-index: -1;
  top: -54px;
  left: -140px;
  color: black;
  padding: 24px;
  padding-left: 140px;
  min-width: 80px;
  font-weight: 700;
  rotate: -3deg;
  background-color: ${({ $categoryColor }) => $categoryColor};
  text-align: center;
  outline-offset: -5px;
  border: 1px solid black;

  @media screen and (max-width: 760px) {
    padding: 16px 24px 16px 40px;
    top: -47px;
    left: -24px;
  }
`;
