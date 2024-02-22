const React = BdApi.React;

import { pathToSrc } from './imageLoading';
import { sendImage } from './uploader';
const { join } = require('path');

function imageComponent({ name, path }: { name: string, path: string }) {
    const imgRef = React.useRef<HTMLImageElement>(null);
    const [ src, setSrc ] = React.useState<string>('');
    
    let observer = new IntersectionObserver((entries) => {
        if(src != "") return;
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // get the base64 src
                pathToSrc(join(path, name)).then((src) => {
                    setSrc(src);
                });
            }
        });
    })

    // when the image is loaded, add it to the observer
    React.useEffect(() => {
        if (imgRef.current) observer.observe(imgRef.current);
        return () => {
            if (imgRef.current) observer.unobserve(imgRef.current);
        }
    }, [imgRef.current]);

    return (
        <img onClick={() => sendImage(name, src)} ref={imgRef} src={src}
        style={{ height: src ? '' : '50%' }} />
    )
}

export default imageComponent;