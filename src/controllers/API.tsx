import axios from "axios";

const data: string | null = JSON.parse(localStorage.getItem("Token") as string);
// const data: string = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjg5NjgyODEwLCJleHAiOjE2OTAyODc2MTB9.60PdUb82C0r3IrEiG2sYhRbKhN2o_ajrQsjZ23bhAKX_cvA0fLGkV6F5oj7ehcE8O4gC-VUtkGzj_lscFOboCw`;
export const API = axios.create({
  baseURL: "https://scaldus.serveo.net/",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${data}`,
    "Access-Control-Allow-Origin": "*",
  },
});

export const UploadAPI = axios.create({
  baseURL: "https://scaldus.serveo.net/",
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${data}`,
    "Access-Control-Allow-Origin": "*",
  },
});
