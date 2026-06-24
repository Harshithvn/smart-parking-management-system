import axios from "axios";

const BASE_URL = axios.get("http://localhost:8080/api/slots");

export const getSlots = () => axios.get(BASE_URL);

export const parkSlot = (id) =>
  axios.put(`${BASE_URL}/park/${id}`);

export const exitSlot = (id) =>
  axios.put(`${BASE_URL}/exit/${id}`);