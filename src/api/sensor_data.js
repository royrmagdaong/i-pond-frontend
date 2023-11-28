import axios from "axios";
import server_url from "src/constants/server-url";
import { LocalStorage } from "quasar";
import { displayDateOnly2 } from "src/composables/useDateFormatter";
// const baseURL = `http://localhost:1338/api/`;
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

var date = new Date();
var date2 = new Date();
date.setDate(date.getDate());
date2.setDate(date2.getDate() + 1);

// console.log("Yesterday", displayDateOnly2(date));
// console.log("Today + 1", displayDateOnly2(date2));

const getPHLevels = async (
  dateFrom = displayDateOnly2(date),
  dateTo = displayDateOnly2(date2),
  limit = 20,
  offset = 0,
  order
) => {
  return await axios.get(
    `${baseURL}sensor-readings?filters[createdAt][$gte]=${dateFrom}&filters[createdAt][$lte]=${dateTo}&pagination[start]=${offset}&pagination[limit]=${limit}&sort[0]=createdAt:${order}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export { fetchSensorData, fetchCurrentSensorData, getPHLevels };
