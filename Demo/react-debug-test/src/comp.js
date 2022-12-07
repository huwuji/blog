import React, { useState, useEffect, useLayoutEffect, useMemo } from "react";

function Comp() {
  const [num, setNum] = useState(0);
  console.log("Comp");

  const value = useMemo(() => {
    console.log("useMemo");
    return num;
  }, [num]);

  useLayoutEffect(() => {
    console.log("Comp-useLayoutEffect");
    return () => {
      console.log("Comp-useLayoutEffect-return");
    };
  }, []);
  useEffect(() => {
    console.log("Comp-useEffect", num);
    return () => {
      console.log("Comp-useEffect-return");
    };
  }, [num]);

  console.log("comp -end");
  return (
    <div className="App" onClick={() => setNum(num + 1)}>
      {value}
    </div>
  );
}

export default Comp;
