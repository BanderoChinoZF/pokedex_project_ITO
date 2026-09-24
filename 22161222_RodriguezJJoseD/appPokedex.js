async function buscarPokemon() {
    //Creamos la variable donde se almacenará lo escrito en el cuadro de búsqueda
    const entradaBusqueda = document.getElementById("buscadorPokedex");
    //Quitamos los espacios y convertimos a minusculas
    const entradaLimpia = entradaBusqueda.value.trim().toLowerCase();

    //En caso de que mande el input vacio que muestre una alerta
    if (entradaLimpia === "") {
        alert("Por favor, ingrese un nombre de Pokemon o su ID");
        return;
    }

    //Obtenemos los elementos del HTML por su ID
    const nombrePkm = document.getElementById("nombrePkm");
    const idPkm = document.getElementById("idPkm");
    const imagenPkm = document.getElementById("imagenPkm");
    const pesoPkm = document.getElementById("pesoPkm");
    const alturaPkm = document.getElementById("alturaPkm");
    const tipoPkm = document.getElementById("tipoPkm");

    try {
        //Realizamos la peticion a la API de PokeApi
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${entradaLimpia}`);

        //Si la respuesta no es exitosa, lanzamos un error
        if (!respuesta.ok) {
            throw new Error(`Pokemon no encontrado`);
        }

        //Convertimos la respuesta a JSON
        const datosPokemon = await respuesta.json();

        //Mostramos los datos del Pokemon
        nombrePkm.textContent = datosPokemon.name.toUpperCase();
        idPkm.textContent = `#${datosPokemon.id}`;
        imagenPkm.src = datosPokemon.sprites.front_default;
        pesoPkm.textContent = datosPokemon.weight / 10;
        alturaPkm.textContent = datosPokemon.height / 10;
        tipoPkm.textContent = datosPokemon.types[0].type.name.toUpperCase();

        // Mostramos la tarjeta del pokemon
        document.querySelector(".tarjetaPokemon").style.display = "flex";

    } catch (error) {
        alert("¡Pokemon no encontrado!");
        document.querySelector(".tarjetaPokemon").style.display = "none";
        console.log(error);
    }
}