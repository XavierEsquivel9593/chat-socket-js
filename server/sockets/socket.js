const { io } = require('../app');
const { Usuarios } = require('../classes/Usuarios');
const {crearMensaje} = require('../utils/utilidades');

const usuarios = new Usuarios();

io.on('connection', client => {

    client.on('entrarChat', (data, callback) => {
        if (!data.nombre && !data.sala) {
            return callback({
                ok: false,
                msj: 'nombre/sala son necesario'
            })
        }
        client.join(data.sala);
        usuarios.agregarPersona(client.id, data.nombre,data.sala);
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasSala(data.sala));
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Servidor',`${data.nombre} se unio`));

        callback(usuarios.getPersonasSala(data.sala));
    });

    client.on('crearMensaje',(data,cb)=>{
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre ,data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
        cb(mensaje);
    });

    client.on('disconnect', () => {
        //persona borrada
        let personaBorrada = usuarios.borrarPersona(client.id);
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje',crearMensaje('Servidor',`${personaBorrada.nombre}salio`))
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasSala(personaBorrada.sala));
    });

    client.on('privado', (data)=>{
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('privado', crearMensaje(persona.nombre, data.mensaje));
    });

});

//http://localhost:3000/chat.html?nombre=xavier&?sala=b