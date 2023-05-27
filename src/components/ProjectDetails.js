import { useState } from "react";
import { useProjectContext } from "../hooks/useProjectContext";
import { currencyFormatter } from "../utilities/currencyFormatter";
import moment from "moment";
import ProjectForm from "./ProjectForm";
import { useAuthContext } from "../hooks/useAuthContext";

const ProjectDetails = ({ project }) => {
  const [isModalopen, setIsModalopen] = useState(false);
  const [isOverlayopen, setIsOverlayopen] = useState(false);

  const { dispatch } = useProjectContext();

  const { user } = useAuthContext();

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/projects/${project._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await res.json();
    if (res.ok) {
      dispatch({ type: "DELETE_PROJECT", payload: json });
    }
  };

  const handleUpdate = () => {
    setIsModalopen(true);
    setIsOverlayopen(true);
  };

  return (
    <div className="project bg-slate-800 p-5 rounded-xl shadow-xl border border-slate-700 flex flex-col gap-5 w-[25rem]">
      <div className="top">
        <span className="text-sky-400">ID: {project._id.slice(0, 5)}</span>
        <h3 className="text-3xl font-medium truncate">{project.title}</h3>
        <span className="uppercase text-xs tracking-widest text-slate-500 font-medium">
          {project.tech}
        </span>
      </div>
      <div className="mid text-slate-300 flex gap-5">
        <div className="left flex flex-col">
          <span>Budget: {currencyFormatter(project.budget)}</span>
          <span>
            Added:
            <span className="italic text-sm">
              {moment(project.createdAt).format("MMM DD, hh:mm A")}
            </span>
          </span>
          <span>
            updated:
            <span className="italic text-sm">
              {moment(project.updatedAt).format("MMM DD, hh:mm A")}
            </span>
          </span>
        </div>
        <div className="right flex flex-col ">
          <span>Manager: {project.manager}</span>
          <span>Developer: {project.dev}</span>
          <span>
            Duration:
            <span>{`${project.duration} week${
              project.duration === 1 ? "" : "s"
            }`}</span>
          </span>
        </div>
      </div>
      <div className="bottom flex gap-5">
        <button
          onClick={handleUpdate}
          className="bg-sky-400 text-slate-900 py-2 px-5 rounded shadow-xl hover:bg-sky-50 duration-300"
        >
          update
        </button>
        <button
          onClick={handleDelete}
          className="text-rose-500 hover:underline"
        >
          delete
        </button>
      </div>

      {/* overlay  */}
      <div
        onClick={() => {
          setIsOverlayopen(false);
          setIsModalopen(false);
        }}
        className={`overlay fixed z-[1] h-screen w-screen bg-slate-900/50 backdrop-blur-sm inset-0 ${
          isOverlayopen ? "" : "hidden"
        }`}
      ></div>
      {/* modals  */}
      <div
        className={`update-modal w-[35rem] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 p-10 rounded-xl shadow-xl border border-slate-700 z-[2] ${
          isModalopen ? "" : "hidden"
        }`}
      >
        <h2 className="text-4xl font-medium text-sky-400 mb-10">
          update project
        </h2>
        <ProjectForm
          project={project}
          setIsModalopen={setIsModalopen}
          setIsOverlayopen={setIsOverlayopen}
        />
      </div>
    </div>
  );
};

export default ProjectDetails;
