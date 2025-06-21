import React, { useEffect, useState } from "react";
import axios from "axios";
import EODSubmissionForm from "./EODSubmissionForm";
import RevisionForm from "./RevisionForm";
import CalendarView from "./CalendarView";

const Dashboard = ({ location }) => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All");

  const handleNewSubmission = (projectId, newSubmission) => {
    setProjects((prev) =>
      prev.map((project) =>
        project._id === projectId
          ? {
              ...project,
              submissions: [...(project.submissions || []), newSubmission],
            }
          : project
      )
    );
  };

  const handleNewRevision = (projectId, newRevision) => {
    setProjects((prev) =>
      prev.map((project) =>
        project._id === projectId
          ? {
              ...project,
              revisions: [...(project.revisions || []), newRevision],
            }
          : project
      )
    );
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`/api/projects?location=${location}`);
        const projectsWithDetails = await Promise.all(
          res.data.map(async (project) => {
            const [subs, revs] = await Promise.all([
              axios.get(`/api/submissions/project/${project._id}`),
              axios.get(`/api/revisions/project/${project._id}`),
            ]);
            return {
              ...project,
              submissions: subs.data,
              revisions: revs.data,
            };
          })
        );
        setProjects(projectsWithDetails);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, [location]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Projects in {location}</h2>

      <div className="mb-4 flex gap-2">
        {["All", "In Progress", "Completed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-1 rounded-full border text-sm ${
              filter === status
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800 border-gray-300"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects
          .filter((project) =>
            filter === "All" ? true : project.status === filter
          )
          .map((project) => (
            <div
              key={project._id}
              className="bg-white p-4 rounded-2xl shadow-md border border-gray-200"
            >
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <p className="text-sm text-gray-500">
                Client: {project.client}
              </p>
              <p className="text-sm">Brought By: {project.broughtBy}</p>
              <p className="text-sm mb-2">
                Status: {project.status}
                {project.status !== "Completed" && (
                  <button
                    className="ml-2 px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition"
                    onClick={async () => {
                      try {
                        await axios.put(`/api/projects/${project._id}/status`, {
                          status: "Completed",
                        });
                        setProjects((prev) =>
                          prev.map((p) =>
                            p._id === project._id
                              ? { ...p, status: "Completed" }
                              : p
                          )
                        );
                      } catch (err) {
                        console.error("Failed to update project status", err);
                      }
                    }}
                  >
                    Mark as Completed
                  </button>
                )}
              </p>

              <p className="text-sm mb-2">
                Assigned Date:{" "}
                {new Date(project.assignedDate).toLocaleDateString()}
              </p>

              {/* ✅ Deadline Tracker */}
              {project.deadline && (
                <p className="text-sm mb-2 text-red-600">
                  Deadline: {new Date(project.deadline).toLocaleDateString()} (
                  <span className="font-semibold">
                    {Math.ceil(
                      (new Date(project.deadline) - new Date()) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days left
                  </span>
                  )
                </p>
              )}

              <EODSubmissionForm
                projectId={project._id}
                onSubmitted={(newSubmission) =>
                  handleNewSubmission(project._id, newSubmission)
                }
              />

              <div className="mt-4">
                <h4 className="text-md font-semibold mb-1">Submissions:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  {project.submissions?.length > 0 ? (
                    project.submissions.map((sub) => (
                      <li
                        key={sub._id}
                        className="flex justify-between items-center"
                      >
                        <span>
                          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 mr-2 text-xs uppercase">
                            {sub.type}
                          </span>
                          {sub.designer} —{" "}
                          {new Date(sub.date).toLocaleDateString()} -{" "}
                          {sub.remarks}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li>No submissions yet.</li>
                  )}
                </ul>
              </div>

              <RevisionForm
                projectId={project._id}
                onRevisionSubmit={(newRevision) =>
                  handleNewRevision(project._id, newRevision)
                }
              />

              <div className="mt-4">
                <h4 className="text-md font-semibold mb-1">Revisions:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  {project.revisions?.length > 0 ? (
                    project.revisions.map((rev) => (
                      <li
                        key={rev._id}
                        className="flex justify-between items-center"
                      >
                        <span>
                          <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 mr-2 text-xs uppercase">
                            {rev.type} v{rev.version}
                          </span>
                          {rev.designer} —{" "}
                          {new Date(rev.date).toLocaleDateString()} -{" "}
                          {rev.remarks}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li>No revisions yet.</li>
                  )}
                </ul>
              </div>
            </div>
          ))}
      </div>

      {/* ✅ Calendar View Below Project Grid */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Project Deadlines</h3>
        <CalendarView location={location} />
      </div>
    </div>
  );
};

export default Dashboard;
