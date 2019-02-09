import React, { useRef, useEffect } from 'react';
import autosize from 'autosize';

const TextArea = React.memo((props) => {
  const { className, allowResize, value, ...restProps } = props;
  const textArea = useRef();

  useEffect(() => {
    autosize(textArea.current);
  }, []);

  return (
    <textarea
      {...restProps}
      ref={textArea}
      className={className}
      value={value}
      style={{ resize: allowResize ? null : 'none' }}
    />
  );
});

export default TextArea;
