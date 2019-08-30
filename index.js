const searchUrl = 'https://api.edamam.com/search';
const apiKey = 'dfdeff1d32e1493b08689cc95a11b623';
const apiId = 'e4a09154';

console.log('connect')
function watchform() { 
    $('form').submit(event => {
        event.preventDefault();
        let excludes = [];
        $('.excIngred').each(function(i) {
            excludes[i] = $(this).val();
        });
    })
}


function resetForm() {

}

function formatQueryParams(params, excludes) {
    const queryItems = Object.keys(params)
    .map(key => `${endoceURIComponent(key)}=${encodeURIComponent(params[key])}`);
}


function excIngred() {
    $('.addExc').click(function() {
        $('.exc-inputs').append(`<input type="text" class="excIngred">`);
        $('.excIngred').focus();
    });
}

function searchRecipes(search, excludes) {

}

function displayResults(responseJson) {
    console.log(response.json);
}

function getRecipes() {

}

function displayDetails() {

}

function makeIngredientList(ingredientArr) {

}

function returnToList() {
    
}

$(function() {
    watchform();
    excIngred();
})