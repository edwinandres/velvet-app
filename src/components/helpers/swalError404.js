import React from 'react'
import Swal from 'sweetalert2'

const swalError404 = (err) => {
    return Swal.fire({
        position: 'center',
        title: '¡Ha ocurrido un error al consultar el detalle! Contactar con soporte.',
        text: err,
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

export default swalError404
