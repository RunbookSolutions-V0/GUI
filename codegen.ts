import type { CodegenConfig } from "@graphql-codegen/cli";
import * as path from "path";
import * as glob from "glob";

function getGraphqlDocumentsPaths(baseDir: string): string[] {
  const pattern = path.join(baseDir, "**/*.graphql.ts");
  const result = glob.sync(pattern);
  return result;
}

const config: CodegenConfig = {
  schema: "http://192.168.1.197/graphql",
  documents: getGraphqlDocumentsPaths("./src/"),
  //ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    // "./src/gql/": {
    //   preset: "client",
    //   config: {
    //     useTypeImports: true,
    //   },
    // },
    "./src/graphql/apollo.generated.ts": {
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
