import './StoreSelector.css';

type Props = {
  value: string;
  onChange: (value: string) => void;
  stores: readonly string[];
};

export const StoreSelector = ({ value, onChange, stores }: Props) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="store-selector"
      aria-label="Select store"
    >
      {stores.map((store) => (
        <option key={store} value={store}>
          {store.toUpperCase()}
        </option>
      ))}
    </select>
  );
};