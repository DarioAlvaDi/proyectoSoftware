const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars')
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
/*app.engine('.hbs', exphbs({
   defaultLayout: 'main',
   layoutsDir: path.join(app.get('views'), 'layouts')
}));*/
app.use(express.json())

app.use(morgan("dev"));

app.use(require("./routes"))


app.listen(app.get('port'), () => {
   console.log(app.get('port'), 'si');
});




