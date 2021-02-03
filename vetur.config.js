// vetur.config.js
/** @type {import("vls").VeturConfig} */
module.exports = {
    settings: {
        "vetur.useWorkspaceDependencies": true,
        "vetur.experimental.templateInterpolationService": true
    },
    // **optional** default: `[{ root: "./" }]`
    // support monorepos
    projects: [{
        root: "./src/client",
        package: "./package.json",
        tsconfig: "./tsconfig.json",
        snippetFolder: "./.vscode/vetur/snippets",
    }]
}
