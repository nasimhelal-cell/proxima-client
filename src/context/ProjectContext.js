import { createContext, useReducer } from "react";

const initialState = {
  projects: null,
};
export const projectReducer = (state, action) => {
  switch (action.type) {
    case "GET_PROJECTS":
      return {
        ...state,
        projects: action.payload,
      };
    case "CREATE_PROJECTS":
      return {
        ...state,
        projects: [action.payload, ...state.projects],
      };
    default:
      return state;
  }
};
export const ProjectContext = createContext();

export const ProjectContextProvider = ({ children }) => {
  const [projectState, dispatch] = useReducer(projectReducer, initialState);

  return (
    <ProjectContext.Provider value={{ ...projectState, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};
