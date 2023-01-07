import Realm from "realm";
import { allRealmDiariesVar } from "./apollo";
import { realmDiaryType } from "./types/realm/realmDiaryType";
import { createRealmDiaryType, getRealmYearMonthDiariesType, editRealmDiaryType, deleteRealmDiaryType, matchDiaryType } from "./types/realm/realmCRUDType";
import getToday from "./logic/upload/getToday";


const Diary = {
  name: "Diary",
  properties: {
    id: 'int',
    title: "string",
    body: "string",
    youtubeId: "string?",
    dateTime: "int",
  },
  primaryKey: 'id',
};

const realmSetting = {
  path: "myrealm",
  // inMemory 쓰면 딱 킨 때에만 씀
  // inMemory: true,
  schema: [Diary],
  // schema 변경하면 얘도 바꿔줘
  // schemaVersion: 2,
};

// 얘는 state 로 써서 변경 되면 자동으로 업데이트 되게 만들어야 할듯
// let allRealmDiaries: realmDiaryType[] = [];

let lastId: number;

const getRealmAllDiaries = async() => {
  try {

    const realm = await Realm.open(realmSetting);

    const diaries = realm.objects("Diary");

    lastId = diaries[diaries.length-1]?.id ?? 0;

    // dateTime 으로 정렬해서 내보내도 됨. 날짜 아무때나 쓸 수 있으면
    const diariesByDateTimeAndId = diaries.sorted([
      ["dateTime",true],
      ["id",true]
    ]);

    // 읽는 거는 DB 를 닫으면 못읽네. 
    // 이래 저장해야됨. 안그럼 에러뜸.
    const parsedDiaries: realmDiaryType[] = JSON.parse(JSON.stringify(diariesByDateTimeAndId));

    allRealmDiariesVar(parsedDiaries);
    
    realm.close();
    
  } catch (err: any) {
    console.error("getRealmAllDiaries // Failed to open the realm : ", err.message);
  }
};

// const getRealmSingleDiary = (id:number) => allRealmDiariesVar().find(diary => diary.id === id);

const getRealmSingleDiaryAndPrevAfterId = (id:number) => {
  let nowDiaryIndex: number|undefined = undefined;
  const allRealmDiaries = allRealmDiariesVar();

  const nowDiary = allRealmDiaries.find((diary,index) => {
    const isRight = diary.id === id;
    if(isRight) {
      nowDiaryIndex = index;
    }
    return isRight;
  });

  const isDiary = typeof nowDiaryIndex === "number";
  const indexOrUndefined = isDiary ? isDiary : undefined;
  // index 가 없어도 undefined 로 나오겠지? 배열은 객체니까
  const prevId = indexOrUndefined && allRealmDiaries[nowDiaryIndex+1]?.id;
  const afterId = indexOrUndefined && allRealmDiaries[nowDiaryIndex-1]?.id;
  
  return {
    nowDiary,
    prevId,
    afterId,
  };
};

const getRealmYearMonthDiariesWithDate = ({
  year,
  month,
}: getRealmYearMonthDiariesType) => {

  const yearMonthDiaries = getRealmYearMonthDiaries({
    year,
    month,
  });

  const withDateDiaries = yearMonthDiaries.map(diary => {
    const { dateTime, ...rest } = diary;
    const date = dateTime - Math.floor(dateTime/100)*100;
    return {
      date,
      ...rest
    };
  });

  return withDateDiaries;
};

const getRealmYearMonthDiaries = ({
  year,
  month,
}: getRealmYearMonthDiariesType) => {

  const minDate = year*10000 + month*100;
  const maxDate = minDate + 33;

  const yearMonthDiaries = allRealmDiariesVar().filter(diary => (
    diary.dateTime > minDate && diary.dateTime < maxDate
  ));
  
  return yearMonthDiaries;
};

const getTodayDiaries = () => {

  const today = +getToday();

  const todayDiaries = allRealmDiariesVar().filter(diary => diary.dateTime === today);
  // allRealmDiariesVar 가 시간 다음에 id 순으로 정렬 되있어서 여기선 정렬 안해도 될듯
  
  return todayDiaries;
};


const searchDiaries = (keyword:string) => {

  const allDiaries = allRealmDiariesVar();
  const matchDiaries: matchDiaryType[] = [];

  for(let i=0; i<allDiaries.length; i++) {
    const diary = allDiaries[i];
    const titleMatchIndex = diary.title.search(keyword);
    const isTitleMatched = titleMatchIndex !== -1;
    if(isTitleMatched) {
      matchDiaries.push({
        diary,
        which: "title",
        stringIndex: titleMatchIndex,
      });
    } else {
      const bodyMatchIndex = diary.body.search(keyword);
      const isBodyMatched = titleMatchIndex !== -1;
      if(isBodyMatched) {
        matchDiaries.push({
          diary,
          which: "body",
          stringIndex: bodyMatchIndex,
        });
      }
    }
  }
  
  return matchDiaries;
};


const createRealmDiary = async({
  // lastId,
  title,
  body,
  youtubeId,
  dateTime,
}: createRealmDiaryType) => {
  try {
    
    const realm = await Realm.open(realmSetting);

    const allRealmDiaries = allRealmDiariesVar();

    const toWriteDiary = {
      id: lastId + 1,
      title,
      body,
      ...(youtubeId && { youtubeId }),
      dateTime,
    };

    // DB 에 작성
    realm.write(() => {
      // Assign a newly-created instance to the variable.
      realm.create("Diary", toWriteDiary);
    });

    realm.close();

    const inputIndex = allRealmDiaries.findIndex(diary => diary.dateTime === dateTime || diary.dateTime < dateTime);

    const newDiaries = [...allRealmDiaries];
    
    inputIndex === -1 ? newDiaries.push(toWriteDiary) : newDiaries.splice(inputIndex, 0, toWriteDiary);

    allRealmDiariesVar(newDiaries);

    // lastId 하나 올려줘
    lastId += 1;
    // return createdDiary;
  } catch (err: any) {
    console.error("createRealmDiary // Failed to open the realm : ", err.message);
  }
};


// 이거 editProcess 되는지 확인해야함. 안되면 그냥 안의 로직을 통으로 넣으면 됨.
const editRealmDiary = async({
  id,
  title,
  body,
  youtubeId,
  dateTime,
}: editRealmDiaryType) => {

  // 이게 되려나? 외부에 있는 애를 바꿀라나? 그냥 param 들어온 애만 바꾸고 바깥은 못바꾸지 않을라나? 객체라서 같이 될라나?
  const editProcess = (diary:realmDiaryType) => {
    title && ( diary.title = title );
    body && ( diary.body = body );
    youtubeId && ( diary.youtubeId = youtubeId );
    dateTime && ( diary.dateTime = dateTime );
  };

  try {
    const realm = await Realm.open(realmSetting);

    realm.write(() => {
      const diary = realm.objectForPrimaryKey("Diary", id);
      
      if(!diary) return;

      editProcess(diary);
    });

    realm.close();

    const editedDiaries = allRealmDiariesVar().map(eachDiary => {
      if(eachDiary.id !== id) {
        return eachDiary;
      } else {
        const copiedDiary = {...eachDiary};
        editProcess(copiedDiary);
        return copiedDiary;
      }
    })

    allRealmDiariesVar(editedDiaries);

  } catch (err: any) {
    console.error("editRealmDiary // Failed to open the realm : ", err.message);
  }
};

const deleteRealmDiary = async({
  id,
}: deleteRealmDiaryType) => {
  try {
    const realm = await Realm.open(realmSetting);

    realm.write(() => {
      let diary = realm.objectForPrimaryKey("Diary", id);
      
      if(!diary) return;

      realm.delete(diary);
      diary = null;
    });

    realm.close();

    const filteredDiaries = allRealmDiariesVar().filter(eachDiary => eachDiary.id !== id);

    allRealmDiariesVar(filteredDiaries);
    // 여기서는 lastId 안바꿔줘도 될듯?
  } catch (err: any) {
    console.error("deleteRealmDiary // Failed to open the realm :  : ", err.message);
  }
};


const deleteAllRealmDiary = async() => {
  try {
    const realm = await Realm.open(realmSetting);

    realm.write(() => {
      // Delete all instances of Diary from the realm.
      realm.delete(realm.objects("Diary"));
    });

    // 얜 아예 다 지우는거
    // realm.write(() => {
    //   // Delete all objects from the realm.
    //   realm.deleteAll();
    // });


    realm.close();

    // allRealmDiaries = [];
    allRealmDiariesVar([]);
    lastId = 0;

  } catch (err: any) {
    console.error("deleteAllRealmDiary // Failed to open the realm : ", err.message);
  }
};

// Realm 을 열고 닫는게 느리지 않을라나?

export {
  // allRealmDiaries,
  getRealmAllDiaries,
  getRealmSingleDiaryAndPrevAfterId,
  // getRealmYearMonthDiaries,
  getRealmYearMonthDiariesWithDate,
  getTodayDiaries,
  searchDiaries,
  createRealmDiary,
  editRealmDiary,
  deleteRealmDiary,
  deleteAllRealmDiary,
};