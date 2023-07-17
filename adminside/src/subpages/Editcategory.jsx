import {  useState } from "react"
import Modaldiv from "../parts/Modal"
import api from "../axios/axios"
import DeleteCatagory from "./Deletecategory"
import { FaEdit } from "react-icons/fa"

export default function Editcategory(props) {

  const [image, setImage] = useState('null')
  const data = { title: 'Edit Category' }
  const icon = <FaEdit></FaEdit>
  const [edit, setEdit] = useState('')
  const [id, setId] = useState(props.data._id)
  
  const handleClick = () => {
    // Do something
    const formData = new FormData();
    formData.append('image', image);
    formData.append('Category', edit)
    formData.append('old', props.data.image)
    formData.append('oldname', props.data.Category)


    formData.append('id', id)

    api.post('/admin/editcategory', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },

    }

    ).then(({ data }) => {
      const datas = data.map(item => ({
        ...item,
        delete: <DeleteCatagory data={item} onClick={props.onClick}></DeleteCatagory>,
        image:<img src={item.image} style={{width:'50px'}}></img>,

        edit: <Editcategory data={item} onClick={ props.onClick}></Editcategory>

      }));
      props.onClick(datas)

    })

  };
  const handleChange = (value, id) => {
    setEdit(value)
    setId(id)

  }
  const imageChange = (file) => {
    setImage(file)
    setId(id)

  }

  return (
    <Modaldiv data={data} icon={icon} id={props.data} onClick={handleClick} onChange={handleChange} imageChange={imageChange}></Modaldiv>
  )
}