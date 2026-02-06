import { useEffect } from "react";
import api from "../../Services/api";

const Dashboard = () => {
  useEffect(() => {
    api.get("/")
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }, []);

  return <div>Finder Dashboard</div>;
};

export default Dashboard;
    