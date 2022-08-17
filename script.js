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

searchButton.onclick = (e) => {
  e.preventDefault();
  zipCode = zipCodeInput.value;
  const api =
    "https://maps.googleapis.com/maps/api/place/textsearch/json?query=barbershops+near+zipcode+" +
    zipCode +
    "&key=AIzaSyDsLhGBee6Gu3UJj0J1e-XUTPhdRRG0PJ8";
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
        
        let chooseButton = document.createElement("button");
        chooseButton.innerHTML = "Choose This Shop";
        
        newCard.append(name, address, rating, chooseButton);
        allCards.appendChild(newCard);
        
        let appointmentsDiv = document.getElementById("appointments");
        
        
        
        
//         let appointmentsButton = document.createElement("button");
//         appointmentsButton.setAttribute("class", "dropbtn");
//         appointmentsButton.innerHTML = "Appointments";
        
//         let dropdownContent = document.createElement("div");
//         dropdownContent.setAttribute("class", "dropdown-content");
        
        // for(let i=0;i<3;i++){
        //   let content = document.createElement("a");
        //   content.setAttribute("href", "#");
        //   content.innerHTML = "";
        //   dropdownContent.appendChild(content);
        // }
        
        chooseButton.onclick = () => {
          // appointmentsDiv.innerHTML = "";
          // appointmentsDiv.append(appointmentsButton, dropdownContent);
          console.log(shop.name);
          currentShop = shop;

          //appointmentsDiv.innerHTML = "";
          aptDiv.style.display = "flex";
          // appointmentsDiv.style.backgroundColor = "green";
          let joinCue = document.createElement("div");
          joinCue.setAttribute("id", "joinCue");
          
          let makeAppointment = document.createElement("div");

//           let cueHeader = document.createElement("h2");
//           cueHeader.innerHTML = "Join a Queue";
          
//           let cueButton = document.createElement("button");
//           cueButton.innerHTML = "Join!";
          
//           cueButton.onclick = () => {};

//           let appointmentHeader = document.createElement("h2");
//           appointmentHeader.innerHTML = "Make an Appointment";
          
//   //        joinCue.append(cueHeader, cueButton);
//           makeAppointment.append(appointmentHeader);
//           aptDiv.append(makeAppointment);
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

          let chooseButton = document.createElement("button");
          chooseButton.innerHTML = "Choose This Shop";

          newCard.append(name, address, rating, chooseButton);
          allCards.appendChild(newCard);
          chooseButton.onclick = () => {
          // appointmentsDiv.innerHTML = "";
          // appointmentsDiv.append(appointmentsButton, dropdownContent);
          console.log(shop.name);
          currentShop = shop;

          //appointmentsDiv.innerHTML = "";
          aptDiv.style.display = "flex";
          // appointmentsDiv.style.backgroundColor = "green";
          let joinCue = document.createElement("div");
          joinCue.setAttribute("id", "joinCue");
          
          let makeAppointment = document.createElement("div");

//           let cueHeader = document.createElement("h2");
//           cueHeader.innerHTML = "Join a Queue";
          
//           let cueButton = document.createElement("button");
//           cueButton.innerHTML = "Join!";
          
//           cueButton.onclick = () => {};

//           let appointmentHeader = document.createElement("h2");
//           appointmentHeader.innerHTML = "Make an Appointment";
          
//   //        joinCue.append(cueHeader, cueButton);
//           makeAppointment.append(appointmentHeader);
//           aptDiv.append(makeAppointment);
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

          let chooseButton = document.createElement("button");
          chooseButton.innerHTML = "Choose This Shop";

          newCard.append(name, address, rating, chooseButton);
          allCards.appendChild(newCard);
          chooseButton.onclick = () => {
          // appointmentsDiv.innerHTML = "";
          // appointmentsDiv.append(appointmentsButton, dropdownContent);
          console.log(shop.name);
          currentShop = shop;

          //appointmentsDiv.innerHTML = "";
          aptDiv.style.display = "flex";
          // appointmentsDiv.style.backgroundColor = "green";
          let joinCue = document.createElement("div");
          joinCue.setAttribute("id", "joinCue");
          
          let makeAppointment = document.createElement("div");

//           let cueHeader = document.createElement("h2");
//           cueHeader.innerHTML = "Join a Queue";
          
//           let cueButton = document.createElement("button");
//           cueButton.innerHTML = "Join!";
          
//           cueButton.onclick = () => {};

//           let appointmentHeader = document.createElement("h2");
//           appointmentHeader.innerHTML = "Make an Appointment";
          
//   //        joinCue.append(cueHeader, cueButton);
//           makeAppointment.append(appointmentHeader);
//           aptDiv.append(makeAppointment);
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
};
