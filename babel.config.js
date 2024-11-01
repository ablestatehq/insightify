module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          "envName": "APP_ENV",
          "moduleName": "@env",
          "path": ".env",
        }],
      "react-native-reanimated/plugin",
      ["module-resolver",
      {
        "alias": {
          "@src": "./src",
          "@assets": "./assets",
          "@api": "./api",
          "@assets_": "./src/assets",
          "@components": "./src/components",
          "@constants": "./src/constants",
          "@helpers": "./src/helper",
          "@lib": "./src/lib",
          "@routes": "./src/routes",
          "@screens": "./src/routes",
          "@utils": "./src/utils",
          "@fonts": "./src/assets/fonts/fonts.ts",
          "@icons": "./src/assets/icons/index.tsx"
        },
      },]
    ]
  };
};