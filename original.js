"use strict";

const searchUrl = "https://api.edamam.com/search";
const apiKey = "dfdeff1d32e1493b08689cc95a11b623";
const apiId = "e4a09154";

// watching submit form
function watchSubmit() {
  $(".js-search-form").submit(event => {
    event.preventDefault();
    console.log("button press");
    // const queryTarget = $(this).find('.js-query')
    const query = $(".js-query").val();
    getFoodData(query, displayRecipeData);
    getVideo();
    // console.log(query);
  });
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

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
  // console.log(params);

  const responseJson = await fetch(url).then(response => response.json());
  // .then(responseJson => )
  // .then(responseJson => displayRecipeData(responseJson))
  // .catch(err =>
  // $("#js-error-message").text(`Something went wrong: ${err.message}`)
  // );
  console.log(responseJson)

  const promises = responseJson.hits.map(item => getVideo(item.recipe.label))

  const videoIds = await Promise.all(promises)

  responseJson.hits.forEach((item, index) => {
    const video = videoIds[index]
    const videoId = video.items[0].id.videoId
    console.log(video)

    renderRecipeData(item, videoId)
  });

  console.log('VIOE', videoIds)
}

// displays the data received from API
function displayRecipeData(data) {
  // data.hits.forEach(item => renderRecipeData(item));
  // data.hits.forEach(item => getVideo(item.recipe.label));
  // $('.result-area').append(`
  // <div class="single-result">
  // <h2 class="js-result-name">
  //     <a href="${item.recipe.url}" class="recipe-title" target="_blank" title="${item.recipe.label}">${item.recipe.label}</a>
  // </h2>
  //     <div class="recipeIcons">
  //         <a href="${item.recipe.url}" target="_blank"><img src="${item.recipe.image}" class="thumbnail" title="Check this recipe"></a>

  //     <div class="ingredientItems scroll-box">
  //         <p class="ingredient-ul">Ingredients for Recipe: ${makeUL(item.recipe.ingredientLines)}
  //         </p>
  //     </div>
  // </div>`));
  // $('.js-output').removeClass('hidden');
}

function renderRecipeData(item, videoId) {
  $(".result-area").append(`
    <div class="single-result">
    <h2 class="js-result-name">
        <a href="${
          item.recipe.url
        }" class="recipe-title" target="_blank" title="${item.recipe.label}">${
    item.recipe.label
  }</a>
    </h2>
        <div class="recipeIcons">
            <a href="${item.recipe.url}" target="_blank"><img src="${
    item.recipe.image
  }" class="thumbnail" title="Check this recipe"></a>

        <div class="ingredientItems scroll-box">
            <p class="ingredient-ul">Ingredients for Recipe: ${makeUL(
              item.recipe.ingredientLines
            )}
            </p>
            <div id="player-${recipeId}"></div>
            <iframe id="player" type="text/html" width="640" height="390"
             src="http://www.youtube.com/embed/${videoId}?enablejsapi=1"
             frameborder="0"></iframe>
        </div>
    </div>`);
  $(".js-output").removeClass("hidden");
}
// lists out the ingredient data from API
function makeUL(array) {
    // console.log('UL function called')
    // console.log(array);
    let list = "<ul>";
    for (let i = 0; i < array.length; i++) {
      list += `<li><p>${array[i]}</p></li>`;
    }
    return (list += "<ul>");
  }
  
  const videoUrl = "https://www.googleapis.com/youtube/v3/search";
  const apiKeyVideo = "AIzaSyD5fnrdH3PBx-eYXg7o69bKmnlf73nqFTI";
  
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
    console.log(params);
    console.log(url);
  
    return fetch(url).then(response => response.json())
        // .then(response => displayVideoRecipe(response))
        // .catch(err => {
        //   $("#js-error-message").text(`Something went wrong: ${err.message}`);
        // })
    // );
  }
  
  function displayVideoRecipe(data) {
    data.items.forEach(item => displayVideo(item.id.videoId));
  }
  
  function displayVideo(myId) {
      $('.single-result').append(`<iframe id="player" type="text/html" width="640" height="390"
    src="http://www.youtube.com/embed/${myId}?enablejsapi=1"
    frameborder="0"></iframe>`)
  }
  
  $(document).ready(function() {
    $("section").fadeIn(1000);
    $(watchSubmit);
  });
  // $(watchSubmit);