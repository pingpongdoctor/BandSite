//THE ARRAY INCLUDES THE DATA OF THE COMMENTS
// const commentData = [
//   {
//     name: "Connor Walton",
//     commentText:
//       "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
//     date: "02/17/2021",
//     image: "./assets/Images/Mohan-muruge.jpg",
//   },
//   {
//     name: "Emilie Beach",
//     commentText:
//       "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
//     date: "01/09/2021",
//     image: "./assets/Images/Mohan-muruge.jpg",
//   },
//   {
//     name: "Miles Acosta",
//     commentText:
//       "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
//     date: "12/20/2020",
//     image: "./assets/Images/Mohan-muruge.jpg",
//   },
// ];

//ADD COMMENTS
const conversationList = document.querySelector(".conversation__list");
//The function used for creating
const createElementWithClass = function (element, classes) {
  const createdElement = document.createElement(element);
  createdElement.classList.add(classes);
  return createdElement;
};
const addComment = function () {};

//TIMESTAMP CONVERT FUNCTION
const timeStampConverter = function (timeStamp) {
  const timeInfor = new Date(timeStamp);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentDate = timeInfor.getDay();
  const currentMonth = months[timeInfor.getMonth()];
  const currentYear = timeInfor.getFullYear();
  const currentHour = timeInfor.getHours();
  const currentMinnute = timeInfor.getMinutes();
  const timeDisplay = `0${currentDate}/${currentMonth}/${currentYear}`;
  return timeDisplay;
};

//Get data from Web API

const getData = function () {
  axios
    .get(
      "https://project-1-api.herokuapp.com/comments?api_key=b0519b09-2feb-4482-9102-0ec91faa6067"
    )
    .then((response) => {
      console.log(response.data);
      const commentData = response.data;
      conversationList.innerHTML = "";

      for (let i = commentData.length - 1; i >= 0; i--) {
        //Create item (li tag)
        const commentItem = createElementWithClass("li", "conversation__item");
        //Create div for p tags
        const commentDiv = createElementWithClass(
          "div",
          "conversation__comment-detail"
        );
        //Create div for p name and p date
        const commentDivNameAndDate = createElementWithClass(
          "div",
          "conversation__name-date"
        );
        //Create image
        const commentImg = document.createElement("img");
        commentImg.classList.add("conversation__img");
        commentImg.src = "./assets/Images/Mohan-muruge.jpg";
        commentImg.alt = "avatar";
        //Create p name
        const commentName = document.createElement("p");
        commentName.classList.add("conversation__name");
        commentName.innerText = commentData[i].name;
        //Create p date
        const commentDate = document.createElement("p");
        commentDate.classList.add("conversation__date");
        commentDate.innerText = timeStampConverter(commentData[i].timestamp);
        //Create p comment detail
        const commentDetail = document.createElement("p");
        commentDetail.innerText = commentData[i].comment;
        //AppendChild
        commentDivNameAndDate.appendChild(commentName); //add namw to div of name and date
        commentDivNameAndDate.appendChild(commentDate); //add date to div of name and date
        commentDiv.appendChild(commentDivNameAndDate); //add div of name and date to div of p tags
        commentDiv.appendChild(commentDetail); //add text to div of p tags
        commentItem.appendChild(commentImg); //add img to item
        commentItem.appendChild(commentDiv); //add div for p tags to Item
        conversationList.appendChild(commentItem); //add item (li) to ul
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

getData();

const input = document.querySelectorAll(".conversation__input");
const form = document.querySelector(".conversation__form");

//SUBMIT FORM
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (event.target.name.value !== "" && event.target.comment.value !== "") {
    const newComment = {
      name: event.target.name.value,
      comment: event.target.comment.value,
    };
    //Post newComment to server
    axios
      .post(
        "https://project-1-api.herokuapp.com/comments?api_key=b0519b09-2feb-4482-9102-0ec91faa6067",
        newComment
      )
      .then((response) => {
        console.log(response);
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
    //Remove the red error border for the input box
    input.forEach((inputBox) => {
      inputBox.classList.remove("conversation__input--error");
    });
  } else {
    //Change the color of the inputs' boder when there is empty inputs
    input.forEach((inputBox) => {
      if (inputBox.value === "") {
        inputBox.classList.add("conversation__input--error");
        alert(`Please enter your ${inputBox.name}!`);
      }
    });
  }
});

//Make the input box active when focus and not active when blur
for (let i = 0; i < input.length; i++) {
  //use focus event
  input[i].addEventListener("focus", (event) => {
    input[i].classList.add("conversation__input--focus");
    input[i].classList.remove("conversation__input--blur");
  });
  //use blur event
  input[i].addEventListener("blur", (event) => {
    input[i].classList.add("conversation__input--blur");
    input[i].classList.remove("conversation__input--focus");
  });
}
