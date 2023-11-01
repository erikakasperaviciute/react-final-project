import styles from "./Container.module.scss";

const Container = (props) => {
  const { children } = props;

  if (!children) {
    return;
  }

  return <div className={styles.container}>{children}</div>;
};

export default Container;
