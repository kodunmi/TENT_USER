import { BaseResponse, BaseUrl } from "../../lib";

export function uploadFile(fileNames: Array<{ file: string, name: string }>,) {
    var formdata = new FormData();
    fileNames.forEach(element => {
        formdata.append("upload", element.file, element.name);
    });


    var requestOptions = {
        method: 'POST',
        body: formdata,
    };

    let p = new Promise(function(resolve, reject) {
        fetch(`${BaseUrl}utility/file-upload`, requestOptions)
        .then(response => response.json())
        .then((result: BaseResponse<Array<{fileSize: number,mimeType: string,name: string, fileFormat:string,publicId:string, url:string}>>)  => resolve(result))
        .catch(error => reject(error));
    })

    return p

    
}
