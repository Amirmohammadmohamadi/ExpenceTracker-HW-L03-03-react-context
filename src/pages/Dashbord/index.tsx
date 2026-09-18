import styles from "./Dashbord.module.scss";
import { GiWallet } from "react-icons/gi";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import MyLineChart from "../../components/MyLineChart";
import MyPieChart from "../../components/MyPieChart";
import { totalBalance } from "../../functions/getTotal";
import { useSelector } from "react-redux";
import { totalIncome } from "../../functions/getTotalIncome";
import { totalExpense } from "../../functions/getTotalExpense";
import { useAuth } from "../../hooks/useAuth";
import AskForLogin from "../../components/AskForLogin";
import Card from "../../components/Card";
import PageHeader from "../../components/PageTitle";
import TransactionsTable from "../../components/TransactionsTable";
import type { RootState } from "../../redux";

const Dashbord = () => {
  const { auth } = useAuth();
  const transactions = useSelector((state:RootState) => state.transactions);

  if (!auth) return <AskForLogin />;
  return (
    <div className={styles.dashbordWrapper}>
      <div className={styles.pageTitle}>
        <PageHeader title="DASHBORD" />
      </div>
      <div className={styles.totalReport}>
        <Card
          title="Wallet"
          symbol={<GiWallet size="1.5em" />}
          cost={Number(totalBalance(transactions).toFixed(2))}
        />
        <Card
          title="Incomes"
          symbol={<FaArrowTrendUp color="green" size="1.5em" />}
          variant="incomes"
          cost={Number(totalIncome(transactions).toFixed(2))}
        />
        <Card
          title="Expenses"
          symbol={<FaArrowTrendDown color="red" size="1.5em" />}
          variant="expences"
          cost={Number(totalExpense(transactions).toFixed(2))}
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
