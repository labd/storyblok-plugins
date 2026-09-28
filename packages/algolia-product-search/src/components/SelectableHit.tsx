import { formatAssortmentType, getLocalizedValue } from "../lib/utils";
import "./SelectableHit.css";
import { AlgoliaHit } from "../lib/types";
import { useSelection } from "./SelectionContext";

type Props = {
  hit: AlgoliaHit;
  isSelected: boolean;
  isDisabled: boolean;
  onToggle: () => void;
};

export const SelectableHit = ({ hit, isSelected, isDisabled, onToggle }: Props) => {
  return (
    <article
      className={`selectable-hit ${isSelected ? "selectable-hit--selected" : ""} ${isDisabled ? "selectable-hit--disabled" : ""}`}
      onClick={isDisabled ? undefined : onToggle}
      role="checkbox"
      aria-checked={isSelected}
      aria-disabled={isDisabled}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (!isDisabled) {
            onToggle();
          }
        }
      }}
    >
      <div className="selectable-hit__media">
        <img
          src={hit.image}
          alt={getLocalizedValue(hit.name)}
          className="selectable-hit__image"
        />
        <input
          type="checkbox"
          checked={isSelected}
          disabled={isDisabled}
          onChange={onToggle}
          className="selectable-hit__checkbox"
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="selectable-hit__tags">
          <span className={`selectable-hit__tag ${hit.inStock ? "selectable-hit__tag--green" : "selectable-hit__tag--red"}`}>
            {hit.inStock ? "In stock" : "Out of stock"}
          </span>
          {hit.assortmentType ? (
            <span className="selectable-hit__tag selectable-hit__tag--neutral">
              {formatAssortmentType(hit.assortmentType as string)}
            </span>
          ) : null}
        </div>
      </div>
      <div className="selectable-hit__content">
        <span className="selectable-hit__name">{getLocalizedValue(hit.name)}</span>
        <span className="selectable-hit__category">{(hit.hierarchicalCategories as any)?.lvl0 ?? ""}</span>
        <span className="selectable-hit__price">€{(Number(getLocalizedValue(hit.salesPrice)) || 0).toFixed(2)}</span>
      </div>
    </article>
  );
};

export const HitComponent = ({ hit }: { hit: AlgoliaHit }) => {
  const { selectedIds, isAtLimit, toggleProduct } = useSelection();
  const isSelected = selectedIds.has(hit.objectID);

  return (
    <SelectableHit
      hit={hit}
      isSelected={isSelected}
      isDisabled={isAtLimit && !isSelected}
      onToggle={() =>
        toggleProduct({
          objectID: hit.objectID,
          name: getLocalizedValue(hit.name),
          image: typeof hit.image === "string" ? hit.image : "",
        })
      }
    />
  );
};