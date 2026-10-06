import './StoreSelector.css';
import { StoreConfig } from '../lib/options';

type Props = {
  value: string;
  onChange: (value: string) => void;
  stores: StoreConfig[];
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
        <option key={store.key} value={store.key}>
          {store.label ?? store.key.toUpperCase()}
        </option>
      ))}
    </select>
  );
};