"use strict";
function doSomething() {
    return new Promise((resolve, reject) => {
        console.log("Doing something...");
        setTimeout(() => {
            resolve("Result of something");
            // reject("Error in doSomething"); // Uncomment to test error handling
        }, 1000);
    });
}
function doSomethingElse(result) {
    return new Promise((resolve, reject) => {
        console.log("Doing something else with:", result);
        setTimeout(() => {
            resolve("Result of something else");
            // reject("Error in doSomethingElse"); // Uncomment to test error handling
        }, 1000);
    });
}
function doThirdThing(result) {
    return new Promise((resolve, reject) => {
        console.log("Doing third thing with:", result);
        setTimeout(() => {
            resolve("Result of third thing");
            // reject("Error in doThirdThing"); // Uncomment to test error handling
        }, 1000);
    });
}
// ✅ Error handling function (was missing)
function failureCallback(error) {
    console.error("Something went wrong:", error);
}
// ✅ Promise chain
doSomething()
    .then((result) => doSomethingElse(result))
    .then((newResult) => doThirdThing(newResult))
    .then((finalResult) => {
    console.log(`Got the final result: ${finalResult}`);
})
    .catch(failureCallback);
