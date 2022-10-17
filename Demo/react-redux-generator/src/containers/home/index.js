import { Fragment } from "react";
import { Button } from "antd";
import styles from "./index.less";

const Home = () => {
  return (
    <Fragment>
      <span className={styles.title}>my home page</span>
      <Button>按钮</Button>
    </Fragment>
  );
};
export default Home;
