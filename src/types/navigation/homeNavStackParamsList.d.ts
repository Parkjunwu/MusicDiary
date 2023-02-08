import { NavigatorScreenParams } from "@react-navigation/native";
import { useUploadDiaryMutationProps } from "../../hooks/uploadDiary/useUploadDiaryMutation";
import { DiaryPlusPhotoAndVideoFileInfo, FileInfo } from "../upload/fileType";

export type NotificationList = {
  Notification: undefined;
  NotificationDiary: {
    id: number,
  };
  NotificationBoard: { boardId: number, commentId?: number, commentOfCommentId?: number };
};

export type UploadDiaryTabStackParamsList = {
  TodayDiary: {
    // 다이어리 캐시 넣어줄애 + UploadDiary 에도 작성
  } | undefined,

  UploadDiary: {
    // file?:FileInfo[],
    plusFiles?:FileInfo[],
    whichComponent?:string,
    // 추가
    youtubeId?:string,
    youtubeTitle?:string,
  } | undefined,
  // 추가
  SearchYoutube:  {
    routeFrom: string,
  },
  // WatchYoutube:{
  //   title: string;
  //   vId: string;
  //   published?: string;
  //   channelTitle?: string;
  //   selectThisVideo?: () => void;
  // },
  RequestSong: useUploadDiaryMutationProps;
  EditDiaryForTemporaryDiaryData: {
    diaryId: number,
    title: string,
    body: string[],
    youtubeId: string | null,
    files: FileInfo[],
    prevFiles: FileInfo[],
    prevTitle: string,
    prevBody: string[],
    prevYoutubeId: string | null,
    plusFiles?: FileInfo[],
    youtubeTitle?: string,
  }
} & NotificationList & BaseSharedStackNavStackParamsList;

export type MyDiaryDrawerNavParamsList = {
  MyDiary1: {
    id: number,
    title?: string,
    createdAt?: string,
  },
  MyDiary2: {
    id: number,
  },
  // RequestSongChange: {
  //   diaryId: number,
  // },
  // ChangeYoutubeSong: {
  //   routeFrom: string,
  //   diaryId: number,
  // },
  // WatchYoutube:{
  //   title: string;
  //   vId: string;
  //   published: string;
  //   channelTitle: string;
  //   selectThisVideo: () => void;
  //   diaryId: number,
  // },
}

type BaseUploadRelatedScreenList = {
  DiaryPlusPhotoAndVideo:{
    file:DiaryPlusPhotoAndVideoFileInfo[],
    newVideoFile?:string,
    pureVideoFile?:string,
    forIOSThumbNailUri?:string,
    whichComponent?:string,
    from: "EditDiary" | "UploadDiary" | "EditDiaryForTemporaryDiaryData" | "EditBoard" | "UploadBoard",
  },
  DiarySelectPhotoAndVideo: {
    from:"EditDiary" | "UploadDiary" | "EditDiaryForTemporaryDiaryData",
    nowFileNumber:number,
  },
  FullScreenVideo:{
    uri:string,
    title?:string,
  },
  EditNetworkVideo:{
    file:string,
    from:string,
  },
  EditVideo:{
    file:string,
    from:string,
  },
}

export type BaseSharedStackNavStackParamsList = {
  MyDiaryDrawerNav: NavigatorScreenParams<MyDiaryDrawerNavParamsList>;
  // 변경
  EditDiary: {
    diaryId?: number;
    fileInfoArr?: FileInfo[]
    body?: string[];
    title?: string;
  // } | {
    // file?:FileInfo[],
    plusFiles?:FileInfo[],
    whichComponent?:string, // 없어도 될듯
    // youtubeId?: string | null,
    youtubeId: string | null,

    youtubeTitle?: string,
  };
  RequestSongChange: {
    diaryId: number,
  },
  ChangeYoutubeSong: {
    routeFrom: string,
    diaryId?: number,
  },
  WatchYoutube:{
    title: string;
    vId: string;
    published?: string;
    channelTitle?: string;
    selectThisVideo?: () => void;
    diaryId?: number,
  },
} & BaseUploadRelatedScreenList;

export type MyDiaryListTabStackParamsList = {
  MyDiaryList: undefined;
  SearchMyDiaries: undefined;
  Calendar: undefined;
} & BaseSharedStackNavStackParamsList;

// 나중에 NotificationTab 넣을거면 이거 써
// export type NotificationTabStackParamsList = NotificationList & BaseSharedStackNavStackParamsList

export type BoardDrawerNavParamsList = {
  NewBoardList: undefined;
};

export type BoardTabStackParamsList = {
  AccuseBoard: {
    boardId: number;
  };
  SearchBoard: undefined;
  Board: {
    id: number;
    title: string;
    // thumbNail: string;
    createdAt: string;
    user: {
      id: number;
      userName: string;
      avatar: string | null;
    };
  };
  // NewBoardList: undefined;
  BoardDrawerNav: BoardDrawerNavParamsList;
  EditBoard: {
    boardId: number;
    fileInfoArr: FileInfo[];
    body: string[];
    title: string;
  };
  UploadBoard: {
    files: FileInfo[];
  } | undefined;
  UserBoardProfile: {
    id: number;
    userName: string;
  };
  MyBoardList: undefined;
  EditBoardForTemporaryBoardData: {
    boardId: number;
    title: string,
    body: string[],
    files: FileInfo[],
    prevFiles: FileInfo[],
    prevTitle: string,
    prevBody: string[],
    plusFiles?: FileInfo[],
  };
} & BaseUploadRelatedScreenList;

export type BoardTabForNotLogInUserStackParamsList = {
  // AccuseBoard: {
  //   boardId: number;
  // };
  SearchBoard: undefined;
  Board: {
    id: number;
    title: string;
    // thumbNail: string;
    createdAt: string;
    user: {
      id: number;
      userName: string;
      avatar: string | null;
    };
  };
  NewBoardList: undefined;
  // BoardDrawerNav: BoardDrawerNavParamsList;
  // EditBoard: {
  //   boardId: number;
  //   fileInfoArr: FileInfo[];
  //   body: string[];
  //   title: string;
  // };
  // UploadBoard: {
  //   files: FileInfo[];
  // } | undefined;
  UserBoardProfile: {
    id: number;
    userName: string;
  };
  MyBoardList: undefined;
};

export type ProfileDrawerNavParamsList = {
  // ProfileScreen: undefined;
  ProfileScreen: {
    newQuote?: string;
    newFeeling?: string;
  };
};

// 화면 추가 할때마다 추가
export type ProfileListTabStackParamsList = {
  // ProfileDrawerNav: undefined;
  ProfileDrawerNav: ProfileDrawerNavParamsList;
  FeelChange: {
    feeling: string;
  };
  FontChange: undefined;
  CheckAppPassword: undefined;
  Security: undefined;
  CheckPasswordForAppStart: undefined;
  SettingAppStartPassword: undefined;
  SettingAppPassword: undefined;
  ConfirmAppPassword: {
    password: number[];
  };
  SettingQuote: undefined;
  SettingPushNotification: undefined;
  RequestEmailToAdministrator: undefined;
  AboutAccount: undefined;
  WithdrawalAccount: undefined;
  SyncDiaries: {
    allDiaryNumber: number;
  };
  EditProfile: undefined;
  SeeBlockUsers: undefined;
};

// 로컬 프로필
export type LocalProfileListTabStackParamsList = {
  ProfileDrawerNav: ProfileDrawerNavParamsList;
  FeelChange: {
    feeling: string;
  };
  FontChange: undefined;
  CheckAppPassword: undefined;
  Security: undefined;
  CheckPasswordForAppStart: undefined;
  SettingAppStartPassword: undefined;
  SettingAppPassword: undefined;
  ConfirmAppPassword: {
    password: number[];
  };
  SettingQuote: undefined;
  SettingPushNotification: undefined;
  RequestEmailToAdministrator: undefined;
};

export type MainNavTabParamsList = {
  UploadDiaryTab: NavigatorScreenParams<UploadDiaryTabStackParamsList>;
  MyDiaryListTab: NavigatorScreenParams<MyDiaryListTabStackParamsList>;
  // 변경해야함
  // NotificationTab: NavigatorScreenParams<NotificationTabStackParamsList>;
  BoardTab: NavigatorScreenParams<BoardTabStackParamsList>;
  ProfileListTab: ProfileListTabStackParamsList; // LocalProfileListTabStackParamsList 도 넣어야함
};

export type HomeNavStackParamsList = {
  MainNav: NavigatorScreenParams<MainNavTabParamsList>;
  // Upload: undefined;
  // // UploadForm: undefined;
  // UploadFormNav: undefined;
  // Messages: undefined;
  // EditNetworkVideo: undefined;
  // FullScreenVideo: undefined;
};