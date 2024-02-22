// @ts-ignore
import ImagePlusOutline from '../assets/image-plus-outline.svg';
// @ts-ignore
import FolderPlusOutline from '../assets/folder-plus-outline.svg';
// @ts-ignore
import TrashCanOutline from '../assets/trash-can-outline.svg';
// @ts-ignore
import FolderOpenOutline from '../assets/folder-open-outline.svg';
// @ts-ignore
import FolderArrowLeftOuline from '../assets/folder-arrow-left-outline.svg';
// @ts-ignore
import Pencil from '../assets/pencil.svg';
import type { IImgFolder } from './types';
import { loadFolder, uploadImage } from './imageLoading';
import ImageComponent from './ImageComponent';

const React = BdApi.React;

const fs = require('fs');
const { join } = require('path');

function ImageTab() {
    const [folderPath, setFolderPath] = React.useState<string>('/');
    const [selectedFolder, setSelectedFolder] = React.useState<IImgFolder>({
        path: '/',
        folders: [],
        images: []
    });

    function updateFolder() {
        loadFolder(folderPath).then((folder) => {
            setSelectedFolder(folder);
            console.log(folder.images)
        });
    }

    React.useEffect(updateFolder, [folderPath]);

    function intoFolder(folder: string) {
        setFolderPath(folderPath + folder + '/');
    }

    function backFolder() {
        const path = folderPath.split('/');
        path.pop();
        path.pop();
        setFolderPath(path.join('/') + '/');
    }

    function deleteFolder(e: any, folder: string) {
        e.stopPropagation();

        BdApi.UI.showConfirmationModal('Delete Folder', `Are you sure you want to delete ${folder}?`, {
            danger: true,
            confirmText: 'Delete',
            onConfirm: () => {
                fs.rmdir(join(__dirname, 'imageFolder', folderPath, folder), { recursive: true }, (err: any) => {
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

        BdApi.UI.showConfirmationModal('Create Folder', (
            <div className='folderNameWrap'>
                {/* for some reason discord can really lag sometimes when pressing shift */}
                <input className='createFolderInput' onChange={(e) => folderName = e.target.value} spellCheck={false}
                placeholder='Folder Name'></input>
            </div>
        ), {
            confirmText: 'Create',
            onConfirm: () => {
                fs.mkdir(join(__dirname, 'imageFolder', folderPath, folderName), {}, (err: any) => {
                    if (err) {
                        BdApi.UI.showToast('Failed to create folder', { type: 'error' });
                        return;
                    }
                    BdApi.UI.showToast('Successfully created folder', { type: 'success' });

                    // Reload folder
                    updateFolder();
                });
            }
        })
    }

    function renameFolder(e: any, folder: string) {
        e.stopPropagation();
        let folderName = '';

        BdApi.UI.showConfirmationModal(`Rename ${folder}`, (
            <div className='folderNameWrap'>
                <input className='createFolderInput' onChange={(e) => folderName = e.target.value} spellCheck={false}
                placeholder='Folder Name'></input>
            </div>
        ), {
            confirmText: 'Rename',
            onConfirm: () => {
                fs.rename(join(__dirname, 'imageFolder', folderPath, folder),
                join(__dirname, 'imageFolder', folderPath, folderName), {}, (err: any) => {
                    if (err) {
                        BdApi.UI.showToast('Failed to rename folder', { type: 'error' });
                        return;
                    }
                    BdApi.UI.showToast('Successfully renamed folder', { type: 'success' });

                    // Reload folder
                    updateFolder();
                });
            }
        })
    }

    function createImage() {
        uploadImage(folderPath)
            .then(updateFolder);
    }

    function deleteImage(e: any, image: string) {
        e.stopPropagation();
        BdApi.UI.showConfirmationModal('Delete Image', `Are you sure you want to delete ${image}?`, {
            danger: true,
            confirmText: 'Delete',
            onConfirm: () => {
                fs.unlinkSync(join(__dirname, 'imageFolder', folderPath, image))
                BdApi.UI.showToast('Successfully deleted image', { type: 'success' });

                // Reload folder
                updateFolder();
            }
        });
    }

    return (
        <div className="imageTab">
            <div className='pathContainer'>
                <div className="icon folderReturn"
                onClick={backFolder}
                dangerouslySetInnerHTML={{__html: FolderArrowLeftOuline}}>
                </div>
                <div className='path'>
                    {selectedFolder.path.split('/').reverse().join('/')}
                </div>
                <div className="icon" onClick={createFolder}
                dangerouslySetInnerHTML={{__html: FolderPlusOutline}}>
                </div>
                <div className="icon" onClick={createImage}
                dangerouslySetInnerHTML={{__html: ImagePlusOutline}}>
                </div>
            </div>
            <div className="content">
                {selectedFolder.folders.map((folder: string) => {
                    return (
                        <div className="folder" key={folder}
                        onClick={() => intoFolder(folder)}
                        >
                            <div className="icon"
                            dangerouslySetInnerHTML={{__html: FolderOpenOutline}}>
                            </div>
                            <div className="folderName">
                                {folder}
                            </div>
                            <div className="controls">
                                <div className="icon" onClick={(e) => renameFolder(e, folder)}
                                dangerouslySetInnerHTML={{__html: Pencil}}>
                                </div>
                            </div>
                            <div className="controls">
                                <div className="icon" onClick={(e) => deleteFolder(e, folder)}
                                dangerouslySetInnerHTML={{__html: TrashCanOutline}}>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className="images">
                    {selectedFolder.images.map((image) => {
                        return (
                            <div className='image' key={image}>
                                <div className="icon" onClick={(e) => deleteImage(e, image)}
                                dangerouslySetInnerHTML={{__html: TrashCanOutline}}>
                                </div>
                                <ImageComponent name={image} path={folderPath} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default React.memo(ImageTab);