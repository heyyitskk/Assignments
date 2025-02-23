function divide(a, b){
    try{
        if(b == 0)  throw new Error("Division by zero not possible");
        return a / b;
    }
    catch(e){
        if (e instanceof Error) return e.message;
        throw e;
    }
}

console.log(divide(2,0));