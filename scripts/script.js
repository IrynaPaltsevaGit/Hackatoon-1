runCocktails();
 
// {strIngredient1: 'Light rum'}
// {strIngredient1: 'Applejack'}
// {strIngredient1: 'Gin'}
async function runCocktails() {
    const maxIngredientsAmount = 5;
    const cocktailsApi = new CocktailsApi();
    
    const allIngredients = await cocktailsApi.getIngredients();
    let selectedIngredients = [];

    const searchIngredientInput = document.querySelector('[name="ingredient"]');

    searchIngredientInput

    


    const addIngredientButton = document.querySelector('.add-ingredient');
    const getCocktailsButton = document.querySelector('.get-cocktails');
    addIngredientButton.addEventListener('click', addIngredient);
    getCocktailsButton.addEventListener('click', getCocktails);


    function addIngredient() {
        const input = document.querySelector('[name="ingredient"]');
        const ingredientName = input.value.trim();

        if(selectedIngredients.length < maxIngredientsAmount) {
            selectedIngredients.push(ingredientName);
            console.log(selectedIngredients);
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

                if(isDataFetched.indexOf(false) < 0) {
                    allSelectedCocktails.forEach(cocktail => {
                        const isCocktailExists = filteredCocktails.find(elem => elem.idDrink == cocktail.idDrink);

                        if(!isCocktailExists) {
                            const cocktailRepeatsArr = allSelectedCocktails.filter(elem => elem.idDrink == cocktail.idDrink);

                            if(cocktailRepeatsArr.length == selectedIngredients.length) {
                                filteredCocktails.push(cocktail);
                            }
                        }
                    });
                    console.log(filteredCocktails);
                    displayCocktails(cocktails);
                    selectedIngredients = [];
                }
            });

        }else {
            // TODO: show error to the user
        }
    }

    function displayCocktails(cocktails) {
        const cocktailsList = document.querySelector('.cocktails');
        cocktails.forEach(cocktail => {
            const itemImg = createElement('img', '');
            itemImg.src = cocktail.strDrinkThumb;
            itemImg.alt = cocktail.strDrink;
            const itemName = createElement('p', '', cocktail.strDrink);
            const cocktailItem = createElement('li', '', [itemImg, itemName]);
            cocktailsList.appendChild(cocktailItem);
        });
    }

    function getSearchedIngredients() {
        
    }

    async function getCocktailIngredients(cocktailName) {
        
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
