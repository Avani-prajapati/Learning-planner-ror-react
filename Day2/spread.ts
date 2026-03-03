const array1 = [1,2,3,4]
const array2 = [5,6,7,8]

const combined = [...array1, ...array2];
console.log(combined); 


function joinAll(...strs: string[]){
    return strs.join(" ");
}

console.log(joinAll("Hello", "world", "this", "is", "a", "test"));