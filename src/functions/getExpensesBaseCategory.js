import { colorPallet } from "../constants/colorPallet";

export const expensesBaseCategory = (transactions) => {
const expenses = transactions.filter((item) => item.type === "expense");
const newArr = [];
for(const item of expenses) {
    const findedIndex = newArr.findIndex(obj => obj.cat === item.category);
    if (findedIndex !== -1) {
        newArr[findedIndex].cost += item.cost;
    } else {
        newArr.push({id:newArr.length+1,cat:item.category,cost:item.cost,color:colorPallet[newArr.length]});
    }
   }
   return newArr;
}