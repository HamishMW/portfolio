import React, { createContext, useRef, useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { numToPx } from 'utils/style';
import './index.css';

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

  return (
    <SegmentedControlContext.Provider value={{ buttonRefs, currentIndex, onChange }}>
      <div
        className="segmented-control"
        role="tablist"
        onKeyDown={handleKeyDown}
        {...props}
      >
        {!!indicator && (
          <div
            className={classNames('segmented-control__indicator', {
              'segmented-control__indicator--last':
                currentIndex === buttonRefs.current.length - 1,
            })}
            style={{
              '--left': numToPx(indicator.left + 2),
              '--width': numToPx(indicator.width - 2),
            }}
          />
        )}
        {children}
      </div>
    </SegmentedControlContext.Provider>
  );
}

export function SegmentedControlOption({ children, ...props }) {
  const { buttonRefs, currentIndex, onChange } = useContext(SegmentedControlContext);
  const [index, setIndex] = useState();
  const buttonRef = useRef();
  const isSelected = currentIndex === index;

  useEffect(() => {
    buttonRefs.current = [...buttonRefs.current, buttonRef.current];
    const buttonIndex = buttonRefs.current.indexOf(buttonRef.current);
    setIndex(buttonIndex);
  }, [buttonRefs]);

  return (
    <button
      className={classNames('segmented-control__button')}
      tabIndex={-1}
      role="tab"
      aria-selected={isSelected}
      onClick={() => onChange(index)}
      ref={buttonRef}
      {...props}
    >
      <span className="segmented-control__label">{children}</span>
    </button>
  );
}

export default SegmentedControl;
