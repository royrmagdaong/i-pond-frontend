import axios from "axios";
import server_url from "src/constants/server-url";
const baseURL = `${server_url}/api/`;
// const baseURL = `https://pchs-backend.ap.ngrok.io/api/`;

const fetchSensorData = async () => {
  return await axios.get(
    `${baseURL}sensor-readings?&filters[id][$endsWith]=11&sort[0]=createdAt%3Adesc`,
    {}
  );
};

const fetchCurrentSensorData = async () => {
  return await axios.get(
    `${baseURL}sensor-readings?sort[0]=createdAt%3Adesc`,
    {}
  );
};

export { fetchSensorData, fetchCurrentSensorData };
