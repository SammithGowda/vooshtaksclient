import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../navbar/nav';
import './task.css'; // Import the CSS file
import { DeleteTask, GetTaskApi } from '../api/apiServices';
import Modal from 'react-modal';
import { AuthContext } from '../context/user';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext)

  useEffect(() => {
    console.log(user, "guser")
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await GetTaskApi();
    setTasks(response.data.data);
  };


  const deleteTask = async (data) => {
    let { _id } = data
    const res = await DeleteTask(_id)
    if (res.status === 200) {
      fetchTasks();
    }
  }
  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };
  return (
    <div className="task-page">
      <Navbar />
      <div className="task-container">
        <div className="task-header">
          <button className="add-task-btn">Add Task</button>
          <div className="search-sort">
            <input type="text" placeholder="Search..." className="search-input" />
            <select className="sort-select">
              <option value="recent">Recent</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
        <div className="task-list">
          {tasks.map(task => (
            <div className="task-card" key={task._id}>
              <h3>{task.taskName}</h3>
              <p>{task.description}</p>
              <p>Created at: {new Date(task.createdAt).toLocaleString()}</p>
              <div className="task-actions">
                <button onClick={() => deleteTask(task)} className="delete-btn">Delete</button>
                <button className="edit-btn">Edit</button>
                <button onClick={() => openModal(task)} className="view-details-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedTask && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Task Details"
          className="task-modal"
          overlayClassName="task-modal-overlay"
        >
          <h2>Task Details</h2>
          <h3>Title: {selectedTask.taskName}</h3>
          <p>Description: {selectedTask.description}</p>
          <p>Created at: {new Date(selectedTask.createdAt).toLocaleString()}</p>
          <button className="close-modal-btn" onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default TaskPage;
