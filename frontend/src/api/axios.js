import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000", //backend server
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});


export default API;
