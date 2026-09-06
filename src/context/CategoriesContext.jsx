import { createContext, useReducer } from "react";
import { ADD, CATEGORIES } from "../constants/variables";
import { mockCategories } from "../constants/categories";

export const CategoriesContext = createContext();

const categoriesReducer = (state = [], action = { type: "", payload: "" }) => {
  if (action.type === ADD) {
    const newCategories = [...state, action.payload];
    localStorage.setItem(CATEGORIES, JSON.stringify(newCategories));
    return newCategories;
  }
};

const CategoriesContextProvider = ({ children }) => {
  const storedCategories = localStorage.getItem(CATEGORIES);
  const initialValue = () => {
    if (storedCategories) {
      return JSON.parse(storedCategories);
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
