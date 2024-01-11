class CocktailsApi {
    constructor() {
        
    }
    async getIngredients() {
        const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";
        try{
            const result = await axios.get(url);
            if(result.data) {
                let ingredients = result.data.drinks;
                if(!ingredients) {
                    return [];
                }
                return ingredients;
            }
            return [];
        }
        catch(error){
            console.log(error);
            return [];
        }
    }

    async getCoctailsByIngredient(ingredientName) {
        const url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="+ingredientName;
        try {
            const result = await axios.get(url);

            if(result.data) {
                let cocktails = result.data.drinks;

                if(!cocktails) {
                    return [];
                    
                }
                return cocktails;
            }

        }catch(error) {
            console.log(error);
        }
        return [];
    }

    async getCoctailsByIngredientNew() {
        let ingredientUrls = [];
        const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";

        for(let i = 0; i < arguments.length; i++) {
            let ingredientName = arguments[i];
            const url = baseUrl + ingredientName;
            ingredientUrls.push(url);
        }

        const result = await Promise.all(ingredientUrls.map(url => axios.get(url)));

        console.log(result)
        return [];
    }
}
