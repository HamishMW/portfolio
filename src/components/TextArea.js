import React, { useRef, useState } from 'react';

function TextArea(props) {
  const { allowResize, value, onChange, minRows = 1, maxRows, ...restProps } = props;
  const [rows, setRows] = useState(minRows);
  const textArea = useRef();

  const handleChange = (event) => {
    onChange(event);
    const style = getComputedStyle(textArea.current);
    const textareaLineHeight = parseInt(style.lineHeight, 10);
    const paddingHeight = parseInt(style.paddingTop, 10) + parseInt(style.paddingBottom, 10);

    const previousRows = event.target.rows;
    event.target.rows = minRows;

    const currentRows = ~~((event.target.scrollHeight - paddingHeight) / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (maxRows && currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    setRows((maxRows && currentRows > maxRows) ? maxRows : currentRows);
  };

  return (
    <textarea
      {...restProps}
      ref={textArea}
      onChange={handleChange}
      rows={rows}
      value={value}
      style={{ resize: allowResize ? null : 'none' }}
    />
  );
};

export default TextArea;
