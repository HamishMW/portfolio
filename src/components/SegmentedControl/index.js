import React, {
  createContext,
  useRef,
  useContext,
  useLayoutEffect,
  useState,
  useCallback,
} from 'react';
import classNames from 'classnames';
import { numToPx } from 'utils/style';
import './index.css';

const SegmentedControlContext = createContext({});

const SegmentedControl = ({ children, currentIndex, onChange, ...props }) => {
  const optionRefs = useRef([]);
  const [indicator, setIndicator] = useState();

  const handleKeyDown = event => {
    const { length } = optionRefs.current;
    const prevIndex = (currentIndex - 1 + length) % length;
    const nextIndex = (currentIndex + 1) % length;

    if (event.key === 'ArrowLeft') {
      onChange(prevIndex);
    } else if (event.key === 'ArrowRight') {
      onChange(nextIndex);
    }
  };

  const registerOption = useCallback(optionRef => {
    optionRefs.current = [...optionRefs.current, optionRef];
  }, []);

  useLayoutEffect(() => {
    const currentOption = optionRefs.current[currentIndex]?.current;

    const resizeObserver = new ResizeObserver(() => {
      const rect = currentOption?.getBoundingClientRect();
      const left = currentOption?.offsetLeft;
      setIndicator({ width: rect?.width, left });
    });

    resizeObserver.observe(currentOption);

    return () => {
      resizeObserver.disconnect();
    };
  }, [currentIndex]);

  return (
    <SegmentedControlContext.Provider
      value={{ optionRefs, currentIndex, onChange, registerOption }}
    >
      <div
        className="segmented-control"
        role="radiogroup"
        onKeyDown={handleKeyDown}
        {...props}
      >
        {!!indicator && (
          <div
            className={classNames('segmented-control__indicator', {
              'segmented-control__indicator--last':
                currentIndex === optionRefs.current.length - 1,
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
};

export const SegmentedControlOption = ({ children, ...props }) => {
  const { optionRefs, currentIndex, onChange, registerOption } = useContext(
    SegmentedControlContext
  );
  const optionRef = useRef();
  const index = optionRefs.current.indexOf(optionRef);
  const isSelected = currentIndex === index;

  useLayoutEffect(() => {
    registerOption(optionRef);
  }, [registerOption]);

  return (
    <button
      className={classNames('segmented-control__button')}
      tabIndex={-1}
      role="radio"
      aria-checked={isSelected}
      onClick={() => onChange(index)}
      ref={optionRef}
      {...props}
    >
      <span className="segmented-control__label">{children}</span>
    </button>
  );
};

export default SegmentedControl;
