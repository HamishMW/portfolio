import React from 'react';
import styled from 'styled-components';
import TextArea from '../components/TextArea';

const Input = ({
  id,
  value,
  label,
  type,
  hasValue,
  placeholder,
  onChange,
  required,
  multiline,
  allowResize,
  className,
  disabled,
  maxLength,
}) => (
  <InputWrapper className={className}>
    <React.Fragment>
      {!multiline &&
        <InputElement
          id={id}
          name={id}
          type={type}
          value={value}
          aria-labelledby={`${id}-label`}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
        />
      }
      {!!multiline &&
        <InputTextArea
          id={id}
          name={id}
          type={type}
          value={value}
          aria-labelledby={`${id}-label`}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          allowResize={allowResize}
          disabled={disabled}
          maxLength={maxLength}
        />
      }
      <InputLabel
        id={`${id}-label`}
        hasValue={hasValue}
        for={id}
      >
        {label}
      </InputLabel>
    </React.Fragment>
  </InputWrapper>
);

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  margin-top: 16px;
`;

const InputElement = styled.input`
  background: transparent;
  color: ${props => props.theme.colorText(1)};
  box-shadow: inset 0 -2px 0 0 ${props => props.theme.colorText(0.2)};
  transition: box-shadow 0.4s ease;
  height: 34px;
  width: 100%;
  font-size: 16px;
  font-family: inherit;
  margin: 0;
  padding: 0;
  border: 0;
  padding-bottom: 16px;
  z-index: 16;

  &:focus {
    outline: none;
    box-shadow: inset 0 -2px 0 0 ${props => props.theme.colorPrimary(1)};
  }

  &::-webkit-contacts-auto-fill-button {
    background-color: ${props => props.theme.colorText(0.4)};
    transition: background-color 0.3s ease;
  }

  &::-webkit-contacts-auto-fill-button:hover {
    background-color: ${props => props.theme.colorPrimary(1)};
  }
`;

const InputTextArea = InputElement.withComponent(TextArea);

const InputLabelFocus = props =>`
  color: ${props.theme.colorText(0.4)};
  transform: scale(0.8) translateY(-28px);
`;

const InputLabel = styled.label`
  color: ${props => props.theme.colorText(0.8)};
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  transform-origin: top left;
  transition: all 0.4s ${props => props.theme.curveFastoutSlowin};

  ${InputElement}:focus + &,
  ${InputTextArea}:focus + & {
    ${props => InputLabelFocus(props)}
  }

  ${props => props.hasValue &&`
    ${InputLabelFocus(props)}
  `}
`;

export default Input;
