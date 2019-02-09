import { useEffect, useRef } from 'react';

export default function ScrollToTop(props) {
  const { status } = props;
  const prevStatus = useRef();

  useEffect(() => {
    if (prevStatus.current === 'entering' && status === 'entered') {
      window.scrollTo(0, 0);
    };

    prevStatus.current = status;
  }, [status]);

  return null;
}
