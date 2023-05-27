import { useState } from "react";
import { useProjectContext } from "../hooks/useProjectContext";
import { useAuthContext } from "../hooks/useAuthContext";
const ProjectForm = ({ project, setIsModalopen, setIsOverlayopen }) => {
  const [title, setTitle] = useState(project ? project.title : "");
  const [tech, setTech] = useState(project ? project.tech : "");
  const [budget, setBudget] = useState(project ? project.budget : "");
  const [duration, setDuration] = useState(project ? project.duration : "");
  const [manager, setManager] = useState(project ? project.manager : "");
  const [dev, setDev] = useState(project ? project.dev : "");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const { dispatch } = useProjectContext();
  const { user } = useAuthContext();
  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in !");
    }

    //data making
    const projectObj = { title, tech, budget, duration, manager, dev };
    //if there is no project send post req
    if (!project) {
      //post req
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(projectObj),
        }
      );
      const jsonData = await res.json();
      // !res.ok setError
      if (!res.ok) {
        setError(jsonData.error);
        setEmptyFields(jsonData.emptyFields);
      }
      // res.ok reset
      if (res.ok) {
        setTitle("");
        setTech("");
        setBudget("");
        setDuration("");
        setManager("");
        setDev("");
        setError(null);
        setEmptyFields([]);
        //
        dispatch({ type: "CREATE_PROJECTS", payload: jsonData });
      }
      return;
    }
    //if there is project , patch project
    if (project) {
      //send patch
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/projects/${project._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(projectObj),
        }
      );
      const jsonData = await res.json();
      // !res.ok
      if (!res.ok) {
        setError(jsonData.error);
        setEmptyFields(jsonData.emptyFields);
      }
      //res.ok
      if (res.ok) {
        setError(null);
        setEmptyFields([]);

        //dispatch
        dispatch({ type: "UPDATE_PROJECT", payload: jsonData });
        //close overlay and modal
        setIsModalopen(false);
        setIsOverlayopen(false);
      }
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="project-form flex flex-col gap-1">
      <h2
        className={`text-4xl font-medium text-sky-400 mb-10 ${
          project ? "hidden" : ""
        }`}
      >
        Add a new project
      </h2>

      <div className="form-control flex flex-col gap-1 ">
        <label
          htmlFor="title"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Project Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="e.g. my project"
          id="title"
          className={`bg-transparent border  py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("title")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
        />
      </div>
      <div className="form-control flex flex-col gap-1 ">
        <label
          htmlFor="tech"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Technologies
        </label>
        <input
          value={tech}
          onChange={(e) => setTech(e.target.value)}
          type="text"
          placeholder="e.g. react, redux, node.js"
          id="tech"
          className={`bg-transparent border  py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("tech")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
        />
      </div>
      <div className="form-control flex flex-col gap-1 ">
        <label
          htmlFor="budget"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Budget (USD)
        </label>
        <input
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          type="number"
          placeholder="e.g. 500 $"
          id="budget"
          className={`bg-transparent border  py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("budget")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
        />
      </div>
      <div className="form-control flex flex-col gap-1 ">
        <label
          htmlFor="duration"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Duration (in weeks)
        </label>
        <input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          type="number"
          placeholder="e.g. e-commerce website"
          id="duration"
          className={`bg-transparent border  py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("duration")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
        />
      </div>
      <div className="form-control flex flex-col gap-1 ">
        <label
          htmlFor="manager"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Project Manager
        </label>
        <input
          value={manager}
          onChange={(e) => setManager(e.target.value)}
          type="text"
          placeholder="e.g. Natasha"
          id="manager"
          className={`bg-transparent border  py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("manager")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
        />
      </div>
      <div className="form-control flex flex-col gap-1 ">
        <label
          htmlFor="dev"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Developers
        </label>
        <input
          value={dev}
          onChange={(e) => setDev(e.target.value)}
          type="number"
          placeholder="e.g. 5 "
          id="dev"
          className={`bg-transparent border  py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("dev")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
        />
      </div>

      <button
        type="submit"
        className="bg-sky-400 text-slate-900 py-3 rounded-lg hover:bg-sky-50 duration-300 mt-3"
      >
        {project ? "Confirm Update" : "Add Project"}
      </button>
      {error && (
        <p className="bg-rose-500/20 rounded-lg p-5 text-rose-500 border border-rose-500">
          {error}
        </p>
      )}
    </form>
  );
};

export default ProjectForm;
