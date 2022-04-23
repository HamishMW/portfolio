import { VisuallyHidden } from 'components/VisuallyHidden';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { cssProps } from 'utils/style';
import styles from './SegmentedControl.module.css';

const SegmentedControlContext = createContext({});

export const SegmentedControl = ({
  children,
  currentIndex,
  onChange,
  label,
  ...props
}) => {
  const id = useId();
  const labelId = `${id}segmented-control-label`;
  const optionRefs = useRef([]);
  const [indicator, setIndicator] = useState();

  const handleKeyDown = event => {
    const { length } = optionRefs.current;
    const prevIndex = (currentIndex - 1 + length) % length;
    const nextIndex = (currentIndex + 1) % length;

    if (['ArrowLeft', 'ArrowUp'].includes(event.key)) {
      onChange(prevIndex);
      optionRefs.current[prevIndex].current.focus();
    } else if (['ArrowRight', 'ArrowDown'].includes(event.key)) {
      onChange(nextIndex);
      optionRefs.current[nextIndex].current.focus();
    }
  };

  const registerOption = useCallback(optionRef => {
    optionRefs.current = [...optionRefs.current, optionRef];
  }, []);

  const unRegisterOption = useCallback(optionRef => {
    optionRefs.current = optionRefs.current.filter(ref => ref !== optionRef);
  }, []);

  useEffect(() => {
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
      value={{ optionRefs, currentIndex, onChange, registerOption, unRegisterOption }}
    >
      <div
        className={styles.container}
        role="radiogroup"
        aria-labelledby={labelId}
        onKeyDown={handleKeyDown}
        {...props}
      >
        <VisuallyHidden as="label" id={labelId}>
          {label}
        </VisuallyHidden>
        <div className={styles.options}>
          {!!indicator && (
            <div
              className={styles.indicator}
              data-last={currentIndex === optionRefs.current.length - 1}
              style={cssProps(indicator)}
            />
          )}
          {children}
        </div>
      </div>
    </SegmentedControlContext.Provider>
  );
};

export const SegmentedControlOption = ({ children, ...props }) => {
  const { optionRefs, currentIndex, onChange, registerOption, unRegisterOption } =
    useContext(SegmentedControlContext);
  const optionRef = useRef();
  const index = optionRefs.current.indexOf(optionRef);
  const isSelected = currentIndex === index;

  useEffect(() => {
    registerOption(optionRef);

    return () => {
      unRegisterOption(optionRef);
    };
  }, [registerOption, unRegisterOption]);

  return (
    <button
      className={styles.button}
      tabIndex={isSelected ? 0 : -1}
      role="radio"
      aria-checked={isSelected}
      onClick={() => onChange(index)}
      ref={optionRef}
      {...props}
    >
      {children}
    </button>
  );
};
