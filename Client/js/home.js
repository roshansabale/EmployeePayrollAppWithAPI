let empPayrollList;
var xhttp = new XMLHttpRequest();
window.addEventListener('DOMContentLoaded', (event) => {

    if (site_properties.use_local_storage.match("true")) {
        getEmployeePayrollDataFromStorage();
    } else getEmployeePayrollDataFromServer();
    // empPayrollList = getEmployeePayrollDataFromStorage();
    // document.querySelector('.emp-count').textContent = empPayrollList.length;
    // createInnerHtml();
    // localStorage.removeItem('editEmp');
});
const getEmployeePayrollDataFromStorage = () => {

    // return localStorage.getItem('EmployeePayrollList') ?
    //     JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
    empPayrollList = localStorage.getItem('EmployeePayrollList') ?
        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
    processEmployeePayrollDataResponse();
}

const processEmployeePayrollDataResponse = () => {
    document.querySelector('.emp-count').textContent = empPayrollList.data.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
}

const getEmployeePayrollDataFromServer = () => {
    makeServiceCall("GET", "http://localhost:3000/get", true)
        .then((responseText) => {
            console.log("Response text" + responseText);
            empPayrollList = JSON.parse(responseText);
            console.log("Employee Array :" + JSON.stringify(empPayrollList.data));
            processEmployeePayrollDataResponse();
        })
        .catch(error => {
            console.log("GET Error Status:" + JSON.stringify(error));
            empPayrollList = [];
            processEmployeePayrollDataResponse();
        });
    //xhttp.send();
}

/* Template Literal ES6 feature */
const createInnerHtml = () => {
    console.log(empPayrollList.data);
    if (empPayrollList.length == 0) return;

    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    for (const empPayrollData of empPayrollList.data) {

        innerHtml = `${innerHtml}  
    <tr>
    <td data-label="ProfilePic"><img class="profile" src="${empPayrollData._profilePic}" alt=""></td>
    <td data-label="Name">${empPayrollData._name}</td>
    <td data-label="Gender">${empPayrollData._gender}</td>
    <td data-label="Department">${getDeptHtml(empPayrollData._department)}</td> 
    <td data-label="Salary">${empPayrollData._salary}</td>
    <td data-label="StartDate">${stringifyDate(empPayrollData._startDate)}</td>
    <td data-label="Actions">
       <img id="${empPayrollData._id}"  onclick="remove(this)" 
            src="../assets/icons/delete-black-18dp.svg" alt="delete">
       <img id="${empPayrollData._id}" onclick="update(this)"
            src="../assets/icons/create-black-18dp.svg" alt="edit">  
    </td>
    </tr>
    `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}
const update = (node) => {
    let empPayrollData = empPayrollList.data.find(empData => empData._id == node.id);
    if (!empPayrollData) return;
    localStorage.setItem('editEmp', JSON.stringify(empPayrollData))
    window.location.replace(site_properties.add_emp_payroll_page);
    console.log(node._id);
}

const remove = (node) => {

    console.log("Remove method called", node);
    let empPayrollData = empPayrollList.data.find(empData => empData._id == node.id);
    if (!empPayrollData) return;
    const index = empPayrollList.data
        .map(empData => empData.id)
        .indexOf(empPayrollData.id);
    console.log("Remove method called" + index);

    empPayrollList.data.splice(index, 1);

    if (site_properties.use_local_storage.match("true")) {
        localStorage.setItem('EmployeePayrollList', JSON.stringify(empPayrollList));
        document.querySelector('.emp-count').textContent = empPayrollList.data.length;
        createInnerHtml();
        window.location.href = "home.html";
    } else {
        const deletURL = "http://localhost:3000/remove" + "/" + empPayrollData._id.toString();
        makeServiceCall("DELETE", deletURL, false)
            .then(responseText => {
                document.querySelector('.emp-count').textContent = empPayrollList.data.length;
                createInnerHtml();
                getEmployeePayrollDataFromServer();
            })
            .catch(error => {
                console.log("DELETE Error Status: " + JSON.stringify(error));
            });
    }
}

const search = (event) => {
    event.preventDefault();
    let value = document.getElementById('search').value;
    console.log(value);
    let searchUrl = "http://localhost:3000/search";
    makeServiceCall("GET", searchUrl + "/" + value, true)
        .then((responseText) => {
            console.log("Response text" + responseText);
            empPayrollList = JSON.parse(responseText);
            console.log("Employee Array :" + JSON.stringify(empPayrollList.data));
            processEmployeePayrollDataResponse();
        })
        .catch(error => {
            console.log("GET Error Status:" + JSON.stringify(error));
            empPayrollList = [];
            processEmployeePayrollDataResponse();
        });
    // xhttp.send();
}