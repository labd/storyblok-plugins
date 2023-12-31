# Commercetools Category Field Plugin

This plugin provides a field for selecting a category from a commercetools project.
To make this work you need to fill in 3 CT options:

- projectKey: The commercetools project key
- clientId: A commercetools API client id
- clientSecret: A commercetools API client secret

The clientId and clientSecret should be for a token that has at least a category read scope.

## Preview

<div style="display:flex;gap:1rem;align-items:flex-start">
  <img src="images/preview.png" class="flex:1" width="400" height="auto">
  <img src="images/preview-2.png" class="flex:1" width="400" height="auto">
</div>

## Development

Install dependencies

```shell
pnpm install
```

Run the application locally with

```shell
pnpm dev
```

and open the [Sandbox](https://plugin-sandbox.storyblok.com/field-plugin/).

Then fill in the 3 options as described above.

## Deployment

To deploy, simply push to main.
