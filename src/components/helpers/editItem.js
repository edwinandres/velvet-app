import Swal from "sweetalert2";
//import swal from '@sweetalert/with-react'
//import swal from '@sweetalert/with-react'
import withReactContent from 'sweetalert2-react-content'
import axios from "axios";
import FormularioEstacion from "../views/estacion/FormularioEstacion";
import SweetAlert from 'react-bootstrap-sweetalert';

const editItem = (e,objeto, id) => {

   const onConfirm = () => {
    //console.log(`id: ${id}`)
    //console.log(`objeto: ${objeto}`)
    alert("jajaj")
   }
return(

    <SweetAlert
        title="Editar"
        onConfirm={onConfirm}
    >
        <p>hola</p>
        {/* <FormularioEstacion /> */}
    </SweetAlert>

)

//     const MySwal = withReactContent(Swal)

// MySwal.fire({
//   title: <p>Hello World</p>,
//   footer: 'Copyright 2018',
//   didOpen: () => {
//     // `MySwal` is a subclass of `Swal`
//     //   with all the same instance & static methods
//     MySwal.clickConfirm()
//   }
// }).then(() => {
//   return MySwal.fire(<div><FormularioEstacion/> Shorthand works too</div>)
// })




    //swal(<FormularioEstacion />) 
    
    // swal({
    //     text: "How was your experience getting help with this issue?",
    //     buttons: {
    //       cancel: "Close",
    //     },
    //     content: (
    //       <div>
    //         <FormularioEstacion 
              
    //         />
            
    //       </div>
    //     )
    //   })//No need of `html` key

//   console.log(`entramos a swaldelete con e: ${e.target} , con objeto: ${objeto}  y con id: ${id}`)
//     e.preventDefault();
//     const element = e.currentTarget;
//     const swalWithBootstrapButtons = Swal.mixin({
//       customClass: {
//         confirmButton: 'btn btn-success mx-2',
//         cancelButton: 'btn btn-danger mx-2'
//       },
//       buttonsStyling: false
//     });
//     swalWithBootstrapButtons.fire({
       
//       title: '¿Estás segur@?',
//       text: "¡No podrás revertir esto!",
//       icon: 'warning',
     
//       showCancelButton: true,
//       confirmButtonText: '¡Sí, bórralo!',
//       cancelButtonText: '¡No, cancélalo!',
//       reverseButtons: true,
//       showClass: {
//         popup: 'animate__animated animate__fadeInDown'
//       },
//       hideClass: {
//         popup: 'animate__animated animate__fadeOutUp'
//       }
//     }).then((result) => {
//       if (result.isConfirmed) {
//         element.innerText = "...";
//         const deleteElement = async () => {
//           try {
//             const res = await axios({
//               method: 'DELETE',
//               url: `http://127.0.0.1:8000/api/delete-student/${id}`
//             });
//             if (res.data.status === 200) {
//               element.closest("tr").remove();
//               swalWithBootstrapButtons.fire(
//                 '¡Eliminado!',
//                 res.data.message,
//                 'success'
//               );
//             }
//           } catch (error) {
//             Swal.fire({
//               position: 'center',
//               title: '¡Ha ocurrido un error! Contactar con soporte.',
//               text: error,
//               icon: 'warning',
//               confirmButtonText: 'Aceptar',
//               showClass: {
//                 popup: 'animate__animated animate__fadeInDown'
//               },
//               hideClass: {
//                 popup: 'animate__animated animate__fadeOutUp'
//               }
//             });
//           }
//         }
//         deleteElement();

//       } else if (result.dismiss === Swal.DismissReason.cancel) {
//         swalWithBootstrapButtons.fire(
//           'Cancelad@',
//           'Está seguro :)',
//           'error'
//         );
//       }
//     });
  }

  export default editItem