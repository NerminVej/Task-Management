import React, { useEffect, useState } from "react";
import axios from "axios";

interface Assignee {
  name: string;
}

const TaskCreationPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredAssignees, setFilteredAssignees] = useState<Assignee[]>([]);
  const [assignees, setAssignees] = useState<Assignee[]>([]);

  useEffect(() => {
    const hardcodedAssignees: Assignee[] = [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ];
    setFilteredAssignees(hardcodedAssignees); // Initialize filteredAssignees with all assignees
    setAssignees(hardcodedAssignees);
    /*const fetchAssignees = async () => {
      
      try {
        const response = await axios.get("my-api-endpoint");
        setAssignees(response.data);
      } catch {
        console.log("Eror fetching assignees", Error);
      }
    };
    fetchAssignees();
    */
  }, []);

  useEffect(() => {
    // Filter assignees based on search query
    const filtered = assignees.filter((assignee) =>
      assignee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAssignees(filtered);
  }, [searchQuery, assignees]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Task</h2>

        <form className="space-y-6">
          <div className="mb-4">
            <label
              htmlFor="taskName"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Task Name
            </label>
            <input
              type="text"
              id="taskName"
              name="taskName"
              className="input input-bordered w-full px-4 py-2"
              placeholder="Enter task name"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              className="input input-bordered w-full px-4 py-2"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="mb-4">
            <input
              type="text"
              id="assigneeSearch"
              name="assigneeSearch"
              value={searchQuery}
              className="input input-bordered w-full px-4 py-2"
              placeholder="Search assignee"
              onChange={handleSearchChange}
            />
            <select
              id="assignee"
              name="assignee"
              className="input input-bordered w-full px-4 py-2"
            >
              {filteredAssignees.map((assignee, index) => (
                <option key={index} value={assignee.name}>
                  {assignee.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="input input-bordered w-full px-4 py-2 h-24"
              placeholder="Enter task description"
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              className="input input-bordered w-full px-4 py-2"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn bg-primary text-white font-medium px-4 py-2 rounded-md shadow-md hover:bg-primary"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskCreationPage;
