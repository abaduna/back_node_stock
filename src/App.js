const express = require('express');
const cors = require('cors');
const productsRouter = require('./modules/products/router');
const stockRouter = require('./modules/Stock/router');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*", // TODO: change to .env
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  }),
);

app.use('/products', productsRouter);
app.use('/stock', stockRouter); 
// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Hola, mundo desde Express!');
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
