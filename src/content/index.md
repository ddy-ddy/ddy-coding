---
title: CLI
description: Use the CLI to add components to your project.
---

<script>
  import * as Accordion from '$lib/components/ui/accordion';
</script>


## init

Use the `init` command to initialize dependencies for a new project.

The `init` command installs dependencies, adds the `cn` util, configures `tailwind.config.cjs`, and creates CSS variables for the project.

```bash
npx shadcn-svelte@latest init
```

You will be asked a few questions to configure `components.json`:

```txt showLineNumbers
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your global CSS file? › src/app.pcss
Where is your tailwind.config.[cjs|js|ts] located? › tailwind.config.js
Configure the import alias for components: › $lib/components
Configure the import alias for utils: › $lib/utils
```

## Options

```txt
Usage: shadcn-svelte init [options]

initialize your project and install dependencies

Options:
  -y, --yes        skip confirmation prompt. (default: false)
  -c, --cwd <cwd>  the working directory. (default: the current directory)
  -h, --help       display help for command
```

## add

Use the `add` command to add components and dependencies to your project.

```bash
npx shadcn-svelte@latest add [component]
```

You will be presented with a list of components to choose from:

```txt
Which components would you like to add? › Space to select. Return to submit.

◯  accordion
◯  alert
◯  alert-dialog
◯  aspect-ratio
◯  avatar
◯  badge
◯  button
◯  card
◯  checkbox
◯  collapsible
```

## Options

```txt
Usage: shadcn-svelte add [options] [components...]

add components to your project

Arguments:
  components         name of components

Options:
  --nodep            disable adding & installing dependencies (advanced) (default: false)
  -a, --all          Add all components to your project. (default: false)
  -y, --yes          Skip confirmation prompt. (default: false)
  -o, --overwrite    overwrite existing files. (default: false)
  --proxy            fetch components from registry using a proxy.
  -c, --cwd <cwd>    the working directory. (default: the current directory)
  -p, --path <path>  the path to add the component to.
  -h, --help         display help for command
```

## update

Use the `update` command to update components in your project. This will overwrite any modifications you've made to the components, so be sure to commit your changes before running this command.

We plan on improving this command in the future to improve the update experience.

```txt
Usage: shadcn-svelte update [options] [components...]

update components in your project

Arguments:
  components       name of components

Options:
  -c, --cwd <cwd>  the working directory. (default: the current directory)
  -h, --help       display help for command
```

## FAQ

<Accordion.Root multiple>

<Accordion.Item value="faq-1">
<Accordion.Trigger>

Why not packaged as a dependency?

</Accordion.Trigger>
<Accordion.Content>

The idea behind this is to give you ownership and control over the code, allowing you to decide how the components are built and styled.

Start with some sensible defaults, then customize the components to your needs.

One of the drawback of packaging the components in an npm package is that the style is coupled with the implementation. _The design of your components should be separate from their implementation._

</Accordion.Content>
</Accordion.Item>
<Accordion.Item value="faq-2">
<Accordion.Trigger>
Which frameworks are supported?
</Accordion.Trigger>
<Accordion.Content>

This port is built to be used with Svelte/SvelteKit.

</Accordion.Content>
</Accordion.Item>
<Accordion.Item value="faq-3">
<Accordion.Trigger>
Can I use this in my project?
</Accordion.Trigger>
<Accordion.Content>
Yes. Free to use for personal and commercial projects. No attribution required.

But let us know if you do use it. We'd love to see what you build with it.
</Accordion.Content>
</Accordion.Item>
</Accordion.Root>
