

  1. What is the difference between var, let, and const?
   
   In JavaScript, these three keywords are used to declare variables, but they work differently behind the    scenes:
   
     var: This is the old way of writing JavaScript. It has function scope, which means if you declare it    inside a function, it works everywhere in that function. But it ignores block structures like if    statements or for loops. Also, you can redeclare and change its value anytime, which often creates    accidental bugs.
   
     let: This was introduced in ES6 and is much safer. It has block scope { }, meaning it only lives inside    the specific curly braces where you type it. You can change its value (reassign), but you cannot declare    it again with the same name in the same scope.
   
     const: Short for constant. Just like let, it is **block-scoped**. The main difference is that once you    assign a value to a const variable, you cannot change it or reassign it later. It is locked.
   
    Quick Code Example:
    ```javascript
    // var 
    var tree = "Mango";
    var tree = "Guava"; // No error, it just overwrites
    
    // let 
    let price = 500;
    price = 550; // Allowed
    // let price = 600; // Error! You can't redeclare it
    
    // const 
    const planet = "Earth";
    // planet = "Mars"; // Error! You cannot change a constant
   
   
   
   
 2. What is the difference between map(), forEach(), and filter()?
   
   All three are array methods used to loop through items, but we choose them based on what we want to get    back:
   
   forEach(): Think of this as a basic loop. It goes through every single item in the array and does a    specific task (like printing a value or changing a DOM element). It does not return anything back.
   
   map(): Use this when you want to modify your data. It loops through the original array, changes the items    based on your logic, and returns a brand-new array with the updated values. The original array stays safe.
   
   filter(): As the name says, it filters out data. It checks every item against a condition you give. If the    item passes the test, it gets pushed into a new array. It is perfect for searching or removing items.
   
   Quick Code Example:
   
   javascript :
   
   const initialPrices = [100, 200, 300];
   
   // 1. forEach just runs a task
   initialPrices.forEach(p => console.log(p));
   
   // 2. map creates a modified copy
   const finalPrices = initialPrices.map(p => p + 20); // Result: [120, 220, 320]
   
   // 3. filter picks specific items
   const highPrices = initialPrices.filter(p => p > 150); // Result: [200, 300]
   
   
   
   
 3. What are arrow functions in ES6?
   
   Arrow functions are a cleaner, modern way to write functions in JavaScript without typing the word function    every time. It uses the => syntax. If the function is short and fits on one line, you don't even need to    type the curly braces {} or the `return` keyword.
   
     The this keyword advantage: Regular functions change the meaning of the `this` keyword depending on how    or where they are called. Arrow functions don't do that; they inherit the `this` context from their    surrounding code. This makes them super helpful inside timers, event listeners, or array loops.
   
   Quick Code Example:
   
   ```javascript
   // Old traditional way
   const getTotalOld = function(a, b) {
       return a + b;
   };
   
   // New modern arrow way
   const getTotalNew = (a, b) => a + b;
   
   
   


 4. How does destructuring assignment work in ES6?
   
   Destructuring is just a shortcut to unpack values from arrays or properties from objects and save them    directly into separate variables. Instead of writing multiple lines of code to extract data, you can do it    in one single line.
   
   Quick Code Example:
   
   ```javascript
   // Object Destructuring
   const plantItem = { title: "Neem", cost: 350 };
   // Grabbing values directly using matching keys
   const { title, cost } = plantItem;
   console.log(title); // Prints: Neem
   
   // Array Destructuring
   const tags = ["Fruit", "Flowering"];
   // Grabbing values based on their position
   const [firstTag, secondTag] = tags;
   console.log(firstTag); // Prints: Fruit
   
   
   

   
  5. Explain template literals in ES6. How are they different from string concatenation?
   
   Template literals are a cleaner way to build strings that mix text and variables together. Instead of using    regular single or double quotes, you wrap the whole text inside backticks ()
   
    Why it's better than old String Concatenation:
   
   The Old Way (+ Operator): We had to break the string apart and use the plus sign (`+`) to glue variables in    between. It was very annoying to manage quotes, spaces, and formatting.
   The Modern Way (Template Literals): You can write the whole sentence naturally inside backticks. To insert    a variable or a calculation right inside the text, you just wrap it in ${variable}. Plus, if you press    Enter to make a new line, it automatically stays multi-line without typing `\n`.
   
   Quick Code Example:
   
   javascript
   const name = "Banyan";
   const price = 700;
   
   // Old messy way
   const messageOld = "The price of a " + name + " Tree is ৳" + price + ".";
   
   // New clean template literal way
   const messageNew = `The price of a ${name} Tree is ৳${price}.`;
   
   