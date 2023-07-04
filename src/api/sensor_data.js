import axios from "axios";
import server_url from "src/constants/server-url";
const baseURL = `${server_url}/api/`;

const fetchSensorData = async () => {
  return await axios.get(
    `${baseURL}sensor-readings?sort[0]=createdAt%3Adesc`,
    {}
  );
};

export { fetchSensorData };
