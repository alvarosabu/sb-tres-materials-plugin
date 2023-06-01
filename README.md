![sb-tres-materials-field-plugin-banner](/public/sb-tres-materials-plugin-banner.png)

# Storyblok Tres Materials Field Plugin

> A custom Storyblok field plugin 😎 that allows to create 3D materials.
>
> It uses [TresJS](https://github.com/Tresjs/tres) to make a preview the materials and [vue-color-kit](https://github.com/anish2690/vue-color-kit) for the color picker 🎨.

## Usage

For development, run the application locally with

```shell
yarn dev
```

and open the [Sandbox](https://plugin-sandbox.storyblok.com/field-plugin/).

To build the project, run

```shell
yarn build
```

Deploy the field plugin with the CLI. Issue a [personal access token](https://app.storyblok.com/#/me/account?tab=token), rename `.env.local.example` to `.env.example`, open the file, set the value `STORYBLOK_PERSONAL_ACCESS_TOKEN`, and run

```shell
yarn deploy
```

## Next Steps

Read more about field plugins [on GitHub](https://github.com/storyblok/field-plugin).

Set up continuous integration with the [CLI](https://www.npmjs.com/package/@storyblok/field-plugin-cli). Define an environmental variable `STORYBLOK_PERSONAL_ACCESS_TOKEN`, and use the `--name` and `--skipPrompts` options as such:

```shell
yarn deploy --name $NAME --skipPrompts
```

[@storyblok/design-system](https://www.npmjs.com/package/@storyblok/design-system) is Storyblok's component library for Vue. To add it to this project, follow the instructions in the [readme](https://www.npmjs.com/package/@storyblok/design-system).
