export type MusicPlayAndBtnType = {
  color: string,
  // checkIfMusicUrlThenPlay: () => void,
  // isHaveMusic: boolean
  music: false | seeMyDiary_seeMyDiary_diary_music | null
  // focused: boolean,
  // isMusicPlaying: boolean,
  // setIsNowMusicPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  // youtubeMusicShow: boolean,
  // switchYoutubeMusicShow: () => void,
  diary1MusicPlaying: boolean,
  setDiary1MusicPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  diary2MusicPlaying: boolean,
  setDiary2MusicPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  nowFocusDiary: React.MutableRefObject<"MyDiary1" | "MyDiary2">,
}

// export type MusicPlayingStateType = {
//   youtubeMusicShow: boolean,
//   switchYoutubeMusicShow: () => void,
// } & MusicPlayAndBtnType
export type MusicPlayingStateType = MusicPlayAndBtnType


// export default MusicPlayingStateType;
