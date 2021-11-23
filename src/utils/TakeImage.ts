import { Camera, CameraResultType, CameraSource } from "@capacitor/core";

export const TakeImage = async (type: String) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const profilePicture = await Camera.getPhoto({
        source: CameraSource.Photos,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      });
      const base64Image = `data:image/png;base64,${profilePicture.base64String}`;
      const endpoint = process.env.REACT_APP_END_POINTS || ""
      let t = "";
      switch(type){
        case "sides": t = "side"; 
        break;
        case "soles": t = "sole";
      }
      const request = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: t,
          image: base64Image
        }),
      }
      await fetch(
        `${endpoint}/compress`,
        request
      ).then((result) => result.json())
      .then(
        (result) => {
          console.log(result.image)
          resolve(result.image)
        },
        (error) => {
          reject(error)
        }
      );
      
      // let square = false
      // await GetImageDimension(base64Image).then((result)=>{
      //   square = result
      // })
      // if(!square){
      //   throw new Error("Please set image ratio to 1:1")
      // }
      // else{
      //   resolve(base64Image);
      // }
    } catch (error) {
      reject(error);
    }
  });
};
