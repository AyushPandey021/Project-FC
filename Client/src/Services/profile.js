import api from "./api";

export const getMyProfile = () => api.get("/profile/me");

export const completeProfile = (data) =>
  api.post("/profile/complete", data);

export const updateAvailability = (availability) =>
  api.patch("/profile/availability", { availability });
