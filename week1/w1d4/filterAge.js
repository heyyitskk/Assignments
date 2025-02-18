const Users = [{
        name: "Bhargav",
        age: 17,
    },
    {
        name: "Kunal",
        age: 22
    },
    {
        name: "Samanta",
        age:35
    },
    {
        name: "Sachin",
        age:50
    }
]

function filterAge(){
    return Users.filter((user) => user.age >= 18);
}

console.log(filterAge());