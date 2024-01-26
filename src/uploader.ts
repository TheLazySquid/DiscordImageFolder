import { pickerModule } from "./modules";
import { IImg } from "./types";

export async function sendImage(image: IImg) {
    const img = new Image()
    img.src = image.src
    await img.decode();

    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(img, 0, 0)
    
    const cloudUploader = BdApi.Webpack.getModule(module => module.CloudUpload)
    const uploader = BdApi.Webpack.getModule(module => module.default && module.default.uploadFiles).default
    
    const blob: Blob = await new Promise(resolve => canvas.toBlob((blob) => resolve(blob!)))
    const file = new File([blob], image.name, { type: 'image/png' })

    const channelId = location.href.split('/').pop()
    if (!channelId) return
    pickerModule.closeExpressionPicker();
    
    let fileUp = new cloudUploader.CloudUpload({ file: file, isClip: false, isThumbnail: false, platform: 1 }, channelId, false, 0)
    let uploadOptions = {
        channelId: channelId,
        uploads: [fileUp],
        draftType: 0,
        options: { stickerIds: [] },
        parsedMessage: { channelId: channelId, content: "", tts: false, invalidEmojis: [] }
    }
    await uploader.uploadFiles(uploadOptions)
}