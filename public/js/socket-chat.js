let socket = io();

let searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('nombre') || !searchParams.has('sala')) {
    window.location = 'index.html';
    throw new Error(' el nombre es necesario');
}

let usuario = {
    nombre: searchParams.get('nombre'),
    sala: searchParams.get('sala')
}

socket.on('connect', function () {
    console.log('conectado al servidor');

    socket.emit('entrarChat', usuario, function (personas) {
        console.log(personas);

        //html
        renderizarUsuarios(personas);
    });
});

socket.emit('disconnect', function () {
    console.log('se perdio la conexion');
});


socket.on('crearMensaje', function (mensaje) {
    //html
    renderizarMensaje(mensaje, false);
    scrollBottom();
});

//escuchar cambio de susuarios
socket.on('listaPersona', function (personas) {
    renderizarUsuarios(personas);
    //html
});

//mensajes privados
socket.on('privado',function(mensaje){
console.log('mensaje privado', mensaje)
});