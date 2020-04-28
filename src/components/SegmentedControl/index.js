import React, { createContext, useRef, useContext, useLayoutEffect, useEffect, useState } from 'react';
import styled, { css } from 'styled-components/macro';

const SegmentedControlContext = createContext({});

function SegmentedControl({ children, currentIndex, onChange, ...props }) {
  const buttonRefs = useRef([]);
  const [indicator, setIndicator] = useState();

  const handleKeyDown = event => {
    const { length } = buttonRefs.current;
    const prevIndex = (currentIndex - 1 + length) % length;
    const nextIndex = (currentIndex + 1) % length;

    if (event.key === 'ArrowLeft') {
      onChange(prevIndex);
    } else if (event.key === 'ArrowRight') {
      onChange(nextIndex);
    }
  };

  useEffect(() => {
    const currentButton = buttonRefs.current[currentIndex];
    const { width } = currentButton.getBoundingClientRect();
    const left = currentButton.offsetLeft;
    setIndicator({ width, left });
  }, [currentIndex]);

  console.log(buttonRefs.current.length, currentIndex);

  return (
    <SegmentedControlContext.Provider value={{ buttonRefs, currentIndex, onChange }}>
      <SegmentedControlContainer
        role="tablist"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {!!indicator &&
          <SegmentedControlIndicator
            isLast={currentIndex === buttonRefs.current.length - 1}
            style={{
              transform: `translate3d(${indicator.left + 2}px, 0, 0)`,
              width: indicator.width - 2,
            }}
          />
        }
        {children}
      </SegmentedControlContainer>
    </SegmentedControlContext.Provider>
  );
}

export function SegmentedControlOption({ children, ...props }) {
  const { buttonRefs, currentIndex, onChange } = useContext(SegmentedControlContext);
  const [index, setIndex] = useState();
  const buttonRef = useRef();
  const isSelected = currentIndex === index;

  useLayoutEffect(() => {
    buttonRefs.current = [...buttonRefs.current, buttonRef.current];
    const buttonIndex = buttonRefs.current.indexOf(buttonRef.current);
    setIndex(buttonIndex);
  }, [buttonRefs]);

  return (
    <SegmentedControlButton
      tabIndex={-1}
      role="tab"
      aria-selected={isSelected}
      onClick={() => onChange(index)}
      ref={buttonRef}
      {...props}
    >
      <SegmentedControlLabel>{children}</SegmentedControlLabel>
    </SegmentedControlButton>
  );
}

const SegmentedControlContainer = styled.div`
  position: relative;
  display: flex;

  &::-moz-focus-inner {
    border: 0;
  }

  &:focus {
    outline: none;
  }

  &::before {
    content: '';
    background-color: rgb(var(--rgbText));
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      0% 0%,
      0% 100%,
      2px 100%,
      2px 2px,
      calc(100% - 2px) 2px,
      calc(100% - 2px) calc(100% - 13px),
      calc(100% - 13px) calc(100% - 2px),
      2px calc(100% - 2px),
      2px 100%,
      calc(100% - 11px) 100%,
      100% calc(100% - 11px),
      100% 0%
    );
  }
`;

const SegmentedControlButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: rgb(var(--rgbText));
  transition-property: color, background;
  transition-duration: 0.4s;
  transition-timing-function: ease;
  border: 0;
  padding: 0 18px;
  height: 56px;
  font-size: inherit;
  font-family: inherit;
  font-weight: var(--fontWeightMedium);
  cursor: pointer;

  &::-moz-focus-inner {
    border: 0;
  }

  &[aria-selected=true] {
    color: rgb(var(--rgbBackground));
  }

  &::before {
    content: '';
    background: rgb(var(--rgbTitle) / 0.4);
    opacity: 0;
    position: absolute;
    top: -4px;
    right: -6px;
    bottom: -4px;
    left: -4px;
    transition: opacity 0.4s ease;
  }

  &:last-child::before {
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 13px), calc(100% - 13px) 100%, 0 100%);
    right: -4px;
  }

  ${/* sc-selector */SegmentedControlContainer}:focus &[aria-selected=true]::before {
    opacity: 1;
  }

  & + & {
    box-shadow: inset 2px 0 0 rgb(var(--rgbText));
  }

  &:focus {
    outline: none;
  }
`;

const SegmentedControlIndicator = styled.div`
  position: absolute;
  top: 2px;
  bottom: 2px;
  left: 0;
  background-color: rgb(var(--rgbText));
  transition-property: width, transform, clip-path;
  transition-duration: 0.4s;
  transition-timing-function: var(--curveFastoutSlowin);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 100% 100%, 0 100%);

  ${props => props.isLast && css`
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);
  `}
`;

const SegmentedControlLabel = styled.span`
  position: relative;
`;

export default SegmentedControl;
