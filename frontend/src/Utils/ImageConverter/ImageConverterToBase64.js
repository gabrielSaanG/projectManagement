export function ImageConverterToBase64(){

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