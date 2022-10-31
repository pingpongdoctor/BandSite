//TIMESTAMP CONVERT FUNCTION
const timeStampConverter = function (timeStamp) {
  const timeInfor = new Date(timeStamp);
  const timeDisplay = timeInfor.toDateString();
  return timeDisplay;
};

//DECLARE A FUNCTION USED TO DECLARE ELEMENTS WITH A CLASS
const createElementWithClass = function (element, className) {
  const newShowsElement = document.createElement(element);
  newShowsElement.classList.add(className);
  return newShowsElement;
};

const createElementWithClassAndInnertext = function (
  element,
  className,
  innerText
) {
  const createdElement = document.createElement(element);
  createdElement.classList.add(className);
  createdElement.innerText = innerText;
  return createdElement;
};

//BUILD THE ELEMENTS FOR THE SHOWS SECTION, THAT ONLY APPEAR IN THE TABLET BREAKPOINT AND DESKTOP BREAKPOINT
const showsTabletDisplayWrap = document.querySelector(".shows__display-wrap");
//Create tablet date
const showsTabletDate = createElementWithClassAndInnertext(
  "p",
  "shows__sub-header-display",
  "Date"
);
//Create tablet venue
const showsTabletVenue = createElementWithClassAndInnertext(
  "p",
  "shows__sub-header-display",
  "Venue"
);
//Create tablet location
const showsTabletLocation = createElementWithClassAndInnertext(
  "p",
  "shows__sub-header-display",
  "Location"
);
//Create tablet button that is set display:visibility
const visibilityDisplayButton = document.createElement("button");
visibilityDisplayButton.classList.add("btn");
visibilityDisplayButton.classList.add("btn__visibility");
//AppendChild
showsTabletDisplayWrap.appendChild(showsTabletDate); //Append Tablet date to div
showsTabletDisplayWrap.appendChild(showsTabletVenue); //Append Tablet venue to div
showsTabletDisplayWrap.appendChild(showsTabletLocation); //Append tablet Location to div
showsTabletDisplayWrap.appendChild(visibilityDisplayButton); //Append tablet Button to div

//HIGHLIGHT THE ROWS
const highLight = function () {
  const showItems = document.querySelectorAll(".shows__item");
  for (let i = 0; i < showItems.length; i++) {
    showItems[i].addEventListener("click", (event) => {
      if (showItems[i].classList.contains("shows__row-active")) {
        showItems[i].classList.remove("shows__row-active");
      } else {
        for (let a = 0; a < showItems.length; a++) {
          showItems[a].classList.remove("shows__row-active");
        }
        showItems[i].classList.add("shows__row-active");
      }
    });
  }
};
//SET MOUSEOVER AND MOUSE LEAVE
const hoverFunction = function () {
  const showItems = document.querySelectorAll(".shows__item");
  showItems.forEach((showItem) => {
    showItem.addEventListener("mouseover", () => {
      showItem.classList.add("shows__row-hover");
    });
    showItem.addEventListener("mouseleave", () => {
      showItem.classList.remove("shows__row-hover");
    });
  });
};

//GET DATA FROM SERVER AND DISPLAY ON THE WEBSITE
const showsList = document.querySelector(".shows__list");
const apiKey =
  "https://project-1-api.herokuapp.com/showdates?api_key=b0519b09-2feb-4482-9102-0ec91faa6067";
const showsHeading = document.querySelector(".shows__heading");
showsHeading.innerText = "Shows";

const getDataAndDisPlay = function (apiKey) {
  const getData = axios
    .get(apiKey)
    .then((response) => {
      const showsData = response.data;

      showsList.innerHTML = "";
      showsData.forEach((showObject) => {
        //Create items (li tag)
        const showsItem = createElementWithClass("li", "shows__item");
        //Create a div for date and date detail
        const divDateAndDateDetail = createElementWithClass(
          "div",
          "shows__wrap"
        );
        //Create date
        const showsDate = createElementWithClassAndInnertext(
          "p",
          "shows__sub-header",
          "Date"
        );
        //Create date detail

        const showsDateDetail = createElementWithClassAndInnertext(
          "p",
          "shows__date-detail",
          timeStampConverter(showObject.date)
        );
        //Create a div for venue and venue detail
        const divVenueAndVenueDetail = createElementWithClass(
          "div",
          "shows__wrap"
        );
        //Create venue
        const showsVenue = createElementWithClassAndInnertext(
          "p",
          "shows__sub-header",
          "Venue"
        );
        //Create venue detail
        const showsVenueDetail = createElementWithClassAndInnertext(
          "p",
          "shows__venue-detail",
          showObject.place
        );
        //Create a div for location and location detail
        const divLocationAndLocationDetail = createElementWithClass(
          "div",
          "shows__wrap"
        );
        //Create location
        const showsLocation = createElementWithClassAndInnertext(
          "p",
          "shows__sub-header",
          "Location"
        );
        //Create location detail
        const showsLocationDetail = createElementWithClassAndInnertext(
          "p",
          "shows__location-detail",
          showObject.location
        );
        //Create a button

        const showsButton = createElementWithClassAndInnertext(
          "button",
          "btn",
          "buy tickets"
        );

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
      });
      highLight();
      hoverFunction();
    })
    .catch((error) => {
      console.log(error);
    });
};

getDataAndDisPlay(apiKey);
