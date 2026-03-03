// const foo = ["one", "two", "three"];

// const [red, yellow, green] = foo;
// console.log(red); 
// console.log(yellow); 
// console.log(green); 


// const foo = ["one", "two"];

// const [red, yellow, green, blue] = foo;
// console.log(red); 
// console.log(yellow); 
// console.log(green); 
// console.log(blue); 


function f(){
    return [1,2,3,4,5];
}
const arr = f();
const [first, ...rest] = arr;
const last = rest.pop();
console.log(first); // 1
console.log(last);  // 5