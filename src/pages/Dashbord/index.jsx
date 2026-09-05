import Card from "../../components/Card";
import styles from "./Dashbord.module.scss";
import { GiWallet } from "react-icons/gi";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import TransactionsTable from "../../components/TransactionsTable";
import PageHeader from "../../components/PageTitle";
import { useTransactions } from "../../hooks/useTransactions";

const Dashbord = () => {
  return (
    <div className={styles.dashbordWrapper}>
      <div className={styles.pageTitle}>
        <PageHeader title="Dashbord" />
      </div>
      <div className={styles.totalReport}>
        <Card title="Wallet" symbol={<GiWallet size="1.5em" />} />
        <Card
          title="Incomes"
          symbol={<FaArrowTrendUp color="green" size="1.5em" />}
          variant="incomes"
        />
        <Card
          title="Expences"
          symbol={<FaArrowTrendDown color="red" size="1.5em" />}
          variant="expences"
        />
      </div>
      <div className={styles.chartReport}>My Charts</div>
      <div className={styles.transactionsSummary}>
        <TransactionsTable />
      </div>
    </div>
  );
};

export default Dashbord;
