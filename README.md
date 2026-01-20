# RN Common Kitchen Sink App

Kitchen Sink mobile app for the `@Lichens-Innovation/react-native-commun` module

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Yarn](https://img.shields.io/badge/Yarn-1.22+-2C8EBB.svg?style=flat-square&logo=yarn)](https://yarnpkg.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg?style=flat-square&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-339933.svg?style=flat-square&logo=node.js)](https://nodejs.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB.svg?style=flat-square&logo=react)](https://reactnative.dev/)
[![Expo SDK](https://img.shields.io/badge/Expo%20SDK-54-000020.svg?style=flat-square&logo=expo)](https://expo.dev/)

Table of Content

- [RN Common Kitchen Sink App](#rn-common-kitchen-sink-app)
  - [Prerequisites](#prerequisites)
  - [Installing \& Running Storybook](#installing--running-storybook)
  - [Available Scripts](#available-scripts)
  - [Adding a new component](#adding-a-new-component)
    - [Inside the `react-native-common` project](#inside-the-react-native-common-project)
    - [Inside the `react-native-common-demo` project](#inside-the-react-native-common-demo-project)
  - [Project Coding Guidelines](#project-coding-guidelines)
  - [Upgrade Expo SDK process](#upgrade-expo-sdk-process)
  - [License](#license)


## Prerequisites

- Node.js (v16 or higher)
- Yarn
- React Native development environment setup (see [React Native documentation](https://reactnative.dev/docs/environment-setup))

## Installing & Running Storybook

In terminal 1:
```bash
yarn install
yarn storybook:start
```

In terminal 2:
```bash
yarn storybook:ios # or yarn storybook:android
```

## Available Scripts

| Command                                    | Description                                                                      |
|--------------------------------------------|----------------------------------------------------------------------------------|
| `yarn storybook:start`                     | Start `Storybook` development server.                                            |
| `yarn storybook:ios`                       | Run `Storybook` on `iOS` device or simulator.                                    |
| `yarn storybook:android`                   | Run `Storybook` on `Android` device or emulator.                                 |
| `yarn storybook-generate`                  | Generate `Storybook` stories index.                                              |
| `yarn start`                               | Start the `Expo` development server with cache cleared.                          |
| `yarn start:tunnel`                        | Start the `Expo` development server with tunnel mode.                            |
| `yarn local:dev:activate`                  | Activate local development mode for `@lichens-innovation` packages.              |
| `yarn android`                             | Build & run the `Expo` project on an `Android` device or emulator.               |
| `yarn android:device`                      | Build & run the `Expo` project on a connected `Android` device.                  |
| `yarn android:device:release`              | Build & run the release variant on a connected `Android` device.                 |
| `yarn ios`                                 | Build & run the `Expo` project on an `iOS` device or simulator.                  |
| `yarn ios:device`                          | Build & run the `Expo` project on a connected `iOS` device.                      |
| `yarn ios:device:release`                  | Build & run the release configuration on a connected `iOS` device.               |
| `yarn lint`                                | Run linter to check for code style and formatting issues.                        |
| `yarn format`                              | Run linter to automatically fix code style and formatting issues.                |
| `yarn typecheck`                           | Run TypeScript type checking without emitting files.                             |
| `yarn sitemap`                             | Generate sitemap for the application routes.                                     |
| `yarn clean:prebuild`                      | Clean `Expo` prebuild files for all platforms.                                   |
| `yarn clean:prebuild:ios`                  | Clean `Expo` prebuild files for `iOS`.                                           |
| `yarn clean:prebuild:android`              | Clean `Expo` prebuild files for `Android`.                                       |
| `yarn clean:pods`                          | Clean `iOS` Pods and reinstall them.                                             |
| `yarn clean:node`                          | Remove `node_modules` and `yarn.lock` files.                                     |
| `yarn expo:doctor`                         | Run `Expo`'s doctor command to diagnose issues in the project.                   |
| `yarn expo:upgrade:check`                  | Check for available `Expo` dependency updates.                                   |
| `yarn expo:upgrade:latest`                 | Upgrade `Expo` SDK to the latest version.                                        |
| `yarn expo:install:fix`                    | Update `Expo` dependencies to the latest versions.                               |
| `yarn expo:build:ios`                      | Build `iOS` app and deploy it on `iOS` Simulator.                                |
| `yarn expo:build:android`                  | Build `Android` app and deploy it on `Android` Emulator.                         |
| `yarn eas:whoami`                          | Display the currently logged in `EAS` account.                                   |
| `yarn eas:build:ios:development`           | Build `iOS` development using `EAS`.                                             |
| `yarn eas:build:ios:development:simulator` | Build `iOS` development simulator using `EAS`.                                   |
| `yarn eas:build:android:development`       | Build `Android` development using `EAS`.                                         |
| `yarn eas:build:android:preview`           | Build `Android` preview using `EAS`.                                             |
| `yarn eas:run:ios`                         | Run the latest `EAS iOS` build.                                                  |
| `yarn eas:run:android`                     | Run the latest `EAS Android` build.                                              |
| `yarn generate:version`                    | Generate version information (see `src/constants.ts`).                           |
| `yarn postinstall`                         | Run `patch-package` and generate licenses file after dependencies are installed. |
| `yarn prepare`                             | Setup `Husky` git hooks.                                                         |

## Adding a new component

### Inside the `react-native-common` project

1. create the new component and export it by updating the barrel `index.ts` file(s)
2. run `yarn watch:for:rn-common-demo` to transpile and sync into `node_modules` folder of the demo project

### Inside the `react-native-common-demo` project

1. create the story for the component
2. run `yarn storybook:start` on one terminal
3. run `yarn storybook:ios` on another terminal
4. create a recording and link the animated gif inside `catalog.md` of `react-native-common`

## Project Coding Guidelines

Adhering to established coding guidelines is essential for developing efficient, maintainable, and scalable software. These guidelines promote consistency across codebases, making it easier for teams to collaborate and for new developers to understand existing code. By following standardized patterns, such as those outlined in the [Coding Guidelines](https://github.com/amwebexpert/chrome-extensions-collection/blob/master/packages/coding-guide-helper/public/markdowns/table-of-content.md), developers can reduce errors and enhance code readability.

* [Coding Guidelines](https://github.com/amwebexpert/chrome-extensions-collection/blob/master/packages/coding-guide-helper/public/markdowns/table-of-content.md)

## Upgrade Expo SDK process

* run `npx expo install expo@latest` to upgrade to the latest Expo SDK
* run `npx expo install --check` to list latest versions of all expo dependencies. This will automatically ask to upgrade to the expected dependencies (if any)
  * expected result: `Dependencies are up to date`
* check other non-Expo dependencies (you need ncu utility which can be installed globally `yarn global add npm-check-updates`)
  * `ncu -u`
  * then re-run again `npx expo install --check` and accept Expo specific version suggestions
* remove the node_modules and yarn.lock all together and re-install all dependencies
  * `yarn clean:node`
  * `yarn`
* run `npx expo-doctor` to see if any dependency is not expected as part of the current Expo SDK major version. This will also list the command to upgrade the unaligned dependencies
  * expected result: `15/15 checks passed. No issues detected!`
* clean and re-generate the prebuild folders for `iOS` and `Android` platforms
  * `npx expo prebuild --clean`
* Test the development build
  * run `npx expo run:ios` and test on the `iOS Simulator`
  * run `npx expo run:android` and test on the `Android simulator`

References:
* [How to upgrade from Expo SDK X to Y](https://www.youtube.com/watch?v=HBPyP4OxVgs)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
