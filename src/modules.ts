export let expressionModule = BdApi.Webpack.getModule((m) => m.type?.toString?.().includes("onSelectGIF"))
export let buttonsModule = BdApi.Webpack.getModule((m) => m.type?.toString?.().includes("ChannelTextAreaButtons"))
export let pickerModule = BdApi.Webpack.getByKeys("useExpressionPickerStore")