import { WatchQueryOptions } from "@apollo/client";
import { UpdateSeeBoardCommentsQueryType } from "../../types/board/updateQueryType";
import { seeBoardComments, seeBoardCommentsVariables, seeBoardComments_seeBoardComments } from "../../__generated__/seeBoardComments";


type UpdateSeeBoardCommentsQueryFnType = <TVars = seeBoardCommentsVariables>(mapFn: (previousQueryResult: seeBoardComments, options: Pick<WatchQueryOptions<TVars, seeBoardComments>, "variables">) => seeBoardComments) => void


// 함수 반환 함수. updateQuery 받아서 로직 실행하는 애 반환
const makeUpdateSeeBoardCommentsQuery = (
  updateSeeBoardCommentsQuery: UpdateSeeBoardCommentsQueryFnType
) => {
  // 얘를 반환
  return ({action,boardCommentId,editPayload,forCreateComment}:UpdateSeeBoardCommentsQueryType) => {
    updateSeeBoardCommentsQuery((prev)=>{

      const { seeBoardComments:prevComments } = prev;

      let newComments: seeBoardComments_seeBoardComments[];

      switch(action) {
          
        case 'createComment': // 받은 애로 캐시 덮어 씌움
          const {offsetComments,setNowCommentsBundleNumber,totalCommentsNumber} = forCreateComment;
          newComments = offsetComments;
          const bundleNumber = Math.ceil(totalCommentsNumber/10);
          setNowCommentsBundleNumber(bundleNumber);
          break;

        case 'editComment':  // 댓글 변경
          newComments = prevComments.map(comment => {
            if(comment.id === boardCommentId) {
              const newComment = {...comment};
              newComment.payload = editPayload;
              return newComment;
            } else {
              return {...comment};
            }
          });
          break;

        case 'deleteComment': // 댓글 삭제
          newComments = prevComments.filter(comment => comment.id !== boardCommentId);
          break;
        
        case 'createCommentOfComment': // 댓글의 총 대댓글 수 증가
          newComments = prevComments.map(comment => {
            if(comment.id === boardCommentId) {
              const newComment = {...comment};
              const prevTotalCommentOfComments = newComment.totalCommentOfComments;
              newComment.totalCommentOfComments = prevTotalCommentOfComments + 1;
              return newComment;
            } else {
              return {...comment};
            }
          });
          break;

        case 'deleteCommentOfComment': // 댓글의 총 대댓글 수 감소
          newComments = prevComments.map(comment => {
            if(comment.id === boardCommentId) {
              const newComment = {...comment};
              const prevTotalCommentOfComments = newComment.totalCommentOfComments;
              newComment.totalCommentOfComments = prevTotalCommentOfComments - 1;
              return newComment;
            } else {
              return {...comment};
            }
          });
          break;

        // default:
        //   break;
      }

      // const updateResult = {
      //   seeBoardComments: {
      //     comments:newComments,
      //     isNotFetchMore:true,
      //     ...prevRest,
      //   }
      // };
      const updateResult = {
        seeBoardComments: newComments,
      };

      return updateResult;
    });
  };
};


// 얘는 따로 쓰진 않아서 걍 뺌. 위에가 헷갈리면 SingleCommentLayout 에 이거 보면 이해 될듯.

// type UpdateSeeBoardCommentOfCommentsQueryFnType = <seeBoardCommentOfCommentsVariables>(mapFn: (previousQueryResult: seeBoardCommentOfComments, options: Pick<WatchQueryOptions<seeBoardCommentOfCommentsVariables, seeBoardCommentOfComments>, "variables">) => seeBoardCommentOfComments) => void;

// // 똑같이 함수 반환 함수. updateQuery 받아서 로직 실행하는 애 반환
// const makeUpdateSeeBoardCommentOfCommentsQuery = (updateSeeBoardCommentOfCommentsQuery:UpdateSeeBoardCommentOfCommentsQueryFnType) => {
//   // updateQuery 받아서 얘를 반환
//   return ({action,boardCommentOfCommentId,editPayload,newCacheData,prevCommentNumber,numberNow}:UpdateSeeBoardCommentOfCommentsQueryType) => {
//     updateSeeBoardCommentOfCommentsQuery((prev)=>{

//       if(action === 'createCommentOfComment') {

//         const __typename:"SeeBoardCommentOfCommentsResponse" = "SeeBoardCommentOfCommentsResponse";
//         const hasNextPage = prevCommentNumber === 0 ? false : true;
//         const now = numberNow +"";

//         const newSeeCommentOfComments = {
//           seeBoardCommentOfComments: {
//             __typename,
//             commentOfComments:[newCacheData],
//             cursorId: boardCommentOfCommentId,
//             error: null,
//             hasNextPage,
//             isNotFetchMore: null,
//             fetchedTime: now,
//           },
//         };

//         // 댓글보기를 안했거나 이전 댓글이 없으면 기존 캐시가 없어. 그런 경우 새로 생성
//         if(prev.seeBoardCommentOfComments === undefined ) {
//           return newSeeCommentOfComments;
//         }

//         const {seeBoardCommentOfComments:{ commentOfComments:prevCommentOfComments, isNotFetchMore, fetchedTime, ...prevRest }} = prev;

//         // 기존의 캐시가 너무 오래 지났으면 이전 캐시 안받고 새로 생성
//         const passedByTime = numberNow - Number(fetchedTime);
//         // 5분 이상 지남.
//         if ( passedByTime > 60000*5 ) {
//           return newSeeCommentOfComments;
//         }

//         // 캐시 변경
//         const updateResult = {
//           seeBoardCommentOfComments: {
//             commentOfComments:[newCacheData,...prevCommentOfComments],
//             isNotFetchMore:true,
//             fetchedTime,
//             ...prevRest,
//           }
//         };

//         return updateResult;
//       };

//       // 그외
//       const {seeBoardCommentOfComments:{ commentOfComments:prevCommentOfComments, isNotFetchMore, ...prevRest }} = prev;

//       let newCommentOfComments;

//       switch(action) {
          
//         case 'editCommentOfComment':  // 댓글 변경
//           newCommentOfComments = prevCommentOfComments.map(commentOfComment => {
//             if(commentOfComment.id === boardCommentOfCommentId) {
//               const newCommentOfComment = {...commentOfComment};
//               newCommentOfComment.payload = editPayload;
//               return newCommentOfComment;
//             } else {
//               return {...commentOfComment};
//             }
//           });
//           break;

//         case 'deleteCommentOfComment': // 댓글 삭제
//           newCommentOfComments = prevCommentOfComments.filter(commentOfComment => commentOfComment.id !== boardCommentOfCommentId);
//           break;

//         // default:
//         //   break;
//       }

//       const updateResult = {
//         seeBoardCommentOfComments: {
//           commentOfComments:newCommentOfComments,
//           isNotFetchMore:true,
//           ...prevRest,
//         }
//       };

//       return updateResult;
//     });
//   };
// };

export { 
  makeUpdateSeeBoardCommentsQuery,
  // makeUpdateSeeBoardCommentOfCommentsQuery,
};