import styles from "./card.module.scss";

const Card = ({ symbol, title, variant = "wallet" }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.title}>
        <div className={styles.symbol}>{symbol}</div>
        <h2 className={styles[variant]}>{title}</h2>
      </div>
      <div className={`${styles[variant]} ${styles.cost}`}>1000.00</div>
    </div>
  );
};

export default Card;
