import React, { useCallback } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { homeSet, fetchHome } from "./redux";

import styles from "./index.less";

const Home = () => {
  const { name, text } = useSelector((store) => store.home);
  const dispatch = useDispatch();

  const btnClick = useCallback(() => {
    console.log("set");
    dispatch(homeSet({ name: "home", text: "this is home page!" }));
  }, [dispatch]);

  const btnFetchClick = useCallback(() => {
    console.log("fetch");
    dispatch(fetchHome());
  }, []);

  return (
    <div>
      <div>{name}</div>
      <div>{text}</div>
      <div className={styles.title}>my home page</div>
      <Button onClick={btnClick}>set</Button>
      <Button onClick={btnFetchClick}>fetch</Button>

      <Link to="/intro">按钮</Link>
    </div>
  );
};
export default Home;
