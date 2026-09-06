import styles from "./card.module.scss";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const Card = ({ symbol, title, variant = "wallet", cost }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.title}>
        <div className={styles.symbol}>{symbol}</div>
        <h2 className={styles[variant]}>{title}</h2>
      </div>
      <div className={`${styles[variant]} ${styles.cost}`}>
        {variant === "wallet" ? cost > 0 ? (
          <IoMdArrowDropup size={30} />
        ) : (
          <IoMdArrowDropdown size={30} />
        ) : null}
        {Math.abs(cost)}
      </div>
    </div>
  );
};

export default Card;
