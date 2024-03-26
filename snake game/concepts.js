// let arr = [12, 34 , 5 , 6 ,9 , 78];
// console.log(arr);
// arr.unshift(54);
// console.log(arr);


// let arr = [{x : 34 , y : 45} , {x : 12 , y : 90} , {x : 34 , y : 10}];
// console.log(arr);
// // arr[0].x = 1211;
// // arr[0].y = 4532;

// let newHead = {x : 1212 , y : 45343};

// arr.unshift(newHead);
// arr.pop();
// console.log(arr);



        // some method in array

        // even if one element passes the conditon it returns true and stops execution


// const ages = [3, 10, 18, 20 , 31 , 45 , 23 , 89 , 92];

// let count = 0;
// function checkEven(elem)
// {
//     console.log(elem);
//     count++;
//     return elem % 2 == 0;
// }
// console.log(ages.some(checkEven));
// console.log(count);


let randomNumberGenerator = function(num)
{
    return Math.floor(Math.random() * (num / 20)) * 20;
}


console.log(randomNumberGenerator(480));