// ========== Services
// import all modules
import http from "./http";

class Service {
  static joinRoom(data) {
    return http().post("/users/join", data);
  }

  static exitRoom(data) {
    return http().put(`/users/exit/${data.id}/${data.roomId}`);
  }

  static createAccessToken(data) {
    return http().post("/users/access-token", data);
  }

  static sendMessage(data) {
    return http().post("/messages", data);
  }

  static getAllMessages(data) {
    return http().get(`/messages/${data.activeRoomId}`);
  }
}

export default Service;
