import styles from './notFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 Not Found</h1>
      <p className={styles.message}>Oops!.</p>
    </div>
  );
};

export default NotFound;
