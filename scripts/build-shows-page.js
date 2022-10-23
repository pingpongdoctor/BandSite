const showsData = [
  {
    Date: "Mon Sept 06 2021",

    Venue: "Ronald Lane",

    Location: "San Francisco, CA",
  },

  {
    Date: "Tue Sept 21 2021",

    Venue: "Pier 3 East ",

    Location: "San Francisco, CA",
  },

  {
    Date: "Fri Oct 15 2021",

    Venue: "View Lounge",

    Location: "San Francisco, CA",
  },

  {
    Date: "Sat Nov 06 2021",

    Venue: "Hyatt Agency",

    Location: "San Francisco, CA",
  },

  {
    Date: "Fri Nov 26 2021",

    Venue: "Moscow Center ",

    Location: "San Francisco, CA",
  },

  {
    Date: "Wed Dec 15 2021",

    Venue: "Press Club ",

    Location: "San Francisco, CA",
  },
];

//Build the div includes the date, venue and location displaying in tablet
const showsTabletDisplayWrap = document.querySelector(".shows__display-wrap");
//Create tablet date
const showsTabletDate = document.createElement("p");
showsTabletDate.classList.add("shows__sub-header-display");
showsTabletDate.innerText = "Date";
//Create tablet venue
const showsTabletVenue = document.createElement("p");
showsTabletVenue.classList.add("shows__sub-header-display");
showsTabletVenue.innerText = "Venue";
//Create tablet location
const showsTabletLocation = document.createElement("p");
showsTabletLocation.classList.add("shows__sub-header-display");
showsTabletLocation.innerText = "Location";
//Create tablet button that is set display:visibility
const visibilityDisplayButton = document.createElement("button");
visibilityDisplayButton.classList.add("btn");
visibilityDisplayButton.classList.add("btn__visibility");
//AppendChild
showsTabletDisplayWrap.appendChild(showsTabletDate);
showsTabletDisplayWrap.appendChild(showsTabletVenue);
showsTabletDisplayWrap.appendChild(showsTabletLocation);
showsTabletDisplayWrap.appendChild(visibilityDisplayButton);

//Declare a function used to create elements
const createElementWithClass = function (element, className) {
  const newShowsElement = document.createElement(element);
  newShowsElement.classList.add(className);
  return newShowsElement;
};
//Build the elements for the Shows section
const showsList = document.querySelector(".shows__list");
for (let i = 0; i < showsData.length; i++) {
  //Create items (li tag)
  const showsItem = createElementWithClass("li", "shows__item");
  //Create a div for date and date detail
  const divDateAndDateDetail = createElementWithClass("div", "shows__wrap");
  //Create date
  const showsDate = document.createElement("p");
  showsDate.classList.add("shows__sub-header");
  showsDate.innerText = "Date";
  //Create date detail
  const showsDateDetail = document.createElement("p");
  showsDateDetail.classList.add("shows__date-detail");
  showsDateDetail.innerText = showsData[i].Date;
  //Create a div for venue and venue detail
  const divVenueAndVenueDetail = createElementWithClass("div", "shows__wrap");
  //Create venue
  const showsVenue = document.createElement("p");
  showsVenue.classList.add("shows__sub-header");
  showsVenue.innerText = "Venue";
  //Create venue detail
  const showsVenueDetail = document.createElement("p");
  showsVenueDetail.classList.add("shows__venue-detail");
  showsVenueDetail.innerText = showsData[i].Venue;
  //Create a div for location and location detail
  const divLocationAndLocationDetail = createElementWithClass(
    "div",
    "shows__wrap"
  );
  //Create location
  const showsLocation = document.createElement("p");
  showsLocation.classList.add("shows__sub-header");
  showsLocation.innerText = "Location";
  //Create location detail
  const showsLocationDetail = document.createElement("p");
  showsLocationDetail.classList.add("shows__location-detail");
  showsLocationDetail.innerText = showsData[i].Location;
  //Create a button
  const showsButton = document.createElement("button");
  showsButton.innerText = "buy tickets";
  showsButton.classList.add("btn");

  //AppendChild
  divDateAndDateDetail.appendChild(showsDate); //add date to div for date and date detail
  divDateAndDateDetail.appendChild(showsDateDetail); //add date detail to div for date and date detail
  divVenueAndVenueDetail.appendChild(showsVenue); //add venue to div for venue and venue detail
  divVenueAndVenueDetail.appendChild(showsVenueDetail); //add venue detail to div for venue and venue detail
  divLocationAndLocationDetail.appendChild(showsLocation); //add location to div for location and location detail
  divLocationAndLocationDetail.appendChild(showsLocationDetail); //add location detail to  div for location and location detail
  showsItem.appendChild(divDateAndDateDetail); //add div for date and date detail
  showsItem.appendChild(divVenueAndVenueDetail); //add div for venue and venue detail to item
  showsItem.appendChild(divLocationAndLocationDetail); //add div for location and location detail to item
  showsItem.appendChild(showsButton); //add button to li
  showsList.appendChild(showsItem); //add li to ul
}

//Ativate state of the shows' rows and deactiavte based on clicking
const showItems = document.querySelectorAll(".shows__item");
for (let i = 0; i < showItems.length; i++) {
  showItems[i].addEventListener("click", () => {
    if (showItems[i].classList.contains("shows__row-hover")) {
      showItems[i].classList.remove("shows__row-hover");
    } else {
      for (let a = 0; a < showItems.length; a++) {
        showItems[a].classList.remove("shows__row-hover");
      }
      showItems[i].classList.add("shows__row-hover");
    }
  });
}
//Set mouseover and mouseleave for rows
for (let i = 0; i < showItems.length; i++) {
  showItems[i].addEventListener("mouseover", () => {
    showItems[i].style.backgroundColor = "#fafafa";
  });
  showItems[i].addEventListener("mouseleave", () => {
    showItems[i].style.backgroundColor = "#ffffff";
  });
}
