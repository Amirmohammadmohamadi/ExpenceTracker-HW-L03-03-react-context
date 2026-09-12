import styles from "./transaction.module.scss";
import TransactionsTable from "../../components/TransactionsTable";
import PageTitle from "../../components/PageTitle";
import CustomButton from "../../components/CustomButton";
import { useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useTransactions } from "../../hooks/useTransactions";
import { ADD } from "../../constants/variables";
import { useCategories } from "../../hooks/useCategories";
import { useDispatch, useSelector } from "react-redux";
import { transactionsActions } from "../../redux/sclice/transactionSlice";

const addTransactionSchema = Yup.object({
  category: Yup.string().required(),
  cost: Yup.string()
    .required()
    .matches(/^[1-9][0-9]*$/, "this field must contain number"),
  type: Yup.string().required(),
  customCategory: Yup.string(),
});

const Transactions = () => {
  const [modalStatus, setModalStatus] = useState(false);
  const [categoryInputVlue, setCategoryInputValue] = useState(null);
  useEffect(() => {
    console.log("categoryInputVlue:", categoryInputVlue);
  }, [categoryInputVlue]);
  const [filterInputs, setFilterInputs] = useState({
    categoryFilter: "all",
    typeFilter: "all",
    costFilter: "",
  });
  const transactions = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  const { categories, categoriesDispatch } = useCategories();
  console.log("categories:", categories);
  const [transactionsForFilter, setTransactionsForFilter] =
    useState(transactions);
  const {
    handleSubmit,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addTransactionSchema) });

  useEffect(() => {
    console.log(filterInputs);
    const { categoryFilter, typeFilter, costFilter } = filterInputs;
    const transactionsStorage = localStorage.getItem("transactions");

    const timeout = setTimeout(() => {
      const allTransactions = JSON.parse(transactionsStorage) || [];

      let filtered = allTransactions;

      if (categoryFilter && categoryFilter !== "all") {
        filtered = filtered.filter((item) => item.category === categoryFilter);
      }

      if (typeFilter && typeFilter !== "all") {
        filtered = filtered.filter((item) => item.type === typeFilter);
      }
      if (costFilter) {
        const costRange = costFilter.split("-");
        if (costRange.length === 2) {
          const minCost = Number(costRange[0]);
          const maxCost = Number(costRange[1]);

          filtered = filtered.filter(
            (item) => item.cost >= minCost && item.cost <= maxCost
          );
        }
      }
      setTransactionsForFilter(filtered);
      console.log("Filtered results:", filtered);
    }, 500);

    return () => clearTimeout(timeout);
  }, [filterInputs]);

  useEffect(() => {
    setTransactionsForFilter(transactions);
  }, [transactions]);

  const handleClick = () => {
    setModalStatus(!modalStatus);
  };

  const onSubmit = ({ category, cost, type, customCategory }) => {
    setModalStatus(false);
    if (customCategory) {
      categoriesDispatch({ type: ADD, payload: customCategory });
    }
    console.log("values:", getValues());
    reset({ category: "", type: "", cost: "" });
    console.log("transactions after submitting:", transactions);
    dispatch(
      transactionsActions.add({
          id: new Date().toISOString(),
          category: customCategory || category,
          cost: Number(cost),
          type,
          date: new Date().toISOString().split("T")[0],
      })
    );
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
                    {...setCategoryInputValue(field.value)}
                    title="category"
                    type="select"
                    selectiontArray={[null, ...categories, "other..."]}
                    error={errors.category?.message}
                  />
                )}
              />
              {categoryInputVlue === "other..." && (
                <Controller
                  control={control}
                  name="customCategory"
                  render={({ field }) => (
                    <CustomInput
                      placeholder="type your custom category here"
                      title=""
                      {...field}
                      conditionlField={true}
                      error={errors.customCategory?.message}
                    />
                  )}
                />
              )}
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
                    selectiontArray={[null, "income", "expense"]}
                    error={errors.type?.message}
                  />
                )}
              />
              <CustomButton title="ADD" variant="submit" />
              <CustomButton
                title="BACK"
                variant="back"
                onClick={(e) => {
                  e.preventDefault();
                  setModalStatus(false);
                  reset({
                    category: "",
                    type: "",
                    cost: "",
                    customCategory: "",
                  });
                }}
              />
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
        <div className={styles.filterBox}>
          <CustomInput
            title="category"
            type="select"
            selectiontArray={["all", ...categories]}
            onChange={(e) =>
              setFilterInputs({
                ...filterInputs,
                categoryFilter: e.target.value,
              })
            }
          />
          <CustomInput
            title="type"
            type="select"
            selectiontArray={["all", "income", "expense"]}
            onChange={(e) =>
              setFilterInputs({ ...filterInputs, typeFilter: e.target.value })
            }
          />
          <CustomInput
            title="cost"
            placeholder="e.g: 1000-2000"
            value={filterInputs.costFilter}
            onChange={(e) =>
              setFilterInputs({ ...filterInputs, costFilter: e.target.value })
            }
          />
        </div>
        <TransactionsTable inputArray={transactionsForFilter} access="admin" />
      </div>
    </>
  );
};

export default Transactions;
