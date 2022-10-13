export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
}


export function validateRuc(data) {
    //Elimina cualquier caracter espacio o signos habituales y comprueba validez
    var ruc = data.replace(/[-.,[\]()\s]+/g, "")
    // Devuelve un booleano si es un RUC válido
    // (deben ser 11 dígitos sin otro caracter en el medio)
    //11 dígitos y empieza en 10,15,16,17 o 20
    if (!(ruc >= 1e10 && ruc < 11e9
        || ruc >= 15e9 && ruc < 18e9
        || ruc >= 2e10 && ruc < 21e9))
        return false;
    for (var suma = -(ruc % 10 < 2), i = 0; i < 11; i++, ruc = ruc / 10 | 0)
        suma += (ruc % 10) * (i % 7 + (i / 7 | 0) + 1);
    return suma % 11 === 0;
}


export function validarDni(dni) {
    ///var celular_sel = $("#celular");

    var longitud_value = dni.length;
    //validamos si solo contiene números
    var isnum = /^\d+$/.test(dni);
    if (!isnum) {
        return false;
    }
    //validamos la longitud 
    if (longitud_value < 8 || longitud_value > 8) {
        return false;
    }
    return true;


}

export function NumeroCelular(dni) {
    var longitud_value = dni.length;
    //validamos si solo contiene números
    var isnum = /^\d+$/.test(dni);
    if (!isnum) {
        return false;
    }
    //validamos la longitud 
    if (longitud_value < 9 || longitud_value > 9) {
        return false;
    }
    return true;

}

export function validarEdad(dni) {

    var longitud_value = dni.length;
    //validamos si solo contiene números
    var isnum = /^\d+$/.test(dni);
    if (!isnum) {
        return false;
    }
    //validamos la longitud 
    if (longitud_value < 2 || longitud_value > 2) {
        return false;
    }
    return true;


}
