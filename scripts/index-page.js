//TIMESTAMP CONVERT FUNCTION
const timeStampConverter = function (timeStamp) {
  const timeInfor = new Date(timeStamp);
  const timeDisplay = timeInfor.toLocaleDateString();
  return timeDisplay;
};

//ADD COMMENTS
const conversationList = document.querySelector(".conversation__list");
//The function used for creating
const createElementWithClass = function (element, classes) {
  const createdElement = document.createElement(element);
  createdElement.classList.add(classes);
  return createdElement;
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

//GET DATA FROM API WEB AND DISPLAY ON THE INTERFACE
const apiKey =
  "https://project-1-api.herokuapp.com/comments?api_key=b0519b09-2feb-4482-9102-0ec91faa6067";
const getAndDisplayData = function (apiKey) {
  axios
    .get(apiKey)
    .then((response) => {
      console.log(response.data);
      const commentData = response.data;
      commentData.sort((a, b) => {
        return b.timestamp - a.timestamp;
      });
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
        commentImg.alt = "avatar";
        //Create p name
        const commentName = createElementWithClassAndInnertext(
          "p",
          "conversation__name",
          commentData[i].name
        );
        //Create p date
        const commentDate = createElementWithClassAndInnertext(
          "p",
          "conversation__date",
          timeStampConverter(commentData[i].timestamp)
        );
        //Create p comment detail
        const commentDetail = document.createElement("p");
        commentDetail.innerText = commentData[i].comment;
        //Create like button
        const buttonLike = createElementWithClassAndInnertext(
          "button",
          "btn-like",
          `Like: ${commentData[i].likes}`
        );

        //Create delete button
        const buttonDelete = createElementWithClassAndInnertext(
          "button",
          "btn-delete",
          "X"
        );
        //Create div for like and delete buttons
        const commentLikeDelete = createElementWithClass(
          "div",
          "conversation__btn-wrap"
        );

        //AppendChild
        commentDivNameAndDate.appendChild(commentName); //add namw to div of name and date
        commentDivNameAndDate.appendChild(commentDate); //add date to div of name and date
        commentLikeDelete.appendChild(buttonLike);
        commentLikeDelete.appendChild(buttonDelete);
        commentDiv.appendChild(commentDivNameAndDate); //add div of name and date to div of p tags
        commentDiv.appendChild(commentDetail); //add text to div of p tags
        commentDiv.appendChild(commentLikeDelete);
        commentItem.appendChild(commentImg); //add img to item
        commentItem.appendChild(commentDiv); //add div for p tags to Item
        conversationList.appendChild(commentItem); //add item (li) to ul

        //UPDATE THE LIKE BUTTON
        const id = commentData[i].id;
        buttonLike.addEventListener("click", () => {
          axios
            .put(
              `https://project-1-api.herokuapp.com/comments/${id}/like?api_key=b0519b09-2feb-4482-9102-0ec91faa6067`
            )
            .then((response) => {
              console.log(response);
              getAndDisplayData(apiKey);
            })
            .catch((error) => {
              console.log(error);
            });
        });

        //SET FOR THE DELETE BUTTON
        buttonDelete.addEventListener("click", () => {
          axios
            .delete(
              `https://project-1-api.herokuapp.com/comments/${id}?api_key=b0519b09-2feb-4482-9102-0ec91faa6067`
            )
            .then((response) => {
              console.log(response);
              getAndDisplayData(apiKey);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

getAndDisplayData(apiKey);

//SUBMIT FORM
const input = document.querySelectorAll(".conversation__input");
const form = document.querySelector(".conversation__form");
class Comment {
  constructor(name, comment) {
    this.name = name;
    this.comment = comment;
  }
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (event.target.name.value !== "" && event.target.comment.value !== "") {
    const newComment = new Comment(
      event.target.name.value,
      event.target.comment.value
    );
    console.log(newComment);
    axios
      .post(
        "https://project-1-api.herokuapp.com/comments?api_key=b0519b09-2feb-4482-9102-0ec91faa6067",
        newComment
      )
      .then((response) => {
        console.log(response);
        getAndDisplayData(apiKey);
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
//SET FOCUS AND BLUR EVENTS FOR INPUT BOXES
input.forEach((inputBox) => {
  //use focus event
  inputBox.addEventListener("focus", () => {
    inputBox.classList.add("conversation__input--focus");
    inputBox.classList.remove("conversation__input--blur");
  });
  //use blur event
  inputBox.addEventListener("blur", () => {
    inputBox.classList.add("conversation__input--blur");
    inputBox.classList.remove("conversation__input--focus");
  });
});
