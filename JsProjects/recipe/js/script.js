let mealsEl = document.getElementById("meals");
let favoritemeals = document.getElementById('fav-meals');

let searchQuery = document.getElementById('q');
let searchBtn = document.getElementById('search');

let mealPopup = document.getElementById('meal-popup');
let popupCloseBtn = document.getElementById("close-popup");

const mealInfoEl = document.getElementById("meal-info");


const getRandomMeal = async () => {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const respData = await resp.json();
    const randomMeal = respData.meals[0];
    loadMeal(randomMeal, true)
}

const getMealById = async (id) => {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
    const respData = await resp.json();
    const meal = respData.meals[0];
    return meal;
}

const getMealBySearch = async (term) => {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term);
    const respData = await resp.json();
    const meals = await respData.meals
    return meals;
}

const loadMeal = (mealData, random = false) => {
    const meal = document.getElementById('meals');
    meal.classList.add('meal');
    meal.innerHTML = `
        <div class="meal-header">
                ${random ? `
            <span class="random">
                Random Recipe
            </span>` : ""}
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn">
                <i class="fa fa-heart"></i>
            </button>
        </div>
    `;

    const btn = meal.querySelector(".meal-body .fav-btn");

    btn.addEventListener("click", () => {
        if (btn.classList.contains('active')){
            removeMealFromLS(mealData.idMeal);
            btn.classList.remove('active');
        }else{
            updateLS(mealData.idMeal);
            btn.classList.add('active');
        }

        fetchFMs();
    });

    meal.addEventListener('click', () => {
        showMealInfo(mealData);
    })
    mealsEl.appendChild(meal);
}

const updateLS = (mealId) => {
    const mealIds = getMealFormLS(mealId);
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}

const removeMealFromLS = (mealId) => {
    const mealIds = getMealFormLS();
    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter((id) => id !== mealId)));
}

const getMealFormLS = () => {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));
    return mealIds === null ? [] : mealIds;
}

const fetchFMs = async () => {
    // favoritemeals.innerHTML = '<h4>Loading...</h4>';
    const mealIds = getMealFormLS();

    for (let i = 0; i < mealIds.length; i++ ){
        const mealId = mealIds[i];
        meal = await getMealById(mealId);
        addMealToFav(meal);
    }
}

const addMealToFav = (mealData) => {
    const favMeal = document.createElement('li');


    favMeal.innerHTML = `
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}"><span>${mealData.strMeal}
        </span><button class="remove"><i class="fa fa-window-close"></i></button>
    `;

    const btn = favMeal.querySelector(".remove");
    btn.addEventListener('click', () => {
        removeMealFromLS(mealData.idMeal);

        fetchFMs();
    });

    favMeal.addEventListener('click', () => {
        showMealInfo(mealData);
    });

    favoritemeals.appendChild(favMeal);
}

const showMealInfo = (mealData) => {
    mealInfoEl.innerHTML = '';

    const ingredients = [];

    for(let i=1; i < 20; i++){
        if(mealData['strIngredient' + i]){
            ingredients.push(`${mealData['strIngredient' + i]} -- ${mealData['strMeasure' + i]}`)
        }else{
            break;
        }
    }

    const mealEl = document.createElement('div');
    mealEl.innerHTML = `<h1>${mealData.strMeal}</h1>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />
        <p>${mealData.strInstructions}</p>
        <h3>Ingredients / Measures </h3>
        <ul>
            ${ingredients.map((ing) => `<li>${ing}</li>`).join('')}
        </ul>
    `;
    mealInfoEl.appendChild(mealEl);

    mealPopup.classList.remove('hidden');
}

searchBtn.addEventListener('click', async () => {
    mealsEl.innerHTML = '';

    const search =  searchQuery.value;
    const meals = await getMealBySearch(search);
    if (meals){
        meals.forEach((meal) => {
            loadMeal(meal)
        });
    }
});

popupCloseBtn.addEventListener('click', () => {
    mealPopup.classList.add('hidden');
});

fetchFMs();
getRandomMeal();