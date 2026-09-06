const FormErrorMessage = ({ error }) => {
  return error ? <p style={{ color: "#ff7979" }}>{error}</p> : null;
};

export default FormErrorMessage;
