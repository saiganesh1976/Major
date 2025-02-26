import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ListRationHolders.css";
import { toast } from "react-toastify";

const ListRationHolders = ({ url }) => {
  const [rationHolders, setRationHolders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ members: [] });
  const [numMembers, setNumMembers] = useState(0);

  const fetchRationHolders = async () => {
    try {
      const response = await axios.get(`${url}/api/ration/listRation`);
      if (response.data.success) {
        setRationHolders(response.data.users);
      } else {
        toast.error("Error fetching ration holders");
      }
    } catch (error) {
      toast.error("Failed to fetch data");
    }
  };

  const handleEdit = (id, data) => {
    setEditingId(id);
    setFormData(data);
    setNumMembers(data.members.length);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`${url}/api/ration/updateRation/${id}`, formData);
      setEditingId(null);
      fetchRationHolders(); // Refresh list
      toast.success("Ration holder updated successfully!");
    } catch (error) {
      toast.error("Error updating ration holder");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${url}/api/ration/deleteRation/${id}`);
      fetchRationHolders();
      if (response.data.success) {
        toast.success("Deleted successfully!");
      } else {
        toast.error("Error deleting ration holder");
      }
    } catch (error) {
      toast.error("Error deleting ration holder");
    }
  };

  useEffect(() => {
    fetchRationHolders();
  }, []);

  return (
    <div className="Admin-list add flex-col">
      <h2>All Ration Holders</h2>
      <table className="ration-table">
        <thead>
          <tr>
            <th>Aadhaar No</th>
            <th>Application Status</th>
            <th>Fair Price Shop No</th>
            <th>District</th>
            <th>Consumer No</th>
            <th>Members</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rationHolders.map((holder) => (
            <tr key={holder._id}>
              {editingId === holder._id ? (
                <>
                  <td>{holder.aadhaarNo}</td>
                  <td><input className="edit-input" type="text" value={formData.applicationStatus || ""} onChange={(e) => setFormData({ ...formData, applicationStatus: e.target.value })} /></td>
                  <td><input className="edit-input" type="text" value={formData.fpShopNo || ""} onChange={(e) => setFormData({ ...formData, fpShopNo: e.target.value })} /></td>
                  <td><input className="edit-input" type="text" value={formData.district || ""} onChange={(e) => setFormData({ ...formData, district: e.target.value })} /></td>
                  <td><input className="edit-input" type="text" value={formData.consumerNo || ""} onChange={(e) => setFormData({ ...formData, consumerNo: e.target.value })} /></td>
                  <td>
                    <select className="input-select" onChange={(e) => setNumMembers(parseInt(e.target.value))}>
                      <option value="0">Select Number of Members</option>
                      {[...Array(10).keys()].map(num => (
                        <option key={num + 1} value={num + 1}>{num + 1}</option>
                      ))}
                    </select>
                    {Array.from({ length: numMembers }).map((_, index) => (
                      <div key={index} className="member-fields">
                        <input className="input-field"  type="text" placeholder="Name" onChange={(e) => {
                          const newMembers = [...formData.members];
                          newMembers[index] = { ...newMembers[index], name: e.target.value };
                          setFormData({ ...formData, members: newMembers });
                        }} />
                        <input  className="input-field" type="text" placeholder="Relation" onChange={(e) => {
                          const newMembers = [...formData.members];
                          newMembers[index] = { ...newMembers[index], relation: e.target.value };
                          setFormData({ ...formData, members: newMembers });
                        }} />
                        <input className="input-field" type="number" placeholder="Age" onChange={(e) => {
                          const newMembers = [...formData.members];
                          newMembers[index] = { ...newMembers[index], age: e.target.value };
                          setFormData({ ...formData, members: newMembers });
                        }} />
                        <select className="input-field" onChange={(e) => {
                          const newMembers = [...formData.members];
                          newMembers[index] = { ...newMembers[index], gender: e.target.value };
                          setFormData({ ...formData, members: newMembers });
                        }}>
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    ))}
                  </td>
                  <td>
                    <button className="btn save-btn" onClick={() => handleUpdate(holder._id)}>Save</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{holder.aadhaarNo}</td>
                  <td>{holder.applicationStatus}</td>
                  <td>{holder.fpShopNo}</td>
                  <td>{holder.district}</td>
                  <td>{holder.consumerNo}</td>
                  <td>
                    <ul className="members-list">
                      {holder.members.map((member) => (
                        <li key={member._id}> Name: {member.name} ,Relation: {member.relation}, Age: {member.age}, Gender: {member.gender}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="list-ration-buttons">
                    <button className="btn edit-btn" onClick={() => handleEdit(holder._id, holder)}>Edit</button>
                    <button className="btn delete-btn" onClick={() => handleDelete(holder._id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListRationHolders;
