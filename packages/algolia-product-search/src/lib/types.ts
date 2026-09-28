export type SelectedProduct = {
  objectID: string;
  name: string;
  image: string;
};

export type PluginContent = {
  products: SelectedProduct[];
  storeKey: string;
};

export type LocalizedField<T = string> = Record<string, T>;

export type AlgoliaHit = {
  objectID: string;
  name: LocalizedField;
  image: string;
  salesPrice: LocalizedField<number>;
  hierarchicalCategories: {
    lvl0?: string;
    lvl1?: string;
    lvl2?: string;
    lvl3?: string;
  };
  inStock: boolean;
  isAvailableOnline: boolean;
  assortmentType?: string;
};
