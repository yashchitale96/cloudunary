import { useState } from "react";
import axios from "axios";

const App = () => {
  const [singleFile, setSingleFile] = useState(null);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [fetchedImages, setFetchedImages] = useState([]); // <-- store images here

  const uploadSingleHandler = async (e) => {
    e.preventDefault();
    if (!singleFile) return alert("Please select a file first");

    try {
      const formData = new FormData();
      formData.append("file", singleFile);

      const res = await axios.post(
        "http://localhost:4000/api/fileupload/upload",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Single upload response:", res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const uploadMultipleHandler = async (e) => {
    e.preventDefault();
    if (multipleFiles.length === 0) return alert("Please select files first");

    try {
      const formData = new FormData();
      multipleFiles.forEach((file) => formData.append("file", file));

      const res = await axios.post(
        "http://localhost:4000/api/fileupload/upload",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Multiple upload response:", res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getImages = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        "http://localhost:4000/api/fileupload/getImage"
      );
      console.log("Response: ", res.data);

      // store image array in state
      setFetchedImages(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* Single file upload */}
      <div>
        <form onSubmit={uploadSingleHandler}>
          <label>Single File: </label>
          <input
            type="file"
            onChange={(e) => setSingleFile(e.target.files[0])}
          />
          <input type="submit" value="Upload Single" />
        </form>
      </div>

      <br />

      {/* Multiple file upload */}
      <div>
        <form onSubmit={uploadMultipleHandler}>
          <label>Multiple Files: </label>
          <input
            type="file"
            multiple
            onChange={(e) => setMultipleFiles([...e.target.files])}
          />
          <input type="submit" value="Upload Multiple" />
        </form>
      </div>

      <br />

      {/* Fetch Images */}
      <div>
        <button onClick={getImages}>Get Images</button>
      </div>

      {/* Show fetched images */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "20px" }}>
        {fetchedImages.length > 0 ? (
          fetchedImages.map((item) => (
            <img
              key={item._id}
              src={item.image}
              alt="uploaded"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
                boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
              }}
            />
          ))
        ) : (
          <p>No images fetched yet</p>
        )}
      </div>
    </>
  );
};

export default App;
