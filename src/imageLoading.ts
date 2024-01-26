import type { IImg, IImgFolder } from './types.js';

const fs = require('fs');
const { join, basename } = require('path');

const mimeTypes: Record<string, string> = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'webp': 'image/webp',
}

const imgFolderPath = join(__dirname, 'imageFolder')

export async function pathToSrc(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(join(imgFolderPath, path), 'latin1', (err, contents) => {
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

export async function loadFolder(path: string): Promise<IImgFolder> {
    path = path.replace(/\\/g, '/');

    if(!fs.existsSync(join(imgFolderPath))) {
        fs.mkdirSync(join(imgFolderPath));
    }

    return new Promise((resolve, reject) => {
        const folderPath = join(imgFolderPath, path);

        if(!fs.existsSync(folderPath)) {
            return reject("Folder does not exist");
        }

        fs.readdir(folderPath, {}, (err, files) => {
            if (err) {
                reject(err);
                return;
            } 

            let images: IImg[] = [];
            let folders: string[] = [];
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
                const filePath = join(folderPath, file);
                fs.stat(filePath, {}, async (err, stat) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (stat.isDirectory()) {
                        folders.push(file);
                    } else {
                        images.push({
                            name: file,
                            src: await pathToSrc(join(path, file))
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

export async function uploadImage(folderPath: string) {
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
    })

    if (!result) return;

    // @ts-ignore
    for(let file of result.filePaths) {
        let fileName = basename(file);
        let newPath = join(imgFolderPath, folderPath, fileName);
        
        // read the file, and write it to the new path
        fs.readFile(file, {}, (err, contents) => {
            if (err) {
                BdApi.UI.showToast(`Error reading file ${fileName}`, {type: "error"});
                return;
            }
    
            fs.writeFile(newPath, contents, {}, (err) => {
                if (err) {
                    BdApi.UI.showToast(`Error writing file ${fileName}`, {type: "error"});
                    return;
                }
                BdApi.UI.showToast(`Image uploaded ${fileName}`, {type: "success"});
            });
        });
    }
}