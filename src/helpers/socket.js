// ========== Socket
// import all modules
import { io } from "socket.io-client";

const { VITE_APP_APP_URL } = import.meta.env;

const socket = io(String(VITE_APP_APP_URL));

export default socket;
