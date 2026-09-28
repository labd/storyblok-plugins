import { SelectedProduct } from "../lib/types";
import { createContext, useContext } from "react";

export type SelectionContextType = {
    selectedIds: Set<string>;
    isAtLimit: boolean;
    toggleProduct: (product: SelectedProduct) => void;
};

export const SelectionContext = createContext<SelectionContextType>({
    selectedIds: new Set(),
    isAtLimit: false,
    toggleProduct: () => { },
});

export const useSelection = () => useContext(SelectionContext);