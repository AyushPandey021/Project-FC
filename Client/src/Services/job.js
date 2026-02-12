import api from "./api";

/* 🔹 Get all jobs of logged-in cleaner */
export const getMyJobs = () => 
  api.get("/jobs/my");

/* 🔹 Get single job details */
export const getJobById = (id) =>
  api.get(`/jobs/${id}`);

/* 🔹 Update job */
export const updateJob = (id, data) =>
  api.put(`/jobs/update/${id}`, data);

/* 🔹 Delete job */
export const deleteJob = (id) =>
  api.delete(`/jobs/delete/${id}`);

/* 🔹 Create new job */
export const createJob = (data) =>
  api.post("/jobs/create", data);
