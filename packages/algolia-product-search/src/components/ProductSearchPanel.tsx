import { useMemo, useState } from "react";
import { InstantSearch, SearchBox, Hits, Pagination, SortBy, Configure } from "react-instantsearch";
import { createSearchClient, getIndexName, getSortItems } from "../lib/utils";
import { LIMITS, STORES } from "../lib/config";
import { PluginContent, SelectedProduct } from "../lib/types";
import { HitComponent } from "./SelectableHit";
import { FilterPanel } from "./FilterPanel";
import { StoreSelector } from "./StoreSelector";
import "./ProductSearchPanel.css";
import { NoResultsBoundary } from "./NoResultsBoundary";
import { TooltipTrigger, Tooltip, Button } from "react-aria-components";
import { SelectionContext } from "./SelectionContext";

type Props = {
  content: PluginContent;
  options: Record<string, string>;
  onConfirm: (content: PluginContent) => void;
  onCancel: () => void;
};

export const ProductSearchPanel = ({
  content,
  options,
  onConfirm,
  onCancel,
}: Props) => {
  const [storeKey, setStoreKey] = useState(content.storeKey || options.storeKey || "nl");
  const [selected, setSelected] = useState<SelectedProduct[]>(content.products);

  const searchClient = useMemo(
    () => createSearchClient(options.algoliaAppId, options.algoliaSearchApiKey),
    [options.algoliaAppId, options.algoliaSearchApiKey],
  );

  const indexName = getIndexName(storeKey);
  const sortItems = getSortItems(storeKey);

  const selectedIds = new Set(selected.map((p) => p.objectID));
  const isAtLimit = selected.length >= LIMITS.maxProducts;

  const toggleProduct = (product: SelectedProduct) => {
    if (selectedIds.has(product.objectID)) {
      setSelected((prev) => prev.filter((p) => p.objectID !== product.objectID));
    } else if (!isAtLimit) {
      setSelected((prev) => [...prev, product]);
    };
  };

  const handleConfirm = () => {
    onConfirm({ products: selected, storeKey });
  };

  return (
    <div className="search-panel">
      <header className="search-panel__header">
        <h2>Select products</h2>
      </header>

      <InstantSearch searchClient={searchClient} indexName={indexName} key={storeKey}>
        <Configure hitsPerPage={30} />

        <div className="search-panel__toolbar">
          <div className="toolbar-group">
            <label className="toolbar-label">Store</label>
            <StoreSelector value={storeKey} onChange={setStoreKey} stores={STORES} />
          </div>
          <div className="toolbar-group toolbar-group--grow">
            <label className="toolbar-label">Search</label>
            <SearchBox placeholder="Search by name or AVS number..." />
          </div>
          <div className="toolbar-group">
            <label className="toolbar-label">Sort by</label>
            <SortBy items={sortItems} />
          </div>
        </div>

        <div className="search-panel__body">
          <aside className="search-panel__filters">
            <FilterPanel />
          </aside>

          <main className="search-panel__results">
            <SelectionContext.Provider value={{ selectedIds, isAtLimit, toggleProduct }}>
              <NoResultsBoundary fallback={
                <div className="no-results">
                  <p>No products found</p>
                  <span>Try adjusting your search or filters.</span>
                </div>
              }>
                <Hits hitComponent={HitComponent} />
                <Pagination />
              </NoResultsBoundary>
            </SelectionContext.Provider>
          </main>
        </div>
      </InstantSearch>

      <footer className="search-panel__footer">
        <span className="search-panel__counter">
          Selected: {selected.length} / {LIMITS.maxProducts}
        </span>
        <div className="selected-bar__items">
          {selected.map((product) => (
            <TooltipTrigger key={product.objectID} delay={300}>
              <Button className="selected-bar__item" onPress={() => toggleProduct(product)} aria-label={`Remove ${product.name}`}>
                <img src={product.image} alt={product.name} />
                <span className="selected-bar__remove">✕</span>
              </Button>
              <Tooltip className="selected-bar__tooltip">{product.name}</Tooltip>
            </TooltipTrigger>
          ))}
        </div>
        <div>
          <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
          <button type="button" onClick={handleConfirm} className="btn-primary">Confirm</button>
        </div>
      </footer>
    </div>
  );
};