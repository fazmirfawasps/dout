
import { FaTrashAlt } from "react-icons/fa";
import api from "../axios/axios";
import swal from 'sweetalert';

import Editcategory from "./Editcategory";


export default function DeleteCatagory({ data, onClick }) {
  const dele = () => {
    swal({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      buttons: ['Cancel', 'Delete'],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          api.delete('/admin/category', {
            data: {
              id: data._id,
              name: data.Category
            }
          }).then(({ data }) => {
            const datas = data.map(item => ({
              ...item,
              delete: <DeleteCatagory data={item} onClick={onClick}></DeleteCatagory>,
              image: <img src={item.image} style={{ width: '50px' }}></img>,

              edit: <Editcategory data={item} onClick={onclick}></Editcategory>

            }));
            onClick(datas)
            swal('Poof! Your file has been deleted!', {
              icon: 'success',
            });
          })


        } else {
          swal('Your file is safe!');
        }
      });

  }

  return (
    <div>
      <button style={{ width: '48px', height: '40px', backgroundColor: 'black', borderColor: 'white', borderRadius: '20%', }}>      <FaTrashAlt onClick={dele} color="white" size={15} />
      </button>
    </div>
  )
}