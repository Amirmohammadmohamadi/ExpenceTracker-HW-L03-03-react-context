import { colorPallet } from "../constants/colorPallet";
import type { Transaction } from "../constants/mockTransactions";

export type ResultItemEBC = {
    id:number;
    cat:string;
    cost:number;
    color:string;
    payload?:"";
}

export const expensesBaseCategory = (transactions:Transaction[]):ResultItemEBC[] => {
const expenses = transactions.filter((item) => item.type === "expense");
const newArr:ResultItemEBC[] = [];
for(const item of expenses) {
    const findedIndex = newArr.findIndex(obj => obj.cat === item.category);
    if (findedIndex !== -1) {
        newArr[findedIndex]!.cost += item.cost;
    } else {
        newArr.push({id:newArr.length+1,cat:item.category,cost:item.cost,color:colorPallet[newArr.length] ?? "#ccc"});
    }
   }
   return newArr;
}