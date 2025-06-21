// Folder: /client/src/components/EODSubmissionForm.jsx
import React, { useState } from "react";
import axios from "axios";

const EODSubmissionForm = ({ projectId, onSubmitted }) => {
  const [designer, setDesigner] = useState("");
  const [type, setType] = useState("CAD");
  const [remarks, setRemarks] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/submissions", {
        projectId,
        designer,
        type,
        remarks,
        eodStatus: true
      });
      onSubmitted(res.data);
      setDesigner("");
      setRemarks("");
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Designer Name"
        value={designer}
        onChange={(e) => setDesigner(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="CAD">CAD</option>
        <option value="Label">Label</option>
      </select>

      <textarea
        placeholder="Remarks (optional)"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit EOD
      </button>
    </form>
  );
};

export default EODSubmissionForm;
