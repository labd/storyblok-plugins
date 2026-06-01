import { liteClient as algoliasearch } from "algoliasearch/lite";
import { SORT_SUFFIXES } from "./config";
import { PluginContent } from "./types";

export const createSearchClient = (appId: string, apiKey: string) =>
  algoliasearch(appId, apiKey);

export const getIndexName = (storeKey: string, sort: keyof typeof SORT_SUFFIXES = "default") =>
  `${storeKey}${SORT_SUFFIXES[sort]}`;

export const getSortItems = (storeKey: string) => [
  { label: "Relevance", value: `${storeKey}${SORT_SUFFIXES.default}` },
  { label: "Price (low to high)", value: `${storeKey}${SORT_SUFFIXES.priceAsc}` },
  { label: "Price (high to low)", value: `${storeKey}${SORT_SUFFIXES.priceDesc}` },
];

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

export function formatPrice(price: unknown): { amount: number; currency: string } {
  if (price && typeof price === "object" && "centAmount" in price) {
    const p = price as { currency: string; centAmount: number };
    return { amount: p.centAmount / 100, currency: p.currency || "EUR" };
  };

  return { amount: 0, currency: "EUR" };
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

export function isValidPluginContent(content: unknown): content is PluginContent {
  if (!content || typeof content !== "object") {
    return false;
  }

  const c = content as Record<string, unknown>;
  return Array.isArray(c.products) && typeof c.storeKey === "string";
};