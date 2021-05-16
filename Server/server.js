let express = require('express');
let expressValidator = require('express-validator');
let bodyParser = require('body-parser');
let cors = require('cors');
let model = require('./server/models/employee')

const mongoose = require('mongoose');
const router = require('./server/routes/routes');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use('/', router);

// app.get('/api/employees', function(req, res) {
//     // use mongoose to get all todos in the database
//     model.employeeModel.find(function(err, employees) {
//         // if there is an error retrieving, send the error otherwise send data
//         if (err)
//             res.send(err)
//         res.json(employees); // return all employees in JSON format
//     });
// });

// app.put('/api/employees/:employee_id', function(req, res) {
//     // create mongose method to update a existing record into collection
//     let id = req.params.employee_id;
//     var data = {
//         "name": req.body.name,
//         "profilePic": req.body.profilePic,
//         "gender": req.body.gender,
//         "department": req.body.department,
//         "startDate": req.body.startDate,
//         "note": req.body.note
//     }

//     // save the user
//     model.employeeModel.findByIdAndUpdate(id, data, function(err, employee) {
//         if (err) throw err;

//         res.send('Successfully! Employee updated - ' + employee.name);
//     });
// });

mongoose.connect("mongodb://localhost:27017/employeePayrollApp", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("connected to databse !!!", );
    })
    .catch(err => {
        console.log("Not connected to the database", err);
        process.exit();
    });

let server = app.listen(3000, () => {
    console.log("server is listening on port 3000");
})