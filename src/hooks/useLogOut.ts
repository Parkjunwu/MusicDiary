import { gql, useMutation } from "@apollo/client";
import client, { isLoggedInVar, REFRESH_TOKEN, accessTokenVar } from "../apollo";
import EncryptedStorage from 'react-native-encrypted-storage';
import { deletePushNotiToken } from "../__generated__/deletePushNotiToken";
import { getRealmAllDiaries } from "../realm";
// import { setIsUseLocalDBAndReturnState } from "../dbUsingState";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TEMPORARY_EDIT_DIARY, TEMPORARY_UPLOAD_DIARY } from "../temporaryDiary/constant";
import { alreadyFetchedQuerySet } from "../cursorPagination";

const DELETE_PUSH_NOTI_TOKEN = gql`
  mutation deletePushNotiToken {
    deletePushNotiToken {
      ok
      error
    }
  }
`;

const useLogOut = () => {
  const [deletePushNotiToken] = useMutation<deletePushNotiToken>(DELETE_PUSH_NOTI_TOKEN);
  
  const logOut = useCallback(
    async() => {
      // 백엔드에서 로그인 정보를 받아야 하니 캐시보다 먼저 실행
      const deleteDeviceToken = await deletePushNotiToken();

      if(!deleteDeviceToken.data?.deletePushNotiToken.ok) {
        console.log("useLogOut 의 deletePushNotiToken / 토큰 삭제 실패");
      }

      alreadyFetchedQuerySet.clear(); // 추가.. 하는게 맞나? 확인

      // 캐시 삭제를 accessTokenVar 밑에 놓으니까 오류남.. 왠진 모름.
      await client.resetStore();
      await EncryptedStorage.removeItem(REFRESH_TOKEN);
      // accessTokenVar(null) 로 하니까 header 에 'null' 로 가짐.
      accessTokenVar('');
      isLoggedInVar(false);

      // 추가, 로컬 데이터 받아. 네트워크 문제인 경우도 확인.
      await getRealmAllDiaries();
      // 로컬 데이터 사용하도록. 근데 그냥 isLoggedInVar(false) 하면 똑같이 될듯.
      // setIsUseLocalDBAndReturnState(true);
      AsyncStorage.removeItem(TEMPORARY_UPLOAD_DIARY); // 추가. await 필요없어서 걍 뺌
      AsyncStorage.removeItem(TEMPORARY_EDIT_DIARY); // 얘도 추가
    },
    []
  );
  return logOut;
};

export default useLogOut;