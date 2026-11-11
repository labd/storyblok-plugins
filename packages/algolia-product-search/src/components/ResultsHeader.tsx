import { useHits } from "react-instantsearch";
import type { AlgoliaHit } from "../lib/types";
import { hitToProduct } from "../lib/utils";
import { useSelection } from "./SelectionContext";
import "./ResultsHeader.css";

export const ResultsHeader = () => {
	const { items: hits } = useHits<AlgoliaHit>();
	const { selectedIds, remaining, addProducts } = useSelection();

	const unselectedProducts = hits
		.map(hitToProduct)
		.filter((product) => !selectedIds.has(product.objectID));
	const addCount = Math.min(unselectedProducts.length, remaining);
	const canAdd = addCount > 0;
	const isLimited = canAdd && addCount < unselectedProducts.length;

	return (
		<div className="results-header">
			<button
				type="button"
				className="btn-secondary"
				disabled={!canAdd}
				onClick={() => addProducts(unselectedProducts)}
			>
				{isLimited ? `Select ${addCount} more` : "Select all"}
			</button>
		</div>
	);
};
