//retorna el mismo string que se envia pero con la primera letra en mayuscula
export  function MaysPrimera(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}