import styles from "./customButton.module.scss";

const CustomButton = ({ title, onClick , variant}) => {
  return (
    <button className={styles[variant]} onClick={onClick}>
      {title}
    </button>
  );
};

export default CustomButton;
