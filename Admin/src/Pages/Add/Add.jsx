import React, { useState } from "react";
import axios from "axios";
import "./Add.css";
import upload_area from "../../assets/admin_assets/upload_area.png";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    rationCategory: "",
    category: "Wheat",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("rationCategory", data.rationCategory);
    formData.append("category", data.category);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          rationCategory: "",
          category: "Wheat",
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="Admin-add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : upload_area}
              alt="Uploaded Preview"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type Here"
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write Content Here"
            required
          ></textarea>
        </div>

        <div className="add-category-price">
          {/* <div className="add-category flex-col">
            <p>Ration Category</p>
            <select
              name="rationCategory"
              value={data.rationCategory}
              onChange={onChangeHandler} // Move onChange here
            >
              <option value="--">Select Option</option>
              <option value="Antyodaya Anna Yojana (AAY)">AAY</option>
              <option value="Below Poverty Line (BPL)">BPL</option>
              <option value="Above Poverty Line (APL)">APL</option>
            </select>
          </div> */}
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
            >
              <option value="Rice">Rice</option>
              <option value="Wheat">Wheat</option>
              <option value="Salt">Salt</option>
              <option value="Kerosene">Kerosene</option>
              <option value="Sugar">Sugar</option>
              <option value="Edible Oil">Edible Oil</option>
              <option value="Pulses">Pulses</option>
              <option value="Coarse Grains">Coarse Grains</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="Rs. 20"
              required
            />
          </div>
        </div>

        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
