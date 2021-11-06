import axios from "axios";
const instance = axios.create({
  baseURL: "https://hahow-recruit.herokuapp.com"
});
export const apiGetHeroes = () => instance.get("/heroes");
export const apiGetProfile = (id) => instance.get("/heroes/" + id + "/profile");
export const apiModifyProfile = (id, data) => instance.patch(`/heroes/${id}/profile`, data);
