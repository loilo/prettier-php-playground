# Prettier PHP Playground

This is a temporary playground for Prettier's [PHP Plugin](https://github.com/prettier/plugin-php), written in [Vue.js](https://vuejs.org).

[Try it out online!](https://loilo.github.io/prettier-php-playground/)

## Motivation

The main purposes of this playground are:

1. making quick transformations on PHP code more comfortable, obviously
2. serving as a transitioning tool for simplified testing and bug reporting until the PHP plugin is stable enough to be integrated into the official [Prettier Playground](https://prettier.io/playground).

## Features

The PHP playground comes with the interface you know and love — it's almost a 1:1 clone of Prettier's own playground, but with some improvements:

- **Offline First**

  Thanks to [Service Workers](https://developer.mozilla.org/docs/Web/API/Service_Worker_API/Using_Service_Workers), the playground just works™ when you're not connected to the internet.

- **Mobile Support**

  Working with code is not all too common on mobile devices, but if you need it, we're here for you — the PHP playground features a functional mobile layout.

## Contributing

To get the playground running on your machine, clone this repository...

```bash
git clone https://github.com/Loilo/prettier-php-playground.git
```

...and install dependencies:

```bash
npm ci
```

If you want to work on the project locally with as much comfort as possible (hot reloading et al.), run:

```bash
npm run dev
```

If you want to create a static site from your current work (in the projects `dist` folder) and then make that available to the browser, do:

```bash
npm run build
npm run preview
```
