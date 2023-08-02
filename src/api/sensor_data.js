import axios from "axios";
import server_url from "src/constants/server-url";
import { LocalStorage } from "quasar";
// const baseURL = `${server_url}/api/`;
// const baseURL = `https://i-pond-backend.ap.ngrok.io/api/`;
// const baseURL = `https://i-pond-backend.ap.ngrok.io/api/`;
const baseURL = `https://i-pond-backend.ap.ngrok.io/api/`;
const token = LocalStorage.getItem("ipond-user")?.jwt;

const fetchSensorData = async () => {
  return await axios.get(
    `${baseURL}sensor-readings?&sort[0]=createdAt%3Adesc`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const fetchCurrentSensorData = async () => {
  return await axios.get(`${baseURL}sensor-readings?sort[0]=createdAt%3Adesc`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getPHLevels = async (
  dateFrom = "2023-08-01",
  dateTo = "2023-08-03",
  limit = 10,
  offset = 0
) => {
  return await axios.get(
    `${baseURL}sensor-readings?filters[createdAt][$gte]=${dateFrom}&filters[createdAt][$lte]=${dateTo}&pagination[start]=${offset}&pagination[limit]=${limit}&sort[0]=createdAt:desc`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export { fetchSensorData, fetchCurrentSensorData, getPHLevels };
