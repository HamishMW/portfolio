import { Icon } from 'components/Icon';
import { tokens } from 'components/ThemeProvider/theme';
import { useId, useRef, useState } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import { classes, cssProps, msToNum } from 'utils/style';
import { isVisible } from 'utils/transition';
import styles from './Input.module.css';
import { TextArea } from './TextArea';

export const Input = ({
  id,
  label,
  value,
  multiline,
  className,
  style,
  error,
  onBlur,
  autoComplete,
  required,
  maxLength,
  type,
  onChange,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const generatedId = useId();
  const errorRef = useRef();
  const inputId = id || `${generatedId}input`;
  const labelId = `${inputId}-label`;
  const errorId = `${inputId}-error`;
  const InputElement = multiline ? TextArea : 'input';

  const handleBlur = event => {
    setFocused(false);

    if (onBlur) {
      onBlur(event);
    }
  };

  return (
    <div
      className={classes(styles.container, className)}
      data-error={!!error}
      style={style}
      {...rest}
    >
      <div className={styles.content}>
        <label
          className={styles.label}
          data-focused={focused}
          data-filled={!!value}
          id={labelId}
          htmlFor={inputId}
        >
          {label}
        </label>
        <InputElement
          className={styles.input}
          id={inputId}
          aria-labelledby={labelId}
          aria-describedby={error ? errorId : undefined}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          maxLength={maxLength}
          type={type}
        />
        <div className={styles.underline} data-focused={focused} />
      </div>
      <TransitionGroup component={null}>
        {!!error && (
          <Transition timeout={msToNum(tokens.base.durationM)}>
            {status => (
              <div
                className={styles.error}
                data-status={status}
                id={errorId}
                role="alert"
                style={cssProps({
                  height: isVisible(status)
                    ? errorRef.current?.getBoundingClientRect().height
                    : 0,
                })}
              >
                <div className={styles.errorMessage} ref={errorRef}>
                  <Icon icon="error" />
                  {error}
                </div>
              </div>
            )}
          </Transition>
        )}
      </TransitionGroup>
    </div>
  );
};
