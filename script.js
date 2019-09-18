'use strict';




const searchUrl = 'https://api.edamam.com/search';
const apiKey = 'dfdeff1d32e1493b08689cc95a11b623';
const apiId = 'e4a09154';

// watching submit form
function watchSubmit() {
    $('.js-search-form').submit(event => {
        event.preventDefault();
        console.log('button press');
        // const queryTarget = $(this).find('.js-query')
        const query = $('.js-query').val();
        getFoodData(query, displayRecipeData);
        getVideo(query, displayVideoData);
        // console.log(query);
    });
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}


function getFoodData(query) {
    const params = {
        app_id: apiId,
        app_key: apiKey,
        q: query,
        from: 0,
        to: 6,
    };
    const queryString = formatQueryParams(params)
    const url = searchUrl + '?' + queryString;
    // console.log(params);

    fetch(url)
    .then(response => response.json())
    .then(responseJson => displayRecipeData(responseJson))
    .catch(err => 
        $('#js-error-message').text(`Something went wrong: ${err.message}`));
}



// displays the data received from API
function displayRecipeData(data) {
    data.hits.forEach((item) => 
    $('.result-area').append(`
    <div class="single-result">
    <h2 class="js-result-name">
        <a href="${item.recipe.url}" class="recipe-title" target="_blank" title="${item.recipe.label}">${item.recipe.label}</a>
    </h2>
        <div class="recipeIcons">
            <a href="${item.recipe.url}" target="_blank"><img src="${item.recipe.image}" class="thumbnail" title="Check this recipe"></a>

        <div class="ingredientItems scroll-box">
            <p class="ingredient-ul">Ingredients for Recipe: ${makeUL(item.recipe.ingredientLines)}
            </p>
        </div>
    </div>`));
    $('.js-output').removeClass('hidden');
}
// lists out the ingredient data from API
function makeUL(array) {
    // console.log('UL function called')
    // console.log(array);
    let list = '<ul>'
    for (let i = 0; i<array.length; i++) {
        list += `
        <li><p>${array[i]}</p></li>`
    }
    return list += '<ul>'
}

const videoUrl = 'https://www.googleapis.com/youtube/v3/search';
const apiKeyVideo = 'AIzaSyD5fnrdH3PBx-eYXg7o69bKmnlf73nqFTI';

function getVideo(query) {
    const params = {
        part: 'snippet',
        q: `${query} recipe`,
        key: apiKeyVideo,
        maxResults: 1,
        type: 'video',
    };
    const queryString = formatQueryParams(params)
    const url = videoUrl + '?' + queryString;
    console.log(params);
    console.log(url);

    fetch(url)
    .then(response => response.json()
    .then(response => displayVideoData(response))
    .catch (err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    }));
}
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: '',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }
function displayVideoData(data) {

}
// function displayVideoRecipe(data) {
//     console.log('video recipe function');
//     data.items.forEach((items => (function onYoutubeIframeAPIReady(player) {
//         var player = new YT.Player('player', {
//             height: '390',
//             width: '640',
//             videoId: `${items.id.videoId}`,
//             events: {
//                 'onReady': onPlayerReady,
//                 'onStateChange': onPlayerStateChange,
//             }
//         })
//     })))
//     console.log(player);
// }

















$(document).ready(function() {
    $('section').fadeIn(1000)
    $(watchSubmit);
})
// $(watchSubmit);