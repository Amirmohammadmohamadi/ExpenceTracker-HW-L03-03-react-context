import styles from "./transactionsTable.module.scss"
import { mockTransactions } from "../../constants/mockTransactions";

const TransactionsTable = ()=> {
    return <div className={styles.TransactionsTableWrapper}>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>CATEGORY</th>
          <th>COST</th>
          <th>TYPE</th>
          <th>DATE</th>
        </tr>
      </thead>
      <tbody>
        {mockTransactions.map((item, index) => {
          const { id, category, cost, type, date } = item;
          return <tr key={`${item}-${index}`}>
            <td>{id}</td>
            <td>{category}</td>
            <td>{cost.toFixed(2)}</td>
            <td className={type === "income" ? styles.incomeType : styles.expenceType}>{type}</td>
            <td>{date}</td>
          </tr>
        })}
      </tbody>
    </table>
  </div>
};

export default TransactionsTable;