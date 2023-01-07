type getRealmYearMonthDiariesType = {
  year: number,
  month: number,
};

type createRealmDiaryType = {
  // lastId: number,
  title: string,
  body: string,
  // youtubeId?: string,
  youtubeId: string | null,
  dateTime: number,
};

type editRealmDiaryType = {
  id: number,
  title?: string,
  body?: string,
  // youtubeId?: string,
  youtubeId: string | null,
  dateTime?: number,
};

type deleteRealmDiaryType = {
  id: number,
};

type matchDiaryType = {
  diary: realmDiaryType;
  which: "title" | "body";
  stringIndex: number;
};

export {
  getRealmYearMonthDiariesType,
  createRealmDiaryType,
  editRealmDiaryType,
  deleteRealmDiaryType,
  matchDiaryType,
};