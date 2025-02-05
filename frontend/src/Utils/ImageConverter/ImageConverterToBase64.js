export async function ImageConverterToBase64(image) {
    fetch(image)
        .then(response => response.arrayBuffer())
        .then(buffer => {
            return btoa(
                new Uint8Array(buffer)
                    .reduce((data, byte) =>
                        data + String.fromCharCode(byte), '')
            )
        });

}

export async function fromBase64ToImage(base64Image) {

    const replaceURL = base64Image.replace('dataimage/jpegbase64', '')
    const data = await fetch(replaceURL)
    const blob = await data.blob()
    const file = URL.createObjectURL(blob)
    //
    // const file = await new File([blob], 'bookImg', {type: 'image/png'})

    return file
}