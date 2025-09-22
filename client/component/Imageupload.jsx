import { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [fileData, setFileData] = useState(null);

  const changeHandler = (e) => {
    setFileData(e.target.files[0]);
    console.log("Selected file:", e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!fileData) {
      alert("Please select an image before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("image", fileData);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/image/upload",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("res: ", res.data);
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="file"
        name="file"
        accept="image/*"
        onChange={changeHandler}
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageUpload;
