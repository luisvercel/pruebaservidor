export const LoginCheck = () => {

    let time = (Math.floor(new Date().getTime() - parseInt("" + localStorage.getItem("session_axnweb"))) / 1000 / 60);

    if (time < 800 && localStorage.getItem("token_axnweb")) {
        return true;
    }
    else {

        localStorage.removeItem("session_axnweb");
        localStorage.removeItem("token_axnweb");

        localStorage.removeItem("nombreusuario_axnweb");
        localStorage.removeItem("paternog_axnweb");
        localStorage.removeItem("maternog_axnweb");

        localStorage.removeItem("idexternog_axnweb");
        localStorage.removeItem("idcontrato_axnweb");
        localStorage.removeItem("uuidg_axnweb");

        localStorage.removeItem("email_axnweb");
        localStorage.removeItem("direccion_axnweb");
        localStorage.removeItem("celular_axnweb");
        localStorage.removeItem("fechanacimiento_axnweb");

        localStorage.removeItem("fecharegistro_axnweb");
        localStorage.removeItem("clabeKuspit_axnweb");

        return false;
    }
}