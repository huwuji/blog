import { Fragment, useEffect, useState } from "react";
import image_01 from "@assets/01.png";
import Fetch from "@commons/dataService.js";
import { USER } from "@URL";

const Intro = () => {
  const [json, setJson] = useState(null);
  useEffect(() => {
    Fetch(USER).then((result) => {
      console.log("result==", result);
      setJson(JSON.stringify(result));
    });
  }, []);
  return (
    <Fragment>
      <img src={image_01} alt="..." />
      {`${json}`}
    </Fragment>
  );
};
export default Intro;
