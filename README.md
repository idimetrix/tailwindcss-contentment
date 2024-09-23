# tailwindcss-contentment

## Description

**tailwindcss-contentment** is a Tailwind CSS plugin inspired by the capabilities of container queries, enabling developers to build responsive and adaptive components that respond to the size of their parent containers rather than just the viewport. By leveraging this plugin, you can create modular designs that adapt gracefully to different layouts and grid structures, leading to cleaner, more maintainable, and scalable CSS.

This plugin is perfect for modern web applications that require dynamic content handling and complex layout management. It follows the principles of **contentment**, allowing developers to focus on creating beautiful and functional designs without worrying about media query hacks or rigid breakpoints. The container-based approach opens up new possibilities for responsive design, enabling more fine-grained control over components in dynamic, resizable containers.

# Tailwind CSS Container Query Plugin for v3.2+ (Advanced)

This plugin extends Tailwind CSS with utilities that enable **container queries**, allowing you to apply styles based on the size of a parent container rather than just the viewport. This functionality is particularly useful for creating **responsive components** that adapt to their surrounding environment, such as in grid layouts, cards, or modular sections in modern web applications.

## Key Features:

- **Container Query Utilities**: Introduces the `@container` utility, which enables styles to be applied based on container size instead of the viewport size, offering more granular control for responsive design.
- **Flexible Container Types**: Supports multiple container types, including `inline-size`, `block-size`, and `flex-size`, allowing you to target specific resizing behaviors in different layout contexts (e.g., inline, block, or flex containers).
- **Width and Height Queries**: Allows you to define queries based on both the **width** and **height** of the container, making it possible to trigger styles based on vertical or horizontal dimensions.
- **Customizable Units**: Supports a wide variety of CSS units (`rem`, `px`, `em`, `%`, `vw`, `vh`), giving you full flexibility in defining breakpoints and container dimensions.
- **Custom Container Sizes**: Define custom container sizes in your theme configuration, enabling precise control over breakpoints and layout changes.
- **Advanced Sorting and Fallbacks**: Automatically sorts container queries based on numeric values and allows for custom fallback behaviors if no value is provided.

## Detailed Functionality

### 0. **@container Basic**

Begin by designating an element as a container using the `@container` class. Once it's set as a container, you can apply responsive styles based on its size by using container variants such as `@md:`, `@lg:`, and `@xl:` to control the styling depending on the container's width.

```html
<div class="@container">
  <div class="@lg:underline">
    <!-- This text will be underlined when the container is larger than `32rem` -->
  </div>
</div>
```

### 1. **@container Utility**

The plugin adds a `@container` utility that can be applied to any element to make it a queryable container. This allows child elements to adapt their styles based on the size of the container.

```html
<div class="@container">
  <!-- Styles of child elements can change based on the container's size -->
  <div class="@min-width-400px:bg-blue-500">
    I turn blue when the container is at least 400px wide.
  </div>
</div>
```

The `@container` utility can be customized with various types:

- **inline-size** (default): Triggers container queries based on the container’s width.
- **block-size**: Triggers container queries based on the container’s height.
- **flex-size**: For containers in a flexbox layout, this adjusts based on the flex layout's size.

### 2. **Width and Height-Based Container Queries**

You can define container queries based on both width and height. For example, applying different styles based on the minimum width of a container:

```html
<div class="@container">
  <div class="@min-width-500px:bg-red-500">
    Turns red when the container is at least 500px wide.
  </div>
  <div class="@min-height-300px:bg-green-500">
    Turns green when the container is at least 300px tall.
  </div>
</div>
```

This enables more flexible and dynamic design control for both horizontal and vertical layouts.

### 3. **Support for Custom Units**

This plugin supports various CSS units, such as `rem`, `px`, `em`, `%`, `vw`, and `vh`, giving developers precise control over breakpoints and media queries. Here's an example using `rem` and `px`:

```html
<div class="@container">
  <div class="@min-width-40rem:bg-yellow-500">
    Yellow when container is 40rem wide.
  </div>
  <div class="@min-width-800px:bg-indigo-500">
    Indigo when container is 800px wide.
  </div>
</div>
```

### 4. **Custom Container Sizes in Theme Configuration**

You can extend Tailwind's theme configuration to include custom container sizes. This gives you precise control over the breakpoints for your container queries.

```js
// tailwind.config.js
module.exports = {
  theme: {
    containers: {
      xs: "20rem",
      sm: "24rem",
      md: "28rem",
      lg: "32rem",
      xl: "36rem",
      "2xl": "42rem",
      "3xl": "48rem",
      "4xl": "56rem",
      "5xl": "64rem",
      custom: "90%", // Custom container size using percentage
    },
  },
};
```

Now, you can use these custom container sizes directly in your HTML:

```html
<div class="@container">
  <div class="@custom:bg-gray-500">
    I will be gray when my container is 90% of its parent.
  </div>
</div>
```

### 5. **Advanced Sorting and Fallback Behaviors**

The plugin includes advanced sorting logic to ensure that container queries are applied in the correct order. It automatically sorts container sizes numerically, handling multiple units, and even allows for fallback values when no modifier is provided.

Example of container queries with fallbacks:

```html
<div class="@container">
  <div class="@min-width-500px:bg-green-500">I turn green at 500px width.</div>
  <div class="@bg-gray-400">
    I will always have a gray background, as there is no width query.
  </div>
</div>
```

## How to Use It

### 1. **Install the Plugin**

To use this plugin, first install it via npm:

```bash
pnpm add tailwindcss-contentment

yarn install tailwindcss-contentment

npm install tailwindcss-contentment
```

### 2. **Add to Tailwind Config**

In your `tailwind.config.js`, add the plugin:

```js
const tailwindcssContentment = require("tailwindcss-contentment");

module.exports = {
  plugins: [tailwindcssContentment],
};
```

### 3. **Extend the Theme**

By default we ship with the following configured values:

| Name   | CSS                                          |
| ------ | -------------------------------------------- |
| `@xs`  | `@container (min-width: 20rem /* 320px */)`  |
| `@sm`  | `@container (min-width: 24rem /* 384px */)`  |
| `@md`  | `@container (min-width: 28rem /* 448px */)`  |
| `@lg`  | `@container (min-width: 32rem /* 512px */)`  |
| `@xl`  | `@container (min-width: 36rem /* 576px */)`  |
| `@2xl` | `@container (min-width: 42rem /* 672px */)`  |
| `@3xl` | `@container (min-width: 48rem /* 768px */)`  |
| `@4xl` | `@container (min-width: 56rem /* 896px */)`  |
| `@5xl` | `@container (min-width: 64rem /* 1024px */)` |
| `@6xl` | `@container (min-width: 72rem /* 1152px */)` |
| `@7xl` | `@container (min-width: 80rem /* 1280px */)` |

You can extend the `containers` key in the theme section to define custom container sizes or modify the default ones:

```js
module.exports = {
  theme: {
    extend: {
      containers: {
        sm: "30rem", // Modify the existing container sizes
        custom: "80%", // Add new custom sizes
      },
    },
  },
};
```

### 4. **Use Container Queries in Your HTML**

Once the plugin is configured, you can apply container queries directly in your HTML using Tailwind utilities:

```html
<div class="@container">
  <div class="@min-width-400px:bg-blue-500">
    I will have a blue background when the container is 400px wide.
  </div>
  <div class="@min-height-300px:bg-red-500">
    I will have a red background when the container is 300px tall.
  </div>
</div>
```

## tsup

Bundle your TypeScript library with no config, powered by esbuild.

https://tsup.egoist.dev/

## How to use this

1. install dependencies

```
# pnpm
$ pnpm install

# yarn
$ yarn install

# npm
$ npm install
```

2. Add your code to `src`
3. Add export statement to `src/index.ts`
4. Test build command to build `src`.
   Once the command works properly, you will see `dist` folder.

```zsh
# pnpm
$ pnpm run build

# yarn
$ yarn run build

# npm
$ npm run build
```

5. Publish your package

```zsh
$ npm publish
```

## test package

https://www.npmjs.com/package/tailwindcss-contentment
