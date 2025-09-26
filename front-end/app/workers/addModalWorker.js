"use client";
import { useState } from "react";

export default function AddWorkerModal({
  show,
  onClose,
  onSubmit,
  newWorker,
  handleChange,
}) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Only allow jpg/jpeg
    if (!selectedFile.type.match(/image\/(jpeg|jpg)/)) {
      alert("Only JPG or JPEG files are allowed!");
      e.target.value = null; // reset input
      return;
    }
    setFile(selectedFile);
  };
  // Wrapper to include file in submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(file); // pass file to parent handler
  };

  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Add New Worker</h5>
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
                  name="name"
                  className="form-control"
                  value={newWorker.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  name="position"
                  className="form-select"
                  value={newWorker.position}
                  onChange={handleChange}
                  required
                >
                  <option value="" hidden>
                    Select role
                  </option>
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                  <option value="HRD">Manager</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Picture</label>
                <input
                  type="file"
                  name="picture"
                  className="form-control"
                  onChange={handleFileChange}
                  accept="image/*"
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
                Add Worker
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
