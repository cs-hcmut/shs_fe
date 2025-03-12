// Define the main paths
const mainPath = {
  home: "/",
  login: "/login",
};

export default mainPath;

export const homeManagementPaths = {
  homes: "/homes",
  homesDetail: "/homes/:homeId",
  roomDetail: "/homes/:homeId/:roomId",
  config: "/homes/:homeId/config",
  schedule: "/homes/:homeId/schedule",
};
