// @ts-ignore
import imagePlusOutline from '../assets/image-plus-outline.svg'
// @ts-ignore
import styles from './styles.css'
import imageTab from './ui/imageTab'
import { buttonsModule, expressionModule, pickerModule } from './modules.js';
import { onStart, onStop, setSettingsPanel } from 'lazypluginlib'
import SettingsPanel from './ui/SettingsPanel.js';

setSettingsPanel(BdApi.React.createElement(SettingsPanel))

onStart(() => {
    BdApi.DOM.addStyle("imgFolderStyles", styles)

    BdApi.Patcher.after("ImageFolder", buttonsModule, "type", (_, __, returnVal) => {
        if(!returnVal) return returnVal
        let gifIndex = returnVal.props.children.findIndex((child: any) => child.key == 'gif')
        let type = returnVal.props.children[gifIndex].props.type

        let div = BdApi.React.createElement('div', {
            className: 'imgFolderBtn',
            onClick: () => {
                // for some reason the expression picker will always close itself before this runs, but that's above my paygrade
                pickerModule.toggleExpressionPicker('image', type)
            },
            dangerouslySetInnerHTML: { __html: imagePlusOutline }
        })

        returnVal.props.children.splice(gifIndex, 0, div)
        
        return returnVal
    })

    let unpatch: () => void;

    BdApi.Patcher.after("ImageFolder", expressionModule, "type", (_, __, returnVal) => {
        if (unpatch) unpatch()
        unpatch = BdApi.Patcher.after("ImageFolder", returnVal.props.children.props, "children", (_, __, returnVal2) => {
            let sections = returnVal2?.props?.children?.props?.children?.[1]?.props?.children
            let categories = sections?.[0]?.props?.children?.props?.children // react moment
            if (!categories) return

            let activeView = pickerModule.useExpressionPickerStore.getState().activeView

            // take the react element that categories[0] is based on and make a new one with the props id: 'image-folder-tab'
            let newCategory = BdApi.React.createElement(categories[0].type, {
                id: 'image-folder-tab',
                "aria-controls": "image-folder-tab-panel",
                "aria-selected": activeView === 'image',
                isActive: activeView === 'image',
                viewType: "image",
                children: 'Images'
            })
            
            categories.splice(0, 0, newCategory)

            if(activeView === 'image') {
                // display our content
                const el = BdApi.React.createElement(imageTab, {})
                sections.push(el)
            }

            return returnVal2
        })
        return returnVal
    })
})

onStop(() => {
    BdApi.Patcher.unpatchAll("ImageFolder")
    BdApi.DOM.removeStyle("imgFolderStyles")
})