import FormErrorMessage from "../FormErrorMessage";
import styles from "./customInput.module.scss";

type PropType = {
  title:string;
  type?:string;
  selectiontArray?:string[];
  value?:string;
  onChange?:(value:any)=>void;
  error?:string;
  placeholder?:string;
  conditionlField?:boolean;
}

const CustomInput = ({
  title,
  type = "input",
  selectiontArray,
  value,
  onChange,
  error,
  placeholder,
  conditionlField = false,
}:PropType) => {
  if (conditionlField) {
    return (
      <div className={styles.conditionlField}>
        <input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <FormErrorMessage error={error ?? ""} />
      </div>
    );
  }
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={title}>{`${title}:`}</label>
      {type === "input" ? (
        <input
          type="text"
          id={title}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <select id={title} value={value} onChange={onChange}>
          {selectiontArray?.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      )}
      <FormErrorMessage error={error ?? ""} />
    </div>
  );
};

export default CustomInput;
