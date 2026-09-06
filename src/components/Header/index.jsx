import NavBar from "../NavBar";
import styles from "./header.module.scss";
import { SiChartdotjs } from "react-icons/si";
import { IoMdLogIn } from "react-icons/io";
import { NavLink } from "react-router-dom";

const Header = () => {
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
          <IoMdLogIn size={25} />
        </div>
      </NavLink>
    </div>
  );
};

export default Header;
