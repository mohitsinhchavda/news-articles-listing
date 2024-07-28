import React from 'react';
import { useCallback, useState } from 'react';
// import "../styles/out.css";

export const App = (props: { message: string }) => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((count) => count + 1);
  }, [count]);

  return (
    <div className="something_not_happening">
      <h1 className="something_happening_now">{props.message}</h1>
      <h2>Count: {count}</h2>
      <button onClick={increment}>Increment</button>
    </div>
  );
};