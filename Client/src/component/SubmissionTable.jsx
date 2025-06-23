// /client/src/component/SubmissionTable.jsx
import React from "react";
import "../style/SubmissionTable.css";

const SubmissionTable = ({ submissions }) => {
  if (!submissions.length) {
    return <p className="text-gray-500">No submissions yet.</p>;
  }

  return (
    <table className="submission-table w-full border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border">Designer</th>
          <th className="p-2 border">Type</th>
          <th className="p-2 border">Remarks</th>
          <th className="p-2 border">Date</th>
        </tr>
      </thead>
      <tbody>
        {submissions.map((sub, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="p-2 border">{sub.designer}</td>
            <td className="p-2 border">{sub.type}</td>
            <td className="p-2 border">{sub.remarks || "-"}</td>
            <td className="p-2 border">{new Date(sub.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SubmissionTable;
