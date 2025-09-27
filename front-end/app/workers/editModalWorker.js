"use client";
import { useState, useEffect } from "react";

export default function EditWorkerModal({ show, onClose, onSubmit, worker }) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (worker && show) {
      setName(worker.name);
      setPosition(worker.position);
      setFile(null); // clear file input
    }
  }, [worker]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(worker.id, { name, position, file });
  };

  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Edit Worker</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Position</label>
                <select
                  className="form-select"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  required
                >
                  <option value="" hidden>
                    Select position
                  </option>
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                  <option value="HRD">Manager</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Profile Picture</label>
                {worker.profile && (
                  <div className="mb-2">
                    <img
                      src={`http://localhost:5000/uploads/${worker.profile}`}
                      alt={worker.name}
                      width="100"
                    />
                  </div>
                )}
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
