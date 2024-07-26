declare namespace FILE {
  type FileUploadResult = {
    id: string;
    name: string;
    isImg: string;
    contentType:string;
    size:string;
    path:string;
    url:string;
    source:string;
    createTime:Date;
    updateTime:Date;
  }
}