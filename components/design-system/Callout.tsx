'use client'
import React from 'react'
import styled from 'styled-components'

type CalloutConfig = {
  color: string
  label: string
  icon: string
}

const CALLOUT_TYPES: Record<string, CalloutConfig> = {
  note: { color: '#448aff', label: 'Note', icon: 'pencil' },
  abstract: { color: '#00b0ff', label: 'Abstract', icon: 'clipboard' },
  summary: { color: '#00b0ff', label: 'Summary', icon: 'clipboard' },
  tldr: { color: '#00b0ff', label: 'TL;DR', icon: 'clipboard' },
  info: { color: '#448aff', label: 'Info', icon: 'info' },
  todo: { color: '#448aff', label: 'Todo', icon: 'info' },
  tip: { color: '#00bfa5', label: 'Tip', icon: 'lightbulb' },
  hint: { color: '#00bfa5', label: 'Hint', icon: 'lightbulb' },
  important: { color: '#00bfa5', label: 'Important', icon: 'lightbulb' },
  success: { color: '#00c853', label: 'Success', icon: 'check' },
  check: { color: '#00c853', label: 'Check', icon: 'check' },
  done: { color: '#00c853', label: 'Done', icon: 'check' },
  question: { color: '#ff9100', label: 'Question', icon: 'help' },
  help: { color: '#ff9100', label: 'Help', icon: 'help' },
  faq: { color: '#ff9100', label: 'FAQ', icon: 'help' },
  warning: { color: '#ff9100', label: 'Warning', icon: 'alert' },
  caution: { color: '#ff9100', label: 'Caution', icon: 'alert' },
  attention: { color: '#ff9100', label: 'Attention', icon: 'alert' },
  failure: { color: '#ff5252', label: 'Failure', icon: 'x' },
  fail: { color: '#ff5252', label: 'Fail', icon: 'x' },
  missing: { color: '#ff5252', label: 'Missing', icon: 'x' },
  danger: { color: '#ff5252', label: 'Danger', icon: 'zap' },
  error: { color: '#ff5252', label: 'Error', icon: 'zap' },
  bug: { color: '#ff5252', label: 'Bug', icon: 'bug' },
  example: { color: '#7c4dff', label: 'Example', icon: 'list' },
  quote: { color: '#9e9e9e', label: 'Quote', icon: 'quote' },
  cite: { color: '#9e9e9e', label: 'Cite', icon: 'quote' },
}

export function getCalloutConfig(type: string) {
  return CALLOUT_TYPES[type.toLowerCase()] || CALLOUT_TYPES.note
}

// --- SVG Icons (Lucide-style) ---

const svgProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function CalloutIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'pencil':
      return (
        <svg {...svgProps}>
          <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        </svg>
      )
    case 'info':
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      )
    case 'lightbulb':
      return (
        <svg {...svgProps}>
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
          <path d="M9 18h6" />
          <path d="M10 22h4" />
        </svg>
      )
    case 'check':
      return (
        <svg {...svgProps}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )
    case 'help':
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
      )
    case 'alert':
      return (
        <svg {...svgProps}>
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      )
    case 'x':
      return (
        <svg {...svgProps}>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      )
    case 'zap':
      return (
        <svg {...svgProps}>
          <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
        </svg>
      )
    case 'bug':
      return (
        <svg {...svgProps}>
          <path d="m8 2 1.88 1.88" />
          <path d="M14.12 3.88 16 2" />
          <path d="M9 7.13v-1a3 3 0 1 1 6 0v1" />
          <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
          <path d="M12 20v-9" />
          <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
          <path d="M6 13H2" />
          <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
          <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
          <path d="M22 13h-4" />
          <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
        </svg>
      )
    case 'list':
      return (
        <svg {...svgProps}>
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
      )
    case 'quote':
      return (
        <svg {...svgProps}>
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21" />
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3" />
        </svg>
      )
    case 'clipboard':
      return (
        <svg {...svgProps}>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        </svg>
      )
    default:
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      )
  }
}

// --- Callout 컴포넌트 ---

interface CalloutProps {
  title: string
  foldable?: boolean
  defaultOpen?: boolean
  color: string
  icon: string
  children?: React.ReactNode
}

export default function Callout({
  title,
  foldable,
  defaultOpen = true,
  color,
  icon,
  children,
}: CalloutProps) {
  const hasBody = React.Children.count(children) > 0

  if (foldable) {
    return (
      <CalloutWrapper $color={color}>
        <Details open={defaultOpen}>
          <Summary $color={color}>
            <IconBox $color={color}>
              <CalloutIcon icon={icon} />
            </IconBox>
            <Title>{title}</Title>
            <Chevron>
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Chevron>
          </Summary>
          {hasBody && <CalloutBody>{children}</CalloutBody>}
        </Details>
      </CalloutWrapper>
    )
  }

  return (
    <CalloutWrapper $color={color}>
      <Header $color={color}>
        <IconBox $color={color}>
          <CalloutIcon icon={icon} />
        </IconBox>
        <Title>{title}</Title>
      </Header>
      {hasBody && <CalloutBody>{children}</CalloutBody>}
    </CalloutWrapper>
  )
}

// --- Styled Components ---

const CalloutWrapper = styled.div<{ $color: string }>`
  margin: 1em 0;
  border-radius: 4px;
  border-left: 4px solid ${({ $color }) => $color};
  background-color: ${({ $color }) => `${$color}0d`};
  overflow: hidden;
`

const Header = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  color: ${({ $color }) => $color};
  font-weight: 600;
`

const IconBox = styled.span<{ $color: string }>`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: ${({ $color }) => $color};
`

const Title = styled.span`
  font-size: 0.95em;
`

const CalloutBody = styled.div`
  padding: 0 12px 8px 12px;
  color: rgb(31, 31, 31);

  & > *:first-child {
    margin-top: 0;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`

const Details = styled.details`
  /* chevron 회전 애니메이션 */
`

const Summary = styled.summary<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  color: ${({ $color }) => $color};
  font-weight: 600;
  cursor: pointer;
  list-style: none;
  user-select: none;

  &::-webkit-details-marker {
    display: none;
  }
`

const Chevron = styled.span`
  display: flex;
  align-items: center;
  margin-left: auto;
  transition: transform 0.2s;

  details:not([open]) & {
    transform: rotate(-90deg);
  }
`
