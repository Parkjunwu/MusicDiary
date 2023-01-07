
const getTodayYearAndMonth = () => {
  const today = new Date();
  const yearToday = today.getFullYear();
  const monthToday = today.getMonth() + 1;

  return { yearToday, monthToday };
};

export default getTodayYearAndMonth;