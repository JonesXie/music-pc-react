import { get, remove, post, put } from "@/services";

// getHandler
export function getHandler(data, config) {
  return get("/api/get", data, config);
}

// removeHandler
export function removeHandler(data, config) {
  return remove("/api/remove", data, config);
}

// postHandler
export function postHandler(data, config) {
  return post("/api/post", data, config);
}

// putHandler
export function putHandler(data, config) {
  return put("/api/put", data, config);
}
