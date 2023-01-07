// 공유 안쓰면 걍 삭제

export type UploadRelatedNavParamsList = {
  DiarySelectPhotoAndVideo: undefined,
  DiaryPlusPhotoAndVideo:{
    file:DiaryPlusPhotoAndVideoFileInfo[],
    newVideoFile?:string,
    pureVideoFile?:string,
    forIOSThumbNailUri?:string,
    whichComponent?:string,
  },
  FullScreenVideo:{
    uri:string,
    title?:string,
  },
  EditVideo?:{
    file:string,
    from:string,
  },
  EditNetworkVideo?:undefined,
}