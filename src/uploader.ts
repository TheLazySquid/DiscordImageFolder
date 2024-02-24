import { pickerModule } from "./modules";

export async function sendImage(name: string, src: string) {
    if(!name || !src) return
    const img = new Image()
    img.src = src
    await img.decode();

    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(img, 0, 0)
    
    const cloudUploader = BdApi.Webpack.getModule(module => module.CloudUpload)
    const uploader = BdApi.Webpack.getModule(module => module.default && module.default.uploadFiles).default
    
    let parts = name.split(".")
    parts.pop()
    let fileName = parts.join(".") + ".png"

    const blob: Blob = await new Promise(resolve => canvas.toBlob((blob) => resolve(blob!)))
    const file = new File([blob], fileName, { type: 'image/png' })

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