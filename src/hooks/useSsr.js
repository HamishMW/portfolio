import { useEffect, useState } from 'react';

export function useSsr() {
  const [ssr, setSsr] = useState(true);

  useEffect(() => {
    setSsr(false);
  }, []);

  return ssr;
}
