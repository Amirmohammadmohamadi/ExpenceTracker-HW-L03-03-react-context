import NavBar from "../NavBar";
import styles from "./header.module.scss";
import { SiChartdotjs } from "react-icons/si";
import { IoMdLogIn } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { IoPerson } from "react-icons/io5";

const Header = () => {
  const { auth } = useAuth();

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.logoContainer}>
        <SiChartdotjs size={30} color="blue" />
        <span>Expense Tracker</span>
      </div>
      <NavBar />
      <NavLink
        to="login"
        className={({ isActive }) =>
          !isActive ? styles.navLink : styles.isActive
        }
      >
        <div className={styles.loginSection}>
          {auth ? <IoPerson size={25} /> : <IoMdLogIn size={25} />}
        </div>
      </NavLink>
    </div>
  );
};

export default Header;
