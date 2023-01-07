export type realmDiaryType = {
  id: number,
  title: string,
  body: string,
  youtubeId?: string,
  dateTime: number,
};

export type realmYearMonthType = {
  id: number,
  title: string,
  // body 랑 youtubeId 는 빼도 되고
  body: string,
  youtubeId?: string,
  date: number,
};