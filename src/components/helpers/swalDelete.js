import Swal from "sweetalert2";
import axios from "axios";

const deleteDivision = (e,objeto, id) => {

  console.log(`entramos a swaldelete con e: ${e} , con objeto: ${objeto}  y con id: ${id}`)
    e.preventDefault();
    const element = e.currentTarget;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-2',
        cancelButton: 'btn btn-danger mx-2'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: '¿Estás segur@?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, bórralo!',
      cancelButtonText: '¡No, cancélalo!',
      reverseButtons: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        element.innerText = "...";
        const deleteElement = async () => {
          try {
            // const res = await axios({
            //   method: 'DELETE',
            //   //url: `http://127.0.0.1:8000/api/delete-student/${id}`
            //   url: process.env.REACT_APP_URL_SERVICES + `${objeto}/${id}`
            // });
            //const res = await axios.delete(process.env.REACT_APP_URL_SERVICES + `/${id}`);
 const res = axios.delete(process.env.REACT_APP_URL_SERVICES + `${objeto}/${id}`)
console.log(`esto es la data obtenida en ${objeto}: ${JSON.stringify(res.data)}`)
            if (res.data.status === 200) {
              element.closest("tr").remove();
              swalWithBootstrapButtons.fire(
                '¡Eliminado!',
                res.data.message,
                'success'
              );
            }
          } catch (error) {
            Swal.fire({
              position: 'center',
              title: '¡Ha ocurrido un error! Contactar con soporte.',
              text: error,
              icon: 'warning',
              confirmButtonText: 'Aceptar',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            });
          }
        }
        deleteElement();

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelad@',
          'Está seguro :)',
          'error'
        );
      }
    });
  }

  export default deleteDivision