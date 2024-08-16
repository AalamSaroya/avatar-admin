import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../utils/LocalStorageUtils";

 const RootFunction = () => {
  const navigate = useNavigate();
  const isAuthenticated = getLocalStorage("token");
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    } else {
      navigate("/admin/login");
    }
  }, [isAuthenticated, navigate]);
};


export default RootFunction