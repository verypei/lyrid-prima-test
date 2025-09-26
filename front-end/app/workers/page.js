"use client";
import { useEffect, useState } from "react";
import AddWorkerModal from "./addModalWorker.js";
import { useRouter } from "next/navigation";

export default function WorkersTable() {
  const [workers, setWorkers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newWorker, setNewWorker] = useState({ name: "", position: "" });
  const router = useRouter();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchWorkers = async () => {
      if (!token) return;
      try {
        const res = await fetch("http://localhost:5000/api/v1/workers", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        console.log(data, "dara----");

        if (res.ok) setWorkers(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchWorkers();
  }, [workers]);

  const handleChange = (e) => {
    setNewWorker({ ...newWorker, [e.target.name]: e.target.value });
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
        setNewWorker({
          name: "",
          position: "",
        });
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
          </tr>
        </thead>
        <tbody>
          {workers.map((worker) => (
            <tr key={worker.id}>
              <td>{worker.id}</td>
              <td>{worker.name}</td>
              <td>{worker.position}</td>
              <td>
                <a
                  href={`/workers/${worker.id}`}
                  className="btn btn-info btn-sm"
                  onClick={() => handleDetail(worker.id)}
                >
                  View
                </a>
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
    </div>
  );
}
