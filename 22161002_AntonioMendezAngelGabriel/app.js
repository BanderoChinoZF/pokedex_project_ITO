const inputPokemon = document.getElementById('pokemonInput');
const botonBuscar = document.getElementById('searchButton');
const contenedor = document.getElementById('pokebola');

botonBuscar.addEventListener('click', () => {
    
    const pokemon = inputPokemon.value.toLowerCase();
    
    console.log("Buscando a: ", pokemon);

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(respuesta => respuesta.json())
        .then(datos => {
            contenedor.innerHTML = `
                <h2>${datos.name}</h2>
                <p><strong>ID:</strong> ${datos.id}</p>
                <p><strong>Peso:</strong> ${datos.weight / 10} kg</p>
                <img src="${datos.sprites.front_default}" alt="Imagen de ${datos.name}">
            `;
        })
        .catch(error => {
            console.log("Error. Quizá el Pokémon no existe:", error);
            contenedor.innerHTML = `<p>Pokémon no encontrado. Intenta de nuevo.</p>`;
        });
});


rama main descargar
fork comando  crear rama a partir de rama main y posteriormente hacer pull request para enviar cambios a la rama , en la rama main poner en la carpeta numcontrol_name y en esa carpeta poner el codigo
la rama igual numcontrol_name y hacer el pull request a la rama main, en la rama veremos pkp 0001 en esa rama tiene el cambio del profe

de la rama main vamos a extender subir cambios hacer una rama nueva e intentar hacer esos cambios en la rama main

mañana hacer uno por uno el cambio

lo de la rama que esta localmente lo vamos a subir

la herramienta fork es una gui git
- la gitkraken es similar es una interfaz grafica de git
para mañana descargar el fork

