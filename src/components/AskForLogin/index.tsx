import { useNavigate } from "react-router-dom";
import styles from "./askForLogin.module.scss";
import CustomButton from "../CustomButton";

const AskForLogin = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.entryDiv}>
      <p>for using the app you must login with an existing account.</p>
      <CustomButton
        title="go to login"
        variant="submit"
        onClick={() => navigate("/login")}
      />
    </div>
  );
};

export default AskForLogin;
