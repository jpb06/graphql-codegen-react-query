# graphql-codegen-react-query

[![Open in Visual Studio Code](https://img.shields.io/static/v1?logo=visualstudiocode&label=&message=Open%20in%20Visual%20Studio%20Code&labelColor=2c2c32&color=007acc&logoColor=007acc)](https://github.dev/jpb06/graphql-codegen-react-query)
![npm bundle size](https://img.shields.io/bundlephobia/min/graphql-codegen-react-query)
![Github workflow](https://img.shields.io/github/actions/workflow/status/jpb06/graphql-codegen-react-query/tests-scan.yml?branch=main&label=Tests&logo=github-actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jpb06_graphql-codegen-react-query&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jpb06_graphql-codegen-react-query)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_graphql-codegen-react-query&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=jpb06_graphql-codegen-react-query)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_graphql-codegen-react-query&metric=security_rating)](https://sonarcloud.io/dashboard?id=jpb06_graphql-codegen-react-query)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_graphql-codegen-react-query&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=jpb06_graphql-codegen-react-query)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=jpb06_graphql-codegen-react-query&metric=coverage)](https://sonarcloud.io/dashboard?id=jpb06_graphql-codegen-react-query)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=jpb06_graphql-codegen-react-query&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jpb06_graphql-codegen-react-query)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=jpb06_graphql-codegen-react-query&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jpb06_graphql-codegen-react-query)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jpb06_graphql-codegen-react-query&metric=code_smells)](https://sonarcloud.io/dashboard?id=jpb06_graphql-codegen-react-query)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=jpb06_graphql-codegen-react-query&metric=bugs)](https://sonarcloud.io/summary/new_code?id=jpb06_graphql-codegen-react-query)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jpb06_graphql-codegen-react-query&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jpb06_graphql-codegen-react-query)
![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/graphql-codegen-react-query?label=snyk%20vulnerabilities)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=jpb06_graphql-codegen-react-query&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=jpb06_graphql-codegen-react-query)
![Last commit](https://img.shields.io/github/last-commit/jpb06/graphql-codegen-react-query?logo=git)

Generating types and react-query hooks from a graphql schema.

<!-- readme-package-icons start -->

<p align="left"><a href="https://docs.github.com/en/actions" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/GithubActions-Dark.svg" /></a>&nbsp;<a href="https://www.typescriptlang.org/docs/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/TypeScript.svg" /></a>&nbsp;<a href="https://nodejs.org/en/docs/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/NodeJS-Dark.svg" /></a>&nbsp;<a href="https://pnpm.io/motivation" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Pnpm-Dark.svg" /></a>&nbsp;<a href="https://axios-http.com/fr/docs/intro" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Axios-Dark.svg" /></a>&nbsp;<a href="https://github.com/conventional-changelog" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/CommitLint.Dark.svg" /></a>&nbsp;<a href="https://eslint.org/docs/latest/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Eslint-Dark.svg" /></a>&nbsp;<a href="https://jestjs.io/docs/getting-started" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Jest.svg" /></a>&nbsp;<a href="https://prettier.io/docs/en/index.html" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Prettier-Dark.svg" /></a>&nbsp;<a href="https://reactjs.org/docs/getting-started.html" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/React-Dark.svg" /></a>&nbsp;<a href="https://tanstack.com/query/v4/docs/overview" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/ReactQuery-Dark.svg" /></a>&nbsp;<a href="https://swc.rs/docs/getting-started" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Swc-Dark.svg" /></a></p>

<!-- readme-package-icons end -->

## ⚡ Purpose

Graphql codegen is a great tool; zeus-graphql is a neat lib. But they don't exactly fit what I want 😿

- I want to pick what I want as result
- I want to get clean types from schema
- I want clean generated code
- I want imports that make sense

So here we go, I just figured I'd do something for giggles 😼.

## ⚡ What is generated exactly ?

![codegen step](./assets/gql-codegen.png)

See the [How does it work](./README.md#-so-how-does-it-work-) section for more details.

## ⚡ Get started

To install, use either pnpm, yarn or npm:

```bash
yarn add -D graphql-codegen-react-query
```

## ⚡ Usage

### 🔶 Defining a fetcher hook

First of, we need to define a hook that will have the following signature:

```typescript
function useFetcher<TData>(query: string) => (variables?: unknown) => Promise<TData>
```

Here is an implementation example relying on the `fetch` api:

```typescript
import { endpointUrl } from './fetch-config';

export const useFetchData = <TData>(
  query: string
): ((variables?: unknown) => Promise<TData>) => {
  return async (variables?: unknown) => {
    const result = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Additional headers ...
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = await result.json();

    if (json.errors) {
      const { message } = json.errors[0] || {};
      throw new Error(message || 'Error…');
    }

    return json.data;
  };
};
```

#### 🗯️ But why asking to define a custom fetcher?

You might need to inject config in the fetching logic, like setting an `Authorization` header for example. It's easier done if we externalize the fetching logic.

### 🔶 Using CLI to get data from a graphql schema url

Generating types from a graphql schema is easy enough using cli. Usage is as follows:

```text
generate-from-url -s [schemaUrl] -f [fetcherHookPath] -o [outputPath]

Options:
  -s             Graphql schema url                                   [required]
  -o             Generated code output path                           [required]
  -f             Fetcher hook path and name (<path>#<hookName>)       [required]

Examples:
  generate-from-url -s http://localhost:3333/graphql -o ./src/api -f ./useFetcher#useFetcher
```

With that in mind, we can add a script to our `package.json`:

```json
{
  [...],
  "scripts:" {
    "codegen": "generate-from-url -s http://localhost:3333/graphql -f ./../useFetchData#useFetchData -o ./src/api/specs",
    [...]
  }
}
```

In this example:

- we will extract information from a graphql schema exposed on `http://localhost:3333`.
- we will be using a hook named `useFetchData` exported from `./src/api/useFetchData.ts`.
- Generated code will be saved in `./src/api/specs`.

## ⚡ Features

### 🔶 Clean types

From a schema like this...

```graphql
enum GqlOrderedItemStatus {
  preparing
  readyToBeSent
  shippingInProgress
  shipped
}
type GqlOrderedItem {
  id: ID!
  quantity: Int!
  name: String!
  image: String
  price: Float!
  status: GqlOrderedItemStatus!
}
type GqlOrder {
  id: ID!
  idUser: ID!
  idCreditCard: ID!
  createdAt: DateTime!
  creditCardNumber: String!
  items: [GqlOrderedItem!]!
}
```

I expect to get this:

```typescript
export type GqlOrderedItemStatus = 'preparing' | 'readyToBeSent' | 'shippingInProgress' | 'shipped'

export interface GqlOrderedItem {
  id: string;
  quantity: number;
  name: string;
  image?: string;
  price: number;
  status: GqlOrderedItemStatus
}
export interface GqlOrder {
  id: string;
  idUser: string;
  idCreditCard: string;
  createdAt: Date;
  creditCardNumber: string;
  items: Array<GqlOrderedItem>;
}
```

### 🔶 Dynamic selection and result type inference

It would be great if I could use named query hooks (one react hook by graphql query) but still be able to select what I want in the result 🤔

For example, for a schema like this, I should have a named query hook `useCategoriesQuery` with type inference:

```graphql
type GqlProduct {
  id: ID!
  idCategory: ID!
  name: String!
  description: String!
  image: String!
  price: Float!
  stock: Int!
}

type GqlCategoryWithProducts {
  id: ID!
  name: String!
  products: [GqlProduct!]
}


type Query {
  categories: [GqlCategoryWithProducts!]!
}
```

![dynamic selection](./assets/dynamic-selection.gif)

### 🔶 Dynamic queries

It would be neat if I could get the results from several graphql queries by calling one single react hook 🤔

Let's use the `useGqlQuery` hook that does just that:

![dynamic selection](./assets/dynamic-query.gif)

### 🔶 Queries/Mutations variables type support

I would be nice if I had strong typings for arguments and results 🤔

![dynamic selection](./assets/mutation-args-result.gif)

### 🔶 Queries/Mutations options

It would be awesome if I could still easily tweak react query hooks 🤔

![dynamic selection](./assets/query-args-options.gif)

## ⚡ So how does it work ?
