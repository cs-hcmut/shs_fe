// src/utils/socket.ts
import { io, Socket } from "socket.io-client";
import { ApiURL } from "./http.util";
import { getAccessTokenFromLS } from "./auth.util";

const socket: Socket = io(ApiURL, {
  transports: ["websocket"],
  autoConnect: true,
  auth: {
    token: getAccessTokenFromLS(),
  },
});

export default socket;
