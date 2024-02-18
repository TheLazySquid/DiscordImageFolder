/**
 * @name ImageFolder
 * @version 0.1.1
 * @description A BetterDiscord plugin that allows you to save and send images from a folder for easy access
 * @author TheLazySquid
 * @authorId 619261917352951815
 * @website https://github.com/TheLazySquid/ImageFolder
 * @source https://github.com/TheLazySquid/ImageFolder/blob/master/build/ImageFolder.plugin.js
 */
module.exports = class {
    constructor() {
        const createCallbackHandler = (callbackName) => {
            const fullName = callbackName + "Callbacks";
            this[fullName] = [];
            return (callback, once, id) => {
                let object = { callback }

                const delCallback = () => {
                    this[fullName].splice(this[fullName].indexOf(object), 1);
                }
                
                // if once is true delete it after use
                if (once === true) {
                    object.callback = () => {
                        callback();
                        delCallback();
                    }
                }

                if(id) {
                    object.id = id

                    for(let i = 0; i < this[fullName].length; i++) {
                        if(this[fullName][i].id === id) {
                            this[fullName][i] = object;
                            return delCallback;
                        }
                    }
                }

                this[fullName].push(object);
                return delCallback;
            }
        }

        const onStart = createCallbackHandler("start");
        const onStop = createCallbackHandler("stop");

'use strict';

var imagePlusOutline = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M13 19C13 19.7 13.13 20.37 13.35 21H5C3.9 21 3 20.11 3 19V5C3 3.9 3.9 3 5 3H19C20.11 3 21 3.9 21 5V13.35C20.37 13.13 19.7 13 19 13V5H5V19H13M13.96 12.29L11.21 15.83L9.25 13.47L6.5 17H13.35C13.75 15.88 14.47 14.91 15.4 14.21L13.96 12.29M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z\" /></svg>";

var styles = ".imgFolderBtn {\r\n    aspect-ratio: 1 / 1;\r\n    padding: 7px;\r\n    cursor: pointer;\r\n}\r\n\r\n.imgFolderBtn path {\r\n    fill: var(--interactive-normal);\r\n}\r\n\r\n.imgFolderBtn:hover path {\r\n    fill: var(--interactive-hover);\r\n}\r\n\r\n.imageTab {\r\n    width: 100%;\r\n    height: 100%;\r\n    display: flex;\r\n    flex-direction: column;\r\n}\r\n\r\n.imageTab .icon {\r\n    cursor: pointer;\r\n    width: 35px;\r\n    height: 35px;\r\n}\r\n\r\n.imageTab .icon path {\r\n    fill: hsl(190, 80%, 42%);\r\n}\r\n\r\n.imageTab {\r\n    color: var(--text-normal);\r\n}\r\n\r\n.pathContainer {\r\n    padding-left: 10px;\r\n    padding-right: 15px;\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n\r\n.pathContainer .path {\r\n    flex-grow: 1;\r\n    padding-left: 5px;\r\n    padding-right: 5px;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n    max-width: 360px;\r\n    direction: rtl;\r\n    text-align: left;\r\n}\r\n\r\n.imageTab .content {\r\n    flex-grow: 1;\r\n    overflow-y: auto;\r\n    /* hardcoding this because I'm lazy */\r\n    height: 366px;\r\n}\r\n\r\n.imageTab .images {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    padding: 7px;\r\n    gap: 7px;\r\n}\r\n\r\n.imageTab img {\r\n    width: 100%;\r\n    height: 100%;\r\n    object-fit: cover;\r\n    cursor: pointer;\r\n}\r\n\r\n.imageTab .folderReturn {\r\n    float: right;\r\n}\r\n\r\n.imageTab .folder {\r\n    display: flex;\r\n    border-radius: 12px;\r\n    background-color: var(--primary-500);\r\n    padding: 6px;\r\n    margin: 7px;\r\n    cursor: pointer;\r\n    transition: background-color 0.2s ease-in-out;\r\n    align-items: center;\r\n    gap: 5px;\r\n}\r\n\r\n.imageTab .folder:hover {\r\n    background-color: var(--primary-430);\r\n}\r\n\r\n.folder .folderName {\r\n    flex-grow: 1;\r\n}\r\n\r\n.folderNameWrap {\r\n    width: 100%;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n}\r\n\r\n.createFolderInput {\r\n    width: 90%;\r\n    border-radius: 12px;\r\n    padding: 8px;\r\n}\r\n\r\n.imageTab .image {\r\n    position: relative;\r\n}\r\n\r\n.imageTab .image .icon {\r\n    position: absolute;\r\n    top: 5px;\r\n    right: 5px;\r\n    cursor: pointer;\r\n    opacity: 0;\r\n    transition: opacity 0.2s ease-in-out;\r\n}\r\n\r\n.imageTab .image:hover .icon {\r\n    opacity: 1;\r\n}";

var FolderPlusOutline = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M13 19C13 19.34 13.04 19.67 13.09 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.89 4 4 4H10L12 6H20C21.1 6 22 6.89 22 8V13.81C21.39 13.46 20.72 13.22 20 13.09V8H4V18H13.09C13.04 18.33 13 18.66 13 19M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z\" /></svg>";

var TrashCanOutline = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z\" /></svg>";

var FolderOpenOutline = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M6.1,10L4,18V8H21A2,2 0 0,0 19,6H12L10,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H19C19.9,20 20.7,19.4 20.9,18.5L23.2,10H6.1M19,18H6L7.6,12H20.6L19,18Z\" /></svg>";

var FolderArrowLeftOuline = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M22 8V13.81C21.39 13.46 20.72 13.22 20 13.09V8H4V18H13.09C13.04 18.33 13 18.66 13 19C13 19.34 13.04 19.67 13.09 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.89 4 4 4H10L12 6H20C21.1 6 22 6.89 22 8M18 16L15 19L18 22V20H22V18H18V16Z\" /></svg>";

var Pencil = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z\" /></svg>";

const fs$1 = require('fs');
const { join: join$1, basename } = require('path');
const mimeTypes = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'webp': 'image/webp',
};
const imgFolderPath = join$1(__dirname, 'imageFolder');
async function pathToSrc(path) {
    return new Promise((resolve, reject) => {
        fs$1.readFile(join$1(imgFolderPath, path), 'latin1', (err, contents) => {
            if (err) {
                reject(err);
                return;
            }
            let ext = basename(path).split('.')[1];
            const mime = mimeTypes[ext];
            resolve(`data:${mime};base64,${btoa(contents)}`);
        });
    });
}
async function loadFolder(path) {
    path = path.replace(/\\/g, '/');
    if (!fs$1.existsSync(join$1(imgFolderPath))) {
        fs$1.mkdirSync(join$1(imgFolderPath));
    }
    return new Promise((resolve, reject) => {
        const folderPath = join$1(imgFolderPath, path);
        if (!fs$1.existsSync(folderPath)) {
            return reject("Folder does not exist");
        }
        fs$1.readdir(folderPath, {}, (err, files) => {
            if (err) {
                reject(err);
                return;
            }
            let images = [];
            let folders = [];
            let pending = files.length;
            if (!pending) {
                resolve({
                    path: path,
                    folders: folders,
                    images: images
                });
            }
            // read all the files
            for (const file of files) {
                const filePath = join$1(folderPath, file);
                fs$1.stat(filePath, {}, async (err, stat) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (stat.isDirectory()) {
                        folders.push(file);
                    }
                    else {
                        images.push({
                            name: file,
                            src: await pathToSrc(join$1(path, file))
                        });
                    }
                    if (!--pending) {
                        resolve({
                            path: path,
                            folders: folders,
                            images: images
                        });
                    }
                });
            }
        });
    });
}
async function uploadImage(folderPath) {
    let result = await BdApi.UI.openDialog({
        mode: "open",
        filters: [
            {
                name: "Images",
                extensions: ["png", "jpg", "jpeg", "webp"]
            }
        ],
        title: "Upload an image",
        message: "Select an image to upload",
        multiSelections: true
    });
    if (!result)
        return;
    // @ts-ignore
    for (let file of result.filePaths) {
        let fileName = basename(file);
        let newPath = join$1(imgFolderPath, folderPath, fileName);
        // read the file, and write it to the new path
        fs$1.readFile(file, {}, (err, contents) => {
            if (err) {
                BdApi.UI.showToast(`Error reading file ${fileName}`, { type: "error" });
                return;
            }
            fs$1.writeFile(newPath, contents, {}, (err) => {
                if (err) {
                    BdApi.UI.showToast(`Error writing file ${fileName}`, { type: "error" });
                    return;
                }
                BdApi.UI.showToast(`Image uploaded ${fileName}`, { type: "success" });
            });
        });
    }
}

let expressionModule = BdApi.Webpack.getModule((m) => m.type?.toString?.().includes("onSelectGIF"));
let buttonsModule = BdApi.Webpack.getModule((m) => m.type?.toString?.().includes("ChannelTextAreaButtons"));
let pickerModule = BdApi.Webpack.getByKeys("useExpressionPickerStore");

async function sendImage(image) {
    const img = new Image();
    img.src = image.src;
    await img.decode();
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const cloudUploader = BdApi.Webpack.getModule(module => module.CloudUpload);
    const uploader = BdApi.Webpack.getModule(module => module.default && module.default.uploadFiles).default;
    const blob = await new Promise(resolve => canvas.toBlob((blob) => resolve(blob)));
    const file = new File([blob], image.name, { type: 'image/png' });
    const channelId = location.href.split('/').pop();
    if (!channelId)
        return;
    pickerModule.closeExpressionPicker();
    let fileUp = new cloudUploader.CloudUpload({ file: file, isClip: false, isThumbnail: false, platform: 1 }, channelId, false, 0);
    let uploadOptions = {
        channelId: channelId,
        uploads: [fileUp],
        draftType: 0,
        options: { stickerIds: [] },
        parsedMessage: { channelId: channelId, content: "", tts: false, invalidEmojis: [] }
    };
    await uploader.uploadFiles(uploadOptions);
}

// @ts-ignore
const React = BdApi.React;
const fs = require('fs');
const { join } = require('path');
function ImageTab() {
    const [folderPath, setFolderPath] = React.useState('/');
    const [selectedFolder, setSelectedFolder] = React.useState({
        path: '/',
        folders: [],
        images: []
    });
    function updateFolder() {
        loadFolder(folderPath).then((folder) => {
            setSelectedFolder(folder);
        });
    }
    React.useEffect(updateFolder, [folderPath]);
    function intoFolder(folder) {
        setFolderPath(folderPath + folder + '/');
    }
    function backFolder() {
        const path = folderPath.split('/');
        path.pop();
        path.pop();
        setFolderPath(path.join('/') + '/');
    }
    function deleteFolder(e, folder) {
        e.stopPropagation();
        BdApi.UI.showConfirmationModal('Delete Folder', `Are you sure you want to delete ${folder}?`, {
            danger: true,
            confirmText: 'Delete',
            onConfirm: () => {
                fs.rmdir(join(__dirname, 'imageFolder', folderPath, folder), { recursive: true }, (err) => {
                    if (err) {
                        BdApi.UI.showToast('Failed to delete folder', { type: 'error' });
                        return;
                    }
                    BdApi.UI.showToast('Successfully deleted folder', { type: 'success' });
                    // Reload folder
                    updateFolder();
                });
            }
        });
    }
    function createFolder() {
        let folderName = '';
        BdApi.UI.showConfirmationModal('Create Folder', (React.createElement("div", { className: 'folderNameWrap' },
            React.createElement("input", { className: 'createFolderInput', onChange: (e) => folderName = e.target.value, spellCheck: false, placeholder: 'Folder Name' }))), {
            confirmText: 'Create',
            onConfirm: () => {
                fs.mkdir(join(__dirname, 'imageFolder', folderPath, folderName), {}, (err) => {
                    if (err) {
                        BdApi.UI.showToast('Failed to create folder', { type: 'error' });
                        return;
                    }
                    BdApi.UI.showToast('Successfully created folder', { type: 'success' });
                    // Reload folder
                    updateFolder();
                });
            }
        });
    }
    function renameFolder(e, folder) {
        e.stopPropagation();
        let folderName = '';
        BdApi.UI.showConfirmationModal(`Rename ${folder}`, (React.createElement("div", { className: 'folderNameWrap' },
            React.createElement("input", { className: 'createFolderInput', onChange: (e) => folderName = e.target.value, spellCheck: false, placeholder: 'Folder Name' }))), {
            confirmText: 'Rename',
            onConfirm: () => {
                fs.rename(join(__dirname, 'imageFolder', folderPath, folder), join(__dirname, 'imageFolder', folderPath, folderName), {}, (err) => {
                    if (err) {
                        BdApi.UI.showToast('Failed to rename folder', { type: 'error' });
                        return;
                    }
                    BdApi.UI.showToast('Successfully renamed folder', { type: 'success' });
                    // Reload folder
                    updateFolder();
                });
            }
        });
    }
    function createImage() {
        uploadImage(folderPath)
            .then(updateFolder);
    }
    function deleteImage(e, image) {
        e.stopPropagation();
        BdApi.UI.showConfirmationModal('Delete Image', `Are you sure you want to delete ${image.name}?`, {
            danger: true,
            confirmText: 'Delete',
            onConfirm: () => {
                fs.unlinkSync(join(__dirname, 'imageFolder', folderPath, image.name));
                BdApi.UI.showToast('Successfully deleted image', { type: 'success' });
                // Reload folder
                updateFolder();
            }
        });
    }
    return (React.createElement("div", { className: "imageTab" },
        React.createElement("div", { className: 'pathContainer' },
            React.createElement("div", { className: "icon folderReturn", onClick: backFolder, dangerouslySetInnerHTML: { __html: FolderArrowLeftOuline } }),
            React.createElement("div", { className: 'path' }, selectedFolder.path.split('/').reverse().join('/')),
            React.createElement("div", { className: "icon", onClick: createFolder, dangerouslySetInnerHTML: { __html: FolderPlusOutline } }),
            React.createElement("div", { className: "icon", onClick: createImage, dangerouslySetInnerHTML: { __html: imagePlusOutline } })),
        React.createElement("div", { className: "content" },
            selectedFolder.folders.map((folder) => {
                return (React.createElement("div", { className: "folder", key: folder, onClick: () => intoFolder(folder) },
                    React.createElement("div", { className: "icon", dangerouslySetInnerHTML: { __html: FolderOpenOutline } }),
                    React.createElement("div", { className: "folderName" }, folder),
                    React.createElement("div", { className: "controls" },
                        React.createElement("div", { className: "icon", onClick: (e) => renameFolder(e, folder), dangerouslySetInnerHTML: { __html: Pencil } })),
                    React.createElement("div", { className: "controls" },
                        React.createElement("div", { className: "icon", onClick: (e) => deleteFolder(e, folder), dangerouslySetInnerHTML: { __html: TrashCanOutline } }))));
            }),
            React.createElement("div", { className: "images" }, selectedFolder.images.map((image) => {
                return (React.createElement("div", { className: 'image' },
                    React.createElement("div", { className: "icon", onClick: (e) => deleteImage(e, image), dangerouslySetInnerHTML: { __html: TrashCanOutline } }),
                    React.createElement("img", { src: image.src, onClick: () => sendImage(image) })));
            })))));
}
var imageTab = React.memo(ImageTab);

// @ts-ignore

onStart(() => {
    BdApi.DOM.addStyle("imgFolderStyles", styles);
    BdApi.Patcher.after("ImageFolder", buttonsModule, "type", (_, __, returnVal) => {
        let gifIndex = returnVal.props.children.findIndex((child) => child.key == 'gif');
        let type = returnVal.props.children[gifIndex].props.type;
        let div = BdApi.React.createElement('div', {
            className: 'imgFolderBtn',
            onClick: () => {
                // for some reason the expression picker will always close itself before this runs, but that's above my paygrade
                pickerModule.toggleExpressionPicker('image', type);
            },
            dangerouslySetInnerHTML: { __html: imagePlusOutline }
        });
        returnVal.props.children.splice(gifIndex, 0, div);
        return returnVal;
    });
    let unpatch;
    BdApi.Patcher.after("ImageFolder", expressionModule, "type", (_, __, returnVal) => {
        if (unpatch)
            unpatch();
        unpatch = BdApi.Patcher.after("ImageFolder", returnVal.props.children.props, "children", (_, __, returnVal2) => {
            let sections = returnVal2?.props?.children?.props?.children?.[1]?.props?.children;
            let categories = sections?.[0]?.props?.children?.props?.children; // react moment
            if (!categories)
                return;
            let activeView = pickerModule.useExpressionPickerStore.getState().activeView;
            // take the react element that categories[0] is based on and make a new one with the props id: 'image-folder-tab'
            let newCategory = BdApi.React.createElement(categories[0].type, {
                id: 'image-folder-tab',
                "aria-controls": "image-folder-tab-panel",
                "aria-selected": activeView === 'image',
                isActive: activeView === 'image',
                viewType: "image",
                children: 'Images'
            });
            categories.splice(0, 0, newCategory);
            if (activeView === 'image') {
                // display our content
                const el = BdApi.React.createElement(imageTab, {});
                sections.push(el);
            }
            return returnVal2;
        });
        return returnVal;
    });
});
onStop(() => {
    BdApi.Patcher.unpatchAll("ImageFolder");
    BdApi.DOM.removeStyle("imgFolderStyles");
});
    }

    start() {
        for(let callback of this.startCallbacks) {
            callback.callback();
        }
    }
    stop() {
        for(let callback of this.stopCallbacks) {
            callback.callback();
        }
    }
}
