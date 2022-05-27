import io from "socket.io-client";
const ENDPOINT = "http://192.168.1.96:5555";
export default io(ENDPOINT);
