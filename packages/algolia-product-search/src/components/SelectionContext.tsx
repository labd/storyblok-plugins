import { createContext, useContext } from "react";
import type { SelectedProduct } from "../lib/types";

export type SelectionContextType = {
	selectedIds: Set<string>;
	isAtLimit: boolean;
	remaining: number;
	toggleProduct: (product: SelectedProduct) => void;
	addProducts: (products: SelectedProduct[]) => void;
};

export const SelectionContext = createContext<SelectionContextType>({
	selectedIds: new Set(),
	isAtLimit: false,
	remaining: 0,
	toggleProduct: () => {},
	addProducts: () => {},
});

export const useSelection = () => useContext(SelectionContext);
