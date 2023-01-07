
// // 만들었는데 쓰질 않네. 걍 없애든가 해

// import { gql, useMutation } from "@apollo/client";
// import { useCallback } from "react";
// import { allRealmDiariesVar } from "../apollo";
// import { getRealmAllDiaries } from "../realm";
// import { synchronizeDiary, synchronizeDiaryVariables } from "../__generated__/synchronizeDiary";

// const SYNCHRONIZE_DIARY = gql`
//   mutation synchronizeDiary($uploadDiaries:[diaryFormat]!) {
//     synchronizeDiary(uploadDiaries:$uploadDiaries) {
//       ok
//       error
//     }
//   }
// `;

// const useSynchronizeDiary = () => {
//   const [ synchronizeDiary, { data, loading } ] = useMutation<synchronizeDiary,synchronizeDiaryVariables>(SYNCHRONIZE_DIARY);
  
//   const executeSynchronize = useCallback(
//     async() => {

//       if(loading) return;

//       await getRealmAllDiaries();
//       const allLocalDiaries = allRealmDiariesVar();

//       if(allLocalDiaries.length === 0) {
//         return { ok:true, message:"현재 기기에 저장되어 있는 일기가 없습니다." };
//       }

//       const excludeIdData = allLocalDiaries.map(diary => {
//         const { id, ...rest } = diary;
//         return {...rest};
//       });

//       await synchronizeDiary({
//         variables:{
//           uploadDiaries: excludeIdData,
//         },
//       });

//       const resultError = data?.synchronizeDiary.error;

//       return {
//         ok:!resultError,
//         ...(resultError && { message:resultError }),
//       };
//     },
//     [loading]
//   );

//   return executeSynchronize;
// };

// export default useSynchronizeDiary;