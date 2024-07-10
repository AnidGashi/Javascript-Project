import axios from "../node_modules/axios/dist/esm/axios.js"; 

let currentIndex = 0;
const itemsPerPage = 4;
let recipes = [];

axios
    .get("https://dummyjson.com/recipes")
    .then((response) => {
        recipes = response.data.recipes.slice(0, 20); 
        displayRecipes();
    })
    .catch((error) => console.error("Error fetching recipes data:", error));

function displayRecipes() {
    const slider = document.querySelector(".recepies");
    slider.innerHTML = ""; 

    const endIndex = Math.min(currentIndex + itemsPerPage, recipes.length);
    for (let i = currentIndex; i < endIndex; i++) {
        const recipe = recipes[i];
        const recipeElement = document.createElement("div");
        recipeElement.classList.add("card");
        recipeElement.innerHTML = `
            <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl h-[100%]">
                <a href="#">
                    <img class="rounded-t-lg mx-auto" src="${recipe.image}" alt="${recipe.name}" />
                </a>
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${recipe.name}</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">${recipe.ingredients}</p>
                    <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                    </a>
                </div>
            </div>`;
        slider.appendChild(recipeElement);
    }
}

document.getElementById("Next").addEventListener("click", () => {
    if (currentIndex + itemsPerPage < recipes.length) {
        currentIndex += itemsPerPage;
        displayRecipes();
    }
});

document.getElementById("Back").addEventListener("click", () => {
    if (currentIndex - itemsPerPage >= 0) {
        currentIndex -= itemsPerPage;
        displayRecipes();
    }
});

