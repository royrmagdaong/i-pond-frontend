import axios from "axios";
import server_url from "src/constants/server-url";
const baseURL = `${server_url}/api/`;
// const baseURL = `https://pchs-backend.ap.ngrok.io/api/`;

const fetchSensorData = async () => {
  return await axios.get(
    `${baseURL}sensor-readings?&sort[0]=createdAt%3Adesc`,
    {}
  );
};

const fetchCurrentSensorData = async () => {
  return await axios.get(
    `${baseURL}sensor-readings?sort[0]=createdAt%3Adesc`,
    {}
  );
};

const getPHLevels = async (
  dateFrom = "2023-07-05",
  dateTo = "2023-07-25",
  limit = 10,
  offset = 0
) => {
  return await axios.get(
    `${baseURL}sensor-readings?filters[createdAt][$gte]=${dateFrom}&filters[createdAt][$lte]=${dateTo}&pagination[start]=${offset}&pagination[limit]=${limit}&sort[0]=createdAt:desc`,
    {}
  );
};

export { fetchSensorData, fetchCurrentSensorData, getPHLevels };
