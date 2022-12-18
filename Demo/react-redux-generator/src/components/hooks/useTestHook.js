import { useState } from "react";

const UseTestHook = () => {
  const [result, setResult] = useState(1);
  return {
    result: result,
    setResult: setResult,
  };
};

export default UseTestHook;
