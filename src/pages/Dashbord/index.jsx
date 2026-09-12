import Card from "../../components/Card";
import styles from "./Dashbord.module.scss";
import { GiWallet } from "react-icons/gi";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import TransactionsTable from "../../components/TransactionsTable";
import PageHeader from "../../components/PageTitle";
import { useTransactions } from "../../hooks/useTransactions";
import MyPieChart from "../../components/MyPieChart";
import MyLineChart from "../../components/MyLineChart";
import { total } from "../../functions/getTotal";
import { useSelector } from "react-redux";
import { totalIncome } from "../../functions/getTotalIncome";
import { totalExpense } from "../../functions/getTotalExpense";

const Dashbord = () => {
  const transactions = useSelector(state => state.transactions);

  return (
    <div className={styles.dashbordWrapper}>
      <div className={styles.pageTitle}>
        <PageHeader title="Dashbord" />
      </div>
      <div className={styles.totalReport}>
        <Card title="Wallet" symbol={<GiWallet size="1.5em" />} cost={total(transactions).toFixed(2)} />
        <Card
          title="Incomes"
          symbol={<FaArrowTrendUp color="green" size="1.5em" />}
          variant="incomes"
          cost={totalIncome(transactions).toFixed(2)}
        />
        <Card
          title="Expenses"
          symbol={<FaArrowTrendDown color="red" size="1.5em" />}
          variant="expences"
          cost={totalExpense(transactions).toFixed(2)}
        />
      </div>
      <div className={styles.chartReport}>
        <div className={styles.pieChartWrapper}>
          <MyPieChart />
        </div>
        <div className={styles.lineChartWrapper}>
          <MyLineChart />
        </div>
      </div>
      <div className={styles.transactionsSummary}>
        <TransactionsTable len={5} inputArray={transactions} />
      </div>
    </div>
  );
};

export default Dashbord;
