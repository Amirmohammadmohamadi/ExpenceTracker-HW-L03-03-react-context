import { createContext, useReducer, type ReactNode } from "react";
import { ADD, CATEGORIES } from "../constants/variables";
import { mockCategories } from "../constants/categories";

type CategoriesAction = {
  type:string;
  payload:string;
};
type CategoriesContextType = {
  categories:string[];
  categoriesDispatch:React.Dispatch<CategoriesAction>;
}

export const CategoriesContext = createContext<CategoriesContextType | null>(null);

const categoriesReducer = (state:string[], action:CategoriesAction):string[] => {
  if (action.type === ADD) {
    const newCategories = [...state, action.payload];
    localStorage.setItem(CATEGORIES, JSON.stringify(newCategories));
    return newCategories;
  }
  return state;
};

const CategoriesContextProvider = ({ children } : { children: ReactNode }) => {
  const storedCategories = localStorage.getItem(CATEGORIES);
  const initialValue = () => {
    if (storedCategories) {
      return JSON.parse(storedCategories) as string[];
    } else {
      localStorage.setItem(CATEGORIES, JSON.stringify(mockCategories));
      return mockCategories;
    }
  };
  const [categories, categoriesDispatch] = useReducer(
    categoriesReducer,
    initialValue()
  );

  return (
    <CategoriesContext.Provider value={{ categories, categoriesDispatch }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesContextProvider;
