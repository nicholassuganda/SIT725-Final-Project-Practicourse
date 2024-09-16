let express = require('express');
const morgan = require('morgan');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = 3000;

const uri = "mongodb+srv://kcy96:DhEPU0pwqZSaaLVr@practicourse.r3ukg.mongodb.net/";

// Include the logging for all requests
app.use(morgan('common'));

app.use(express.static('view'));
app.use(express.json());

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function runDBConnection() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (ex) {
        console.error(ex);
    }
}
runDBConnection(); 


const CourseApi = require('./controllers/CoursesController');
const UserApi = require('./controllers/CoursesController');

app.use('/Course', CourseApi);
app.use('/User', UserApi);

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