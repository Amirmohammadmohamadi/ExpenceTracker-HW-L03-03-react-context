import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss"
import Header from "../components/Header";

const Layout = () => {
    return <div className={styles.layoutWrapper}>
        <Header/>
        <Outlet/>
    </div>
};

export default Layout;