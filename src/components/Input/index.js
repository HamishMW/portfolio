import { useState, useRef } from 'react';
import classNames from 'classnames';
import { TransitionGroup, Transition } from 'react-transition-group';
import TextArea from './TextArea';
import { useId } from 'hooks';
import { isVisible } from 'utils/transition';
import { tokens } from 'components/ThemeProvider/theme';
import { msToNum, numToPx } from 'utils/style';
import Icon from 'components/Icon';
import './index.css';

const Input = ({
  id,
  label,
  hasValue,
  value,
  multiline,
  className,
  style,
  error,
  onBlur,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const generatedId = useId();
  const errorRef = useRef();
  const inputId = id || `input-${generatedId}`;
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
      className={classNames('input', className, { 'input--error': !!error })}
      style={style}
    >
      <div className="input__content">
        <label
          className={classNames('input__label', {
            'input__label--focused': focused,
            'input__label--has-value': !!value,
          })}
          id={labelId}
          htmlFor={inputId}
        >
          {label}
        </label>
        <InputElement
          className="input__element"
          id={inputId}
          aria-labelledby={labelId}
          aria-describedby={!!error ? errorId : undefined}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          value={value}
          {...rest}
        />
        <div
          className={classNames('input__underline', {
            'input__underline--focused': focused,
          })}
        />
      </div>
      <TransitionGroup component={null}>
        {!!error && (
          <Transition timeout={msToNum(tokens.base.durationM)}>
            {status => (
              <div
                className={classNames('input__error', `input__error--${status}`)}
                id={errorId}
                role="alert"
                style={{
                  '--height': isVisible(status)
                    ? numToPx(errorRef.current?.getBoundingClientRect().height)
                    : '0px',
                }}
              >
                <div className="input__error-message" ref={errorRef}>
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

export default Input;
