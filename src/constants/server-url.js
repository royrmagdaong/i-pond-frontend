let { hostname, protocol } = window.location;
if (protocol !== "http:") hostname = "https://iot-backend.ap.ngrok.io";
const server_url = `${protocol}//${hostname}${
  hostname !== "https://iot-backend.ap.ngrok.io" ? ":1338" : ""
}`;
// const server_url = "https://pchs-backend.ap.ngrok.io";
console.log("server url", server_url);
export default server_url;
