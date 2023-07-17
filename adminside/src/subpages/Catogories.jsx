import { useEffect, useState } from "react"
import Tablecomponent from "../parts/Table"
import api from "../axios/axios"
import DeleteCatagory from "./Deletecategory"
import Editcategory from "./Editcategory"
export default function Categories(props) {
  const [category, setCategory] = useState([])

  // const title ={
  //     id:"ID",
  //     name:'Name',
  //     edit:'Edit',
  //     delete:'Delete'
  // }
  const changeCategory = (value) => {
    setCategory(value)
  }
  useEffect(() => {
    api.get('/admin/category').then(({ data }) => {
      const datas = data.map(item => ({
        ...item,
        delete: <DeleteCatagory data={item} onClick={changeCategory} ></DeleteCatagory>,
        image:<img src={item.image} style={{width:'50px'}}></img>,

        edit: <Editcategory data={item} onClick={changeCategory}></Editcategory>

      }));
      setCategory(datas)
    })
  }, [props.change])
  return (
    
      <Tablecomponent Data={category} ></Tablecomponent>
    
  )



}