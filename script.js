cocktails();

async function cocktails() {
    let url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";

    const result = await axios.get(url);
    console.log(result)
    console.log(result.data);
}

