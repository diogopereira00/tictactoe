// problema se tiver localhost dados nao sao guardados no servidor express
const host = "http://192.168.1.96:5555";
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const getCurrentUserRoute = `${host}/api/auth/getCurrentUser`;
export const getAllUsersRoute = `${host}/api/auth/getAllUsers`;

export const getCurrentRoomRoute = `${host}/api/games/getCurrentRoom`;
export const getAllGamesFromPlayer = `${host}/api/games/getAllGamesFromPlayer`;

export const joinRoomRoute = `${host}/api/games/joinRoom`;
export const leaverGameRoute = `${host}/api/games/leaver`;
export const winnerRoute = `${host}/api/games/winner`;

export const createGameRoute = `${host}/api/games/create`;
export const getAllPublicOpenGamesRoute = `${host}/api/games/getAllPublicOpenGames`;
export const deleteGameRoute = `${host}/api/games/deleteGame`;
