import Modal from 'react-modal';
import './task.css';
import { useState } from 'react';
const EditTask = ({ value, open, closeModal }) => {
    const [editVaue, setEditValue] = useState({
        taskName: value.taskName,
        description: value.description,
        _id: value._id
    })
    return (
        <>
            <Modal
                isOpen={open}
                contentLabel="Edit Task"
                ariaHideApp={false}
                className="task-modal"
                overlayClassName="task-modal-overlay"
            >
                <h2>Edit Task</h2>
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
                    <button onClick={() => closeModal(editVaue)} className="save-btn">Save</button>
                    <button onClick={() => closeModal()} className="cancel-btn">Cancel</button>
                </div>
            </Modal>
        </>)

}

export default EditTask