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

export const SORT_SUFFIXES = {
  default: '_default',
  priceAsc: '_price_asc',
  priceDesc: '_price_desc',
} as const;

export const LIMITS = {
  maxProducts: 30,
} as const;

export const STORES = ['nl', 'at', 'de', 'fr', 'be', 'lu', 'pt', 'es'] as const;