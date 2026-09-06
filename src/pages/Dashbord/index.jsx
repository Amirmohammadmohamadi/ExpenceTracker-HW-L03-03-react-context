import Card from "../../components/Card";
import styles from "./Dashbord.module.scss";
import { GiWallet } from "react-icons/gi";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import TransactionsTable from "../../components/TransactionsTable";
import PageHeader from "../../components/PageTitle";
import { useTransactions } from "../../hooks/useTransactions";
import MyPieChart from "../../components/MyPieChart";

const Dashbord = () => {

  const {totalIncome,totalExpense,total} = useTransactions();

  return (
    <div className={styles.dashbordWrapper}>
      <div className={styles.pageTitle}>
        <PageHeader title="Dashbord" />
      </div>
      <div className={styles.totalReport}>
        <Card title="Wallet" symbol={<GiWallet size="1.5em" />} cost={total}/>
        <Card
          title="Incomes"
          symbol={<FaArrowTrendUp color="green" size="1.5em" />}
          variant="incomes"
          cost={totalIncome().toFixed(2)}
        />
        <Card
          title="Expences"
          symbol={<FaArrowTrendDown color="red" size="1.5em" />}
          variant="expences"
          cost={totalExpense().toFixed()}
        />
      </div>
      <div className={styles.chartReport}>
        <MyPieChart/>
      </div>
      <div className={styles.transactionsSummary}>
        <TransactionsTable len={5} inputArray={JSON.parse(localStorage.getItem("transactions"))}/>
      </div>
    </div>
  );
};

export default Dashbord;
