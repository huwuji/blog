import { Fragment } from "react";
import styles from "./home.less";
import image_01 from "../assets/01.png";

const Home = () => {
  return (
    <Fragment>
      <span className={styles.title}>my home page</span>
      <img src={image_01} alt="..." />
    </Fragment>
  );
};
export default Home;
