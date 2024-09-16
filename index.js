let express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

// Include the logging for all requests
app.use(morgan('common'));

app.use(express.static('view'));
app.use(express.json());

app.get('/', (req, resp) =>{
    resp.redirect('/HomePage.html');

})

app.use( (error, request, response, next)  => {
    // we may use properties of the error object
    // here and next(err) appropriately, or if
    // we possibly recovered from the error, simply next().
    let errorStatus = error.status || 500;
    response.status(errorStatus);
    response.send('ERROR('+errorStatus+'): ' + error.toString());
 })

// Tell our application to listen to requests at port 3000 on the localhost
app.listen(port, () => {
    // When the application starts, print to the console that our app is
    // running at http://localhost:3000. Print another message indicating
    // how to shut the server down.
    console.log(`Web server running at: http://localhost:${port}`);
    console.log(`Type Ctrl+C to shut down the web server`);
 })