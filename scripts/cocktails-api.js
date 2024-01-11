class CocktailsApi {
    constructor() {
        this.apiKey = 1;
    }
    async getIngredients() {
        const url = "https://www.thecocktaildb.com/api/json/v1/"+this.apiKey+"/list.php?i=list";
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
        const url = "https://www.thecocktaildb.com/api/json/v1/"+this.apiKey+"/filter.php?i="+ingredientName;
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

    async getCocktailDetails(cocktailName) {
        const url = "https://www.thecocktaildb.com/api/json/v1/"+this.apiKey+"/search.php?s="+cocktailName;
        try {
            const result = await axios.get(url);

            if(result.data) {
                let cocktailData = result.data.drinks;

                if(!cocktailData) {
                    return null;
                    
                }
                if(Array.isArray(cocktailData) && cocktailData.length > 0) {
                    return cocktailData[0];
                }
                else {
                    return null;
                }
            }

        }catch(error) {
            console.log(error);
        }
        return null;
    }
}
