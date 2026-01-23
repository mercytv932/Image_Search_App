
const searchInput = document.querySelector("#searchInput");
const search = document.querySelector(".search");
const result = document.querySelector("#result");
const loader = document.querySelector(".loader");
const error = document.querySelector("#error");


const apiKey = '3NNxJrdL9DFkFTxOL1q1JlfQn9OHPkVOLUNvSKJvX_s';


search.addEventListener("click", function(){
  const searchValue = searchInput.value; // searchValue is = whatever the user types, for example, Apple.

loader.textContent = "loading....";
loader.style.display = "block";
result.innerHTML = "";

const url = (`https://api.unsplash.com/search/photos?query=${searchValue}&client_id=${apiKey}`);
console.log('The url is:', url);

 

fetch(url)
.then(response=>{

  if(response.ok){
    return response.json()
  }

  if(!response.ok){
    throw new Error("Image not found!")
  }

})


.then(data=>{
  console.log(data);

  loader.style.display = "none";

    if(data.results.length === 0){
    error.textContent = "Image not found!"
    error.style.display = "block";
    error.style.color  = "black"
    return;
  }

  error.style.display = "none";

  data.results.forEach(photo=>{
    
    const imageUrl = photo.urls.small;
    const fullImageUrl = photo.urls.full;
    const newImage = document.createElement("img");
    newImage.src = imageUrl;

    newImage.addEventListener("click", function(){
      window.open(fullImageUrl, "_blank"); // click on any image to be opened on a new tab
    });

    result.appendChild(newImage);

  });

})


.catch(error=>{
  console.log(error)
  loader.style.display = "none"; // loader disappears
});


});
