import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://192.168.1.197/graphql",
  documents: [
    "./src/**/*.vue",
    "./src/stores/auth.graphql.ts"
  ],
  //ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    // "./src/gql/": {
    //   preset: "client",
    //   config: {
    //     useTypeImports: true,
    //   },
    // },
    "./src/graphql/index.ts": {
      plugins: [
        "@graphql-codegen/typescript",
        "@graphql-codegen/typescript-operations",
        "@graphql-codegen/typescript-vue-apollo",
      ],
      config: {
        withCompositionFunctions: true,
        vueCompositionApiImportFrom: "vue",
        addDocBlocks: true,
        skipTypename: false,
        namingConvention: {
          typeNames: "change-case-all#pascalCase",
          enumValues: "change-case-all#upperCase",
          transformUnderscore: true,
        },
        scalars: {
          DateTime: "Date",
          JSON: "{ [key: string]: any }",
        },
      },
    },
  },
};

console.log(config.documents);

export default config;
