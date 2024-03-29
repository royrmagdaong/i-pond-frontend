import moment from "moment";

const useDateFormatter = (data) => {
  const date = moment(data);
  const formattedDate = date.format("MMMM DD, YYYY hh:mmA");
  return formattedDate;
};

const displayTimeOnly = (data) => {
  const date = moment(data);
  const formattedDate = date.format("hh:mm:ss A");
  return formattedDate;
};

const displayDateOnly = (data) => {
  const date = moment(data);
  const formattedDate = date.format("MMMM DD, YYYY");
  return formattedDate;
};

const displayDateOnly2 = (data) => {
  const date = moment(data);
  const formattedDate = date.format("YYYY-MM-DD");
  return formattedDate;
};

export { useDateFormatter, displayTimeOnly, displayDateOnly, displayDateOnly2 };
