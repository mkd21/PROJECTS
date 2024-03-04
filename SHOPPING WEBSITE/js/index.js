// console.log("js is connected...");

// Doing an API call 

async function fetchCategory()   // whole async function returns a promise
{
    const category = await fetch("https://fakestoreapi.com/products/categories");   // return a promise
    const data = await category.json();   // returns a promise
    
    return data;

    // console.log(data);
}

fetchCategory();


async function fillCategories()
{
    const categories = await fetchCategory();

    let parentCategoryDiv = document.getElementById("category_list");

    categories.forEach(function (categories){
        let categoryDiv = document.createElement("div");
        let categoryAnchor = document.createElement("a");

        // categoryAnchor.href = "#";
        categoryAnchor.textContent = categories;

        categoryDiv.appendChild(categoryAnchor);

        parentCategoryDiv.appendChild(categoryDiv);

        // adding classes to each div for styling purpose 

        parentCategoryDiv.classList.add("d-flex" , "justify-content-around" , "align-items-center");
        categoryDiv.classList.add("crds");
    })
}

fillCategories();