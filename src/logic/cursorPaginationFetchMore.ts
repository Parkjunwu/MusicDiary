// cursor pagination 일 경우
// data 가 data?.getRoomMessages 형식으로 들어와야함.
const cursorPaginationFetchMore = async(data,fetchMoreFn) => {
  if(!data) return;
  const hasNextPage = data.hasNextPage;
  console.log("hasNextPage is "+hasNextPage);

  if(!hasNextPage) return;
  console.log("fetchMore run");
  await fetchMoreFn();
};

export default cursorPaginationFetchMore;