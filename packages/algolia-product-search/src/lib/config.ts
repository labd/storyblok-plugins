export const FACETS = {
  hierarchicalCategories: [
    'hierarchicalCategories.lvl0',
    'hierarchicalCategories.lvl1',
    'hierarchicalCategories.lvl2',
    'hierarchicalCategories.lvl3',
  ],
  inStock: 'inStock',
  availableOnline: 'isAvailableOnline',
  assortmentType: 'assortmentType',
} as const;

export const LIMITS = {
  maxProducts: 30,
} as const;
