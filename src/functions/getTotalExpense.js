export const totalExpense = (transactions=[])=> {
    return transactions.reduce((acc, item) => {
        if (item.type === "expense") {
          acc += item.cost;
        }
        return acc;
      }, 0);
}