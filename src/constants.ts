export const expressionModule = BdApi.Webpack.getModule((m) => m.type?.toString?.().includes("onSelectGIF"))
export const buttonsModule = BdApi.Webpack.getModule((m) => m.type?.toString?.().includes("ChannelTextAreaButtons"))
export const pickerModule = BdApi.Webpack.getByKeys("useExpressionPickerStore")
// adapted from https://github.com/Zerthox/BetterDiscord-Plugins/blob/master/dist/bd/BetterFolders.plugin.js
export const formElements = BdApi.Webpack.getByKeys('Button', 'Switch', 'Select')
export const imgAdder = BdApi.Webpack.getModule(module => module.default && module.default.addFile).default;
export const chatKeyHandlers = BdApi.Webpack.getModule((exports) => exports.default &&
    exports.default?.toString?.().includes("hasOpenPlainTextCodeBlock"));

export const mimeTypes: Record<string, string> = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'webp': 'image/webp',
    'avif': 'image/avif'
}