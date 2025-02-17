async function fetchTodos() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/3');
        const todos = await response.json();
        return todos;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

(async () => {
    const users = await fetchTodos();
    console.log(users);
})();