import { SelectedProduct } from "../lib/types";
import "./ProductListItem.css";

type Props = {
  product: SelectedProduct;
  onRemove: () => void;
};

export const ProductListItem = ({ product, onRemove }: Props) => {
  return (
    <div className="product-list-item">
      <img
        src={product.image}
        alt={product.name}
        width={48}
        height={48}
        className="product-list-item__image"
      />
      <div className="product-list-item__info">
        <span className="product-list-item__name">{product.name}</span>
      </div>
      <button
        type="button"
        className="product-list-item__remove"
        onClick={onRemove}
        aria-label={`Remove ${product.name}`}
      >
        ✕
      </button>
    </div>
  );
};