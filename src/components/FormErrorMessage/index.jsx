const FormErrorMessage = ({ error }) => {
  return error ? <p style={{ color: "red" }}>{error}</p> : null;
};

export default FormErrorMessage;
