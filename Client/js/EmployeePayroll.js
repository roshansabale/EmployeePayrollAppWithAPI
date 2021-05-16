class EmployeePayrollData {
    id;
    // get id() { return this._id; }
    // set id(id) {
    //     let idRegex = RegExp('[1-9]+[0-9]?');

    //     if (idRegex.test(id))
    //         this._id = id;
    //     else throw 'ID is incorrect'
    // }

    //Getter and setter
    get name() { return this._name; }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z]{3,}$');
        if (nameRegex.test(name))
            this._name = name;
        else throw 'Name is incorrect!!'
    }

    get profilePic() { return this._profilePic; }
    set profilePic(profilePic) {
        this._profilePic = profilePic;
    }

    get gender() { return this._gender; }
    set gender(gender) {
        this._gender = gender;
    }

    get department() { return this._department; }
    set department(department) {
        this._department = department;
    }

    get salary() { return this._salary; }
    set salary(salary) {
        let salaryRegex = RegExp('[1-9]+[0-9]?');

        if (salaryRegex.test(salary))
            this._salary = salary;
        else throw 'salary is invalid'
    }

    get note() { return this._note; }
    set note(note) {
        this._note = note;
    }

    get startDate() { return this._startDate; }
    set startDate(startDate) {
        let now = new Date();
        if (startDate > now) throw 'Start Date is a Future Date!';
        var diff = Math.abs(now.getTime() - startDate.getTime());
        if ((diff / (1000 * 60 * 60 * 24) > 30))
            throw 'Start Date is beyond 30 Days!';
        this._startDate = startDate;
        console.log("Start date from setter", this._startDate);
    }

    //method
    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const empDate = this.startDate == undefined ? "undefined" : this.startDate.toLocaleDateString('en-US', options);
        console.log("Empdate", empDate, "Startdate", this.startDate);
        return "id= " + this.id + ", name= " + this.name + ", salary= " + this.salary + ", Gender: " +
            this.gender + ", Start Date: " + empDate + ", Department: " + this.department + ", Note: " + this.note;
    }
}