import { gql, useMutation } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AccuseLayout from "../../components/boardNav/accuseBoard/AccuseLayout";
import { BoardTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";

const ACCUSE_BOARD = gql`
  mutation accuseBoard(
    $id:Int!
    $reason:Int!
    $detail:String
  ) {
    accuseBoard(
      id:$id
      reason:$reason
      detail:$detail
    ) {
      ok
      error
    }
  }
`;

type AccuseBoardProps = NativeStackScreenProps<BoardTabStackParamsList,"AccuseBoard">;

const AccuseBoard = ({route}:AccuseBoardProps) => {

  const boardId = route.params.boardId;

  const [accuseBoard] = useMutation(ACCUSE_BOARD);

  return (
    <AccuseLayout
      accuseFn={accuseBoard}
      accuseThingId={boardId}
    />
  );
};

export default AccuseBoard;