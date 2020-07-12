import { useState } from 'react';

function useFormInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState();

  function handleChange(event) {
    setValue(event.target.value);
    setError(null);
  }

  function handleInvalid(event) {
    event.preventDefault();
    setError(event.target.validationMessage);
  }

  return {
    value,
    error,
    onChange: handleChange,
    onInvalid: handleInvalid,
  };
}

export default useFormInput;
