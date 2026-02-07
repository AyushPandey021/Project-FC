import Notification from "../models/Notification.model.js";

export const getNotifications = async (req, res) => {
  const data = await Notification.find({ userId: req.user.id });
  res.json(data);
};
