export interface IImg {
    name: string;
    src: string;
}

export interface IImgFolder {
    folders: string[];
    images: IImg[];
    path: string;
}