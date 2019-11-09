import { useEffect, useState } from 'react';

let id = 0;
const genId = () => ++id;

const useId = () => {
  const [id, setId] = useState(null);
  useEffect(() => setId(genId()), []);
  return id;
};

export default useId;
