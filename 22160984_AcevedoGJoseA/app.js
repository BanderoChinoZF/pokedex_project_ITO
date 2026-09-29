
function buscarPokemonxd() {
    
    var cajaTexto = document.getElementById("pokemonInput");
    var valorBuscado = cajaTexto.value.toLowerCase().trim(); 

    if (valorBuscado === "") {
        alert("¡escribe algo primero!");
        return;
    }

   
    var urlDeLaApi = "https://pokeapi.co/api/v2/pokemon/" + valorBuscado;

   
    fetch(urlDeLaApi)
        .then(function(respuesta) {
           
            if (!respuesta.ok) {
                throw new Error("No se encontro ese pokemon, ¿escribiste bien el nombre o el número?");
            }
            return respuesta.json(); 
        })
        .then(function(datosDelPokemon) {
           
            var nombre = datosDelPokemon.name;
            var numeroId = datosDelPokemon.id;
            var peso = datosDelPokemon.weight;
            var imagen = datosDelPokemon.sprites.front_default;
            
            
            
            var tipos = "";
            for (var i = 0; i < datosDelPokemon.types.length; i++) {
            
                tipos += datosDelPokemon.types[i].type.name + " ";
            }
            
            var vidaHP = datosDelPokemon.stats[0].base_stat; 
            var velocidad = datosDelPokemon.stats[5].base_stat; 

    
            var divResultado = document.getElementById("resultadoCaja");
            
            
            var elHtmlParaInsertar = `
                <div class="tarjeta-poke">
                    <h2>${nombre.toUpperCase()} (#${numeroId})</h2>
                    <img src="${imagen}" alt="Foto de ${nombre}">
                    <p><strong>Peso oficial:</strong> ${peso} </p>
                    <hr style="border: 1px solid #ccc; margin: 15px 0;">
                    <h4 style="margin-bottom: 5px; color: #ff3333;">Datos Extra:</h4>
                    <p><strong>Tipo(s):</strong> ${tipos.toUpperCase()}</p>
                    <p><strong>Salud Base (HP):</strong> ${vidaHP}</p>
                    <p><strong>Velocidad Base:</strong> ${velocidad}</p>
                </div>
            `;

            
            divResultado.innerHTML = elHtmlParaInsertar;

        })
        .catch(function(error) {
      
            var divResultado = document.getElementById("resultadoCaja");
            divResultado.innerHTML = `<p style="color:red;"><b>Error:</b> ${error.message}</p>`;
        });
}
