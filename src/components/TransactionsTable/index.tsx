import styles from "./transactionsTable.module.scss";
import { TbTrashXFilled } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { transactionsActions } from "../../redux/slice/transactionSlice";
import type { Transaction } from "../../constants/mockTransactions";

type PropType = {
  len?:number;
  inputArray:Transaction[],
  access?:string;
}

const TransactionsTable = ({ len, inputArray = [], access = "user" }:PropType) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.TransactionsTableWrapper}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>CATEGORY</th>
            <th>COST</th>
            <th>TYPE</th>
            <th>DATE</th>
            {access === "admin" && <th></th>}
          </tr>
        </thead>
        <tbody>
          {inputArray?.slice(0, len).map((item, index) => {
            const { id, category, cost, type, date } = item;
            return (
              <tr key={`${item}-${index}`}>
                <td>{index + 1}</td>
                <td>{category}</td>
                <td>{cost?.toFixed(2)}</td>
                <td
                  className={
                    type === "income" ? styles.incomeType : styles.expenceType
                  }
                >
                  {type}
                </td>
                <td>{date}</td>
                {access === "admin" && (
                  <td
                    className={styles.garbageIcon}
                    onClick={() => dispatch(transactionsActions.delete(item.id))}
                  >
                    <TbTrashXFilled color="#ff7979" />
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
