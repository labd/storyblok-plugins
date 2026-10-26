# Lab Digital Storyblok plugins

[![Tests](https://github.com/labd/storyblok-plugins/actions/workflows/tests.yaml/badge.svg)](https://github.com/labd/storyblok-plugins/actions/workflows/tests.yaml)

A pnpm monorepo with custom [Storyblok field plugins](https://www.storyblok.com/docs/plugins/field-plugins/introduction)
built by Lab Digital. Each plugin is a React app built with Vite into a single JavaScript
bundle and deployed to the
[Lab Digital partner portal of Storyblok](https://app.storyblok.com/#/partner/fields),
where it can be used as a custom field type in any Storyblok space.

## Plugins

| Plugin | Description |
| ------ | ----------- |
| [`ct-category`](packages/ct-category) | Select a category from a commercetools project. |
| [`algolia-product-search`](packages/algolia-product-search) | Search, select and reorder products from Algolia. |

The plugins are not published to npm. Editors use them through Storyblok, so there is
nothing to install in your own project.

## Requirements

- Node.js >= 22.12.0
- pnpm 12 (the version is pinned in `packageManager` in `package.json`)
- A Storyblok personal access token to deploy

## Usage

1. Open the field plugin in the Storyblok partner portal and assign it to your space.
2. Add a field of type **Plugin** to a block and select the plugin as its custom type.
3. Fill in the plugin options. See the README of each plugin for its options and for
   the data it stores in the content field.

## Development

```shell
pnpm install
```

Run a plugin locally and open the
[Storyblok Plugin Sandbox](https://plugin-sandbox.storyblok.com/field-plugin/):

```shell
cd packages/ct-category
pnpm dev
```

Scripts at the repository root:

| Script | Description |
| ------ | ----------- |
| `pnpm lint` | Run Biome checks |
| `pnpm format` | Apply Biome fixes and formatting |
| `pnpm typecheck` | Run `tsc` in every package |
| `pnpm check` | Lint and typecheck (used in CI) |
| `pnpm -r build` | Build every plugin |
| `pnpm -r test` | Run the Vitest tests of every plugin |
| `pnpm add-plugin` | Scaffold a new plugin in `packages/` with the Storyblok field plugin CLI |

## Release

The plugins are private packages, so there are no npm releases or changesets. A release
is a deploy to the Storyblok partner portal:

- `ct-category` is tested, built and deployed by the
  [`deploy`](.github/workflows/deploy.yaml) workflow on every push to `main`.
- `algolia-product-search` is deployed by hand. Copy `.env.local.example` to `.env`
  at the repository root, set `STORYBLOK_PERSONAL_ACCESS_TOKEN`, and run
  `pnpm run deploy` in `packages/algolia-product-search`.

## License

[MIT](LICENSE)
