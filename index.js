const searchUrl = 'https://api.edamam.com/search';
const apiKey = 'dfdeff1d32e1493b08689cc95a11b623';
const apiId = 'e4a09154';

function getFoodData(searchTerm, callBack) {
    const query = {
        q: `${searchTerm}`,
        app_id: apiId,
        app_key: apiKey,
        from: 0,
        to: 6,
    };
    $.getJSON(searchUrl, query, callBack);
}

function displayWrittenResult(result) {
    $('.result-area').removeClass('hidden')
    return `
    <div class="single-result">
        <h2 class="js-result-name">
            <a href="${result.recipe.url}" target="_blank" title="${result.recipe.label}">${result.recipe.label}</a>
        </h2>
        <div class="recipeIcons">
            <a href="${result.recipe.url}" target="_blank"><img src="${result.recipe.image}" class="thumbnail" title="Check this recipe"></a>
            
                <div class="ingredientItems scroll-box">
                    <p class="ingredient-ul">Ingredients for Recipe: ${makeUL(result.recipe.ingredientLines)}
                    </p>
                    </div>
                </div>
            
                `; 
}

function displayRecipeData(data) {
    const results = data.hits.map((item,index) => displayWrittenResult(item));
    $('.search-results-written').html(results);
        $('.search-results-written').prop('hidden', false).html(results);
}

function makeUL(array) {
    const list = document.createElement('ul');

    for(let i=0; i<array.length; i++) {
        const item = document.createElement('li');
        item.appendChild(document.createTextNode(array[i]));
        list.appendChild(item);
    }
    return list.outerHTML;
}


function watchSubmit() {
    $('.js-search-form').submit(event => {
        event.preventDefault();
        const queryTarget = $(this).find('.js-query');
        const query = queryTarget.val();
        queryTarget.val("");
        getFoodData(query, displayRecipeData);
        $('.result-area').show();
    });
}

$(watchSubmit);


