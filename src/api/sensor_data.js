import axios from "axios";
import server_url from "src/constants/server-url";
// const baseURL = `${server_url}/api/`;
// const baseURL = `https://i-pond-backend.ap.ngrok.io/api/`;
// const baseURL = `https://i-pond-backend.ap.ngrok.io/api/`;
const baseURL = `https://i-pond-backend.ap.ngrok.io/api/`;

const token =
  "c4d7aa970fd60903bc8e7cf55f556aa2c360425ffa1c966d4a259e2e0f44583cc335465ae0b48ef5cb0f3e14e5aa83e78ab047a6cc935c82cd7fc040549035b088ede9cbd4a25d70efbbf7bcb9e922a09b0b59727b985e282e2c6b747833f3b0e77a508b032f41b9b79c2659bfe8e9c477227f50678b709aca07cf4055c0195c";

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
  dateFrom = "2023-07-05",
  dateTo = "2023-07-25",
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
