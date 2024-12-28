# Canva Embed

This Obsidian plugin allows you to embed Canva designs in your notes. The design is embedded as an iframe using Canva's official iframe embed component, so it will include the Canva branding and a link to the design on Canva's website.

## Usage

To embed a Canva design, you need to generate a public URL for it first. Some of these features might be behind a paywall.

### Generating a public URL

There are lots of ways to generate a public URL. It will come out with different query parameters, but the plugin will clean them up and add the ones it needs.

The easiest way is to create a Public View Link:

1. Open the design in Canva.
2. Click on the Share button.
3. Click on Public View Link
4. Copy the link.

This will result in a URL like:

```
https://www.canva.com/design/DaSwefd_a/mV-dfaAsdF/view?utm_content=DAGaZzWN_Us&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=ha6e9834f3c
```

Another way is to use the Smart Embed Link:

1. After the share button, clicking "See all"
2. Clicking "Embed"
3. Copying the "Smart Embed Link"

This results in something like:

```
https://www.canva.com/design/DaSwefd_a/mV-dfaAsdF/view?embed
```

Optionally, you can delete everything starting with the `?` character to make it look cleaner in source mode.

### Embedding the design

You embed the design as a codeblock with the `canva` language identifier.

````
```canva
https://www.canva.com/design/DaSwefd_a/mV-dfaAsdF/view?utm_content=DAGaZzWN_Us&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=ha6e9834f3c
```
````

### Configuring height and width

The iframe doesn't know the size of the design and by default it will be pretty big. This will usually cause letterboxing.

To avoid this, you must specify the height and width of the embed as a configuration option to the codeblock, as follows:

````
```canva size=800x600
https://www.canva.com/design/DaSwefd_a/mV-dfaAsdF/view
```
````

The size needs to match the size of the design, or at least the aspect ratio.

## Errors

Invalid URLs, invalid sizes, and other issues will cause the plugin to display an error message instead of the design.

## Development

This plugin is managed in a monorepo together with some other stuff related to it. Plugin code is at [packages/plugin](packages/plugin).
