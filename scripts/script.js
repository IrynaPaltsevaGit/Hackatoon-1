runCocktails();
 
async function runCocktails() {
    const maxIngredientsAmount = 5;
    const cocktailsApi = new CocktailsApi();
    
    const allIngredients = await cocktailsApi.getIngredients();
    let selectedIngredients = [];

    const searchIngredientInput = document.querySelector('[name="ingredient"]');
    searchIngredientInput.addEventListener('input', getSearchedIngredients);

    const addIngredientButton = document.querySelector('.add-ingredient');
    const getCocktailsButton = document.querySelector('.get-cocktails');
    addIngredientButton.addEventListener('click', addIngredient);
    getCocktailsButton.addEventListener('click', getCocktails);


    function addIngredient() {
        const input = document.querySelector('[name="ingredient"]');
        const ingredientName = input.value.trim();

        if(selectedIngredients.length < maxIngredientsAmount) {
            if (ingredientName){
                selectedIngredients.push(ingredientName);
                const ul = document.querySelector('.searched-ingredients');
                ul.innerHTML = '';
                addSelectedIngredientLabel(ingredientName);
            }
            else{
                displayCocktailError("Ingredient name empty");
            }
        }
        else {
            const errorParagraph = document.querySelector('.ingredient-error');
            errorParagraph.style.display = 'block';

            setTimeout(() => {
                errorParagraph.style.display = 'none';
            }, 5000);
        }
        clearForm();
    }

    function addSelectedIngredientLabel(ingredientName) {
        const text = createElement('span', 'selected-ingredients__text', ingredientName);
        const cross = createElement('span', 'selected-ingredients__remove', 'x');
        const selectedIngredientLabel = createElement('span', 'selected-ingredients__item', [text, cross]);

        cross.addEventListener('click', (event) => deleteIngredient(event, ingredientName));

        document.querySelector('.selected-ingredients').appendChild(selectedIngredientLabel);
    }

    function deleteIngredient(event, ingredientName) {
        const cross = event.target;
        const item = cross.closest(".selected-ingredients__item");
        item.remove();
        selectedIngredients = selectedIngredients.filter(ingredient => ingredient !== ingredientName);
    }
    function clearForm() {
        const input = document.querySelector('[name="ingredient"]');
        input.value = "";
    }

    async function getCocktails(event) {
        event.preventDefault();
        let allSelectedCocktails = [];
        let filteredCocktails = [];

        if(selectedIngredients.length > 0) {
            let isDataFetched = new Array(selectedIngredients.length).fill(false);

            selectedIngredients.forEach(async (ingredientName, i) => {
                const cocktails = await cocktailsApi.getCoctailsByIngredient(ingredientName);
                allSelectedCocktails = [...allSelectedCocktails, ...cocktails];
                isDataFetched[i] = true;

                if(!isDataFetched.includes(false)) {
                    allSelectedCocktails.forEach(cocktail => {
                        const isCocktailExists = filteredCocktails.find(elem => elem.idDrink == cocktail.idDrink);

                        if(!isCocktailExists) {
                            const cocktailRepeatsArr = allSelectedCocktails.filter(elem => elem.idDrink == cocktail.idDrink);

                            if(cocktailRepeatsArr.length == selectedIngredients.length) {
                                filteredCocktails.push(cocktail);
                            }
                        }
                    });
                    displayCocktails(filteredCocktails);
                    selectedIngredients = [];
                }
            });

        }else {
            selectedIngredients = [];
            const cocktailsList = document.querySelector('.cocktails');
            cocktailsList.innerHTML = "";
            displayCocktailError("There is no ingredients selected.");
        }
        document.querySelector('.selected-ingredients').innerHTML = "";
    }

    function displayCocktails(cocktails) {
        const cocktailsList = document.querySelector('.cocktails');
        cocktailsList.innerHTML = "";

        if(cocktails.length > 0) {
            cocktails.forEach(cocktail => {
                const itemImg = createElement('img', '');
                itemImg.src = cocktail.strDrinkThumb;
                itemImg.alt = cocktail.strDrink;
                const itemName = createElement('p', '', cocktail.strDrink);
                const cocktailItem = createElement('li', 'cocktails__item', [itemImg, itemName]);
                cocktailsList.appendChild(cocktailItem);
            });
            hideCocktailError();
        }else {
            displayCocktailError("There is no cocktails with such ingredients.");
        }        
    }

    function displayCocktailError(text) {
        const error = document.querySelector('.cocktails-error');
        error.innerHTML = text;
        error.style.display = 'block';
    }

    function hideCocktailError() {
        const error = document.querySelector('.cocktails-error');
        error.innerHTML = "";
        error.style.display = 'none';
    }

    function getSearchedIngredients() {
        let userTyped = searchIngredientInput.value.toLowerCase();

        if (userTyped.length >= 2){
            const result = allIngredients.filter(ingredient => {
                return ingredient.strIngredient1.toLowerCase().includes(userTyped);                
            });

            const ul = document.querySelector('.searched-ingredients');
            ul.innerHTML = '';

            result.forEach(ingredient => {
                const ingredientListItem = createElement('li', '', ingredient.strIngredient1);
                ingredientListItem.addEventListener('click', () => {
                    searchIngredientInput.value = ingredient.strIngredient1;
                    ul.innerHTML = '';
                });
                ul.appendChild(ingredientListItem);
            });
           
        } 
    }

    function createElement(tag, className, children) {
        const element = document.createElement(tag);

        if(className) {
            element.classList.add(className);
        }
        
        if(children) {
            if(Array.isArray(children)) {
                children.forEach(child => element.append(child));
            }
            else {
                element.append(children);
            }
        }
    
        return element;
    }
}
