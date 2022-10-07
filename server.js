const app = require('./app');

const { mongoConnect } = require('./databases/config');

const dotenv = require("dotenv").config();

app.set("port", process.env.PORT || 3000);

const connect = mongoConnect();

app.listen(app.get('port'), () => {
    console.log(`Servidor arrancó en el puerto ${app.get('port')}`);
})