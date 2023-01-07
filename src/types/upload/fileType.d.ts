type FileInfo = {
  uri: string,
  isVideo: boolean,
  thumbNail?: string,
};

type CopiedFileInfo = {
  animatedIndex:boolean,
  isEditingFile?:boolean
} & FileInfo;

type DiaryPlusPhotoAndVideoFileInfo = {
  uri: string,
  isVideo: boolean,
  forIOSThumbNailUri?: string,
}

export { FileInfo, CopiedFileInfo, DiaryPlusPhotoAndVideoFileInfo };