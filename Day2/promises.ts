function doSomething(): Promise<string> { 
  return new Promise((resolve, reject) => {
    console.log("Doing something...");
    setTimeout(() => {
      resolve("Result of something");
    }, 1000);
  });
}

function doSomethingElse(result: string): Promise<string> {
  return new Promise((resolve, reject) => {
    console.log("Doing something else with:", result);  
    setTimeout(() => {
      resolve("Result of something else");
    }, 1000);
  });
}

function doThirdThing(result: string) : Promise<string> {
  return new Promise((resolve, reject) => {
    console.log("Doing third thing with:", result); 
    setTimeout(() => {
      resolve("Result of third thing");
    }, 1000);
  });
}

function failureCallback(error: any): void {
  console.error("Something went wrong:", error);
}

doSomething()
  .then((result) => doSomethingElse(result))
  .then((newResult) => doThirdThing(newResult))
  .then((finalResult) => {
    console.log(`Got the final result: ${finalResult}`);
  })
  .catch(failureCallback);