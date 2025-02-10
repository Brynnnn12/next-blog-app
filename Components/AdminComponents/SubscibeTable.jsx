import React from "react";

const SubscibeTable = ({ email, mongoId, date, deleteEmails }) => {
  // Konversi string date dari API ke format tanggal yang bisa dibaca
  const formattedDate = date ? new Date(date).toDateString() : "No Date";

  return (
    <tr className="bg-white border-b text-center">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {email ? email : "No Email"}
      </td>
      <td className="px-6 py-4">{formattedDate}</td>
      <td className="px-6 py-4">
        <button
          onClick={() => deleteEmails(mongoId)}
          className="px-2 py-1 text-red-600 bg-red-100 rounded hover:bg-red-200"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default SubscibeTable;
