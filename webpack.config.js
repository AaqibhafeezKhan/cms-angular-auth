const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;

module.exports = {
  output: {
    publicPath: "http://localhost:9003/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "cmsAngularAuth",
      filename: "remoteEntry.js",
      exposes: {
        "./AuthComponent": "./src/app/app.component.ts",
      },
    }),
  ],
};
