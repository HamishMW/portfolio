import React, { useState } from 'react';
import classNames from 'classnames';
import TextArea from '/components/TextArea';
import { useId } from '/hooks';
import './index.css';

function Input({ id, label, hasValue, value, multiline, className, ...rest }) {
  const [focused, setFocused] = useState(false);
  const generatedId = useId();
  const inputId = id || `input-${generatedId}`;
  const labelId = `${inputId}-label`;
  const InputElement = multiline ? TextArea : 'input';

  return (
    <div className={classNames('input', className)}>
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
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={value}
        {...rest}
      />
      <div
        className={classNames('input__underline', {
          'input__underline--focused': focused,
        })}
      />
    </div>
  );
}

export default Input;
