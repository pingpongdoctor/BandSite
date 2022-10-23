const commentData = [
  {
    name: "Connor Walton",
    commentText:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
    date: "02/17/2021",
  },
  {
    name: "Emilie Beach",
    commentText:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
    date: "01/09/2021",
  },
  {
    name: "Miles Acosta",
    commentText:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
    date: "12/20/2020",
  },
];

//ADD COMMENTS
const conversationList = document.querySelector(".conversation__list");

const createElementWithClass = function (element, classes) {
  const createdElement = document.createElement(element);
  createdElement.classList.add(classes);
  return createdElement;
};
const addComment = function () {
  conversationList.innerHTML = "";
  for (let i = 0; i < commentData.length; i++) {
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
    //Create p name
    const commentName = document.createElement("p");
    commentName.classList.add("conversation__name");
    commentName.innerText = commentData[i].name;
    //Create p date
    const commentDate = document.createElement("p");
    commentDate.classList.add("conversation__date");
    commentDate.innerText = commentData[i].date;
    //Create p comment detail
    const commentDetail = document.createElement("p");
    commentDetail.innerText = commentData[i].commentText;
    //AppendChild
    commentDivNameAndDate.appendChild(commentName); //add namw to div of name and date
    commentDivNameAndDate.appendChild(commentDate); //add date to div of name and date
    commentDiv.appendChild(commentDivNameAndDate); //add div of name and date to div of p tags
    commentDiv.appendChild(commentDetail); //add text to div of p tags
    commentItem.appendChild(commentImg); //add img to item
    commentItem.appendChild(commentDiv); //add div for p tags to Item
    conversationList.appendChild(commentItem); //add item (li) to ul
  }
};

addComment();

const input = document.querySelectorAll(".conversation__input");
const form = document.querySelector(".conversation__form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (event.target.name.value !== "" && event.target.comment.value !== "") {
    const newComment = {
      name: event.target.name.value,
      commentText: event.target.comment.value,
      date: `${new Date().getDate()}-${
        new Date().getMonth() + 1
      }-${new Date().getFullYear()}`,
    };
    commentData.unshift(newComment);
    addComment();
  } else {
    //Change the color of the inputs' boder when there is empty inputs
    input.forEach((inputBox) => {
      if (inputBox.value === "") {
        inputBox.style.border = "1px solid #D22D2D";
        alert(`Please enter your ${inputBox.name}!`);
      }
    });
  }
});

//Make the input box active when focus and not active when blur
for (let i = 0; i < input.length; i++) {
  //use focus event
  input[i].addEventListener("focus", (event) => {
    event.target.style.border = "1px solid #000000";
  });
  //use blur event
  input[i].addEventListener("blur", (event) => {
    event.target.style.border = "1px solid #e1e1e1";
  });
}
