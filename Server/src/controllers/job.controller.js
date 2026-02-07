import Job from "../models/Job.model.js";

export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.json(job);
};

export const myJobs = async (req, res) => {
  const jobs = await Job.find({ cleanerId: req.user.id });
  res.json(jobs);
};
