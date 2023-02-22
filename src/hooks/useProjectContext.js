import { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error(
      "You must have to call useProjectContext inside a ProjectContextProvider"
    );
  }
  return context;
};
