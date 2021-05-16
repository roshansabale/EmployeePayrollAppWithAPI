const stringifyDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const newDate = !date ? "undefined" :
        new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
    return newDate;
}

const checkName = (name) => {
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z]{3,}$');
    if (!nameRegex.test(name)) {
        throw 'Name is Incorrect!';
    } else {
        return true;
    }
}

const checkStartDate = (startDate) => {
    let now = new Date();
    if (startDate > now) throw 'Start Date is a future Date!';
    var diff = Math.abs(now.getTime() - startDate.getTime());
    if ((diff / (1000 * 60 * 60 * 24) > 30))
        throw 'Start Date is beyond 30 Days!';
}

function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs " + date.getMinutes() + "Mins " + date.getSeconds() + "Secs";
}

function makeServiceCall(methodType, url, async, data = null) {
    console.log("Data Is:" + data)
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            // console.log(methodType + " State changed called at:" + showTime() + " Ready state: " + xhr.readyState + " Status " + xhr.status);
            if (xhr.readyState >= 0 || xhr.status == 200) {
                if (xhr.status === 200 || xhr.status === 201) {
                    //alert(xhr.responseText);
                    let abc = JSON.stringify(xhr.responseText);
                    setTimeout(() => {
                        resolve(xhr.responseText);
                    }, 500);
                } else if (xhr.status >= 400) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                    console.log("Handled 400 client error or 500 server error at:" + showTime());
                }
            }
        }
        xhr.onerror = function() {
            reject({
                status: xhr.status,
                statusText: xhttp.statusText
            });
        };

        xhr.open(methodType, url, async);
        if (data != null) {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
            console.log(JSON.stringify(data));
        } else xhr.send();
        console.log(methodType + " Request sent to the server at: " + showTime());
    });
}