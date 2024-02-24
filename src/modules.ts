export let expressionModule = BdApi.Webpack.getModule((m) => m.type?.toString?.().includes("onSelectGIF"))
export let buttonsModule = BdApi.Webpack.getModule((m) => m.type?.toString?.().includes("ChannelTextAreaButtons"))
export let pickerModule = BdApi.Webpack.getByKeys("useExpressionPickerStore")
// adapted from https://github.com/Zerthox/BetterDiscord-Plugins/blob/master/dist/bd/BetterFolders.plugin.js
export let formElements = BdApi.Webpack.getByKeys('Button', 'Switch', 'Select')
export let cloudUploader = BdApi.Webpack.getModule(module => module.CloudUpload)
export let uploader = BdApi.Webpack.getModule(module => module.default && module.default.uploadFiles).default