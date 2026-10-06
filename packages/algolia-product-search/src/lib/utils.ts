import { liteClient as algoliasearch } from "algoliasearch/lite";
import { PluginContent, SelectedProduct } from "./types";
import { SortConfig } from "./options";

export const createSearchClient = (appId: string, apiKey: string) =>
  algoliasearch(appId, apiKey);

export const resolveIndexName = (sort: SortConfig, storeKey: string) =>
  sort.index.replaceAll("{store}", storeKey);

export const getDefault = <T extends { key: string; default?: boolean }>(items: T[]) =>
  items.find((item) => item.default) ?? items[0];

export const getSortItems = (sorts: SortConfig[], storeKey: string) =>
  sorts.map((sort) => ({ label: sort.label ?? sort.key, value: resolveIndexName(sort, storeKey) }));

export const getLocalizedValue = (value: unknown, locale = "nl-NL"): string => {
  if (typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object") {
    const obj = value as Record<string, string>
    return obj[locale] ?? Object.values(obj)[0] ?? "";
  };

  return "";
};

export function formatAssortmentType(type: string): string {
  const labels: Record<string, string> = {
    OFFLINE_ONLINE: "Offline + Online",
    OFFLINE_ONLINE_LISTING: "Online listing",
    OFFLINE_ONLINE_NO_LISTING: "No listing",
    OFFLINE_SINGLE_ONLINE_BULK: "Online bulk",
    OFFLINE_SINGLE_ONLINE_MINIMUM: "Online min.",
    ONLINE_ONLY: "Online only",
  };

  return labels[type] ?? type;
};

export function dedupeProducts(products: SelectedProduct[]): SelectedProduct[] {
  const seen = new Set<string>();

  return products.filter((product) => {
    if (seen.has(product.objectID)) {
      return false;
    }

    seen.add(product.objectID);

    return true;
  });
};

export function isValidPluginContent(content: unknown): content is PluginContent {
  if (!content || typeof content !== "object") {
    return false;
  }

  const c = content as Record<string, unknown>;
  return Array.isArray(c.products) && typeof c.storeKey === "string";
};