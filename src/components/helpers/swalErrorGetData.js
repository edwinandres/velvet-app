import Swal from 'sweetalert2';

const swalErrorGetData = (err) => {
    return Swal.fire({
        position: 'center',
        title: '¡Ha ocurrido un error! Contactar con soporte A VER QUE PASA.',
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

export default swalErrorGetData
