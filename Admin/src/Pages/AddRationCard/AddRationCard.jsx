import React, { useState } from "react";
import axios from "axios";
import "./AddRationCard.css";
import upload_area from "../../assets/admin_assets/upload_area.png";
import { toast } from "react-toastify";

const AddRationCard = ({ url }) => {
  const [familyPhoto, setFamilyPhoto] = useState(null);
  const [data, setData] = useState({
    rationCardNo: "",
    aadhaarNo:"",
    cardType: "Antyodaya Anna Yojana (AAY)",
    applicationStatus: "Pending",
    applicationNo: "",
    officeName: "",
    fpShopNo: "",
    headOfFamily: "",
    district: "",
    gasConnection: "No Connection",
    consumerNo: "",
    members: [
      { id: 1, name: "", age: "", gender: "Select Gender", relation: "" },
    ], // Default gender!
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("rationCardNo", data.rationCardNo);
    formData.append("aadhaarNo",data.aadhaarNo);
    formData.append("cardType", data.cardType);
    formData.append("applicationStatus", data.applicationStatus);
    formData.append("applicationNo", data.applicationNo);
    formData.append("officeName", data.officeName);
    formData.append("fpShopNo", data.fpShopNo);
    formData.append("headOfFamily", data.headOfFamily);
    formData.append("district", data.district);
    formData.append("gasConnection", data.gasConnection);
    formData.append("consumerNo", data.consumerNo); // Handle members array (stringify it)

    formData.append("members", JSON.stringify(data.members));

    if (familyPhoto) formData.append("image", familyPhoto); // Or 'familyPhoto' if your backend expects that

    try {
      const response = await axios.post(
        `${url}/api/ration/addRation`,
        formData
      );
      if (response.data.success) {
        setData({
          rationCardNo: "",
          aadhaarNo:"",
          cardType: "Antyodaya Anna Yojana (AAY)",
          applicationStatus: "Pending",
          applicationNo: "",
          officeName: "",
          fpShopNo: "",
          headOfFamily: "",
          gasConnection: "No Connection",
          consumerNo: "",
          members: [{ id: 1, name: "", age: "", gender: "", relation: "" }],
        });
        setFamilyPhoto(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    }
  };

  const addMember = () => {
    setData((prevData) => ({
      ...prevData,
      members: [
        ...prevData.members,
        {
          id: prevData.members.length + 1,
          name: "",
          age: "",
          gender: "",
          relation: "",
        },
      ],
    }));
  };

  return (
    <div className="Admin-add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Family Photo</p>
          <label htmlFor="familyPhoto">
            <img
              src={familyPhoto ? URL.createObjectURL(familyPhoto) : upload_area}
              alt="Uploaded Preview"
            />
          </label>
          <input
            onChange={(e) => setFamilyPhoto(e.target.files[0])}
            type="file"
            id="familyPhoto"
            hidden
          />
        </div>


        <div className="form-group">
          <label>Ration Card No</label>
          <input
            type="text"
            name="rationCardNo"
            onChange={onChangeHandler}
            value={data.rationCardNo}
            required
          />
        </div>

        <div className="form-group">
          <label>Aadhaar Card No</label>
          <input
            type="text"
            name="aadhaarNo"
            onChange={onChangeHandler}
            value={data.aadhaarNo}
            required
          />
        </div>

        <div className="form-group">
          <label>Application No</label>
          <input
            type="text"
            name="applicationNo"
            onChange={onChangeHandler}
            value={data.applicationNo}
            required
          />
        </div>

        <div className="form-group">
          <label>Office Name</label>
          <input
            type="text"
            name="officeName"
            onChange={onChangeHandler}
            value={data.officeName}
            required
          />
        </div>

        <div className="form-group">
          <label>FP Shop No</label>
          <input
            type="text"
            name="fpShopNo"
            onChange={onChangeHandler}
            value={data.fpShopNo}
            required
          />
        </div>

        <div className="form-group">
          <label>Head Of Family</label>
          <input
            type="text"
            name="headOfFamily"
            onChange={onChangeHandler}
            value={data.headOfFamily}
            required
          />
        </div>

        <div className="form-group">
          <label>District</label>
          <input
            type="text"
            name="district"
            onChange={onChangeHandler}
            value={data.district}
            required
          />
        </div>

        <div className="form-group">
          <label>Consumer No</label>
          <input
            type="text"
            name="consumerNo"
            onChange={onChangeHandler}
            value={data.consumerNo}
            required
          />
        </div>

        <div className="form-group">
          <label>Card Type</label>
          <select
            name="cardType"
            onChange={onChangeHandler}
            value={data.cardType}
          >
            <option>Antyodaya Anna Yojana (AAY)</option>
            <option>Below Poverty Line (BPL)</option>
            <option>Above Poverty Line (APL)</option>
            <option>Others</option>
          </select>
        </div>

        <div className="form-group">
          <label>Application Status</label>
          <select
            name="applicationStatus"
            onChange={onChangeHandler}
            value={data.applicationStatus}
          >
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className="form-group">
          <label>Gas Connection</label>
          <select
            name="gasConnection"
            onChange={onChangeHandler}
            value={data.gasConnection}
          >
            <option>Single Connection</option>
            <option>Double Cylinder Connection</option>
            <option>Deepam Connection (Free) </option>
            <option>No Connection</option>
          </select>
        </div>

        <h3>RATION CARD MEMBER DETAILS</h3>
        {data.members.map((member, index) => (
          <div key={index} className="form-group">
            <label>Member Name</label>
            <input
              type="text"
              value={member.name}
              onChange={(e) => {
                const updatedMembers = [...data.members];
                updatedMembers[index].name = e.target.value;
                setData((prevData) => ({
                  ...prevData,
                  members: updatedMembers,
                }));
              }}
              required
            />
            <label>Age</label>
            <input
              type="number"
              value={member.age}
              onChange={(e) => {
                const updatedMembers = [...data.members];
                updatedMembers[index].age = e.target.value;
                setData((prevData) => ({
                  ...prevData,
                  members: updatedMembers,
                }));
              }}
              required
            />
            <label>Gender</label>
            <select
              value={member.gender} // Important!
              onChange={(e) => {
                const updatedMembers = [...data.members];
                updatedMembers[index].gender = e.target.value;
                setData((prevData) => ({
                  ...prevData,
                  members: updatedMembers,
                }));
              }}
              required
            >
              <option value="Select Gender">Select Gender</option>{" "}
              {/*Make this the default option*/}             {" "}
              <option value="Male">Male</option>             {" "}
              <option value="Female">Female</option>             {" "}
              <option value="Other">Other</option>           {" "}
            </select>
            <label>Relation</label>
            <input
              type="text"
              value={member.relation}
              onChange={(e) => {
                const updatedMembers = [...data.members];
                updatedMembers[index].relation = e.target.value;
                setData((prevData) => ({
                  ...prevData,
                  members: updatedMembers,
                }));
              }}
              required
            />
          </div>
        ))}
        <button type="button" className="add-member" onClick={addMember}>
          Add Member
        </button>

        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddRationCard;
