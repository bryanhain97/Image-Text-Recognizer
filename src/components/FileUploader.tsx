import React, { BaseSyntheticEvent, useState, useRef, useEffect } from 'react';
import Tesseract from 'tesseract.js';

interface IImageTextRecognizer {
    setImage?: () => void
    enabled?: boolean
}

const ImageTextRecognizer: React.FC<IImageTextRecognizer> = () => {
    const imageRef = useRef<HTMLImageElement | null>(null)
    const [imageSrc, setImageSrc] = useState<string>("")

    useEffect(() => {
        if (imageRef.current !== null) {
            imageRef.current.src = imageSrc
        }
    }, [imageSrc])

    return (
        <div>
            <input
                className="m-3"
                type="file"
                id="image"
                name="image"
                accept="image/jpg,image/png,image/jpeg"
                onChange={handleInputChange}
            />
            <img
                className="m-auto w-fit my-4 max-h-96"
                ref={imageRef}
                alt="no alt"
            />
            <button
                onClick={logText}
                className="mt-10 bg-slate-400 text-white"
            >
                Log Text
            </button>
        </div>
    )

    function handleInputChange(e: BaseSyntheticEvent) {
        const foundFile = e.target.files[0]
        if (!foundFile) return

        const fileReader = new FileReader()
        fileReader.readAsDataURL(foundFile)
        fileReader.addEventListener('load', () => {
            const url = fileReader.result as string
            if (url !== null) {
                setImageSrc(url)
            }
        })
    }
    function logText() {
        if (!imageSrc) {
            console.log('No image selected')
            return
        }
        Tesseract.recognize(
            imageSrc,
            'eng',
        ).then(({ data: { text } }) => {
            console.log(text);
        })
    }
}

export default ImageTextRecognizer;