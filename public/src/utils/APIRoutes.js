// problema se tiver localhost dados nao sao guardados no servidor express
const host = "http://192.168.1.96:5555";
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const getImageRoute = `${host}/api/auth/getImage`;
