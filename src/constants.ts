export const expressionModule = BdApi.Webpack.getModule((m) => m.type?.toString?.().includes("onSelectGIF"))
export const buttonsModule = BdApi.Webpack.getModule((m) => m.type?.toString?.().includes(".isSubmitButtonEnabled", ".getActiveCommand"))
const pickerModule = BdApi.Webpack.getModule((module) => Object.values(module).some(v => {
    if(typeof v !== "function") return false;
    return v.toString().includes("lastActiveView")
}))
export const toggleExpressionPicker = Object.values<any>(pickerModule).find(v => v.toString().includes("activeView==="))
export const closeExpressionPicker = Object.values<any>(pickerModule).find(v => v.toString().includes("activeView:null"))
export const pickerStore = Object.values<any>(pickerModule).find(v => v.toString().includes(".useReducer"))
// adapted from https://github.com/Zerthox/BetterDiscord-Plugins/blob/master/dist/bd/BetterFolders.plugin.js
export const formElements = BdApi.Webpack.getByKeys('Button', 'Switch', 'Select')
export const imgAdder: any = Object.values(BdApi.Webpack.getModule(module => Object.values<any>(module)?.[0]?.addFile))[0];
export const chatKeyHandlers = BdApi.Webpack.getModule((exports) => Object.values<any>(exports)?.[0]?.
    toString().includes("selectNextCommandOption"))

export const mimeTypes: Record<string, string> = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'webp': 'image/webp',
    'avif': 'image/avif',
    'gif': 'image/gif',
}