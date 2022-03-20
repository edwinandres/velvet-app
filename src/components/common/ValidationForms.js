const validationsForm =  (form) => {


 console.log("ESTO ES FORM COMPLETO EN VALIDATION FORMS", form)
    

    let errors ={};
    //let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    //let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    //let regexComments = /^.{1,255}$/;
    let regexLatitud = /^(-?([0-8]?[0-9](\.\d{1,5})?|90(.[0]+)?)\s?)$/;
    let regexLongitud = /^(-?([1]?[0-7]?[0-9](\.\d{1,5})?|180((.[0]+)?)))$/;

    if(form.altitud==='' || form.altitud === null){
        errors.altitud = "El campo altitud es requerido";
    }

    if(form.latitud==='' || form.latitud === null){
        errors.latitud = "El campo latitud es requerido"
    }else if(!regexLatitud.test(form.latitud)){
        errors.latitud = "Latitud inválida"
    }

    if(form.longitud==='' || form.longitud === null){
        errors.longitud = "El campo longitud es requerido"
    }else if(!regexLongitud.test(form.longitud)){
        errors.longitud = "Longitud inválida"
    }
   
    if(form.nombre==='' || form.nombre === null){
        errors.nombre = "El campo nombre es requerido"
    }
    


    return errors;






    // //validaciones nombre
    // if(!form.name.trim()){
    //     errors.name = "El campo Nombre es requerido";
    // }else if(!regexName.test(form.name.trim())){
    //     errors.name = "El campo nombre solo acepta letras y espacios en blanco"
    // }

    // //validaciones email
    // if(!form.email.trim()){
    //     errors.email = "El campo email es requerido";
    // }else if(!regexEmail.test(form.email.trim())){
    //     errors.email = "Se requiere un email valido"
    // }

    // //validaciones subject
    // if(!form.subject.trim()){
    //     errors.subject = "El campo asunto es requerido";
    // }

    // //validaciones comments
    // if(!form.comments.trim()){
    //     errors.comments = "El campo comentarios es requerido";
    // }else if(!regexComments.test(form.comments.trim())){
    //     errors.comments = "No debe exceder los 255 caracteres"
    // }

    // return errors;
};

export default validationsForm;