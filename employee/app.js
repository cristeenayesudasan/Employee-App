const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


let employees = [
    { id: 1, name: 'Serena van der Woodsen', designation: 'Socialite', location: 'Upper East Side', salary: 100000 },
    { id: 2, name: 'Blair Waldorf', designation: 'Fashion Designer', location: 'Manhattan', salary: 120000 },
    { id: 3, name: 'Chuck Bass', designation: 'Businessman', location: 'New York', salary: 150000 },
    { id: 4, name: 'Dan Humphrey', designation: 'Writer', location: 'Brooklyn', salary: 80000 },
    { id: 5, name: 'Nate Archibald', designation: 'Journalist', location: 'Manhattan', salary: 95000 },
]

app.set('view engine', 'ejs');

//Display the employee list
app.get('/', (req, res) => {
    res.render('index', { employees });
});


app.get('/add', (req, res) => {
    res.render('add-employee');
});

// Add employee
app.post('/add', (req, res) => {
    const { employeeName, employeeDesignation, employeeLocation, employeeSalary } = req.body;
    const newEmployee = {
        id: employees.length + 1,
        name: employeeName,
        designation: employeeDesignation,
        location: employeeLocation,
        salary: parseFloat(employeeSalary)
    };
    employees.push(newEmployee);
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    const employee = employees.find(emp => emp.id === parseInt(id));

    if (employee) {
        res.render('edit-employee', { employee });
    } else {
        res.redirect('/');
    }
});

// Update Employee
app.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const { employeeName, employeeDesignation, employeeLocation, employeeSalary } = req.body;

    let employee = employees.find(emp => emp.id === parseInt(id));

    if (employee) {
        employee.name = employeeName;
        employee.designation = employeeDesignation;
        employee.location = employeeLocation;
        employee.salary = parseFloat(employeeSalary);
    }

    res.redirect('/');
});

// Delete Employee
app.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    employees = employees.filter(emp => emp.id !== parseInt(id));
    res.redirect('/');
});

// Start the server
app.listen(3000, () => {
    console.log('Employee app listening on port 3000');
});
