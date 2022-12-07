import React, { useEffect, useLayoutEffect, useState } from "react";
import Comp from "./comp";
import "./App.css";

// function App() {
//   const [num, setNum] = useState(0);
//   return (
//     <div className="App" onClick={() => setNum(num + 1)}>
//       {num}
//     </div>
//   );
// }
// function App() {
//   const len = 3000;
//   return (
//     <ul>
//       {Array(len)
//         .fill(0)
//         .map((_, i) => (
//           <li>{i}</li>
//         ))}
//     </ul>
//   );
// }

function App() {
  const [show, setShow] = useState(true);
  console.log("App", Comp);
  useLayoutEffect(() => {
    console.log("app-useLayoutEffect");
  }, []);
  useEffect(() => {
    console.log("useEffect");
  }, []);

  return (
    <div>
      {show && <Comp />}
      <div onClick={() => setShow(!show)}>btn</div>
    </div>
  );
}
export default App;
