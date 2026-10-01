# Algolia Product Search — Storyblok Field Plugin

A Storyblok field plugin that lets editors search and select products from Algolia. Products can be reordered via drag-and-drop in the inline view.

## Features

- Full-text search powered by Algolia InstantSearch
- Filter by category, stock status, availability, and assortment type
- Multi-store support with configurable stores and sort options
- Select up to 30 products
- Drag-and-drop reordering of selected products
- Modal UI integrated with Storyblok's portal modal

## Plugin Options

Configure these options in your Storyblok field plugin settings (or in `field-plugin.config.json` for local development):

| Option                | Description                                  |
| --------------------- | -------------------------------------------- |
| `algoliaAppId`        | Algolia application ID                       |
| `algoliaSearchApiKey` | Algolia search-only API key                  |
| `stores`              | Stores the editor can search in (optional)   |
| `sorts`               | Sort options in the sort dropdown (optional) |

The plugin searches one Algolia index per store and sort. Each sort has an index name
pattern, and `{store}` in that pattern is replaced with the selected store key. Store
`nl` with pattern `{store}_newest` searches the index `nl_newest`.

Without `stores`, the plugin offers the stores `nl`, `at`, `de`, `fr`, `be`, `lu`, `pt`
and `es`. Without `sorts`, it offers Relevance (`{store}_default`), Price (low to high)
(`{store}_price_asc`) and Price (high to low) (`{store}_price_desc`). An invalid value
is ignored; the reason is logged in the browser console.

### `stores`

A JSON array:

```json
[
  { "key": "nl", "default": true },
  { "key": "be", "label": "Belgium" }
]
```

| Field     | Required | Description                                                       |
| --------- | -------- | ----------------------------------------------------------------- |
| `key`     | yes      | Store key, used for `{store}` in the index patterns.              |
| `label`   | no       | Label in the store dropdown. Defaults to the upper-cased key.     |
| `default` | no       | Preselected store for an empty field. Defaults to the first store. |

### `sorts`

A JSON array:

```json
[
  { "key": "relevance",  "label": "Relevance",           "index": "{store}_default", "default": true },
  { "key": "price_asc",  "label": "Price (low to high)", "index": "{store}_price_asc" },
  { "key": "price_desc", "label": "Price (high to low)", "index": "{store}_price_desc" },
  { "key": "newest",     "label": "Newest first",        "index": "{store}_newest" }
]
```

| Field     | Required | Description                                                   |
| --------- | -------- | ------------------------------------------------------------- |
| `key`     | yes      | Unique name of the sort option.                               |
| `index`   | yes      | Index name pattern. `{store}` is replaced with the store key. |
| `label`   | no       | Label in the sort dropdown. Defaults to the key.              |
| `default` | no       | Preselected sort. Defaults to the first sort.                 |

Every pattern must resolve to an existing Algolia index for every store.

### Terraform example

If you manage the Storyblok space with Terraform, build each value with `jsonencode()`:

```hcl
options = [
  { name = "algoliaAppId",        value = var.algolia_app_id },
  { name = "algoliaSearchApiKey", value = var.algolia_search_api_key },
  { name = "sorts", value = jsonencode([
    { key = "relevance",  label = "Relevance",           index = "{store}_default", default = true },
    { key = "price_asc",  label = "Price (low to high)", index = "{store}_price_asc" },
    { key = "price_desc", label = "Price (high to low)", index = "{store}_price_desc" },
    { key = "newest",     label = "Newest first",        index = "{store}_newest" },
  ]) },
]
```

## Stored Data Structure

The plugin stores a JSON object in the Storyblok content field:

```json
{
  "products": [
    {
      "objectID": "abc123",
      "name": "Product Name",
      "image": "https://..."
    }
  ],
  "storeKey": "nl"
}
```

## Development

```shell
pnpm dev
```

Open the [Storyblok Plugin Sandbox](https://plugin-sandbox.storyblok.com/field-plugin/) to test locally.

## Build

```shell
pnpm build
```

## Deploy

Create a `.env` file at the monorepo root with your Storyblok personal access token:

```
STORYBLOK_PERSONAL_ACCESS_TOKEN=your-token-here
```

Then deploy:

```shell
pnpm deploy
```

## Tech Stack

- React 18
- [Algolia InstantSearch](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/) (react-instantsearch v7)
- [React Aria Components](https://react-spectrum.adobe.com/react-aria/) (GridList + drag-and-drop)
- [@storyblok/field-plugin](https://github.com/storyblok/field-plugin)
- Vite + vite-plugin-css-injected-by-js (single JS bundle output)
