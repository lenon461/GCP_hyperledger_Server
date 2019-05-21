const express = require('express');
const path = require('path');
const morgan = require('morgan');

const indexRouter = require('./routes');
const userRouter = require('./routes/user');

const app = express();

const yaml = require('yamljs');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggeryaml = yaml.load('./swagger/swagger.yaml');

app.set('view engine', 'pug');
app.set('port', process.env.PORT || 8989);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggeryaml));

app.use('/' , indexRouter);
app.use('/user' , userRouter);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'port is listening');
});
