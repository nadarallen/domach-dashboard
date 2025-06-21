import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import axios from "axios";

const CalendarView = ({ location }) => {
  const [projects, setProjects] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [projectsForDate, setProjectsForDate] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`/api/projects?location=${location}`);
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects", err);
      }
    };
    fetchProjects();
  }, [location]);

  useEffect(() => {
    const filtered = projects.filter((project) =>
      project.deadline &&
      new Date(project.deadline).toDateString() === selectedDate.toDateString()
    );
    setProjectsForDate(filtered);
  }, [selectedDate, projects]);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-200 mt-6">
      <h2 className="text-xl font-semibold mb-4">📅 Project Deadlines Calendar</h2>
      <Calendar value={selectedDate} onChange={setSelectedDate} />

      <div className="mt-4">
        <h3 className="text-md font-semibold">Projects due on {selectedDate.toDateString()}:</h3>
        {projectsForDate.length > 0 ? (
          <ul className="mt-2 space-y-1 text-sm">
            {projectsForDate.map((project) => (
              <li key={project._id}>
                <span className="font-medium">{project.name}</span> — Client: {project.client}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No projects due on this date.</p>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
