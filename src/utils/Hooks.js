import { useEffect, useRef, useState } from 'react';

export function useScrollToTop(status) {
  const prevStatus = useRef();

  useEffect(() => {
    if (prevStatus.current === 'entering' && status === 'entered') {
      window.scrollTo(0, 0);
    };

    prevStatus.current = status;
  }, [status]);
}

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(event) {
    setValue(event.target.value);
  }

  return {
    value,
    onChange: handleChange,
  };
}
