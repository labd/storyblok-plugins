import { HierarchicalMenu, RefinementList, ToggleRefinement } from "react-instantsearch";
import { FACETS } from "../lib/config";
import "./FilterPanel.css";

export const FilterPanel = () => {
  return (
    <div className="filter-panel">
      <div className="filter-panel__section">
        <h3>Category</h3>
        <HierarchicalMenu
          attributes={[
            "hierarchicalCategories.lvl0",
            "hierarchicalCategories.lvl1",
            "hierarchicalCategories.lvl2",
            "hierarchicalCategories.lvl3",
          ]}
          showMore
        />
      </div>

      <div className="filter-panel__section">
        <h3>Availability</h3>
        <ToggleRefinement attribute={FACETS.inStock} label="In stock" />
        <ToggleRefinement attribute={FACETS.availableOnline} label="Available online" />
      </div>

      <div className="filter-panel__section">
        <h3>Assortment type</h3>
        <RefinementList attribute={FACETS.assortmentType} />
      </div>
    </div>
  );
};