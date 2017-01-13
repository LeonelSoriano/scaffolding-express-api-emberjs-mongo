
function initializer(){
	validate.validators.presence.message = "Es requerido";
	validate.validators.length.tooLong = "Demaciado largo";
	validate.validators.email.message = "No tiene formato de correo";

}


function getMyConstrainst(){

   return  {
    nombre : {
        presence : true,
        length: {maximum: 64}
    },

    apellido : {
        presence : true,
        length: {maximum: 64}
    
    },

    profesion : {
        presence : true,
        length : {maximun: 64}
    },

    correo: {
        presence : true,
        email : true,
        length : {maximun: 64} 
    },

    telefono: {
        format : {
            pattern : /^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/,                                    
            message : "Debe poseer un formato  valido"
        
        }
    
    }


}

}



