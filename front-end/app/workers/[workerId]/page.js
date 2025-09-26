"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function WorkerDetail() {
  const params = useParams();
  const { workerId } = params;

  const [worker, setWorker] = useState(null);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchWorker = async () => {
      if (!token) return;
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/worker/${workerId}`,
          {
            headers: {
              method: "GET",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (res.ok) setWorker(data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWorker();
  }, [workerId, token]);

  if (!worker) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h2>Worker Detail</h2>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>ID</th>
            <td>{worker.id}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{worker.name}</td>
          </tr>
          <tr>
            <th>Position</th>
            <td>{worker.position}</td>
          </tr>
          <tr>
            <th>Profile Picture</th>
            <td>
              {worker.profile && (
                <img
                  src={`http://localhost:5000/uploads/${worker.profile}`}
                  alt={worker.name}
                  width="150"
                />
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
