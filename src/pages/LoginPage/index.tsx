import CustomButton from "../../components/CustomButton";
import PageHeader from "../../components/PageTitle";
import styles from "./loginPage.module.scss";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginStatus } from "../../hooks/useLoginStatus";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { usersActions } from "../../redux/slice/usersSlice";
import type { RootState } from "../../redux";
import CustomInput from "../../components/CustomInput";

type FormType = {
  username:string;
  password:string;
  email?:string;
}

const LoginPage = () => {
  const { loginState, setLoginState } = useLoginStatus();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const users = useSelector((state:RootState) => state.users);
  const dispatch = useDispatch();

  const schema = () => {
    if (!loginState) {
      return Yup.object({
        username: Yup.string().required(),
        password: Yup.string().required().min(8).max(15),
        email: Yup.string().required().email(),
      });
    } else {
      return Yup.object({
        username: Yup.string().required(),
        password: Yup.string().required().min(8).max(15),
      });
    }
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    resolver: yupResolver(schema()),
  });

  type inputType = {
    username:string;
    password:string;
    email?:string;
  }

  const onSubmit = (values:inputType) => {
    const { username, password, email } = values;
    /////
    if (!loginState) {
      dispatch(
        usersActions.add({
          id: new Date().toString(),
          username,
          password,
          email,
        })
      );
      setLoginState(!loginState);
      alert("Now you can login with infornamaion that sinedup already");
      reset({ username: "", password: "", email: "" });
    } else {
      const result = users.find(
        (item) => item.username === username && item.password === password
      );
      if (result) {
        alert("you logedin seuccessfuly.");
        navigate("/");
      setAuth(!auth);
      } else {
        alert("there is no user that match with this information!");
        reset({ username: "", password: "" });
      }
    }
    /////
  };

  return (
    <div className={styles.loginPageWrapper}>
      <PageHeader title={loginState ? "LOGIN" : "SIGNUP"} />
      <div className={styles.loginFormWrapper}>
        <form
          action=""
          className={styles.loginForm}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <CustomInput
                title="username"
                {...field}
                error={errors.username?.message ?? ""}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <CustomInput
                title="password"
                {...field}
                error={errors.password?.message ?? ""}
              />
            )}
          />
          {!loginState && (
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <CustomInput
                  title="email"
                  {...field}
                  error={errors.email?.message ?? ""}
                />
              )}
            />
          )}
          <CustomButton
            variant="submit"
            title={loginState ? "LOGIN" : "SIGNUP"}
          />
        </form>
        {loginState ? (
          <div className={styles.section}>
            <p>
              Don't have any account?{" "}
              <span onClick={() => setLoginState(!loginState)}>sing up</span>
            </p>
          </div>
        ) : (
          <div className={styles.section}>
            <p>
              Do you have an existing account?{" "}
              <span onClick={() => setLoginState(!loginState)}>login</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
