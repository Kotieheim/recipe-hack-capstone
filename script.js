"use strict";

const searchUrl = "https://api.edamam.com/search";
const apiKey = "dfdeff1d32e1493b08689cc95a11b623";
const apiId = "e4a09154";

// This takes what the user types into the search bar and uses the query to fetch
// data from the Edamam API as well as YouTubes API.
function watchSubmit() {
  $(".js-search-form").submit(event => {
    event.preventDefault();
    const query = $(".js-query").val();
    getFoodData(query);
    getVideo();
    $('.result-area').empty().hide();
    $('.loading').show()
  });
}


// a function that formats the paramaters provided for the fetched API's.
function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}


// this function fetches the data from the Edamam API and lets me use
// that data to display a thumbnail, link and a ingredients. It also
// takes the returned title of the recipe's and lets me use that as a 
// search query for the getVideo function, which is a call to the YouTube API.
async function getFoodData(query) {
  const params = {
    app_id: apiId,
    app_key: apiKey,
    q: query,
    from: 0,
    to: 6
  };
  const queryString = formatQueryParams(params);
  const url = searchUrl + "?" + queryString;

  const responseJson = await fetch(url).then(response => response.json());

  const promises = responseJson.hits.map(item => getVideo(item.recipe.label))

  const videoIds = await Promise.all(promises)
  $('.loading').css('display', 'none')

  const html = responseJson.hits.map((item, index) => {
    const video = videoIds[index]
    const videoId = video.items[0].id.videoId

    return renderRecipeData(item, videoId)
  });
  $(".js-output").removeClass("hidden");
  $(".result-area").html(html).show()
}

// function to recipe the data retrieved from both Edamam and YouTube APIs.
function renderRecipeData(item, videoId) {
  return `<div class="single-result">
    <h2 class="js-result-name">
        <a href="${
    item.recipe.url}" class="recipe-title" target="_blank" title="${item.recipe.label}">${item.recipe.label}</a>
    </h2>
        <div class="recipeIcons">
            <a href="${item.recipe.url}" target="_blank"><img src="${
            item.recipe.image}" class="thumbnail" title="Check this recipe"></a>

        <div class="ingredientItems scroll-box">
            <p class="ingredient-ul">Ingredients for Recipe: ${makeUL(
            item.recipe.ingredientLines)}
            </p>
            <p>Recipe Video:</p>
              <iframe id="player" type="text/html" width="240" height="230"
              src="https://www.youtube.com/embed/${videoId}?enablejsapi=1"
              frameborder="0"></iframe>
        </div>
    </div>`;
}

// This is what's used to list out the retrieved ingredients from Edamam.
function makeUL(array) {
  let list = "<ul>";
  for (let i = 0; i < array.length; i++) {
    list += `<li><p>${array[i]}</p></li>`;
  }
  return (list += "<ul>");
}

const videoUrl = "https://www.googleapis.com/youtube/v3/search";
const apiKeyVideo = "AIzaSyADNYeE3vEhmrcpr4j8kA1C_3uLPwHlt3o";
// The fetch call to YouTube API to add an iframe video embedded at the
// bottom of the ingredient list.
function getVideo(item) {
  const params = {
    part: "snippet",
    q: `${item} recipe`,
    key: apiKeyVideo,
    maxResults: 1,
    type: "video"
  };
  const queryString = formatQueryParams(params);
  const url = videoUrl + "?" + queryString;


  return fetch(url).then(response => response.json())
}


// method watching the submit form once the page loads.
$(document).ready(function () {
  $('.js-query').val('')
  $("section").fadeIn(1000);
  $(watchSubmit);
});
