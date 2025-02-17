
const Database = {
    1: { id: 1, name: "Alice", age: 28 },
    2: { id: 2, name: "Bob", age: 32 },
    3: { id: 3, name: "Charlie", age: 25 }
};

async function fetchUser(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = Database[userId];
            if (user) {
                resolve(user);
            } else {
                reject(new Error("User not found")); 
            }
        }, 1000);
    });
}

fetchUser(1)
    .then(user => console.log(user))
    .catch(error => console.error(error));