class Usuarios {
    constructor (){
        this.personas = [];
    }

    agregarPersona(id, nombre, sala){
        let persona = {id, nombre, sala};
        this.personas.push(persona);
        return this.personas;
    }

    getPersona(id){
        let persona = this.personas.find(persona => persona.id === id);
        return persona;
    }

    getPersonas(){
        return this.personas;
    }

    //personas por sala
    getPersonasSala(sala){
        let personasSala = this.personas.filter(persona => persona.sala === sala);
        return personasSala;
    }
    //borrar personas
    borrarPersona(id){
        let personaBorrada= this.getPersona(id);
        this.personas = this.personas.filter(persona => persona.id !== id);
        return personaBorrada;
    }
}

module.exports = {
    Usuarios
}