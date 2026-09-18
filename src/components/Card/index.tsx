import type { ReactNode } from "react";
import styles from "./card.module.scss";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

type PropType = {
  symbol:ReactNode;
  title:string;
  variant?:string;
  cost:number;
}

const Card = ({ symbol, title, variant = "wallet", cost }:PropType) => {
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
