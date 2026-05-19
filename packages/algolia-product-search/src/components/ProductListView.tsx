import { useEffect, useRef } from "react";
import { GridList, GridListItem, useDragAndDrop, useListData } from "react-aria-components";
import { PluginContent, SelectedProduct } from "../lib/types";
import { LIMITS } from "../lib/config";
import { ProductListItem } from "./ProductListItem";
import "./ProductListView.css";

type Props = {
  content: PluginContent;
  onUpdate: (content: PluginContent) => void;
  onOpenModal: () => void;
};

export const ProductListView = ({ content, onUpdate, onOpenModal }: Props) => {
  const list = useListData({
    initialItems: content.products,
    getKey: (item) => item.objectID,
  });

  const pendingUpdate = useRef(false);

  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys) => [...keys].map((key) => ({ "text/plain": key as string })),
    onReorder(e) {
      if (e.target.dropPosition === "before") {
        list.moveBefore(e.target.key, e.keys);
      } else if (e.target.dropPosition === "after") {
        list.moveAfter(e.target.key, e.keys);
      }
      pendingUpdate.current = true;
    },
  });

  useEffect(() => {
    if (pendingUpdate.current) {
      pendingUpdate.current = false;
      onUpdate({ ...content, products: [...list.items] });
    }
  });

  const handleRemove = (product: SelectedProduct) => {
    const updated = list.items.filter((p) => p.objectID !== product.objectID);
    list.remove(product.objectID);
    onUpdate({ ...content, products: updated });
  };

  if (content.products.length === 0) {
    return (
      <div className="product-list-empty">
        <p>No products selected</p>
        <button type="button" onClick={onOpenModal} className="btn-primary">
          Add products
        </button>
      </div>
    );
  };

  return (
    <div className="product-list-view">
      <div className="product-list-header">
        <span>{content.products.length} / {LIMITS.maxProducts} products</span>
        <button type="button" onClick={onOpenModal} className="btn-primary">
          Add products
        </button>
      </div>

      <GridList
        aria-label="Selected products"
        items={list.items}
        dragAndDropHooks={dragAndDropHooks}
      >
        {(product) => (
          <GridListItem id={product.objectID} textValue={product.name}>
            <ProductListItem product={product} onRemove={() => handleRemove(product)} />
          </GridListItem>
        )}
      </GridList>
    </div>
  );
};