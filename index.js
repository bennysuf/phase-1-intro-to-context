// Your code here

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
   return { 
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
   
    } 
    }

function createEmployeeRecords(employees) {
   return employees.map(employee => { 
    return createEmployeeRecord(employee)
    })
    }

function createTimeInEvent(employee, time) {
let [date, hour] = time.split(' ')
let eventObj = {
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
    }

 employee.timeInEvents = [...employee.timeInEvents, eventObj]
 return employee
    }

function createTimeOutEvent(employee, time) {
    let [date, hour] = time.split(' ')
    let eventObj = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    }
    
     employee.timeOutEvents = [...employee.timeOutEvents, eventObj]
    
     return employee
    }

function hoursWorkedOnDate(employee, date) {
        const timeIn = employee.timeInEvents.find(e => e.date === date)
        const timeOut = employee.timeOutEvents.find(e => e.date === date);
       return  (timeOut.hour - timeIn.hour) / 100
    }

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour
    }

function allWagesFor(employeeWage) {
    function reducer(previousValue, currentValue) {
        return previousValue + currentValue}

     let timeArr = []

  for (let i = 0; i < employeeWage.timeOutEvents.length; i++) {
     let date = employeeWage.timeOutEvents[i].date
   timeArr.push(wagesEarnedOnDate(employeeWage, date))
}

 return timeArr.reduce(reducer)
}
    
function calculatePayroll(employee) {
    return employee.map(e => allWagesFor(e)).reduce((currentValue, total) => currentValue + total)
}

