import { NavLink } from "react-router-dom";
import styles from "./navBar.module.scss";

const NavBar = () => {
  return (
    <div className={styles.navBarWrapper}>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.isActive : styles.navLink
            }
          >
            Dashbord
          </NavLink>
        </li>
        <li>
          <NavLink
            to="transactions"
            className={({ isActive }) =>
              isActive ? styles.isActive : styles.navLink
            }
          >
            Transactions
          </NavLink>
        </li>
        <li>
          <NavLink to="" className={styles.navLink}>
            Charts
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
