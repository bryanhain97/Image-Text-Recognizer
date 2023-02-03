import React, { BaseSyntheticEvent, useState, useRef, useEffect } from 'react';
import Tesseract from 'tesseract.js';

interface IFileRecognizer {
    setImage?: () => void
    enabled?: boolean
}

const FileRecognizer: React.FC<IFileRecognizer> = () => {
    const imageRef = useRef<HTMLImageElement | null>(null)
    const [imageSrc, setImageSrc] = useState<string>("")

    useEffect(() => {
        if (imageRef.current !== null) {
            imageRef.current.src = imageSrc
        }
    }, [imageSrc])

    return (
        <div className="fileuploader p-3 border rounded-lg shadow-lg">
            <input
                className="m-3 "
                type="file"
                id="image"
                name="image"
                accept="image/jpg,image/png,image/jpeg"
                onChange={handleInputChange}
            />
            <img
                ref={imageRef}
                alt="no alt"
            />
            <button
                onClick={logText}
                className="mt-10 bg-teal-600"
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

export default FileRecognizer;