// ! WARN: THIS IS NOT SECURE BUT FOR DEVELOPMENT ITS OKAY
// We need this to test GitHub Auth, we could also make the vue server run on devsbunker.com only but you'd need to make the domain point to your LAN addr
// vue-cli-service serve --host devsbunker.com

module.exports = {
    devServer: {
        disableHostCheck: true,
    },
};
