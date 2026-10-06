import { z } from 'zod';

const storeSchema = z.object({
  key: z.string().trim().min(1),
  label: z.string().trim().min(1).optional(),
  default: z.boolean().optional(),
});

const sortSchema = z.object({
  key: z.string().trim().min(1),
  label: z.string().trim().min(1).optional(),
  index: z.string().trim().min(1),
  default: z.boolean().optional(),
});

const storesSchema = z.array(storeSchema).min(1);
const sortsSchema = z.array(sortSchema).min(1);

export type StoreConfig = z.infer<typeof storeSchema>;
export type SortConfig = z.infer<typeof sortSchema>;

export type PluginOptions = {
  algoliaAppId: string;
  algoliaSearchApiKey: string;
  stores: StoreConfig[];
  sorts: SortConfig[];
};

export const DEFAULT_STORES: StoreConfig[] = ['nl', 'at', 'de', 'fr', 'be', 'lu', 'pt', 'es'].map(
  (key) => ({ key }),
);

export const DEFAULT_SORTS: SortConfig[] = [
  { key: 'relevance', label: 'Relevance', index: '{store}_default', default: true },
  { key: 'price_asc', label: 'Price (low to high)', index: '{store}_price_asc' },
  { key: 'price_desc', label: 'Price (high to low)', index: '{store}_price_desc' },
];

const parseJsonOption = <T>(
  name: string,
  raw: string | undefined,
  schema: { parse: (data: unknown) => T },
  fallback: T,
): T => {
  if (!raw?.trim()) {
    return fallback;
  }

  try {
    return schema.parse(JSON.parse(raw));
  } catch (error) {
    console.warn(`[algolia-product-search] Invalid \`${name}\` option. The default value is used.`, error);
    return fallback;
  }
};

export const parseOptions = (options: Record<string, string>): PluginOptions => ({
  algoliaAppId: options.algoliaAppId?.trim() ?? '',
  algoliaSearchApiKey: options.algoliaSearchApiKey?.trim() ?? '',
  stores: parseJsonOption('stores', options.stores, storesSchema, DEFAULT_STORES),
  sorts: parseJsonOption('sorts', options.sorts, sortsSchema, DEFAULT_SORTS),
});
