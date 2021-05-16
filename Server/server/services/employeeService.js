const { request, response } = require("express");
const model = require("../models/employee");

exports.employeeRegistration = (request, callback) => {
    console.log("Reqest Body :" + JSON.stringify(request.body))
    try {
        model.employeeModel.findOne({ "_name": request.body._name }, (err, employee) => {
            console.log("Employee Data:" + employee);
            if (employee)
                callback("Name Already exist");
            else {
                let employeeDetails;
                employeeDetails = new model.employeeModel({
                    "_name": request.body._name,
                    "_profilePic": request.body._profilePic,
                    "_gender": request.body._gender,
                    "_department": request.body._department,
                    "_salary": request.body._salary,
                    "_startDate": request.body._startDate,
                    "_note": request.body._note
                })
                employeeDetails.save()
                    .then(employee => {
                        callback(null, employee);
                    })
                    .catch(err => {
                        callback(err);
                    })
            }
        })
    } catch (e) {

    }
}

exports.getAllEmployee = (request, callback) => {
    console.log("From getAll Employee");
    try {
        model.employeeModel.find()
            .then(employees => {
                console.log(employees)
                    // response.json(employees);
                callback(null, employees);
            })
            .catch(err => {
                callback(err);
            })
    } catch (e) {

    }
}

exports.updateEmployee = (request, data, callback) => {
    let id = request.params.employee_id;
    console.log("From update employee");

    const updatedData = model.employeeModel.findByIdAndUpdate(id, data)
        .then(updatedData => {
            callback(null, updatedData);
        })
        .catch(err => {
            callback(err);
        })

}

exports.removeEmployee = (request, response, callback) => {
    let id = request.params.employee_id;
    model.employeeModel.remove({
            _id: id
        })
        .then(deletedEmployee => {
            response.send({ message: 'Employee Deleted Sucessfully! ' });
            callback(null, deletedEmployee);
        })
        .catch(err => {
            callback(err);
        })

}

// exports.searchByName = (request, response, callback) => {
//     var regex = new RegExp('^' + request.params.name, 'i'); // 'i' makes it case insensitive
//     return model.employeeModel.find({ text: regex }, function(err, q) {
//         return response.send(q);
//     });
// }


exports.searchByName = (request, response, callback) => {
    const searchField = request.params.employee_name;
    model.employeeModel.find({ _name: { $regex: searchField, $options: '$i' } })
        .then(data => {
            console.log(data);
            callback(null, data);
        })
        .catch(err => {
            callback(err);
        })
}