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

<p align="left"><a href="https://docs.github.com/en/actions" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/GithubActions-Dark.svg" /></a>&nbsp;<a href="https://www.typescriptlang.org/docs/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/TypeScript.svg" /></a>&nbsp;<a href="https://nodejs.org/en/docs/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/NodeJS-Dark.svg" /></a>&nbsp;<a href="https://pnpm.io/motivation" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Pnpm-Dark.svg" /></a>&nbsp;<a href="https://axios-http.com/fr/docs/intro" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Axios-Dark.svg" /></a>&nbsp;<a href="https://github.com/conventional-changelog" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/CommitLint.Dark.svg" /></a>&nbsp;<a href="https://github.com/motdotla/dotenv#readme" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Dotenv-Dark.svg" /></a>&nbsp;<a href="https://eslint.org/docs/latest/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Eslint-Dark.svg" /></a>&nbsp;<a href="https://jestjs.io/docs/getting-started" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Jest.svg" /></a>&nbsp;<a href="https://prettier.io/docs/en/index.html" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Prettier-Dark.svg" /></a>&nbsp;<a href="https://reactjs.org/docs/getting-started.html" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/React-Dark.svg" /></a>&nbsp;<a href="https://tanstack.com/query/v4/docs/overview" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/ReactQuery-Dark.svg" /></a>&nbsp;<a href="https://swc.rs/docs/getting-started" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Swc-Dark.svg" /></a></p>

<!-- readme-package-icons end -->

## ⚡ Purpose

Graphql codegen is a great tool; zeus-graphql is a neat lib. But they don't exactly fit what I want 😿

> ### 🤔 I want to get clean typescript artifacts from my graphql schema
>
>### 🤔 I want type enforcing for args, params and results while using `useQuery` and `useMutation` hooks
>
>### 🤔 I want to easily import what I need from generated code
>
>### 🤔 When using a query, I want to pick what I want as result when I only need a subset of the query result
>
>### 🤔 But I also want to be able to easily pick everything if that's what I need
>
>### 🤔 I want to define which queries should be translated into infinite queries

So here we go, I just figured I'd do something for giggles 🤷.

## ⚡ What is generated exactly ?

![codegen step](./assets/gql-codegen.png)

## ⚡ Get started

### 🔶 Install

To install, use either pnpm, yarn or npm:

```bash
yarn add -D graphql-codegen-react-query
```

### 🔶 Setup

Let's setup our codegen tooling by running the `codegen-init` command:

```bash
yarn codegen-init
```

This command takes three optional parameters:

| Parameter                          | Description                               | Default value                             |
| ------------------------------------ | ---------------------------------------- | ----------------------------------- |
| c                  | Where to write the codegen config file              | . (current folder) |
| o            | Where generated code should be written                 | ./api    |
| u | Graphql api url. If it doesn't start with `http`, the variable will be treated as an environment variable name                 | <http://localhost:3333/graphql>    |

So if I need to use custom params, I'd do:

```bash
yarn gqlCodegen-init -c ./libs/graphql/codegen/src -o libs/graphql/artifacts/src/api -u NEXT_PUBLIC_GQL_API_URL
```

> 🗯️ This command generates two files:
>
> - The `react-query.codegen.yml` config file.
> - The fetcher hook. You might need to inject config in the fetching logic, like setting an `Authorization` header for example; that is why the fetching logic is externalized in this hook.

The config file typically looks like this:

```yaml
# Where generate code should be written
outputPath: 'libs/graphql/artifacts/src/api/codegen'
# The environment variable name containing the url to the graphql schema (or directly said url)
schemaUrl: NEXT_PUBLIC_GQL_API_URL
# Fetcher hook config
fetcher:
  # Path to the fetcher, relative to the generated queries/mutations
  path: './../../useFetchData'
  # fetcher hook name (expecting a named export)
  functionName: 'useFetchData'
# Queries that should be generated as infinite queries with react-query
infiniteQueries:
  - useProductsByPage

```

### 🔶 Codegen

> 🚨 Make sure introspection is enabled on the backend you target

Generating types from a graphql schema is easy enough using cli. Usage is as follows:

```text
gqlCodegen -c [configFilePath]

Options:
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
  -c             Codegen config file path
                               [required] [default: "./react-query.codegen.yml"]

Examples:
  gqlCodegen -c ./libs/graphql/react-query.codegen.yml
```

With that in mind, we can add a script to our `package.json`:

```json
{
  [...],
  "scripts:" {
    "codegen": "gqlCodegen -c ./libs/graphql/react-query.codegen.yml",
    [...]
  }
}
```

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

> It would be great if I could use named query hooks (one react hook by graphql query) but still be able to select what I want in the result 🤔

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

If i want the entire query result, I can use `useCategoriesQuery` instead of `useCategoriesPartialQuery`:

![dynamic selection](./assets/full-query.gif)

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
