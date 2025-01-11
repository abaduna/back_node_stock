const express = require('express');
const cors = require('cors');
const productsRouter = require('./modules/products/router');
const stockRouter = require('./modules/Stock/router');
const usersRouter = require('./modules/users/Usersrouter');
const shopsRouter = require('./modules/Comercios/ShopsRouter');
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

// Ruta principal
app.use('/api/products', productsRouter);
app.use('/api/stock', stockRouter); 
app.use('/api/shops', shopsRouter);
app.use('/api/users', usersRouter);
// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
