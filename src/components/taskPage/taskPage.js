import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/nav';
import './task.css'; // Import the CSS file
import { DeleteTaskApi, EditTaskApi, GetTaskApi, CreatTaskApi } from '../api/apiServices';
import Modal from 'react-modal';
import EditTask from './editTaks';
import AddTask from './addTask';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openEditModal, setOpenEditModla] = useState(false);
  const [openViewModal, setOpenViewModla] = useState(false);
  const [openAddTaskModal, setOpenAddTaskModla] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await GetTaskApi();
    setTasks(response.data.data);
  };


  const deleteTask = async (data) => {
    let { _id } = data
    const res = await DeleteTaskApi(_id)
    if (res.status === 200) {
      fetchTasks();
    }
  }

  const editTask = async (value) => {
    if (!value) {
      setOpenEditModla(false)
      return
    }
    const res = await EditTaskApi(value)
    if (res.status === 200) {
      fetchTasks()
    }
    setOpenEditModla(false)
  }

  const createNewTask = async (value) => {
    if (!value) {
      setOpenAddTaskModla(false)
      return
    }
    if (value.description.length === 0 || value.description.taskName) {
      alert("Value can't be empty")
      return
    }
    const response = await CreatTaskApi(value)
    if (response.status === 201) {
      fetchTasks();
      setOpenAddTaskModla(false)
    } else {
      alert("some thing went worng")
    }
    // console.log(value)
  }


  const openModal = (task, value) => {
    if (value === "edit") {
      setOpenEditModla(true)
      setSelectedTask(task)
    } else {
      setSelectedTask(task);
      setOpenViewModla(true);

    }
  };
  const closeModal = () => {
    setSelectedTask(null);
    setOpenViewModla(false);
  };

  return (
    <div className="task-page">
      <Navbar />
      <div className="task-container">
        <div className="task-header">
          <button onClick={() => setOpenAddTaskModla(true)} className="add-task-btn">Add Task</button>
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
                <button onClick={() => openModal(task, "edit")} className="edit-btn">Edit</button>
                <button onClick={() => openModal(task, "info")} className="view-details-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedTask && (
        <Modal
          isOpen={openViewModal}
          onRequestClose={closeModal}
          contentLabel="Task Details"
          className="task-modal"
          overlayClassName="task-modal-overlay"
          ariaHideApp={false}
        >
          <h2>Task Details</h2>
          <h3>Title: {selectedTask.taskName}</h3>
          <p>Description: {selectedTask.description}</p>
          <p>Created at: {new Date(selectedTask.createdAt).toLocaleString()}</p>
          <button className="close-modal-btn" onClick={closeModal}>Close</button>
        </Modal>
      )}

      {openEditModal && (
        <EditTask
          value={selectedTask}
          open={openEditModal}
          closeModal={editTask}
        />
      )}
      {
        openAddTaskModal && (
          <AddTask
            open={openAddTaskModal}
            addTask={createNewTask} />
        )
      }
    </div>
  );
};

export default TaskPage;
