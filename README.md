# Prettier Pegjs Playground

This is a temporary playground for Prettier's [Pegjs Plugin](https://github.com/siefkenj/prettier-plugin-pegjs), written in [Vue.js](https://vuejs.org) with [Nuxt](https://nuxtjs.org).
It is a fork of the Prettier [PHP playground](https://loilo.github.io/prettier-php-playground/).

[Try it out online!](https://siefkenj.github.io/prettier-pegjs-playground/)

## Motivation

The main purposes of this playground is

  * making quick transformations on Pegjs code more comfortable

## Features

The Pegjs playground comes with the interface you know and love — it's almost a 1:1 clone of Prettier's own playground, but with some improvements:

* **Offline First**

  Thanks to [Service Workers](https://developer.mozilla.org/docs/Web/API/Service_Worker_API/Using_Service_Workers), the playground just works™ when you're not connected to the internet.
* **Mobile Support**

  Working with code is not all too common on mobile devices, but if you need it, we're here for you — the Pegjs playground features a functional mobile layout.

## Contributing

To get the playground running on your machine:

1. Clone this repository

   ```bash
   git clone https://github.com/siefkenj/prettier-pegjs-playground.git
   ```

2. Install dependencies

   ```bash
   yarn install
   ```

Then, if you want to work on the project locally with as much comfort as possible (hot reloading et al.), run:

```bash
yarn run dev
```

If you want to create a static site from your current work (in the projects `dist` folder) and then make that available to the browser, do:

```bash
yarn run generate
npx serve dist
```

Last but not least, if you want to create a static site how it's deployed to GitHub Pages (which is just the standard static site build process, but expects to not be in the website root but in a folder called `/prettier-pegjs-playground`), run the following

```bash
yarn run generate:gh-pages
```

You don't need to run that last command manually though — as soon as new commits are merged into the `master` branch, [Travis CI](https://travis-ci.org/siefkenj/prettier-pegjs-playground) will do the work of pushing it to GitHub Pages.
