import styles from "./customButton.module.scss";

type PropType = {
  title:string;
  onClick?:(value:any)=>void;
  variant:string;
}

const CustomButton = ({ title, onClick , variant}:PropType) => {
  return (
    <button className={styles[variant]} onClick={onClick}>
      {title}
    </button>
  );
};

export default CustomButton;
