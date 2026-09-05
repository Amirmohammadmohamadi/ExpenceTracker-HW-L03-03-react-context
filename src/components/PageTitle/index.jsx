import styles from "./pageHeader.module.scss"

const PageHeader = ({title})=> {
    return <h1 className={styles.pageHeader}>{title}</h1>
};

export default PageHeader;