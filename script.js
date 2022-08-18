import { ref, push, set, database, onValue, get } from "./firebase.js";

const proxy = "https://nextjs-cors-anywhere.vercel.app/api?endpoint=";
let zipCode = 10000;

let zipCodeInput = document.getElementById("zipCode");
let searchButton = document.getElementById("searchButton");
let firstSearch = true;
let filterDiv = document.getElementById("filter");

let allCards = document.getElementById("allCards");
let cardContainer = document.querySelector(".cardContainer");
let currentShop;

let aptDiv = document.getElementById("aptDiv");
aptDiv.style.display = "none";

async function getGeoLocation(zip){
  const response = await fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + zip + "&key=AIzaSyDsLhGBee6Gu3UJj0J1e-XUTPhdRRG0PJ8");
  const data = await response.json();
  // fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + zip + "&key=AIzaSyDsLhGBee6Gu3UJj0J1e-XUTPhdRRG0PJ8")
  //   .then((response) => response.json())
  //   .then((data) =>{
  //   return data;
  // })
  console.log(data)
  return data;
}

searchButton.onclick = (e) => {
  e.preventDefault();
  zipCode = zipCodeInput.value;
  let geolocation = getGeoLocation(zipCode);
//   fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + zipCode + "&key=AIzaSyDsLhGBee6Gu3UJj0J1e-XUTPhdRRG0PJ8")
//     .then((response) => response.json())
//     .then((data) =>{
//     // return data;
    console.log(geolocation)
    // if(geolocation.results!=null){

    const api =
      "https://maps.googleapis.com/maps/api/place/textsearch/json?query=barbershops+near+zipcode+" +
      zipCode +
      "&key=AIzaSyDsLhGBee6Gu3UJj0J1e-XUTPhdRRG0PJ8";
    // const api2 = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=barbershop&location=" + geolocation.results[0].geometry.location.lat + "," + geolocation.results[0].geometry.location.lng + "&radius=1500&rankby=distance" + "&key=AIzaSyDsLhGBee6Gu3UJj0J1e-XUTPhdRRG0PJ8";
    // const api3 = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=barbershop%20near%20" + zipCode + "&inputtype=textquery&key=AIzaSyDsLhGBee6Gu3UJj0J1e-XUTPhdRRG0PJ8"
    console.log(api)
    fetch(proxy + api)
      .then((response) => response.json())
      .then((data) => {
        console.log(zipCode);
        console.log(data);

        filterDiv.innerHTML = "";
        allCards.innerHTML = "";

        let distanceButton = document.createElement("button");
        let ratingButton = document.createElement("button");
        distanceButton.innerHTML = "Distance";
        ratingButton.innerHTML = "Rating";

        filterDiv.append(distanceButton, ratingButton);

        data.results.splice(10, 10);

        data.results.forEach((shop) => {
          let newCard = document.createElement("div");
          // newCard.style.backgroundColor="#3294b8";
          newCard.classList.add("cards");

          let name = document.createElement("h2");
          name.innerHTML = shop.name;

          let address = document.createElement("h3");
          address.innerHTML = shop.formatted_address;

          let rating = document.createElement("h4");
          rating.innerHTML = "Rating: ⭐" + shop.rating;

          let aTag = document.createElement("a");
            let chooseButton = document.createElement("button");
            aTag.append(chooseButton)
            chooseButton.innerHTML = "Choose This Shop";
            aTag.href = "#aptDiv"

            newCard.append(name, address, rating, aTag);
          allCards.appendChild(newCard);

          let appointmentsDiv = document.getElementById("appointments");



          chooseButton.onclick = () => {

            console.log(shop.name);
            currentShop = shop;

            aptDiv.style.display = "flex";
            let joinCue = document.createElement("div");
            joinCue.setAttribute("id", "joinCue");

            let makeAppointment = document.createElement("div");

            let aptCalendar = document.getElementById("aptCalendar");
            let aptTimes = document.getElementById("aptTimes");
            let aptBtn = document.getElementById("aptBtn");

            aptBtn.onclick = (e) =>{
              e.preventDefault();
              let calendarValue = aptCalendar.value;
              let timesValue = aptTimes.value;
              let curShopRef = ref(database, currentShop.name + ": " + currentShop.place_id + "/" + calendarValue + "/" + timesValue);
              get(curShopRef).then((snapshot)=>{
                console.log("test")
                const data = snapshot.val();
                if(snapshot.exists()){
                  alert("This Spot is Already Taken")
                  console.log("taken");

                }
                else{
                  set(curShopRef, true);
                  alert("Confirmed");
                }
              })
          }
          };
        });


        distanceButton.onclick = (e) => {
          allCards.innerHTML = "";
          data.results.forEach((shop) => {
            let newCard = document.createElement("div");
            newCard.classList.add("cards");
            let name = document.createElement("h2");
            name.innerHTML = shop.name;

            let address = document.createElement("h3");
            address.innerHTML = shop.formatted_address;

            let rating = document.createElement("h4");
            rating.innerHTML = "Rating: ⭐" + shop.rating;

            let aTag = document.createElement("a");
            let chooseButton = document.createElement("button");
            aTag.append(chooseButton)
            chooseButton.innerHTML = "Choose This Shop";
            aTag.href = "#aptDiv"

            newCard.append(name, address, rating, aTag);
            allCards.appendChild(newCard);
            chooseButton.onclick = () => {
            console.log(shop.name);
            currentShop = shop;

            aptDiv.style.display = "flex";
            let joinCue = document.createElement("div");
            joinCue.setAttribute("id", "joinCue");

            let makeAppointment = document.createElement("div");

            let aptCalendar = document.getElementById("aptCalendar");
            let aptTimes = document.getElementById("aptTimes");
            let aptBtn = document.getElementById("aptBtn");

            aptBtn.onclick = (e) =>{
              e.preventDefault();
              let calendarValue = aptCalendar.value;
              let timesValue = aptTimes.value;
              let curShopRef = ref(database, currentShop.name + ": " + currentShop.place_id + "/" + calendarValue + "/" + timesValue);
              get(curShopRef).then((snapshot)=>{
                console.log("test")
                const data = snapshot.val();
                if(snapshot.exists()){
                  alert("This Spot is Already Taken")
                  console.log("taken");

                }
                else{
                  set(curShopRef, true);
                  alert("Confirmed");
                }
              })
          }
          };
          });

        };
        ratingButton.onclick = (e) => {
          let ratingSortedData = [...data.results];
          ratingSortedData.sort((a,b)=> b.rating - a.rating);

          allCards.innerHTML = "";
          ratingSortedData.forEach((shop) => {
            let newCard = document.createElement("div");
            newCard.classList.add("cards");

            let name = document.createElement("h2");
            name.innerHTML = shop.name;

            let address = document.createElement("h3");
            address.innerHTML = shop.formatted_address;

            let rating = document.createElement("h4");
            rating.innerHTML = "Rating: ⭐" + shop.rating;

            let aTag = document.createElement("a");
            let chooseButton = document.createElement("button");
            aTag.append(chooseButton)
            chooseButton.innerHTML = "Choose This Shop";
            aTag.href = "#aptDiv"

            newCard.append(name, address, rating, aTag);
            allCards.appendChild(newCard);
            chooseButton.onclick = () => {
              

              console.log(shop.name);
              currentShop = shop;

              aptDiv.style.display = "flex";
              let joinCue = document.createElement("div");
              joinCue.setAttribute("id", "joinCue");

              let makeAppointment = document.createElement("div");


              let aptCalendar = document.getElementById("aptCalendar");
              let aptTimes = document.getElementById("aptTimes");
              let aptBtn = document.getElementById("aptBtn");
              // aptDiv.style.display = "block";

              aptBtn.onclick = (e) =>{
                e.preventDefault();
                let calendarValue = aptCalendar.value;
                let timesValue = aptTimes.value;
                let curShopRef = ref(database, currentShop.name + ": " + currentShop.place_id + "/" + calendarValue + "/" + timesValue);
                get(curShopRef).then((snapshot)=>{
                  console.log("test")
                  const data = snapshot.val();
                  if(snapshot.exists()){
                    alert("This Spot is Already Taken")
                    console.log("taken");

                  }
                  else{
                    set(curShopRef, true);
                    alert("Confirmed");
                  }
                })
            }
          };
          });
        };
      });
  // }
    // })
};
