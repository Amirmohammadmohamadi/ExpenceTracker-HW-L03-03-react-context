import FormErrorMessage from "../FormErrorMessage";
import styles from "./customInput.module.scss";

const CustomInput = ({
  title,
  type = "input",
  selectiontArray,
  value,
  onChange,
  error,
}) => {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={title}>{`${title}:`}</label>
      {type === "input" ? (
        <input type="text" id={title} value={value} onChange={onChange} />
      ) : (
        <select id={title} value={value} onChange={onChange}>
          {selectiontArray?.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      )}
      <FormErrorMessage error={error}/>
    </div>
  );
};

export default CustomInput;
