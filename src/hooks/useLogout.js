import { useAuthContext } from "./useAuthContext";
import { useProjectContext } from "./useProjectContext";

export const useLogout = () => {
  const { dispatch: logoutDispatch } = useAuthContext();
  const { dispatch: projectDispatch } = useProjectContext();
  const logout = () => {
    //clear local storage
    localStorage.removeItem("user");
    //dispatch logout
    logoutDispatch({ type: "LOGOUT" });
    projectDispatch({ type: "SET_PROJECTS", payload: [] });
  };

  return { logout };
};
