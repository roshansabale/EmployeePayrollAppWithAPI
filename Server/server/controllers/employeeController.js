const { request, response } = require('express');
const employeeService = require('../services/employeeService');

exports.employeeController = (request, response) => {
    console.log("Reqest Body :" + JSON.stringify(request.body))
    request.checkBody("_name", "Name cannot be empty").isAlpha().len({ min: 3 });
    request.checkBody("_profilePic", "Profile pic cannot be empty").notEmpty();
    request.checkBody("_gender", "Gender cannot be empty").notEmpty();
    request.checkBody("_department", "Department cannot be empty").notEmpty();
    request.checkBody("_salary", "Salary cannot be empty").notEmpty();
    request.checkBody("_startDate", "Date cannot be empty").notEmpty();
    request.checkBody("_note", "Note cannot be empty").notEmpty();

    //getting error while validation
    const error = request.validationErrors();
    //if validation gets error send response 
    if (error)
        response.status(422).send(error);
    else {
        employeeService.employeeRegistration(request, (err, data) => {
            if (err) {
                response.status(500).send(err);
            } else {
                // response.status(200).send("Successfully added", data);
                response.send(200, data);
            }
        })
    }

}

exports.getAll = (request, response) => {

    try {
        employeeService.getAllEmployee(request, (err, data) => {
            if (err) {
                response.status(500).send(err);
            } else {
                let dataResponse = { message: "Sucessfully Retrived Employees!!", data: data }
                response.status(200).send(dataResponse);
            }
        })
    } catch (e) {
        response.status(404).send("Not Found!!");
    }
}

exports.updateEmployee = (request, response) => {

    //getting error while validation
    const error = request.validationErrors();
    //if validation gets error send response 

    if (error)
        response.status(422).send(error);
    else {
        let employeeData = {
            "_name": request.body._name === null ? null : request.body._name,
            "_profilePic": request.body._profilePic === null ? null : request.body._profilePic,
            "_gender": request.body._gender === null ? null : request.body._gender,
            "_department": request.body._department === null ? null : request.body._department,
            "_salary": request.body._salary === null ? null : request.body._salary,
            "_startDate": request.body._startDate === null ? null : request.body._startDate,
            "_note": request.body._note === null ? null : request.body._note
        }
        employeeService.updateEmployee(request, employeeData, (err, data) => {
            if (err) {
                response.status(500).send(err);
            } else {
                // response.status(200).send("Successfully added", data);
                let dataResponse = { message: "Successfully Updated!!", data: employeeData }
                response.status(200).send(dataResponse);

            }
        })
    }

}

exports.removeEmployee = (request, response) => {

    //getting error while validation
    const error = request.validationErrors();
    //if validation gets error send response 
    if (error)
        response.status(422).send(error);
    else {
        employeeService.removeEmployee(request, response, (err, data) => {
            if (err) {
                response.status(500).send(err);
            } else {
                let dataResponse = { message: "Successfully Updated!!" }
                response.status(200).send(dataResponse);
            }
        })
    }

}

exports.searchByName = (request, response) => {
    const error = request.validationErrors();
    if (error)
        response.status(422).send(error);
    else {
        employeeService.searchByName(request, response, (err, data) => {
            if (err) {
                response.status(500).send(err);
            } else {
                let dataResponse = { data: data }
                response.status(200).send(dataResponse);
            }
        })
    }
}