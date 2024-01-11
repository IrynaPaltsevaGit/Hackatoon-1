runCocktails();
 
// {strIngredient1: 'Light rum'}
// {strIngredient1: 'Applejack'}
// {strIngredient1: 'Gin'}
async function runCocktails() {
    const maxIngredientsAmount = 5;
    const cocktailsApi = new CocktailsApi();
    
    const allIngredients = await cocktailsApi.getIngredients();
    let selectedIngredients = [];

    const addIngredientButton = document.querySelector('.add-ingredient');
    const getCocktailsButton = document.querySelector('.get-cocktails');
    addIngredientButton.addEventListener('click', addIngredient);
    getCocktailsButton.addEventListener('click', getCocktails);


    function addIngredient() {
        const input = document.querySelector('[name="ingredient"]');
        const ingredientName = input.value.trim();

        if(selectedIngredients.length < maxIngredientsAmount) {
            selectedIngredients.push(ingredientName);
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
                }
            });

            selectedIngredients = [];

            console.log(allSelectedCocktails);
        }else {
            // TODO: show error to the user
        }
        

    }

    function displayCocktails() {
        
    }
}

