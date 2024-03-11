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
    console.log(categories);

    // for loader visiblity
    const loader = document.getElementById("loader");
    loader.style.display = "none";

    let parentCategoryDiv = document.getElementById("category_list");

    categories.forEach(function (categoriesIterator){
        
        let categoryDiv = document.createElement("div");

        // this will make sure that the user gets directed to particular category 
        let categoryAnchor = document.createElement("a"); 
        categoryAnchor.href = `All_product.html?category=${categoriesIterator}`;
        categoryAnchor.target = "_blank";

        
        categoryAnchor.textContent = categoriesIterator;
        
        categoryDiv.appendChild(categoryAnchor);

        parentCategoryDiv.appendChild(categoryDiv);

        // adding classes to each div for styling purpose 

        parentCategoryDiv.classList.add("d-flex" , "justify-content-around" , "align-items-center");
        categoryDiv.classList.add("crds");
    })
}

fillCategories();