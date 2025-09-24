import {useState} from 'react'
import axios from 'axios';

const App = () => {
  const [image, setImage] = useState()
  const submitHandler = async(e) =>{
    e.preventDefault();
    try{
      const formData = new FormData();
      formData.append("file", image)
      const res = await axios.post('http://localhost:4000/api/fileupload/upload', formData, {withCredentials:true});
      console.log(res)
    }
    catch(err){
      console.log(err);
    }
  }

  const changeHandler = (e) =>{
    setImage(e.target.files[0]);
    console.log(image)
  }


  return (
    <div>
      {/* Multiple file uploads */}
      <form onSubmit={submitHandler}>
        <input type="file" multiple onChange={changeHandler} />
        <input type="submit"/>
      </form>
    </div>
  )
}

export default App