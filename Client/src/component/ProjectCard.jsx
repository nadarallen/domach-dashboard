// /client/src/component/ProjectCard.jsx
import React from "react";
import "../style/ProjectCard.css";

const ProjectCard = ({ project, onClick }) => {
  return (
    <div
      className="project-card border p-4 rounded shadow hover:shadow-lg cursor-pointer bg-white"
      onClick={() => onClick(project)}
    >
      <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
      <p className="text-sm text-gray-600">Location: {project.location}</p>
      <p className="text-sm text-gray-600">Origin: {project.origin}</p>
      <p className="text-sm text-gray-600">
        Tasks: {project.tasks.length} | Submissions: {project.submissions.length}
      </p>
    </div>
  );
};

export default ProjectCard;
