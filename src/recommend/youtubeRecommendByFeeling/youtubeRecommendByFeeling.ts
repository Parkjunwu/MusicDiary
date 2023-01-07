import {
  몽글몽글,
  싸이월드,
  그시절,
  ost,
  위로,
  감성,
  추억,
  이별,
  그리움,
  사랑에빠지고싶은,
  사랑,
  의미,
  보고픔,
  신나는여행,
  잔잔한여행,
  신나는,
  잔잔한,
  새드무비감성,
  문득외로움,
} from "./youtubeArrList"


export type youtubeType = {
  id: string;
  title: string;
  thumbNail: string;
};
// 아니면 그냥 배열로 놓고 그거를 feeling 이랑 youtubeArrByFeeling 에 넣어야 겠다. 아 근데 띄어쓰기를 못넣네. 객체 키에만 가능. 여기 키를 넣어야겠다.

// const mockData = [
//   {
//     id:"BrOzcJfSsAw",
//     title:"인간 관계에도 가지치기가 필요하다 _ 렌착 끊기",
//     thumbNail:"https://www.topgear.com/sites/default/files/cars-car/carousel/2018/04/p90285390_highres_the-new-bmw-i8-coupe.jpg?w=1784&h=1004"
//   },
//   {
//     id:"FCvYwKfsEnY",
//     title:"부자들의 인생책 [원씽] 주요 내용 정리 (풀버젼)",
//     thumbNail:"https://media.evo.co.uk/image/private/s--peFndBVA--/f_auto,t_content-image-full-desktop@1/v1606409127/evo/2020/11/BMW%20i8%20review%2C%20history%2C%20prices%20and%20specs-11.jpg"
//   },
//   {
//     id:"mZiacu0dUzQ",
//     title:"성공은 도미노처럼 작동한다!ㅣ첫 번째 도미노 '원씽'을 찾아 쓰러뜨리세요! ㅣ버리고, 선택하고, 집중하라!ㅣ부자들의 인생 책 『원씽』",
//     thumbNail:"https://cdn.pocket-lint.com/r/s/970x/assets/images/145044-cars-review-bmw-i8-review-lead-image1-bemvtmxvel-jpg.webp"
//   },
//   {
//     id:"cH4JKgmPVKk",
//     title:"포기하지 않는 방법",
//     thumbNail:"https://www.motorgraph.com/news/photo/201711/13602_62980_2454.jpg"
//   },
// ];

// 생각이 많아지는 밤 듣고 싶은 노래
// 지친 마음을 위로해주는 노래
// 기분이 몽글몽글 해지는 노래
// 듣는 순간 몽글해지는 노래
// 충전이 필요할 때
// 싸이월드 갬성
// 문득 싸이월드가 그리울 때
// 도토리로 차곡차곡 모아본 싸이월드 노래
// 그 때 그 시절 노래
// 조용히 생각을 정리하고 싶을 때 듣는 노래
// 유명한 ost
// 

// const youtubeArrByFeeling: {[key:string]: youtubeType[]} = {
//   "심심할 때":[...mockData],
//   "위로가 필요할 때":[...mockData],
//   "감성이 풍부할 때":[...mockData],
//   "추억에 빠지고 싶을 때":[...mockData],
//   "누군가 그리워 할 때":[...mockData],
//   "사랑할 때":[...mockData],
//   "인생의 의미가 필요할 때":[...mockData],
//   "보고 싶을 때":[...mockData],
// };

const youtubeArrByFeeling: {[key:string]: youtubeType[]} = {
  "기분이 몽글몽글 해지는 노래": 몽글몽글,
  "도토리로 차곡차곡 모아본 싸이월드 노래": 싸이월드,
  "그 때 그 시절 노래": 그시절,
  "추억의 OST 모음": ost,
  "지친 마음을 위로해주는 노래": 위로,
  "새벽 감성 노래": 감성,
  "추억에 빠져들고 싶을 때 좋은 노래": 추억,
  "이별 했을 때 들을 노래": 이별,
  "그리운 사람이 생각날 때 좋은 노래": 그리움,
  "사랑에 빠지고 싶을 때 좋은 노래": 사랑에빠지고싶은,
  "사랑할 때 들으면 좋은 노래": 사랑,
  "인생의 의미를 찾고 싶을 때": 의미,
  "누군가 보고싶을 때 들으면 좋은 노래": 보고픔,
  "신나는 여행 노래": 신나는여행,
  "잔잔한 여행 노래": 잔잔한여행,
  "그냥 너무 신나는 노래": 신나는,
  "잔잔한 노래": 잔잔한,
  "새드 무비 감성의 노래": 새드무비감성,
  "문득 외로울 때 들으면 좋은 노래": 문득외로움,
}
// 근데 얘는 순서가 맞을라나?
const feelingNameArr = Object.keys(youtubeArrByFeeling);

export {
  youtubeArrByFeeling,
  feelingNameArr,
};

// // const 지친마음: youtubeType[] = [
// //   {id: '1ri7I32Auhg',title: '[M/V] 싸운날 - 볼빨간 사춘기',thumbNail: 'https://i.ytimg.com/vi/1ri7I32Auhg/hqdefault.jpg',},
// //   {id: '4A4O7SP5fa0',title: '버스커 버스커(Busker Busker) - 정류장(Bus Stop)',thumbNail: 'https://i.ytimg.com/vi/4A4O7SP5fa0/hqdefault.jpg',},
// //   {id: 'r-YG9ytxP4c', title: "Cause It's First Time (처음이니까)", thumbNail: 'https://i.ytimg.com/vi/r-YG9ytxP4c/hqdefault.jpg'},
// //   {id: 'fhRvMJ8RAS8', title: 'Today (오늘)', thumbNail: 'https://i.ytimg.com/vi/fhRvMJ8RAS8/hqdefault.jpg'},
// //   {id:"3gMAEZCOFtE",title:"볼빨간사춘기(BOL4) - 나의 사춘기에게 [가사/Lyrics]",thumbNail:"https://i.ytimg.com/vi/3gMAEZCOFtE/hqdefault.jpg"},
// //   {id:"dSTm9p6koC8",title:"[MV] Younha(윤하) _ Snail mail(느린 우체통)",thumbNail:"https://i.ytimg.com/vi/dSTm9p6koC8/hqdefault.jpg"},
// //   {id:"uBGKjMzibjQ",title:"[후아유 - 학교 2015 OST Part 5] 윤하 (Younha) - 기도 (Pray)",thumbNail:"https://i.ytimg.com/vi/uBGKjMzibjQ/hqdefault.jpg"},
// //   {id:"n7rMO6jYrSk",title:"너의 얘길 들어줄게 I will listen never alone",thumbNail:"https://i.ytimg.com/vi/n7rMO6jYrSk/hqdefault.jpg"},
// // ];

// const 몽글몽글: youtubeType[] = [
//   {id: 'LLnPH_mnwks', title: 'STANDING EGG - 무지개 (Feat. 윤닭 Of 오브로젝트)', thumbNail: 'https://i.ytimg.com/vi/LLnPH_mnwks/hqdefault.jpg'},
//   {id: 'NQMBYyebXpE', title: '훈스 (HOONS) - 얘가 이렇게 예뻤나 (I C U) MV', thumbNail: 'https://i.ytimg.com/vi/NQMBYyebXpE/hqdefault.jpg'},
//   {id: '85ryqI84DGA', title: '[MV] 21univ.(21학번) - Sticker picture(스티커 사진)', thumbNail: 'https://i.ytimg.com/vi/85ryqI84DGA/hqdefault.jpg'},
//   {id: 'M2VpEeZ6vVE', title: 'CHEEZE / 치즈 - Q album 01. 무드인디고 (Official Music)', thumbNail: 'https://i.ytimg.com/vi/M2VpEeZ6vVE/hqdefault.jpg'},
//   {id: 'FSCj8otQOdI', title: '[M/V] 장범준 - 노래방에서 (unofficial)', thumbNail: 'https://i.ytimg.com/vi/FSCj8otQOdI/hqdefault.jpg'},
//   {id: 'eelfrHtmk68', title: 'Dean - D (Half Moon) ft. Gaeko', thumbNail: 'https://i.ytimg.com/vi/eelfrHtmk68/hqdefault.jpg'},
//   {id: '4zRwL6B9zZ4', title: "[MV] URBAN ZAKAPA(어반자카파) _ You're The Reason(이 밤이 특별해진 건)", thumbNail: 'https://i.ytimg.com/vi/4zRwL6B9zZ4/hqdefault.jpg'},
//   {id: 'L8UUYfe6-UA', title: '[MV] BOL4(볼빨간사춘기) _ Leo(나비와 고양이) (feat. BAEKHYUN(백현))', thumbNail: 'https://i.ytimg.com/vi/L8UUYfe6-UA/hqdefault.jpg'},
//   {id: '9U8uA702xrE', title: '[M/V] 우주를 줄게  - 볼빨간사춘기', thumbNail: 'https://i.ytimg.com/vi/9U8uA702xrE/hqdefault.jpg'},
//   {id: 'OOi5Qa8jk1o', title: "괜찮아 사랑이야 It's alright This is Love", thumbNail: 'https://i.ytimg.com/vi/OOi5Qa8jk1o/hqdefault.jpg'},
//   {id: 'UoBsiQW23IY', title: '[MV] MeloMance(멜로망스) _ Love, Maybe(사랑인가 봐) (사내맞선 OST 스페셜 트랙(A Business Proposal OST Special Track))', thumbNail: 'https://i.ytimg.com/vi/UoBsiQW23IY/hqdefault.jpg'},
//   {id: 'O136JYv3weQ', title: '[MV] CHEEZE(치즈) _ Love You(좋아해)(bye)', thumbNail: 'https://i.ytimg.com/vi/O136JYv3weQ/hqdefault.jpg'},
//   {id: 'CI0GU2MsoN4', title: '멜로망스 - 초대 / 가사', thumbNail: 'https://i.ytimg.com/vi/CI0GU2MsoN4/hqdefault.jpg'},
//   {id: 'rl3aRKyDuHg', title: 'VIVA 청춘', thumbNail: 'https://i.ytimg.com/vi/rl3aRKyDuHg/hqdefault.jpg'},
//   {id: 'Gq_hihlc3b0', title: 'Madeleine Love (Madeleine Love)', thumbNail: 'https://i.ytimg.com/vi/Gq_hihlc3b0/hqdefault.jpg'},
//   {id: 'wsMbK9VHc2Y', title: 'Teddy Bear Rises - OOHYO | Remix by Long Nhat', thumbNail: 'https://i.ytimg.com/vi/wsMbK9VHc2Y/hqdefault.jpg'},
//   {id: 'pq6Xwpfk98I', title: '가끔 미치도록 네가 안고 싶어질 때가 있어', thumbNail: 'https://i.ytimg.com/vi/pq6Xwpfk98I/hqdefault.jpg'},
//   {id: '1uvjBJTbAzw', title: '말꼬리 - 정준일, 윤종신', thumbNail: 'https://i.ytimg.com/vi/1uvjBJTbAzw/hqdefault.jpg'},
// ];

// const 싸이월드 : youtubeType[] = [
//   {id: 'kwAlg7FUqHY', title: 'Davichi - My Man', thumbNail: 'https://i.ytimg.com/vi/kwAlg7FUqHY/hqdefault.jpg'},
//   {id: 'dYIT_jeUBKg', title: '[M/V] Free Style(프리스타일) - Y (Please Tell Me Why)', thumbNail: 'https://i.ytimg.com/vi/dYIT_jeUBKg/hqdefault.jpg'},
//   {id: 'TPFkV8PKVhU', title: 'Classic Kpop - 휘성 - 사랑은 맛있다 ♡ + DL', thumbNail: 'https://i.ytimg.com/vi/TPFkV8PKVhU/hqdefault.jpg'},
//   {id: 'FWTfKpZ0VWU', title: 'Davichi (다비치) - 8282 [Hangul/Romanization/English] Color & Picture Coded HD', thumbNail: 'https://i.ytimg.com/vi/FWTfKpZ0VWU/hqdefault.jpg'},
//   {id: 'LF2zAz2_ICA', title: 'Love Rain (사랑비)', thumbNail: 'https://i.ytimg.com/vi/LF2zAz2_ICA/hqdefault.jpg'},
//   {id: 'N1q3XKfmI5w', title: "[VIBE/바이브]  3RD ALBUM 'Re-Feel' - 그남자 그여자 (Feat. 장혜진) OFFICIAL MV", thumbNail: 'https://i.ytimg.com/vi/N1q3XKfmI5w/hqdefault.jpg'},
//   {id:"faPQoNUC4GQ",title:"자두 - 대화가 필요해",thumbNail:"https://i.ytimg.com/vi/faPQoNUC4GQ/hqdefault.jpg"},
//   {id:"ULfAaYIuldI",title:"체념 (After Resignatoion / Retiment)",thumbNail:"https://i.ytimg.com/vi/ULfAaYIuldI/hqdefault.jpg"},
//   {id:"v3SaQZypZ_U",title:"[OST] 하울(HowL) - Perhaps Love (사랑인가요) (duet with J) (궁 OST) │ 가사포함",thumbNail:"https://i.ytimg.com/vi/v3SaQZypZ_U/hqdefault.jpg"},
//   {id:"zmJ4aBsD-t0",title:"[MV] 하동균 _ 그녀를 사랑해줘요",thumbNail:"https://i.ytimg.com/vi/zmJ4aBsD-t0/hqdefault.jpg"},
//   {id:"zmMiATGtHAU",title:"Because Of You (Feat. Soulman)",thumbNail:"https://i.ytimg.com/vi/zmMiATGtHAU/hqdefault.jpg"},
//   {id:"vJpGEWS-QVo",title:"TOK TOK (feat.SOYA) (톡톡(TOK TOK) (FEAT.SOYA))",thumbNail:"https://i.ytimg.com/vi/vJpGEWS-QVo/hqdefault.jpg"},
//   {id:"N3jqfRcW354",title:"Mighty Mouth (마이티 마우스) _ 나쁜놈(feat. Soya)  _ MV",thumbNail:"https://i.ytimg.com/vi/N3jqfRcW354/hqdefault.jpg"},
//   {id:"2uyHtg56yTY",title:"몽환의 숲 (Feat. 이루마)",thumbNail:"https://i.ytimg.com/vi/2uyHtg56yTY/hqdefault.jpg"},
//   {id:"OTRGehVo_JM",title:"[MV] Geeks(긱스) _ Wash Away (Feat. Ailee(에일리))",thumbNail:"https://i.ytimg.com/vi/OTRGehVo_JM/hqdefault.jpg"},
//   {id:"mIrEcebqm20",title:"거북이(Turtles) - 빙고",thumbNail:"https://i.ytimg.com/vi/mIrEcebqm20/hqdefault.jpg"},
//   {id:"MHCBoNhQmCk",title:"[MV]순정 - 코요태(Koyote)",thumbNail:"https://i.ytimg.com/vi/MHCBoNhQmCk/hqdefault.jpg"},
//   {id:"1VdPvAqVrow",title:"[MV] 코요태 (Koyote) - 실연 (Broken Heart)",thumbNail:"https://i.ytimg.com/vi/1VdPvAqVrow/hqdefault.jpg"},
//   {id:"kZCMl9h6LhE",title:"It's love (사랑인걸)",thumbNail:"https://i.ytimg.com/vi/kZCMl9h6LhE/hqdefault.jpg"},
//   {id:"RHH3QxgCfEk",title:"거미-기억상실",thumbNail:"https://i.ytimg.com/vi/RHH3QxgCfEk/hqdefault.jpg"},
// ];

// const 그시절 : youtubeType[] = [
//   {id:"M15SI00umn4",title:"[가사] 부활 - 네버엔딩스토리 (Never Ending Story)(lyrics)",thumbNail:"https://i.ytimg.com/vi/M15SI00umn4/hqdefault.jpg"},
//   {id:"nuAiFzEkFZM",title:"여전히 아름다운지",thumbNail:"https://i.ytimg.com/vi/nuAiFzEkFZM/hqdefault.jpg"},
//   {id:"XtP8aT3QlfI",title:"Invitation to Me",thumbNail:"https://i.ytimg.com/vi/XtP8aT3QlfI/hqdefault.jpg"},
//   {id: 'SZkkZLSCv44', title: '너에게 난, 나에게 넌', thumbNail: 'https://i.ytimg.com/vi/SZkkZLSCv44/hqdefault.jpg'},
//   {id:"iwePzJLYBwE",title:"뱅크(Bank) - 가질 수 없는 너 (1995年)",thumbNail:"https://i.ytimg.com/vi/iwePzJLYBwE/hqdefault.jpg"},
//   {id:"dNRwPsIBPLI",title:"중독된 사랑 -- 조장혁",thumbNail:"https://i.ytimg.com/vi/dNRwPsIBPLI/hqdefault.jpg"},
//   {id:"rZnw6xKmAmI",title:"이미 슬픈 사랑",thumbNail:"https://i.ytimg.com/vi/rZnw6xKmAmI/hqdefault.jpg"},
//   {id:"icp9OgD7l-0",title:"왁스wax  화장을 고치고 (가사 첨부)",thumbNail:"https://i.ytimg.com/vi/icp9OgD7l-0/hqdefault.jpg"},
//   {id: 'tV4PQOGJo3U', title: 'Dance with DOC (DOC와 춤을)', thumbNail: 'https://i.ytimg.com/vi/tV4PQOGJo3U/hqdefault.jpg'},
//   {id: 'N7VBSaZ-jKQ', title: '[HQ] Kim hyun jung (김현정) - bruise (멍)', thumbNail: 'https://i.ytimg.com/vi/N7VBSaZ-jKQ/hqdefault.jpg'},
//   {id:"Jr0OmC_QMoo",title:"Standing EGG - 고백",thumbNail:"https://i.ytimg.com/vi/Jr0OmC_QMoo/hqdefault.jpg"},
//   {id:"0RGIIBLI3rI",title:"쿨(Cool) - 애상",thumbNail:"https://i.ytimg.com/vi/0RGIIBLI3rI/hqdefault.jpg"},
//   {id:"diTa5CYXQ5A",title:"One and a Half (일과 이분의 일)",thumbNail:"https://i.ytimg.com/vi/diTa5CYXQ5A/hqdefault.jpg"},
//   {id:"vJRDg1ZCRl8",title:"아로하",thumbNail:"https://i.ytimg.com/vi/vJRDg1ZCRl8/hqdefault.jpg"},
// ];

// const ost : youtubeType[] = [
//   {id:"LKQ-18LoFQk",title:"[M/V] 임영웅 - 사랑은 늘 도망가 :: 신사와 아가씨(Young Lady and Gentleman) OST Part.2",thumbNail:"https://i.ytimg.com/vi/LKQ-18LoFQk/hqdefault.jpg"},
//   {id:"zjVt73gD1fc",title:"She Is",thumbNail:"https://i.ytimg.com/vi/zjVt73gD1fc/hqdefault.jpg"},
//   {id:"euI-C1YONaU",title:"Give You My Heart (마음을 드려요)",thumbNail:"https://i.ytimg.com/vi/euI-C1YONaU/hqdefault.jpg"},
//   {id:"XyzaMpAVm3s",title:"[MV] DAVICHI(다비치) - This Love(이 사랑) l Descendants of the Sun 태양의 후예 OST",thumbNail:"https://i.ytimg.com/vi/XyzaMpAVm3s/hqdefault.jpg"},
//   {id:"6rS7OUGXUik",title:"[도깨비 OST Part 9] 에일리 (Ailee) - 첫눈처럼 너에게 가겠다 (I will go to you like the first snow) (Official Audio)",thumbNail:"https://i.ytimg.com/vi/6rS7OUGXUik/hqdefault.jpg"},
//   {id:"gJsgG2r6M90",title:"너의 모든 순간 (Original)",thumbNail:"https://i.ytimg.com/vi/gJsgG2r6M90/hqdefault.jpg"},
//   {id:"g76fnpvt4l4",title:"[MV] 헤이즈 (Heize) - 내 맘을 볼수 있나요 (Can You See My Heart) [Hotel Del Luna OST Part 5]",thumbNail:"https://i.ytimg.com/vi/g76fnpvt4l4/hqdefault.jpg"},
//   {id:"KcjjTWn8AVQ",title:"[Official Audio] 장기하와 얼굴들 (Kiha & The Faces) - 풍문으로 들었소",thumbNail:"https://i.ytimg.com/vi/KcjjTWn8AVQ/hqdefault.jpg"},
//   {id:"euI-C1YONaU",title:"Give You My Heart (마음을 드려요)",thumbNail:"https://i.ytimg.com/vi/euI-C1YONaU/hqdefault.jpg"},
//   {id:"PfpERIQXIrk",title:"소녀 A Little Girl",thumbNail:"https://i.ytimg.com/vi/PfpERIQXIrk/hqdefault.jpg"},
//   {id:"N4RAUQAQC5k",title:"Beautiful Moment (내 생에 아름다운)",thumbNail:"https://i.ytimg.com/vi/N4RAUQAQC5k/hqdefault.jpg"},
//   {id:"UidhQTm1ulw",title:"폴킴 - 안녕 (호텔 델루나 OST PART.10) / 가사",thumbNail:"https://i.ytimg.com/vi/UidhQTm1ulw/hqdefault.jpg"},
//   {id:"Nqgvs9Ca6Dg",title:"안녕 - 효린",thumbNail:"https://i.ytimg.com/vi/Nqgvs9Ca6Dg/hqdefault.jpg"},
//   {id:"iIaH6nJHv1k",title:"써니힐(Sunny Hill) 두근두근  (가사 첨부)",thumbNail:"https://i.ytimg.com/vi/iIaH6nJHv1k/hqdefault.jpg"},
//   {id:"0OPQxgtarQk",title:"좋은 날 Good Day",thumbNail:"https://i.ytimg.com/vi/0OPQxgtarQk/hqdefault.jpg"},
//   {id:"YBEUXfT7_48",title:"[멜로가 체질 OST Part 3] 장범준 (Beom June Jang) - 흔들리는 꽃들 속에서 네 샴푸향이 느껴진거야 MV",thumbNail:"https://i.ytimg.com/vi/YBEUXfT7_48/hqdefault.jpg"},
//   {id:"uG2se-8-BzE",title:"[또 오해영 OST Part 7] 검정치마 - 기다린 만큼, 더 MV",thumbNail:"https://i.ytimg.com/vi/uG2se-8-BzE/hqdefault.jpg"},
//   {id:"Y_8aUSyNM9Y",title:"Borrow your night (Romance 101 X 10CM) (이 밤을 빌려 말해요 (바른연애 길잡이 X...",thumbNail:"https://i.ytimg.com/vi/Y_8aUSyNM9Y/hqdefault.jpg"},
//   {id:"jqZ2Ie4pd30",title:"[응답하라 1988 Part 1] 김필 (Feel Kim) - 청춘 (Feat. 김창완) MV",thumbNail:"https://i.ytimg.com/vi/jqZ2Ie4pd30/hqdefault.jpg"},
// ];

// const 위로 : youtubeType[] = [
//   {id:"HwC3KGJKZIg",title:"2012 월간 윤종신 6월호 - 오르막길 with 정인",thumbNail:"https://i.ytimg.com/vi/HwC3KGJKZIg/hqdefault.jpg"},
//   {id:"02NNuE1ovFI",title:"형",thumbNail:"https://i.ytimg.com/vi/02NNuE1ovFI/hqdefault.jpg"},
//   {id:"bVE1E7FLhS4",title:"가족사진 - 김진호 / 가사(Lyrics)",thumbNail:"https://i.ytimg.com/vi/bVE1E7FLhS4/hqdefault.jpg"},
//   {id:"DVQOazBqfEU",title:"[MV] 월간 윤종신 12월호 '지친 하루' (with 곽진언, 김필)",thumbNail:"https://i.ytimg.com/vi/DVQOazBqfEU/hqdefault.jpg"},
//   {id:"nQNLhUl7AfQ",title:"Would You Like to Walk with Me? (같이 걸을까)",thumbNail:"https://i.ytimg.com/vi/nQNLhUl7AfQ/hqdefault.jpg"},
//   {id:"Dic27EnDDls",title:"[응답하라 1988 Part 2] 이적 - 걱정말아요 그대 (Don't worry)",thumbNail:"https://i.ytimg.com/vi/Dic27EnDDls/hqdefault.jpg"},
//   {id:"XLn4LBzo_60",title:"Standing EGG - 내게 기대 with 박세영",thumbNail:"https://i.ytimg.com/vi/XLn4LBzo_60/hqdefault.jpg"},
//   {id:"YPBeItQC2Cw",title:"Hug Me (안아줘)",thumbNail:"https://i.ytimg.com/vi/YPBeItQC2Cw/hqdefault.jpg"},
//   {id: 'yOHv5yjskJg', title: '[MV] 어반자카파 (URBAN ZAKAPA) - 위로 (Consolation)', thumbNail: 'https://i.ytimg.com/vi/yOHv5yjskJg/hqdefault.jpg'},
//   {id: 'pC6tPEaAiYU', title: 'HYUKOH(혁오) - TOMBOY(톰보이 뮤직비디오) M/V', thumbNail: 'https://i.ytimg.com/vi/pC6tPEaAiYU/hqdefault.jpg'},
//   {id: 'f2Pee5hnO-E', title: '어른 Grown Ups', thumbNail: 'https://i.ytimg.com/vi/f2Pee5hnO-E/hqdefault.jpg'},
//   {id:"5iSlfF8TQ9k",title:"LEE HI - '한숨 (BREATHE)' M/V",thumbNail:"https://i.ytimg.com/vi/5iSlfF8TQ9k/hqdefault.jpg"},
//   {id:"gHQGYcinaTA",title:"내가 니편이 되어 줄게 I Will Be on Your Side",thumbNail:"https://i.ytimg.com/vi/gHQGYcinaTA/hqdefault.jpg"},
//   {id:"PfpERIQXIrk",title:"소녀 A Little Girl",thumbNail:"https://i.ytimg.com/vi/PfpERIQXIrk/hqdefault.jpg"},
//   {id: 'r-YG9ytxP4c', title: "Cause It's First Time (처음이니까)", thumbNail: 'https://i.ytimg.com/vi/r-YG9ytxP4c/hqdefault.jpg'},
//   {id:"3gMAEZCOFtE",title:"볼빨간사춘기(BOL4) - 나의 사춘기에게 [가사/Lyrics]",thumbNail:"https://i.ytimg.com/vi/3gMAEZCOFtE/hqdefault.jpg"},
//   {id:"dSTm9p6koC8",title:"[MV] Younha(윤하) _ Snail mail(느린 우체통)",thumbNail:"https://i.ytimg.com/vi/dSTm9p6koC8/hqdefault.jpg"},
//   {id: 'fhRvMJ8RAS8', title: 'Today (오늘)', thumbNail: 'https://i.ytimg.com/vi/fhRvMJ8RAS8/hqdefault.jpg'},
//   {id:"uBGKjMzibjQ",title:"[후아유 - 학교 2015 OST Part 5] 윤하 (Younha) - 기도 (Pray)",thumbNail:"https://i.ytimg.com/vi/uBGKjMzibjQ/hqdefault.jpg"},
//   {id:"n7rMO6jYrSk",title:"너의 얘길 들어줄게 I will listen never alone",thumbNail:"https://i.ytimg.com/vi/n7rMO6jYrSk/hqdefault.jpg"},
// ];

// const 감성 : youtubeType[] = [
//   {id:"WlVxEZy85m8",title:"[Official Audio] 카더가든 (Car, the garden)  - 명동콜링",thumbNail:"https://i.ytimg.com/vi/WlVxEZy85m8/hqdefault.jpg"},
//   {id:"zq8KlFalE10",title:"STANDING EGG - 예뻐서 그래",thumbNail:"https://i.ytimg.com/vi/zq8KlFalE10/hqdefault.jpg"},
//   {id:"Iu-NVopNDKU",title:"십센치 / 10cm - '스토커 (Stalker)' Official Music Video",thumbNail:"https://i.ytimg.com/vi/Iu-NVopNDKU/hqdefault.jpg"},
//   {id:"ZL7VL27ztyY",title:"사랑이 다른 사랑으로 잊혀지네",thumbNail:"https://i.ytimg.com/vi/ZL7VL27ztyY/hqdefault.jpg"},
//   {id:"4zRwL6B9zZ4",title:"[MV] URBAN ZAKAPA(어반자카파) _ You're The Reason(이 밤이 특별해진 건)",thumbNail:"https://i.ytimg.com/vi/4zRwL6B9zZ4/hqdefault.jpg"},
//   {id: 'V6UAZSRV_vA', title: '대화가 필요해 - 바닐라어쿠스틱' , thumbNail: 'https://i.ytimg.com/vi/V6UAZSRV_vA/hqdefault.jpg'},
//   {id:"yOZNN5xrK2o",title:"[MV] Jang Beom June(장범준) _ every moment with you(당신과는 천천히)",thumbNail:"https://i.ytimg.com/vi/yOZNN5xrK2o/hqdefault.jpg"},
//   {id:"WWPSJUfIick",title:"Standing Egg - 사랑한대 with Windy",thumbNail:"https://i.ytimg.com/vi/WWPSJUfIick/hqdefault.jpg"},
//   {id: 'Gq_hihlc3b0', title: 'Madeleine Love (Madeleine Love)', thumbNail: 'https://i.ytimg.com/vi/Gq_hihlc3b0/hqdefault.jpg'},
//   {id:"v224EdAkZr8",title:"박재범 (Jay Park) - ‘GANADARA (Feat. 아이유 IU)’ (Official Audio)",thumbNail:"https://i.ytimg.com/vi/v224EdAkZr8/hqdefault.jpg"},
//   {id:"CmMl1jfkRjY",title:"[Official Audio] 델리스파이스(DELISPICE) - 챠우챠우",thumbNail:"https://i.ytimg.com/vi/CmMl1jfkRjY/hqdefault.jpg"},
//   {id:"ct9pZdJHMrs",title:"밤이 깊었네 (밤이 깊었네)",thumbNail:"https://i.ytimg.com/vi/ct9pZdJHMrs/hqdefault.jpg"},
//   {id: 'pq6Xwpfk98I', title: '가끔 미치도록 네가 안고 싶어질 때가 있어', thumbNail: 'https://i.ytimg.com/vi/pq6Xwpfk98I/hqdefault.jpg'},
//   {id: '1uvjBJTbAzw', title: '말꼬리 - 정준일, 윤종신', thumbNail: 'https://i.ytimg.com/vi/1uvjBJTbAzw/hqdefault.jpg'},
//   {id:"w7rdeekhrio",title:"이더 - 낮과 밤의 틈에서 너를 생각해 (Day N Night) | 가사",thumbNail:"https://i.ytimg.com/vi/w7rdeekhrio/hqdefault.jpg"},
//   {id: 'Ugmif2uglCo', title: '버스커 버스커(Busker Busker) - 동경소녀(Dream Girl)', thumbNail: 'https://i.ytimg.com/vi/Ugmif2uglCo/hqdefault.jpg'},
//   {id: 'Td7bmq-CIKE', title: '[Special clip] Lee Juck(이적)(duet with Jung In(정인))_Before Sunrise(비포선라이즈) [ENG/JPN SUB]', thumbNail: 'https://i.ytimg.com/vi/Td7bmq-CIKE/hqdefault.jpg'},
//   {id: 'gdj6a0hv0Uk', title: '벌써 일년', thumbNail: 'https://i.ytimg.com/vi/gdj6a0hv0Uk/hqdefault.jpg'},
//   {id:"qMkQ3lAD418",title:"위로 Consolation",thumbNail:"https://i.ytimg.com/vi/qMkQ3lAD418/hqdefault.jpg"},
//   {id:"Y_8aUSyNM9Y",title:"Borrow your night (Romance 101 X 10CM) (이 밤을 빌려 말해요 (바른연애 길잡이 X...",thumbNail:"https://i.ytimg.com/vi/Y_8aUSyNM9Y/hqdefault.jpg"},
//   {id:"TyvZEqC1E1g",title:"백사(104) - 너의 로맨스에 내 이름을 써줘 | 가사 (Lyrics)",thumbNail:"https://i.ytimg.com/vi/TyvZEqC1E1g/hqdefault.jpg"},
//   {id:"P5g15bHBxXM",title:"Flicker (feat. Car, the garden) (깜빡 (feat. 카더가든))",thumbNail:"https://i.ytimg.com/vi/P5g15bHBxXM/hqdefault.jpg"},
// ];

// const 추억 : youtubeType[] = [
//   {id:"8vL_nWjFTPk",title:"Nell -  기억을 걷는 시간",thumbNail:"https://i.ytimg.com/vi/8vL_nWjFTPk/hqdefault.jpg"},
//   {id:"O92yHB0MDZ8",title:"[MV] Urban Zakapa(어반자카파) _ When we were two(그때의 나, 그때의 우리)",thumbNail:"https://i.ytimg.com/vi/O92yHB0MDZ8/hqdefault.jpg"},
//   {id:"Q_YdBd05FJs",title:"나얼 (NAUL) - 같은 시간 속의 너 MV",thumbNail:"https://i.ytimg.com/vi/Q_YdBd05FJs/hqdefault.jpg"},
//   {id:"oJw1FaR85dw",title:"[#2521] 스물다섯, 스물하나 - 자우림 (가사/해석/번역/lyrics) | #twentyfivetwentyone (NETFLIX) OST",thumbNail:"https://i.ytimg.com/vi/oJw1FaR85dw/hqdefault.jpg"},
//   {id:"ZGReh7eNTUU",title:"[MV] 어반자카파 (URBAN ZAKAPA) - 그날에 우리 (My Love)",thumbNail:"https://i.ytimg.com/vi/ZGReh7eNTUU/hqdefault.jpg"},
//   {id:"acdAWdnSKmE",title:"럼블피쉬_비와 당신",thumbNail:"https://i.ytimg.com/vi/acdAWdnSKmE/hqdefault.jpg"},
//   {id:"2SnfFChl8-Q",title:"어반 자카파 (Urban Zakapa) - 떠나는 사람, 남겨진 사람",thumbNail:"https://i.ytimg.com/vi/2SnfFChl8-Q/hqdefault.jpg"},
//   {id:"EqxFBfMykok",title:"(가사) 늦은 후회  - 보보",thumbNail:"https://i.ytimg.com/vi/EqxFBfMykok/hqdefault.jpg"},
//   {id: 'WRwCQvpD_B4', title: '이적 - 그땐 미처 알지 못했지', thumbNail: 'https://i.ytimg.com/vi/WRwCQvpD_B4/hqdefault.jpg'},
//   {id:"jqZ2Ie4pd30",title:"[응답하라 1988 Part 1] 김필 (Feel Kim) - 청춘 (Feat. 김창완) MV",thumbNail:"https://i.ytimg.com/vi/jqZ2Ie4pd30/hqdefault.jpg"},
// ];

// const 이별 : youtubeType[] = [
//   {id:"8BzmSqVYsRk",title:"Laundry (빨래)",thumbNail:"https://i.ytimg.com/vi/8BzmSqVYsRk/hqdefault.jpg"},
//   {id:"Z1pGxkXyDvc",title:"[MV] BOL4, 20 Years Of Age(볼빨간사춘기, 스무살) _ We Loved(남이 될 수 있을까)",thumbNail:"https://i.ytimg.com/vi/Z1pGxkXyDvc/hqdefault.jpg"},
//   {id:"p5btVHol-kM",title:"버스커 버스커 (Busker Busker) - 그댈 마주하는건 힘들어 (그마힘)",thumbNail:"https://i.ytimg.com/vi/p5btVHol-kM/hqdefault.jpg"},
//   {id:"wxxb311BWRM",title:"이별택시 -- 김연우",thumbNail:"https://i.ytimg.com/vi/wxxb311BWRM/hqdefault.jpg"},
//   {id:"pvymFjKmMiY",title:"다비치(Davichi) 편지 (가사 첨부)",thumbNail:"https://i.ytimg.com/vi/pvymFjKmMiY/hqdefault.jpg"},
//   {id:"zlEdKi8MYBs",title:"STANDING EGG - 넌 이별 난 아직",thumbNail:"https://i.ytimg.com/vi/zlEdKi8MYBs/hqdefault.jpg"},
//   {id:"3ZjndJ3ZFg4",title:"[MV] 월간 윤종신 10월호 '고요' (with 정준일)",thumbNail:"https://i.ytimg.com/vi/3ZjndJ3ZFg4/hqdefault.jpg"},
//   {id:"lvx8NejYwtM",title:"[나인 NINE OST] 어반자카파 (Urban Zakapa) - 그냥 조금 MV",thumbNail:"https://i.ytimg.com/vi/lvx8NejYwtM/hqdefault.jpg"},
//   {id:"VapvGNv8lcw",title:"[MV] 어반자카파 (URBAN ZAKAPA) - 똑같은 사랑 똑같은 이별 (All the Same)",thumbNail:"https://i.ytimg.com/vi/VapvGNv8lcw/hqdefault.jpg"},
//   {id:"akIRcrYRMbs",title:"Announce (Feat. Ben Of Bebe Mignon) (고해요 (Feat. Ben Of Bebe Mignon))",thumbNail:"https://i.ytimg.com/vi/akIRcrYRMbs/hqdefault.jpg"},
//   {id:"zmMiATGtHAU",title:"Because Of You (Feat. Soulman)",thumbNail:"https://i.ytimg.com/vi/zmMiATGtHAU/hqdefault.jpg"},
//   {id:"i1yGWZblYEA",title:"더딘 하루",thumbNail:"https://i.ytimg.com/vi/i1yGWZblYEA/hqdefault.jpg"},
//   {id: 'N1q3XKfmI5w', title: "[VIBE/바이브]  3RD ALBUM 'Re-Feel' - 그남자 그여자 (Feat. 장혜진) OFFICIAL MV", thumbNail: 'https://i.ytimg.com/vi/N1q3XKfmI5w/hqdefault.jpg'},
//   {id: 'I7EwLNhPgpg', title: '돌아오지마 (Feat. 용준형 of 비스트)', thumbNail: 'https://i.ytimg.com/vi/I7EwLNhPgpg/hqdefault.jpg'},
//   {id: 'wLdbyoGRMmw', title: 'Anymore (부담이 돼) (feat.Whee) (휘인) In of MAMAMOO (마마무)', thumbNail: 'https://i.ytimg.com/vi/wLdbyoGRMmw/hqdefault.jpg'},
//   {id:"mo9zv9P-anI",title:"[MV] BOL4(볼빨간사춘기) - Space(너는 내 세상이었어)",thumbNail:"https://i.ytimg.com/vi/mo9zv9P-anI/hqdefault.jpg"},
//   {id:"A1tZgPAcpjE",title:"Baby I need you (사랑하긴 했었나요 스쳐가는 인연이었나요 짧지않은 우리...",thumbNail:"https://i.ytimg.com/vi/A1tZgPAcpjE/hqdefault.jpg"},
//   {id:"FIdFoxVnGgE",title:"신예영 - 우리 왜 헤어져야 해 / 가사",thumbNail:"https://i.ytimg.com/vi/FIdFoxVnGgE/hqdefault.jpg"},
//   {id:"R427bHaESSA",title:"Get Ready To Leave (떠나보낼 준비해 둘걸 그랬어)",thumbNail:"https://i.ytimg.com/vi/R427bHaESSA/hqdefault.jpg"},
//   {id:"f1-SzrEdbfw",title:"Still Alive",thumbNail:"https://i.ytimg.com/vi/f1-SzrEdbfw/hqdefault.jpg"},
// ];

// const 그리움 : youtubeType[] = [
//   {id:"cn8gCkw6H5A",title:"Do you want to walk with me? (Romance 101 X Jukjae) (나랑 같이 걸을래 (바른연애...",thumbNail:"https://i.ytimg.com/vi/cn8gCkw6H5A/hqdefault.jpg"},
//   {id:"euI-C1YONaU",title:"Give You My Heart (마음을 드려요)",thumbNail:"https://i.ytimg.com/vi/euI-C1YONaU/hqdefault.jpg"},
//   {id:"d5d7h73GCs4",title:"2013 월간 윤종신 Repair 12월호 - 1월부터 6월까지 (MV)",thumbNail:"https://i.ytimg.com/vi/d5d7h73GCs4/hqdefault.jpg"},
//   {id:"5mdaJH5QCo0",title:"2013 월간 윤종신 Repair 12월호 - 오래전 그날 with 이적 (MV)",thumbNail:"https://i.ytimg.com/vi/5mdaJH5QCo0/hqdefault.jpg"},
//   {id:"Frs7j21R4Cc",title:"CHEEZE / 치즈 - '어떻게 생각해 (How Do You Think)' Official Music Video",thumbNail:"https://i.ytimg.com/vi/Frs7j21R4Cc/hqdefault.jpg"},
//   {id:"nteCoZ3ZX_Q",title:"4.정말로 사랑한다면 - If You Really Love Me",thumbNail:"https://i.ytimg.com/vi/nteCoZ3ZX_Q/hqdefault.jpg"},
//   {id:"O92yHB0MDZ8",title:"[MV] Urban Zakapa(어반자카파) _ When we were two(그때의 나, 그때의 우리)",thumbNail:"https://i.ytimg.com/vi/O92yHB0MDZ8/hqdefault.jpg"},
//   {id:"acdAWdnSKmE",title:"럼블피쉬_비와 당신",thumbNail:"https://i.ytimg.com/vi/acdAWdnSKmE/hqdefault.jpg"},
//   {id:"g76fnpvt4l4",title:"[MV] 헤이즈 (Heize) - 내 맘을 볼수 있나요 (Can You See My Heart) [Hotel Del Luna OST Part 5]",thumbNail:"https://i.ytimg.com/vi/g76fnpvt4l4/hqdefault.jpg"},
//   {id: '61bsWxIcDww', title: '흔들어 Shake', thumbNail: 'https://i.ytimg.com/vi/61bsWxIcDww/hqdefault.jpg'},
//   {id:"Xrcj05MI1q4",title:"Huh Gak(허각) - 향기만 남아",thumbNail:"https://i.ytimg.com/vi/Xrcj05MI1q4/hqdefault.jpg"},
//   {id:"wrmyqKRGW-0",title:"[MV] 우효(OOHYO) _ 청춘(Youth) (DAY)",thumbNail:"https://i.ytimg.com/vi/wrmyqKRGW-0/hqdefault.jpg"},
//   {id:"EY1OoWEjf-c",title:"With a smile (웃으며)",thumbNail:"https://i.ytimg.com/vi/EY1OoWEjf-c/hqdefault.jpg"},
// ];

// const 사랑에빠지고싶은 : youtubeType[] = [
//   {id:"hAzpd59SLYA",title:"Cocktail Love (feat. Uyeon)",thumbNail:"https://i.ytimg.com/vi/hAzpd59SLYA/hqdefault.jpg"},
//   {id:"VaJgGuDz1vk",title:"[MP3/DL] Urban Zakapa (어반 자카파) – Get (Feat. Beenzino)",thumbNail:"https://i.ytimg.com/vi/VaJgGuDz1vk/hqdefault.jpg"},
//   {id:"MI5ZIfD8n9s",title:"Dash",thumbNail:"https://i.ytimg.com/vi/MI5ZIfD8n9s/hqdefault.jpg"},
//   {id:"seoMQRbOHSk",title:"볼빨간사춘기 (Bolbbalgan4) - 심술 (Mean) [MP3 Audio]",thumbNail:"https://i.ytimg.com/vi/seoMQRbOHSk/hqdefault.jpg"},
//   {id:"DuxLQ-5ZJA8",title:"강승윤(Kang Seung Yoon) - 본능적으로(Instinctively)",thumbNail:"https://i.ytimg.com/vi/DuxLQ-5ZJA8/hqdefault.jpg"},
//   {id:"vCXkLKb7wso",title:"죠지 - 좋아해.. (바른연애 길잡이 X 죠지) / 가사",thumbNail:"https://i.ytimg.com/vi/vCXkLKb7wso/hqdefault.jpg"},
//   {id:"5xY6x46mz5s",title:"Like You (feat. INVIZ) (prod. IVY GROUND) (좋아해 (feat. 인비즈) (prod. IVY GROUND))",thumbNail:"https://i.ytimg.com/vi/5xY6x46mz5s/hqdefault.jpg"},
//   {id:"IdzQrTRRZJ8",title:"Like you",thumbNail:"https://i.ytimg.com/vi/IdzQrTRRZJ8/hqdefault.jpg"},
//   {id: 'kwAlg7FUqHY', title: 'Davichi - My Man', thumbNail: 'https://i.ytimg.com/vi/kwAlg7FUqHY/hqdefault.jpg'},
//   {id: '4A4O7SP5fa0',title: '버스커 버스커(Busker Busker) - 정류장(Bus Stop)',thumbNail: 'https://i.ytimg.com/vi/4A4O7SP5fa0/hqdefault.jpg',},
//   {id:"Frs7j21R4Cc",title:"CHEEZE / 치즈 - '어떻게 생각해 (How Do You Think)' Official Music Video",thumbNail:"https://i.ytimg.com/vi/Frs7j21R4Cc/hqdefault.jpg"},
//   {id:"Jr0OmC_QMoo",title:"Standing EGG - 고백",thumbNail:"https://i.ytimg.com/vi/Jr0OmC_QMoo/hqdefault.jpg"},
//   {id:"2VkWaOOF4Rc",title:"가까운 듯 먼 그대여 (Closely Far Away)",thumbNail:"https://i.ytimg.com/vi/2VkWaOOF4Rc/hqdefault.jpg"},
//   {id:"C0B7Az0XqdY",title:"구애 Propose",thumbNail:"https://i.ytimg.com/vi/C0B7Az0XqdY/hqdefault.jpg"},{id:"uaejCvCMu5I",title:"낙하 (NAKKA) (with IU)",thumbNail:"https://i.ytimg.com/vi/uaejCvCMu5I/hqdefault.jpg"},
// ];

// const 사랑 : youtubeType[] = [
//   {id:"zjVt73gD1fc",title:"She Is",thumbNail:"https://i.ytimg.com/vi/zjVt73gD1fc/hqdefault.jpg"},
//   {id:"zq8KlFalE10",title:"STANDING EGG - 예뻐서 그래",thumbNail:"https://i.ytimg.com/vi/zq8KlFalE10/hqdefault.jpg"},
//   {id:"w7rdeekhrio",title:"이더 - 낮과 밤의 틈에서 너를 생각해 (Day N Night) | 가사",thumbNail:"https://i.ytimg.com/vi/w7rdeekhrio/hqdefault.jpg"},
//   {id: '8JjhQj6rQAA', title: 'Mnet [슈퍼스타K6] 곽진언, 김필, 임도혁 - 당신만이 MV', thumbNail: 'https://i.ytimg.com/vi/8JjhQj6rQAA/hqdefault.jpg'},
//   {id:"59y92uRqV7g",title:"Relieved (다행이다)",thumbNail:"https://i.ytimg.com/vi/59y92uRqV7g/hqdefault.jpg"},
//   {id:"1H4ViIioCAs",title:"NS Yoon-G, (NS윤지) - If You Love Me ft. Jay Park",thumbNail:"https://i.ytimg.com/vi/1H4ViIioCAs/hqdefault.jpg"},
//   {id:"lT7Q93fy1us",title:"Jay Park X 1MILLION / 'All I Wanna Do (K) (feat. Hoody & Loco)' [Choreography Version]",thumbNail:"https://i.ytimg.com/vi/lT7Q93fy1us/hqdefault.jpg"},
//   {id:"QJBAhevBZ0A",title:"1시간 / 가사 | 아이유 (IU) - 너의 의미 (Feat. 김창완) | 앨범 : 꽃갈피",thumbNail:"https://i.ytimg.com/vi/QJBAhevBZ0A/hqdefault.jpg"},
//   {id:"BzYnNdJhZQw",title:"[MV] IU(아이유) _ Through the Night(밤편지)",thumbNail:"https://i.ytimg.com/vi/BzYnNdJhZQw/hqdefault.jpg"},
//   {id:"EiVmQZwJhsA",title:"[MV] IU(아이유) _ Friday(금요일에 만나요) (Feat. Jang Yi-jeong(장이정) of HISTORY(히스토리))",thumbNail:"https://i.ytimg.com/vi/EiVmQZwJhsA/hqdefault.jpg"},
//   {id:"qYYJqWsBb1U",title:"[MV] MeloMance(멜로망스) _ Gift(선물)",thumbNail:"https://i.ytimg.com/vi/qYYJqWsBb1U/hqdefault.jpg"},
//   {id:"WYy2fROj7uU",title:"[MV] Han Dong Geun(한동근) _ Amazing You(그대라는 사치)",thumbNail:"https://i.ytimg.com/vi/WYy2fROj7uU/hqdefault.jpg"},
//   {id:"b_6EfFZyBxY",title:"경서예지 X 전건호 - 다정히 내 이름을 부르면 / 가사",thumbNail:"https://i.ytimg.com/vi/b_6EfFZyBxY/hqdefault.jpg"},
//   {id:"4zRwL6B9zZ4",title:"[MV] URBAN ZAKAPA(어반자카파) _ You're The Reason(이 밤이 특별해진 건)",thumbNail:"https://i.ytimg.com/vi/4zRwL6B9zZ4/hqdefault.jpg"},
//   {id:"L8UUYfe6-UA",title:"[MV] BOL4(볼빨간사춘기) _ Leo(나비와 고양이) (feat. BAEKHYUN(백현))",thumbNail:"https://i.ytimg.com/vi/L8UUYfe6-UA/hqdefault.jpg"},
//   {id:"E35In9bsWh4",title:"[Lyrics Video] BOL4(볼빨간사춘기) - Love story",thumbNail:"https://i.ytimg.com/vi/E35In9bsWh4/hqdefault.jpg"},
//   {id:"7ufHeqcV7tY",title:"다비치 - 녹는중",thumbNail:"https://i.ytimg.com/vi/7ufHeqcV7tY/hqdefault.jpg"},
//   {id:"UoBsiQW23IY",title:"[MV] MeloMance(멜로망스) _ Love, Maybe(사랑인가 봐) (사내맞선 OST 스페셜 트랙(A Business Proposal OST Special Track))",thumbNail:"https://i.ytimg.com/vi/UoBsiQW23IY/hqdefault.jpg"},
//   {id:"ll_4Np_vu7k",title:"좋다 Like You",thumbNail:"https://i.ytimg.com/vi/ll_4Np_vu7k/hqdefault.jpg"},
//   {id:"lOAP0B8mDts",title:"Fall in love with you",thumbNail:"https://i.ytimg.com/vi/lOAP0B8mDts/hqdefault.jpg"},
//   {id:"fNpTIbsagpw",title:"나 왜이래 | Why Am I Like This (Feat. 강민희 of 미스에스)",thumbNail:"https://i.ytimg.com/vi/fNpTIbsagpw/hqdefault.jpg"},
//   {id:"A8JtvN_Uz4E",title:"I'II be your star (넌 내게 특별하고)",thumbNail:"https://i.ytimg.com/vi/A8JtvN_Uz4E/hqdefault.jpg"},
//   {id:"iIaH6nJHv1k",title:"써니힐(Sunny Hill) 두근두근  (가사 첨부)",thumbNail:"https://i.ytimg.com/vi/iIaH6nJHv1k/hqdefault.jpg"},
//   {id:"AL2E1JDw2cA",title:"박경 (Park Kyung) - 자격지심 (Inferiority Complex) (Feat. 은하 of 여자친구) MV",thumbNail:"https://i.ytimg.com/vi/AL2E1JDw2cA/hqdefault.jpg"},
//   {id:"cHkDZ1ekB9U",title:"[MV] Car, the garden(카더가든) _ Tree(나무)",thumbNail:"https://i.ytimg.com/vi/cHkDZ1ekB9U/hqdefault.jpg"},
//   {id:"iAfxyHOmHrM",title:"경서 - 나의 X에게 || 가사",thumbNail:"https://i.ytimg.com/vi/iAfxyHOmHrM/hqdefault.jpg"},
//   {id:"M3R7g3lfYmc",title:"in the bed (동거 (in the bed))",thumbNail:"https://i.ytimg.com/vi/M3R7g3lfYmc/hqdefault.jpg"},
// ];

// const 의미 : youtubeType[] = [
//   {id:"HwC3KGJKZIg",title:"2012 월간 윤종신 6월호 - 오르막길 with 정인",thumbNail:"https://i.ytimg.com/vi/HwC3KGJKZIg/hqdefault.jpg"},
//   {id:"02NNuE1ovFI",title:"형",thumbNail:"https://i.ytimg.com/vi/02NNuE1ovFI/hqdefault.jpg"},
//   {id:"bVE1E7FLhS4",title:"가족사진 - 김진호 / 가사(Lyrics)",thumbNail:"https://i.ytimg.com/vi/bVE1E7FLhS4/hqdefault.jpg"},
//   {id:"DVQOazBqfEU",title:"[MV] 월간 윤종신 12월호 '지친 하루' (with 곽진언, 김필)",thumbNail:"https://i.ytimg.com/vi/DVQOazBqfEU/hqdefault.jpg"},
//   {id:"nQNLhUl7AfQ",title:"Would You Like to Walk with Me? (같이 걸을까)",thumbNail:"https://i.ytimg.com/vi/nQNLhUl7AfQ/hqdefault.jpg"},
//   {id:"Dic27EnDDls",title:"[응답하라 1988 Part 2] 이적 - 걱정말아요 그대 (Don't worry)",thumbNail:"https://i.ytimg.com/vi/Dic27EnDDls/hqdefault.jpg"},
//   {id: 'wTeiabRmcsQ', title: '출발 - 김동률 ( 가사 )', thumbNail: 'https://i.ytimg.com/vi/wTeiabRmcsQ/hqdefault.jpg'},
//   {id:"V9vZPlZ0xhE",title:"Your scent (사람냄새)",thumbNail:"https://i.ytimg.com/vi/V9vZPlZ0xhE/hqdefault.jpg"},
//   {id:"5iSlfF8TQ9k",title:"LEE HI - '한숨 (BREATHE)' M/V",thumbNail:"https://i.ytimg.com/vi/5iSlfF8TQ9k/hqdefault.jpg"},
//   {id: '58IEh6YkuzQ', title: 'Oort Cloud (오르트구름)', thumbNail: 'https://i.ytimg.com/vi/58IEh6YkuzQ/hqdefault.jpg'},
//   {id: 'hmOOkmynj4A', title: '허회경 - 그렇게 살아가는 것 | 가사', thumbNail: 'https://i.ytimg.com/vi/hmOOkmynj4A/hqdefault.jpg'},
//   {id:"io2noxQ5mnA",title:"Kim Cheolsu Story (김철수 씨 이야기)",thumbNail:"https://i.ytimg.com/vi/io2noxQ5mnA/hqdefault.jpg"},
// ];

// const 보고픔: youtubeType[] = [
//   {id:"s74ZqkpRFhI",title:"CHEEZE(치즈) - 이렇게 좋아해 본 적이 없어요 (소녀의 세계 X CHEEZE(치즈)) | 가사",thumbNail:"https://i.ytimg.com/vi/s74ZqkpRFhI/hqdefault.jpg"},
//   {id:"AsXxuIdpkWM",title:"[MV] BOL4(볼빨간사춘기) _ Bom(나만, 봄)",thumbNail:"https://i.ytimg.com/vi/AsXxuIdpkWM/hqdefault.jpg"},
//   {id:"BzYnNdJhZQw",title:"[MV] IU(아이유) _ Through the Night(밤편지)",thumbNail:"https://i.ytimg.com/vi/BzYnNdJhZQw/hqdefault.jpg"},
//   {id: '4zRwL6B9zZ4', title: "[MV] URBAN ZAKAPA(어반자카파) _ You're The Reason(이 밤이 특별해진 건)", thumbNail: 'https://i.ytimg.com/vi/4zRwL6B9zZ4/hqdefault.jpg'},
//   {id: 'opS4-NHu0fM', title: '생각이나', thumbNail: 'https://i.ytimg.com/vi/opS4-NHu0fM/hqdefault.jpg'},
//   {id: 'OOi5Qa8jk1o', title: "괜찮아 사랑이야 It's alright This is Love", thumbNail: 'https://i.ytimg.com/vi/OOi5Qa8jk1o/hqdefault.jpg'},
//   {id: 'O136JYv3weQ', title: '[MV] CHEEZE(치즈) _ Love You(좋아해)(bye)', thumbNail: 'https://i.ytimg.com/vi/O136JYv3weQ/hqdefault.jpg'},
//   {id:"CmMl1jfkRjY",title:"[Official Audio] 델리스파이스(DELISPICE) - 챠우챠우",thumbNail:"https://i.ytimg.com/vi/CmMl1jfkRjY/hqdefault.jpg"},
//   {id: 'wsMbK9VHc2Y', title: 'Teddy Bear Rises - OOHYO | Remix by Long Nhat', thumbNail: 'https://i.ytimg.com/vi/wsMbK9VHc2Y/hqdefault.jpg'},
//   {id: 'TlaGDYbxnJk', title: '별 보러 가자', thumbNail: 'https://i.ytimg.com/vi/TlaGDYbxnJk/hqdefault.jpg'},
//   {id:"SAhVDgj-u6g",title:"Poem for you (나 그댈위해 시 한편을 쓰겠어)",thumbNail:"https://i.ytimg.com/vi/SAhVDgj-u6g/hqdefault.jpg"},
// ];

// const 신나는여행: youtubeType[] = [
//   {id:"o2Q36kmazCs",title:"[MV] Lee Juck(이적) _ With you(그대랑)",thumbNail:"https://i.ytimg.com/vi/o2Q36kmazCs/hqdefault.jpg"},
//   {id:"xRbPAVnqtcs",title:"[MV] BOL4(볼빨간사춘기) _ Travel(여행)",thumbNail:"https://i.ytimg.com/vi/xRbPAVnqtcs/hqdefault.jpg"},
//   {id:"c39i3mjROmo",title:"여행을 떠나요 - 이승기",thumbNail:"https://i.ytimg.com/vi/c39i3mjROmo/hqdefault.jpg"},
//   {id:"xwaoYLjibeg",title:"이적- 하늘을 달리다( 2003 ) [ Running in the sky ]",thumbNail:"https://i.ytimg.com/vi/xwaoYLjibeg/hqdefault.jpg"},
//   {id:"dMDouzr0OOI",title:"03. 바람났어 花天酒地 feat.박봄[朴春] - GG（박명수 & G-Dragon）",thumbNail:"https://i.ytimg.com/vi/dMDouzr0OOI/hqdefault.jpg"},
//   {id:"N7VBSaZ-jKQ",title:"[HQ] Kim hyun jung (김현정) - bruise (멍)",thumbNail:"https://i.ytimg.com/vi/N7VBSaZ-jKQ/hqdefault.jpg"},
//   {id: '1DgL2qqzsIc', title: '[MP3 DL] Mighty Mouth - 랄랄라 (Feat Soya)', thumbNail: 'https://i.ytimg.com/vi/1DgL2qqzsIc/hqdefault.jpg'},
//   {id:"4s2-yDKVeq0",title:"싹쓰리 다시 여기 바닷가 가사 (SSAK3 Beach Again Lyrics) [Color Coded Lyrics/Han/Rom/Eng]",thumbNail:"https://i.ytimg.com/vi/4s2-yDKVeq0/hqdefault.jpg"},
//   {id: 'rl3aRKyDuHg', title: 'VIVA 청춘', thumbNail: 'https://i.ytimg.com/vi/rl3aRKyDuHg/hqdefault.jpg'},
//   {id: 'lNeI3rP71bE', title: '02. 레옹 (Leon) – 이유 갓지(GOD G) 않은 이유 (박명수, 아이유) (Park Myung Soo, IU)', thumbNail: 'https://i.ytimg.com/vi/lNeI3rP71bE/hqdefault.jpg'},
//   {id:"mIrEcebqm20",title:"거북이(Turtles) - 빙고",thumbNail:"https://i.ytimg.com/vi/mIrEcebqm20/hqdefault.jpg"},
//   {id:"MHCBoNhQmCk",title:"[MV]순정 - 코요태(Koyote)",thumbNail:"https://i.ytimg.com/vi/MHCBoNhQmCk/hqdefault.jpg"},
//   {id:"1VdPvAqVrow",title:"[MV] 코요태 (Koyote) - 실연 (Broken Heart)",thumbNail:"https://i.ytimg.com/vi/1VdPvAqVrow/hqdefault.jpg"},
//   {id: '58IEh6YkuzQ', title: 'Oort Cloud (오르트구름)', thumbNail: 'https://i.ytimg.com/vi/58IEh6YkuzQ/hqdefault.jpg'},
// ];

// const 잔잔한여행: youtubeType[] = [
//   {id:"4NCnhPZB9us",title:"여수 밤바다 - 버스커 버스커",thumbNail:"https://i.ytimg.com/vi/4NCnhPZB9us/hqdefault.jpg"},
//   {id:"RT73T-VgeZE",title:"어반 자카파 - 코끝에 겨울",thumbNail:"https://i.ytimg.com/vi/RT73T-VgeZE/hqdefault.jpg"},
//   {id:"ct9pZdJHMrs",title:"밤이 깊었네 (밤이 깊었네)",thumbNail:"https://i.ytimg.com/vi/ct9pZdJHMrs/hqdefault.jpg"},
//   {id:"aruxSQu8rOY",title:"Sung Si Kyung (성시경) - 제주도의 푸른밤 (The Blue Night Of Jeju Island)",thumbNail:"https://i.ytimg.com/vi/aruxSQu8rOY/hqdefault.jpg"},
//   {id: 'wTeiabRmcsQ', title: '출발 - 김동률 ( 가사 )', thumbNail: 'https://i.ytimg.com/vi/wTeiabRmcsQ/hqdefault.jpg'},
//   {id: 'TlaGDYbxnJk', title: '별 보러 가자', thumbNail: 'https://i.ytimg.com/vi/TlaGDYbxnJk/hqdefault.jpg'},
// ];

// const 신나는 : youtubeType[] = [
//   {id:"xEEtcrCH5To",title:"체리필터 - 낭만고양이 | Cherryfilter - Romantic Cat",thumbNail:"https://i.ytimg.com/vi/xEEtcrCH5To/hqdefault.jpg"},
//   {id: 'N7VBSaZ-jKQ', title: '[HQ] Kim hyun jung (김현정) - bruise (멍)', thumbNail: 'https://i.ytimg.com/vi/N7VBSaZ-jKQ/hqdefault.jpg'},
//   {id:"dz6ri1riCi4",title:"좋지 아니한가 Isn't That Good?",thumbNail:"https://i.ytimg.com/vi/dz6ri1riCi4/hqdefault.jpg"},{id:"u-GyXUrEo3Q",title:"넌 내게 반했어 Your Crush on Me",thumbNail:"https://i.ytimg.com/vi/u-GyXUrEo3Q/hqdefault.jpg"},{id:"VcjbIbwJOzc",title:"말 달리자 (말 달리자)",thumbNail:"https://i.ytimg.com/vi/VcjbIbwJOzc/hqdefault.jpg"},{id:"ElQOGND2EKw",title:"Bus 안에서",thumbNail:"https://i.ytimg.com/vi/ElQOGND2EKw/hqdefault.jpg"},{id:"T3eEZ-_2m9w",title:"룩셈부르크 Luxembourg",thumbNail:"https://i.ytimg.com/vi/T3eEZ-_2m9w/hqdefault.jpg"},{id:"M2hlTs4ngsY",title:"솔리드 천생연분",thumbNail:"https://i.ytimg.com/vi/M2hlTs4ngsY/hqdefault.jpg"},
//   {id:"UJn-F2kPCaQ",title:"붉은 노을 (Sunset Glow)",thumbNail:"https://i.ytimg.com/vi/UJn-F2kPCaQ/hqdefault.jpg"},
// ];

// const 잔잔한: youtubeType[] = [
//   {id:"G2fjG30vfYA",title:"겨울을 걷는다 Walking in The Winter",thumbNail:"https://i.ytimg.com/vi/G2fjG30vfYA/hqdefault.jpg"},
//   {id:"5i0j6aosVcg",title:"Standing EGG - 시간이 달라서",thumbNail:"https://i.ytimg.com/vi/5i0j6aosVcg/hqdefault.jpg"},
//   {id:"bW3XExLBf7A",title:"Standing EGG - 오래된 노래",thumbNail:"https://i.ytimg.com/vi/bW3XExLBf7A/hqdefault.jpg"},
//   {id:"xYvO_mYfOfk",title:"그때 그 아인 (Someday, The Boy)",thumbNail:"https://i.ytimg.com/vi/xYvO_mYfOfk/hqdefault.jpg"},
//   {id:"_89SAQOjCEE",title:"lie (미안해)",thumbNail:"https://i.ytimg.com/vi/_89SAQOjCEE/hqdefault.jpg"},
//   {id:"PfpERIQXIrk",title:"소녀 A Little Girl",thumbNail:"https://i.ytimg.com/vi/PfpERIQXIrk/hqdefault.jpg"},
//   {id:"0OPQxgtarQk",title:"좋은 날 Good Day",thumbNail:"https://i.ytimg.com/vi/0OPQxgtarQk/hqdefault.jpg"},
//   {id:"N4RAUQAQC5k",title:"Beautiful Moment (내 생에 아름다운)",thumbNail:"https://i.ytimg.com/vi/N4RAUQAQC5k/hqdefault.jpg"},
//   {id: 'V6UAZSRV_vA', title: '대화가 필요해 - 바닐라어쿠스틱' , thumbNail: 'https://i.ytimg.com/vi/V6UAZSRV_vA/hqdefault.jpg'},
//   {id:"UidhQTm1ulw",title:"폴킴 - 안녕 (호텔 델루나 OST PART.10) / 가사",thumbNail:"https://i.ytimg.com/vi/UidhQTm1ulw/hqdefault.jpg"},
//   {id:"qMkQ3lAD418",title:"위로 Consolation",thumbNail:"https://i.ytimg.com/vi/qMkQ3lAD418/hqdefault.jpg"},
//   {id:"cHkDZ1ekB9U",title:"[MV] Car, the garden(카더가든) _ Tree(나무)",thumbNail:"https://i.ytimg.com/vi/cHkDZ1ekB9U/hqdefault.jpg"},
//   {id: 'TlaGDYbxnJk', title: '별 보러 가자', thumbNail: 'https://i.ytimg.com/vi/TlaGDYbxnJk/hqdefault.jpg'},
//   {id:"SAhVDgj-u6g",title:"Poem for you (나 그댈위해 시 한편을 쓰겠어)",thumbNail:"https://i.ytimg.com/vi/SAhVDgj-u6g/hqdefault.jpg"},
//   {id:"BaSkXnhHizY",title:"있어줘",thumbNail:"https://i.ytimg.com/vi/BaSkXnhHizY/hqdefault.jpg"},
//   {id:"4Mm-K9nhdVQ",title:"((에이틴ost)) 모트-도망가지마/가사/에이틴",thumbNail:"https://i.ytimg.com/vi/4Mm-K9nhdVQ/hqdefault.jpg"},
//   {id: 'gpJnrCkKuPU', title: '우리 사이 은하수를 만들어 Milky Way Between Us', thumbNail: 'https://i.ytimg.com/vi/gpJnrCkKuPU/hqdefault.jpg'},
//   {id:"70KOHwsq3-I",title:"Night Running (Feat. John Park) (Night Running (Feat. 존박))",thumbNail:"https://i.ytimg.com/vi/70KOHwsq3-I/hqdefault.jpg"},
//   {id:"RdpQBa_Vrjw",title:"I Don’t Need You (어떻게 지내 (답가))",thumbNail:"https://i.ytimg.com/vi/RdpQBa_Vrjw/hqdefault.jpg"},
//   {id:"tiFpz-FxSJg",title:"Bye bye my blue",thumbNail:"https://i.ytimg.com/vi/tiFpz-FxSJg/hqdefault.jpg"}
// ];

// const 새드무비감성: youtubeType[] = [
//   {id:"bRvTUid-pBI",title:"Lie Lie Lie (거짓말 거짓말 거짓말)",thumbNail:"https://i.ytimg.com/vi/bRvTUid-pBI/hqdefault.jpg"},
//   {id:"7-Mbuulp5dk",title:"니가 싫어 - 어반 자카파",thumbNail:"https://i.ytimg.com/vi/7-Mbuulp5dk/hqdefault.jpg"},
//   {id:"lvx8NejYwtM",title:"[나인 NINE OST] 어반자카파 (Urban Zakapa) - 그냥 조금 MV",thumbNail:"https://i.ytimg.com/vi/lvx8NejYwtM/hqdefault.jpg"},
//   {id:"Nqgvs9Ca6Dg",title:"안녕 - 효린",thumbNail:"https://i.ytimg.com/vi/Nqgvs9Ca6Dg/hqdefault.jpg"},
//   {id:"0OPQxgtarQk",title:"좋은 날 Good Day",thumbNail:"https://i.ytimg.com/vi/0OPQxgtarQk/hqdefault.jpg"},
//   {id: 'wLdbyoGRMmw', title: 'Anymore (부담이 돼) (feat.Whee) (휘인) In of MAMAMOO (마마무)', thumbNail: 'https://i.ytimg.com/vi/wLdbyoGRMmw/hqdefault.jpg'},
//   {id:"mo9zv9P-anI",title:"[MV] BOL4(볼빨간사춘기) - Space(너는 내 세상이었어)",thumbNail:"https://i.ytimg.com/vi/mo9zv9P-anI/hqdefault.jpg"},
//   {id:"A1tZgPAcpjE",title:"Baby I need you (사랑하긴 했었나요 스쳐가는 인연이었나요 짧지않은 우리...",thumbNail:"https://i.ytimg.com/vi/A1tZgPAcpjE/hqdefault.jpg"},
//   {id:"vR-QAmpbZY8",title:"우리의 밤을 외워요 (우리의 밤을 외워요)",thumbNail:"https://i.ytimg.com/vi/vR-QAmpbZY8/hqdefault.jpg"},
//   {id:"9DuRqJ2WvYg",title:"Why (Feat. Gaeko)",thumbNail:"https://i.ytimg.com/vi/9DuRqJ2WvYg/hqdefault.jpg"},
// ];

// // const 잔잔한무비감성: youtubeType[] = [
// //   {id: 'V6UAZSRV_vA', title: '대화가 필요해 - 바닐라어쿠스틱' , thumbNail: 'https://i.ytimg.com/vi/V6UAZSRV_vA/hqdefault.jpg'},
// //   {id:"UidhQTm1ulw",title:"폴킴 - 안녕 (호텔 델루나 OST PART.10) / 가사",thumbNail:"https://i.ytimg.com/vi/UidhQTm1ulw/hqdefault.jpg"},
// //   {id:"N4RAUQAQC5k",title:"Beautiful Moment (내 생에 아름다운)",thumbNail:"https://i.ytimg.com/vi/N4RAUQAQC5k/hqdefault.jpg"},
// // ];

// const 문득외로움: youtubeType[] = [
//   {id: '1ri7I32Auhg',title: '[M/V] 싸운날 - 볼빨간 사춘기',thumbNail: 'https://i.ytimg.com/vi/1ri7I32Auhg/hqdefault.jpg',},
//   {id:"BbQG-S4mU0U",title:"Baek A Yeon(백아연) \"so-so(쏘쏘)\" M/V",thumbNail:"https://i.ytimg.com/vi/BbQG-S4mU0U/hqdefault.jpg"},
//   {id:"RHH3QxgCfEk",title:"거미-기억상실",thumbNail:"https://i.ytimg.com/vi/RHH3QxgCfEk/hqdefault.jpg"},
//   {id:"PfpERIQXIrk",title:"소녀 A Little Girl",thumbNail:"https://i.ytimg.com/vi/PfpERIQXIrk/hqdefault.jpg"},
//   {id:"Nqgvs9Ca6Dg",title:"안녕 - 효린",thumbNail:"https://i.ytimg.com/vi/Nqgvs9Ca6Dg/hqdefault.jpg"},
//   {id:"0OPQxgtarQk",title:"좋은 날 Good Day",thumbNail:"https://i.ytimg.com/vi/0OPQxgtarQk/hqdefault.jpg"},
//   {id:"uG2se-8-BzE",title:"[또 오해영 OST Part 7] 검정치마 - 기다린 만큼, 더 MV",thumbNail:"https://i.ytimg.com/vi/uG2se-8-BzE/hqdefault.jpg"},
//   {id:"dkdoawhm0i4",title:"비행운",thumbNail:"https://i.ytimg.com/vi/dkdoawhm0i4/hqdefault.jpg"},
//   {id: 'fhRvMJ8RAS8', title: 'Today (오늘)', thumbNail: 'https://i.ytimg.com/vi/fhRvMJ8RAS8/hqdefault.jpg'},
//   {id:"HYlBJskkwjo",title:"잘 지내자, 우리",thumbNail:"https://i.ytimg.com/vi/HYlBJskkwjo/hqdefault.jpg"},
//   {id:"Wws8gzqyGr8",title:"GET SOME AIR (feat.MIWOO) (바람이나 좀 쐐 (FEAT.MIWOO))",thumbNail:"https://i.ytimg.com/vi/Wws8gzqyGr8/hqdefault.jpg"},
//   {id:"fMXsETDG3MU",title:"RIDE",thumbNail:"https://i.ytimg.com/vi/fMXsETDG3MU/hqdefault.jpg"},{id:"vJOk93V7_iE",title:"긴 밤 (feat. GIRIBOY)",thumbNail:"https://i.ytimg.com/vi/vJOk93V7_iE/hqdefault.jpg"},
// ];


// // const get = async(id) => {
  
// //   const fetchData = await (await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=AIzaSyCcKIhVVKArTVQfv8EsHepaGX946cOe_d4&part=snippet,status&fields=items(id,status(embeddable),snippet(title,thumbnails(high(url))))`)).json();
// //   const item = fetchData.items[0];
// //   console.log("item.status.embeddable : "+item.status.embeddable)
// //   const newObj = {
// //     id: item.id,
// //     title: item.snippet.title,
// //     thumbNail: item.snippet.thumbnails.high.url,
// //   };
// //   console.log(newObj)
// //   // console.log(JSON.stringify(newObj))
// //   return newObj;
// // }

// // const g = async(id) => {
  
// //   const fetchData = await (await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=AIzaSyCcKIhVVKArTVQfv8EsHepaGX946cOe_d4&part=snippet,status&fields=items(id,status(embeddable),snippet(title,thumbnails(high(url))))`)).json();
// //   // const item = fetchData.items[0];

// //   const rejectArr = [];
// //   const result = fetchData.items.map((item)=>{
// //     // console.log("item.status.embeddable : "+item.status.embeddable)
// //     if(!item.status.embeddable) {
// //       rejectArr.push({
// //         id: item.id,
// //         title: item.snippet.title,
// //       });
// //     }
// //     const newObj = {
// //       id: item.id,
// //       title: item.snippet.title,
// //       thumbNail: item.snippet.thumbnails.high.url,
// //     };
// //     return newObj;
// //   });

// //   const rejectResult = rejectArr.length === 0 ? "없음" : JSON.stringify(rejectArr)
// //   console.log("rejectArr : "+ rejectResult);
// //   console.log("result : " +JSON.stringify(result))
// //   return result;
// // }