
// *************MENU(in the navbar)*****************
let subnav = document.querySelector(".subnav");
let subnavContent = document.querySelector(".subnav-content");
subnav.addEventListener("click", function() {
  if (subnavContent.style.display === "none") {
    subnavContent.style.display = "block";
  } else {
    subnavContent.style.display = "none";
  }
});
// ***************hamburger Menu*****************
function toggleNavbar() {
  let navbarLinks = document.getElementById("navbar-links");
  if (navbarLinks.style.display === "block") {
    navbarLinks.style.display = "none";
  } else {
    navbarLinks.style.display = "block";
  }
}

// ******************M S C***********************
let car = document.getElementsByClassName("car");
let image = document.getElementsByClassName("image");
let carDetails = {
  image1: {
    model: "2024 Lamborghini",
    price: "$50,000,000",
    mileage: "20,210 miles"
  },
  image2: {
    model: "2022 Lamborghini",
    price: "$36,999",
    mileage: "18,500 miles"
  },
  image3: {
    model: "2023 Lamborghini",
    price: "$399,999",
    mileage: "12,000 miles"
  },
  image4: {
    model: "2021 Lamborghini",
    price: "$49,999",
    mileage: "15,000 miles"
  }
};
let model = document.getElementById("model");
let price = document.getElementById("price");
let mileage = document.getElementById("mileage");
for (let i = 0; i < car.length; i++) {
  car[i].addEventListener("click", function() {
    let id = this.id;

    model.textContent = carDetails[id].model;
    price.textContent = carDetails[id].price;
    mileage.textContent = carDetails[id].mileage;
    model.style.visibility = "visible";
    model.style.display = "block";
  });
}
for (let i = 0; i < image.length; i++) {
  image[i].addEventListener("click", function() {
    let id = this.id;

    model.textContent = carDetails[id].model;
    price.textContent = carDetails[id].price;
    mileage.textContent = carDetails[id].mileage;
    model.style.visibility = "visible";
    model.style.display = "block";
  });
}
// ***************Counter*********************
let counterBoxes = document.querySelectorAll(".counterbox");
counterBoxes.forEach(function(counterBox) {
  let counter = counterBox.querySelector(".counter");
  let countTo = counter.getAttribute("data-to");
  let countSpeed = counter.getAttribute("data-speed");
  let count = 0;
  function updateCount() {
    let increment = Math.ceil(countTo / countSpeed);
    if (count < countTo) {
      count += increment;
      counter.textContent = count;
      setTimeout(updateCount, 0.01);
    } else {
      counter.textContent = countTo;
    }
  }
  updateCount();
});
// ****************Gallery********************
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('close')) {
      let carId = event.target.closest('.car').id;
      closePopup(carId);
  }
});  
function showPopup(carId) {
    let popup = document.getElementById(carId).querySelector('.popup');
    popup.style.display = 'block';
}
function closePopup(carId) {
    let popup = document.getElementById(carId).querySelector('.popup');
    popup.style.display = 'none';
}
// **************Add to Cart******************
let cartPopup = document.getElementById('cart-popup');

function toggleCartPopup() {
    cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
}

function addToCart(vehicle) {
  alert("Added to Cart: " + vehicle["VehicleType"] + " " + vehicle["Vehicle Model"]);

  cartCount++;
  updateCartCount();

  updateGalleryCartCount();
}


function updateCartPopup(vehicle) {
  let cartPopup = document.getElementById('cart-popup');

  let cartItem = document.createElement('div');
  cartItem.textContent = vehicle["VehicleType"] + " " + vehicle["Vehicle Model"];
  
  cartPopup.appendChild(cartItem);
}

function updateGalleryCartCount() {
  let galleryCartCountElement = document.getElementById('gallery-cart-count');
  if (galleryCartCountElement) {
      galleryCartCountElement.innerText = cartCount;
  }
}
// *****************Ticker*********************
function updateDateTimeAndLocation() {
  const currentDate = new Date();
  const dateElement = document.getElementById("date");
  const timeElement = document.getElementById("time");
  const locationElement = document.getElementById("location");

  dateElement.textContent = currentDate.toLocaleDateString();
  timeElement.textContent = currentDate.toLocaleTimeString();

  navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY`)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const address = data.results[0].formatted_address;
          locationElement.textContent = address;
        } else {
          locationElement.textContent = "Location not available";
        }
      })
      .catch(error => {
        console.error(`Error fetching location: ${error.message}`);
        locationElement.textContent = "Location not available";
      });
  }, (error) => {
    console.error(`Error getting location: ${error.message}`);
    locationElement.textContent = "Location not available";
  });
}

updateDateTimeAndLocation();
setInterval(updateDateTimeAndLocation, 1000);
// ****************Visitor Count******************
let visitorCount = localStorage.getItem('visitorCount') || 0
    visitorCount++
    localStorage.setItem('visitorCount', visitorCount)
    document.getElementById('visitorCount').innerHTML = visitorCount;

    // for geolocation and time 
function updateTicker() {
    var ticker = document.getElementById("ticker");
    var currentDate = new Date().toLocaleDateString();
    var currentTime = new Date().toLocaleTimeString();
    var location = "Unknown";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            // Use a geocoding API to get the location from latitude and longitude
            var apiUrl = "https://api.openweathermap.org/geo/1.0/reverse?lat=" + latitude + "&lon=" + longitude + "&limit=1&appid=4c2a682b3126163ba5db64902b2030f9";
            fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                location = data[0].name + ", " + data[0].country;

                ticker.innerText = currentDate + " " + currentTime + " | " + location;
                ticker.style.width = ticker.clientWidth + "px";

                if (ticker.scrollWidth > ticker.clientWidth) {
                    ticker.animate([
                            { transform: "translateX(0)" },
                            { transform: "translateX(-" + (ticker.scrollWidth - ticker.clientWidth) + "px)" }
                        ], {
                            duration: (ticker.scrollWidth - ticker.clientWidth) * 20,
                            iterations: Infinity
                        });
                }
            })
            .catch(error => {
                console.log(error);
                ticker.innerText = currentDate + " " + currentTime + " | " + location;
                ticker.style.width = ticker.clientWidth + "px";
            });
        }, function(error) {
            console.log(error);
            ticker.innerText = currentDate + " " + currentTime + " | " + location;
            ticker.style.width = ticker.clientWidth + "px";
        });
    } else {
        ticker.innerText = currentDate + " " + currentTime + " | " + location;
        ticker.style.width = ticker.clientWidth + "px";
    }
}

updateTicker();
setInterval(updateTicker, 60000); // Update every minute