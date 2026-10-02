const express = require("express");

const app = express();
const PORT = 3000;

// Servir los archivos de esta carpeta
app.use(express.static(__dirname));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});