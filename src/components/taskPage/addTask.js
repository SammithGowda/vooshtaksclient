import Modal from 'react-modal';
import './task.css';
import { useState } from 'react';
const AddTask = ({ open, addTask }) => {
    const [editVaue, setEditValue] = useState({
        taskName: "",
        description: "",
    })
    return (
        <>
            <Modal
                isOpen={open}
                // onRequestClose={onRequestClose}
                contentLabel="Edit Task"
                ariaHideApp={false}
                className="task-modal"
                overlayClassName="task-modal-overlay"
            >
                <h2>Add Task</h2>
                <div className="task-modal-content">
                    <label>Title</label>
                    <input
                        type="text"
                        value={editVaue.taskName}
                        onChange={(e) => setEditValue((pre) => ({ ...pre, taskName: e.target.value }))}
                    />
                    <label>Description</label>
                    <textarea
                        value={editVaue.description}
                        onChange={(e) => setEditValue((pre) => ({ ...pre, description: e.target.value }))}
                    ></textarea>
                </div>
                <div className="task-modal-actions">
                    <button onClick={() => addTask(editVaue)} className="save-btn">Save</button>
                    <button onClick={() => addTask()} className="cancel-btn">Cancel</button>
                </div>
            </Modal>
        </>)

}

export default AddTask