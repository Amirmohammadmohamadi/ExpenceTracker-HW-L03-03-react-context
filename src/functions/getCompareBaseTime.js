export const compareBaseTime = (transactions) => {
    return transactions.reduce((acc, item) => {
        const findedIndex = acc.findIndex((object) => item.date === object.date);
        if (findedIndex !== -1) {
          item.type === "income"
            ? (acc[findedIndex].costIncomes += item.cost)
            : (acc[findedIndex].costExpenses += item.cost);
        } else {
          const costIncomes = item.type === "income" ? item.cost : 0;
          const costExpenses = item.type === "expense" ? item.cost : 0;
          acc = [...acc, { costIncomes, costExpenses, date: item.date }];
        }
        return acc;
      }, []);
}