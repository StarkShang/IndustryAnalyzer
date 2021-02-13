const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath: "./",

    devServer: {
        // can be overwritten by process.env.HOST
        host: "0.0.0.0",
        port: 8081
    },

    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("src", resolve("src"))
            .set("common", resolve("src/common"))
            .set("components", resolve("src/components"));
    },

    configureWebpack: {
        devtool: "source-map"
    },

    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "scss",
            patterns: [
                resolve("src/assets/sass/variables.scss"),
            ]
        },
        apollo: {
            lintGQL: false
        }
    }
};
