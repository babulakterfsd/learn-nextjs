import { useState } from 'react';

const GlobalStates = () => {
  const [count, setCount] = useState(0);

  return {
    count,
    setCount,
  };
};

export default GlobalStates;
