// main.js

// Here is where the recipes that you will fetch.
// Feel free to add your own here for part 2, if they are local files simply add their path as a string.
const recipes = [
  'https://introweb.tech/assets/json/ghostCookies.json',
  'https://introweb.tech/assets/json/birthdayCake.json',
  'https://introweb.tech/assets/json/chocolateChip.json',
  './assets/recipes/guac.json',
  './assets/recipes/pumpkinseed.json',
  './assets/recipes/spicyjoes.json'
];

// Once all of the recipes that were specified above have been fetched, their
// data will be added to this object below. You may use whatever you like for the
// keys as long as it's unique, one suggestion might but the URL itself
const recipeData = {}

window.addEventListener('DOMContentLoaded', init);

// This is the first function to be called, so when you are tracing your code start here.
async function init() {
  // fetch the recipes and wait for them to load
  let fetchSuccessful = await fetchRecipes();
  console.log('hello');
  console.log(recipeData);
  // if they didn't successfully load, quit the function
  if (!fetchSuccessful) {
    console.log('Recipe fetch unsuccessful');
    return;
  };
  // Add the first three recipe cards to the page
  createRecipeCards();
  // Make the "Show more" button functional
  bindShowMore();
}

async function fetchRecipes() {
  return new Promise((resolve, reject) => {
    // This function is called for you up above
    // From this function, you are going to fetch each of the recipes in the 'recipes' array above.
    // Once you have that data, store it in the 'recipeData' object. You can use whatever you like
    // for the keys. Once everything in the array has been successfully fetched, call the resolve(true)
    // callback function to resolve this promise. If there's any error fetching any of the items, call
    // the reject(false) function.

    // For part 2 - note that you can fetch local files as well, so store any JSON files you'd like to fetch
    // in the recipes folder and fetch them from there. You'll need to add their paths to the recipes array.
    let count = 0;
    // Part 1 Expose - TODO'
    //alert('in here');
    for (let i=0; i<recipes.length; i++){
      //console.log ('about to fetch ' + recipes[i]);
      fetch(recipes[i])
      .then(function (response){
        //console.log('about to get the json for ' + recipes[i]);
        return response.json();
      }, function(errMsg){
        console.log(errMsg);
        reject(false);
      })
      .then(function(data){
        //console.log('about to set the json for ' + recipes[i]);
        recipeData[i] = data;
        count++;
      })
      .then(()=> {
        //console.log(count);
        if (count == recipes.length){
          console.log(count);
          resolve(true);
          return;
        }
      });
      //.then(() => {
        
      //});
      //.catch(reject(false));
    }
    /*alert('finished here');
    console.log(recipeData);
    console.log('hmm');
    console.log('fool' + count);
    */
    
  });
}

function createRecipeCards() {
  // This function is called for you up above.
  // From within this function you can access the recipe data from the JSON 
  // files with the recipeData Object above. Make sure you only display the 
  // three recipes we give you, you'll use the bindShowMore() function to
  // show any others you've added when the user clicks on the "Show more" button.

  // Part 1 Expose - TODO
  console.log(recipeData);
  let mainB = document.querySelector('main');
  const recipe1 = document.createElement('recipe-card');
  recipe1.data = recipeData['0'];
  console.log('one done');
  mainB.appendChild(recipe1);
  //console.log(recipe1);
  const recipe2 = document.createElement('recipe-card');
  recipe2.data = recipeData['1'];
  console.log('two done');
  mainB.appendChild(recipe2);
  
  const recipe3 = document.createElement('recipe-card');
  recipe3.data = recipeData['2'];
  console.log('three done');
  mainB.appendChild(recipe3);

}

function bindShowMore() {
  // This function is also called for you up above.
  // Use this to add the event listener to the "Show more" button, from within 
  // that listener you can then create recipe cards for the rest of the .json files
  // that were fetched. You should fetch every recipe in the beginning, whether you
  // display it or not, so you don't need to fetch them again. Simply access them
  // in the recipeData object where you stored them/
  let showmore = true;
  // Part 2 Explore - TODO
  let button = document.querySelector("button");
  button.addEventListener("click", function(){
    // if showmore is true then expand and make it show less
    if (showmore){
      showmore = false;
      let mainB = document.querySelector('main');
      const recipe1 = document.createElement('recipe-card');
      recipe1.data = recipeData['3'];
      console.log('four done');
      mainB.appendChild(recipe1);
      //console.log(recipe1);
      const recipe2 = document.createElement('recipe-card');
      recipe2.data = recipeData['4'];
      console.log('five done');
      mainB.appendChild(recipe2);
      
      const recipe3 = document.createElement('recipe-card');
      recipe3.data = recipeData['5'];
      console.log('six done');
      mainB.appendChild(recipe3);

      button.innerHTML = "Show Less";
    } else {
      showmore =true;
      button.innerHTML = "Show More";
      let recipecards = document.querySelectorAll('recipe-card');
      recipecards[3].remove();
      recipecards[4].remove();
      recipecards[5].remove();

    }
  });
}