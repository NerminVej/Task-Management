import React from "react";

const TableHeader = () => {
  return (
    <thead>
      <tr>
        {/* Column header for ID */}
        <th>ID</th>
        {/* Column header for Title */}
        <th>Title</th>
        {/* Column header for Status */}
        <th>Status</th>
        {/* Column header for Progress */}
        <th>Progress</th>
        {/* Column header for Comment */}
        <th>Comment</th>
        {/* Column header for Time Created */}
        <th>Time Created</th>
        {/* Column header for Actions */}
        <th>Actions</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
