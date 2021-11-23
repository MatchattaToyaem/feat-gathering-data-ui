export const CheckSquareDimension = async (base64: string)=>{
    return new Promise<boolean> ((resolved, rejected)=>{
        const image = new Image()
        image.onload = () =>{
            const {width, height}= image
            resolved(width === height)
        }
        image.src = base64
    })
}