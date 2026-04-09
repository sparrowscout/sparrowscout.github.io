'use client'
import styled from 'styled-components'
import React from 'react'
import Callout, { getCalloutConfig } from './Callout'

interface BlockQuoteProps {
  children?: React.ReactNode
  'data-callout-type'?: string
  'data-callout-title'?: string
  'data-callout-foldable'?: string
  'data-callout-default-open'?: string
}

export default function BlockQuoteComponent(
  props: BlockQuoteProps,
) {
  const type = props['data-callout-type']

  // remark 플러그인이 data-callout-type을 설정했으면 Callout으로 렌더링
  if (type) {
    const config = getCalloutConfig(type)
    const title =
      props['data-callout-title'] || config.label
    const foldable = props['data-callout-foldable'] === 'true'
    const defaultOpen =
      props['data-callout-default-open'] !== 'false'

    return (
      <Callout
        title={title}
        foldable={foldable}
        defaultOpen={defaultOpen}
        color={config.color}
        icon={config.icon}
      >
        {props.children}
      </Callout>
    )
  }

  return <BlockQuote>{props.children}</BlockQuote>
}

const BlockQuote = styled.blockquote`
  color: inherit;
  font-style: normal;
  background-color: transparent;
  border-inline-start: 2px solid #28bfdd;
  padding-top: 0;
  padding-bottom: 0;
  padding-inline-start: 24px;
  margin-inline-start: 0;
  margin-inline-end: 0;
  margin-block-start: 1em;
  margin-block-end: 1em;

  & > p {
    margin: 0;
  }
`
