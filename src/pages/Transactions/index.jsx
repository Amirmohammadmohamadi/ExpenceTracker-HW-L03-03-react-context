import styles from "./transaction.module.scss";
import TransactionsTable from "../../components/TransactionsTable";
import PageTitle from "../../components/PageTitle";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import CustomInput from "../../components/CustomInput";
import { categories } from "../../constants/categories";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useTransactions } from "../../hooks/useTransactions";
import { ADD } from "../../constants/variables";

const addTransactionSchema = Yup.object({
  category: Yup.string().required(),
  cost: Yup.string()
    .required()
    .matches(/^[1-9][0-9]*$/, "this field must contain number"),
  type: Yup.string().required(),
});

const Transactions = () => {
  const [modalStatus, setModalStatus] = useState(false);
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addTransactionSchema) });

  const { transactions, dispatch } = useTransactions();

  const handleClick = () => {
    setModalStatus(!modalStatus);
  };

  const onSubmit = ({ category, cost, type }) => {
    setModalStatus(false);
    reset({ category: "", type: "", cost: "" });
    console.log("transactions after submitting:", transactions);
    dispatch({
      type: ADD,
      payload: {
        id: transactions.length + 1,
        category,
        cost: Number(cost),
        type,
        date: new Date().toISOString().split("T")[0],
      },
    });
  };

  return (
    <>
      {modalStatus && (
        <div className={styles.modalContainer}>
          <div className={styles.addForm}>
            <h2>Add Your New Transaction</h2>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    title="category"
                    type="select"
                    selectiontArray={categories}
                    error={errors.category?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="cost"
                render={({ field }) => (
                  <CustomInput
                    title="cost"
                    {...field}
                    error={errors.cost?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    title="type"
                    type="select"
                    selectiontArray={[null, "income", "expence"]}
                    error={errors.type?.message}
                  />
                )}
              />
              <CustomButton title="ADD" variant="submit" />
            </form>
          </div>
        </div>
      )}
      <div className={styles.transactionWrapper}>
        <div className={styles.pageTitle}>
          <PageTitle title="Transactions" />
          <CustomButton
            title={`+ Add`}
            onClick={handleClick}
            variant="addTransaction"
          />
        </div>
        <div className={styles.searchBox}>
          <CustomInput
            title="category"
            type="select"
            selectiontArray={categories}
          />
          <CustomInput
            title="type"
            type="select"
            selectiontArray={[null, "income", "expence"]}
          />
          <CustomInput title="cost" placeholder="e.g: 1000-2000" />
        </div>
        <TransactionsTable />
      </div>
    </>
  );
};

export default Transactions;
