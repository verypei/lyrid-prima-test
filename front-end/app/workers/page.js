"use client";
import { useEffect, useState } from "react";
import AddWorkerModal from "./addModalWorker.js";
import { useRouter } from "next/navigation";
import { autoExpireToken, getToken } from "@/helpers/token.js";
import EditWorkerModal from "./editModalWorker.js";

export default function WorkersTable() {
  const [workers, setWorkers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newWorker, setNewWorker] = useState({ name: "", position: "" });
  const [editWorker, setEditWorker] = useState(null);

  const router = useRouter();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchWorkers = async () => {
      autoExpireToken(router);
      const token = getToken();

      if (!token) {
        router.push("/");
        return;
      }
      try {
        const res = await fetch("http://localhost:5000/api/v1/workers", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setWorkers(data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchWorkers();
  }, [token]);

  const handleChange = (e) => {
    setNewWorker({ ...newWorker, [e.target.name]: e.target.value });
  };

  const handleUpdateWorker = async (id, { name, position, file }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("position", position);
    if (file) formData.append("file", file);

    try {
      const res = await fetch(`http://localhost:5000/api/v1/worker/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        setWorkers((prev) => {
          console.log(prev, "===prev==");
          return prev.map((w) => (w.id === id ? data.data : w));
        });
        console.log(workers, "---after edit--->");
        setShowEditModal(false);
        setEditWorker(null);
      } else {
        alert(data.message || "Failed to update worker");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddWorker = async (file) => {
    const formData = new FormData();
    formData.append("name", newWorker.name);
    formData.append("position", newWorker.position);
    if (file) formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/v1/worker", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setWorkers([...workers, data.data]);
        setShowModal(false);
        // setNewWorker({
        //   name: "",
        //   position: "",
        // });
      } else {
        alert(data.message[0] || "Failed to add worker");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDetail = (id) => {
    router.push(`/workers/${id}`);
  };

  const handleDelete = async (id) => {
    // Show confirmation popup
    const confirmed = window.confirm(
      "Are you sure you want to delete this worker?"
    );
    if (!confirmed) return; // If user clicks "Cancel", do nothing

    try {
      const res = await fetch(`http://localhost:5000/api/v1/worker/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        // Remove deleted worker from state
        setWorkers(workers.filter((worker) => worker.id !== id));
        // setReloadWorkers((prev) => !prev);
        alert(data.message[0]);
      } else {
        alert(data.message || "Failed to delete worker");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Workers Table</h2>

      <button
        className="btn btn-success mb-3"
        onClick={() => setShowModal(true)}
      >
        Add Worker
      </button>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>detail</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker) => (
            <tr key={worker.id}>
              <td>{worker.id}</td>
              <td>{worker.name}</td>
              <td>{worker.position}</td>
              <td>
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => handleDetail(worker.id)}
                >
                  View
                </button>
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => {
                    setEditWorker(worker);
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(worker.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Component */}
      <AddWorkerModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddWorker}
        newWorker={newWorker}
        handleChange={handleChange}
      />

      <EditWorkerModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleUpdateWorker}
        worker={editWorker}
      />
    </div>
  );
}
