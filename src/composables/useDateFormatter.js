import moment from "moment";

const useDateFormatter = (data) => {
  const date = moment(data);
  const formattedDate = date.format("MMMM DD, YYYY hh:mmA");
  return formattedDate;
};

export default useDateFormatter;
