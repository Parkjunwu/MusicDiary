import { WatchQueryOptions } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FeedStackProps } from "../components/type";
import { getNotifiedCommentOfComment_getNotifiedCommentOfComment } from "../__generated__/getNotifiedCommentOfComment";
import { seeCommentOfComments, seeCommentOfCommentsVariables } from "../__generated__/seeCommentOfComments";
import { seeComments, seeCommentsVariables, seeComments_seeComments_comments } from "../__generated__/seeComments";

export type CommentsNavProps = NativeStackScreenProps<FeedStackProps, 'Comments'>;

export type CommentProps = {
  route: CommentsNavProps["route"]
};

export type NotLogInSingleCommentProps = {
  comment: seeComments_seeComments_comments,
}

type UpdateSeeCommentsQuery = <TVars = seeCommentsVariables>(mapFn: (previousQueryResult: seeComments, options: Pick<WatchQueryOptions<TVars, seeComments>, "variables">) => seeComments) => void;

type LogInBaseCommentProps = {
  nowEditingIndex: string,
  setNowEditingIndex: React.Dispatch<React.SetStateAction<string>>,
}

export type LogInSingleCommentProps = {
  notifiedCommentOfComment?: getNotifiedCommentOfComment_getNotifiedCommentOfComment["commentOfComment"],
  updateSeeCommentsQuery?: UpdateSeeCommentsQuery,
  userWhichWriting: string | {userName:string},
  setUserWhichWriting: React.Dispatch<React.SetStateAction<string|{userName:string}>>,
} & NotLogInSingleCommentProps & LogInBaseCommentProps

export type NotLogInSingleCommentOfCommentProps = {
  mention: getNotifiedCommentOfComment_getNotifiedCommentOfComment["commentOfComment"],
}

type UpdateSeeCommentOfCommentsQuery = ({ action, commentOfCommentId, editPayload, newCacheData }: UpdateSeeCommentOfCommentsQueryType) => void

export type LogInSingleCommentOfCommentProps = {
  updateSeeCommentOfCommentsQuery: UpdateSeeCommentOfCommentsQuery,
  setUserWhichWriting: React.Dispatch<React.SetStateAction<string|{userName:string}>>,
  commentId:number,
} & NotLogInSingleCommentOfCommentProps & LogInBaseCommentProps