const heroes = [
    {
        id: 1,
        name: 'Batman',
        owner: 'DC'
    },
    {
        id: 2,
        name: 'Spiderman',
        owner: 'Marvel'
    },
    {
        id: 3,
        name: 'Superman',
        owner: 'DC'
    },
    {
        id: 4,
        name: 'Flash',
        owner: 'DC'
    },
    {
        id: 5,
        name: 'Wolverine',
        owner: 'Marvel'
    },
];
//find solo busca uno
const heroe =(id)=>{
    return heroes.find(heroe => heroe.id === id);
}
//console.log(heroe(1));
//const resultado = heroes.find(heroe => heroe.name === 'Flash');


//filter trae todos los que cumplen con una condicion

const filtro = (id)=>{
    return heroes.filter(filtro => filtro.id !== id);
}

//const  heroess = heroes.filter(heroe => heroe.owner !== 'Marvel');
console.log(filtro(1));