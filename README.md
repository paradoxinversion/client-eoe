This project is the frontend implementation of Empire of Evil via the EOE Library.

## Setup

It is recommended that you create a directory for both `lib-eoe` and `client-eoe`.

## Installing EoE

Clone the Empire Of Evil Library and install locally.

```sh
yarn add <path>/empire-of-evil
```

If `lib-eoe` and `client-eoe` are in the same directory, the command will be

```sh
yarn add ../lib-eoe
```

## Starting the App for development

```sh
yarn dev
```

## Notes

- Some parcel build errors in development can be remedied by deleting the parcel cache.
- Storybook currently seems to interfere with Parcel's HMR.
