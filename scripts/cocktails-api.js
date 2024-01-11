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

    async getCocktailIngredients(cocktailName) {
        const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+cocktailName;
        try {
            const result = await axios.get(url);

            if(result.data) {
                console.log(result.data)
                let ingredients = result.data.drinks;

                if(!ingredients) {
                    return [];
                    
                }
                return ingredients;
            }

        }catch(error) {
            console.log(error);
        }
        return [];
    }
}
