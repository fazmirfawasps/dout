import { useState } from "react";
import Modaldiv from "../parts/Modal";
import api from "../axios/axios";

 export default function AddCategory(props) {
    const[category,setCategory] = useState('')
    const [image,setImage]= useState('null')
    const[error,setError]=useState('')
    const data ={title:'Add Category'}
    const handleClick = () => {
      // Do something
      
      const formData = new FormData();
    formData.append('image', image);
    formData.append('name',category)
      
      if(category.length > 1){
        api.post('/admin/addcategory', formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          
        }).then(()=>{
         props.handleChange()
          setCategory('')
          setError('')
        })
      }
      else{
        setError('more than 2 character')
      }

     
      
    };
    const handleChange = (value)=>{
      setCategory(value)
  
    }
    const imageChange =(file)=>{
      setImage(file)

    }
  
    return (
      <div>
        <Modaldiv onClick={handleClick} onChange={handleChange} data={data} id={false} error={error} imageChange={imageChange}/>
        {/* <h1>{category}</h1> */}
      </div>
    );
  }