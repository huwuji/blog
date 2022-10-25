import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { homeSet, fetchHome } from "./redux";
import useStyles from "isomorphic-style-loader/useStyles";
import styles from "./index.less";

const Home = () => {
  const { name, text } = useSelector((store) => store.home);
  useStyles(styles);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHome());
  }, []);

  const btnClick = useCallback(() => {
    console.log("setHome");
    dispatch(homeSet({ name: "home", text: "this is home page!" }));
  }, []);

  const fetchHomeClick = useCallback(() => {
    console.log("fetchHome");
    dispatch(fetchHome());
  }, []);

  return (
    <div>
      <div className={styles.name}>{name}</div>
      <div className={styles.text}>{text}</div>
      <button onClick={btnClick}>setHome</button>
      <button onClick={fetchHomeClick}>fetchHome</button>
      <Link to="/desc">进入Desc</Link>
    </div>
  );
};

Home.getInitialProps = async (ctx) => {
  // console.log('ctx===', ctx)
  // return Promise.resolve(ctx.dispatch(fetchHome()))
  // 如果是多个则可以使用
  return Promise.all([ctx.dispatch(fetchHome())]);
};

export default Home;
