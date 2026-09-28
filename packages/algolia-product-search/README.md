# Algolia Product Search — Storyblok Field Plugin

A Storyblok field plugin that allows to search and select products from an Algolia index. Products can be reordered via drag-and-drop in the inline view.

## Features

- Full-text search powered by Algolia InstantSearch
- Filter by category, stock status, availability, and assortment type
- Sort by relevance, price ascending, or price descending
- Multi-store support (switch between Algolia index prefixes)
- Select up to 30 products
- Drag-and-drop reordering of selected products
- Modal UI integrated with Storyblok's portal modal

## Plugin Options

Configure these options in your Storyblok field plugin settings (or in `field-plugin.config.json` for local development):

| Option               | Description                          | Example          |
| -------------------- | ------------------------------------ | ---------------- |
| `algoliaAppId`       | Your Algolia Application ID          | `ABC123DEF4`     |
| `algoliaSearchApiKey`| Algolia Search-Only API Key          | `abc123...`      |
| `storeKey`           | Default store/index prefix           | `nl`             |

## Stored Data Structure

The plugin stores a JSON object in the Storyblok content field:

```json
{
  "products": [
    {
      "objectID": "abc123",
      "name": "Product Name",
      "image": "https://...",
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
