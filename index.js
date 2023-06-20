//advance-table.html - Vista
//modal.html - Referencia
//404.html - Vista
//input.html - Referencia

//constantes
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;
const rutasCategorias = require('./src/routes/categorias-routes-api');

const app = express();

//vistas dinamicas
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + 'views/partials', ()=>{});

//middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors())

//"usar" rutas categorias
app.use(rutasCategorias);

//rutas temporales
app.get('/', (req, res) => {
    res.render('dashboard');
})

app.get('/categorias', (req, res) => {
    res.render('categorias');
})

app.get('*', (req, res) => {
    res.render('404');
})

app.listen(port, () => {
    console.log('servidor en express corriendo en el puerto ', port);
})