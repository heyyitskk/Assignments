let str = "John,25,Developer;Sarah,30,Designer";

let EmpArray = str.split(';').map(emp => {
    const[name, age, role] = emp.split(',');
    return {
        name: name,
        age: age,
        role: role
    };
})

console.log(EmpArray);





