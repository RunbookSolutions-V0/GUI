# Runbook Solutions GUI

This repository contains the GUI for RunBook.Solutions.

## Roadmap

- [ ] Features
    - [ ] Notifications
        - [ ] https://tailwind.primevue.org/toast/
    - [ ] GraphQL
        - [ ] Error Processing
    - [ ] Widget Grid
        - [ ] Installation
        - [ ] Widget Registation

- [ ] Style
    - [ ] Custom Autocomplete
        - [ ] Fix Styles
    - [ ] Theme
        - [ ] Improve colors to match branding
        - [ ] Dark/Light Mode
    - [ ] Main content Background

- [ ] Layout
    - [ ] Team Selection
        - [ ] AuthStore
        - [ ] Component

- [ ] Team
    - [ ] Selection
    - [ ] Create
    - [ ] Update

- [ ] Invitations
    - [ ] List
        - [ ] Sent Invitiations
        - [ ] Recieved Invitations
        - [ ] Display
            - [ ] Grid
            - [ ] Items
    - [ ] Recieve
        - [ ] Accept
        - [ ] Deny
    - [ ] Create

- [ ] Agent
    - [ ] List
        - [ ] Display
            - [ ] Grid
            - [ ] Items
    - [ ] Create
    - [ ] Join
    - [ ] View

- [ ] Agents
    - [ ] Plugin
        - [ ] List
            - [ ] Team Only
            - [ ] Public
        - [ ] View
        - [ ] Edit
        - [ ] Create
    - [ ] Task
        - [ ] List
        - [ ] View
        - [ ] Create
    - [ ] Response
        - [ ] List
        - [ ] View
    - [ ] Plugins
        - [ ] Command
            - [ ] List
            - [ ] View
        - [ ] Argument
            - [ ] List
            - [ ] View
    


- [ ] Core
    - [ ] Location
        - [ ] Create
        - [ ] List
        - [ ] Single
        - [ ] Update
        - [ ] Widgets
            - [ ] Attach Location
            - [ ] Location Tree
    - [ ] Network
        - [ ] Create
        - [ ] List
        - [ ] Single
        - [ ] Update
        - [ ] Widgets
            - [ ] Network Tree

    - [ ] Networks
        - [ ] Address
            - [ ] List
            - [ ] Single
            - [ ] Widgets
                - [ ]
    

    - [ ] Device
        - [ ] Create
        - [ ] List
        - [ ] Single
        - [ ] Update
        - [ ] Widgets
            - [ ] 

    - [ ] Contact
        - [ ] Create
        - [ ] List
        - [ ] Single
        - [ ] Update
        - [ ] Widgets
            - [ ] 

-----------------------------------------------------------------------------------------

# Vite Default Readme:

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
