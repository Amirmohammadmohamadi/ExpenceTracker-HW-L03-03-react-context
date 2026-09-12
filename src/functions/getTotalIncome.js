export const totalIncome = (transactions=[]) => {
    return transactions.reduce((acc, item) => {
        if (item.type === "income") {
          acc += item.cost;
        }
        return acc;
      }, 0);
}