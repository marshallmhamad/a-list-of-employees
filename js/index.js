const containerData = document.querySelector(".data");
const btnPrevious = document.getElementById("previous");
const btnRandom = document.getElementById("random");
const btnNext = document.getElementById("next");
const cardContainer = document.querySelector(".card-container");

// Declaring the index
let index = 0;

// Defining the event for the end of the animation.
cardContainer.addEventListener("animationend", animationFinished);

// Removing the classes after animation to re-run that when the user click the same button again.
function animationFinished() {
  this.classList.remove("next", "random", "previous");
}

// Adding the functionality for change to the next person and adding the class to run the animation.
btnNext.addEventListener("click", () => {
  changePerson("next");
  cardContainer.classList.add("next");
});

// Adding the functionality for change to the next person and adding the class to run the animation.
btnPrevious.addEventListener("click", () => {
  changePerson("previous");
  cardContainer.classList.add("previous");
});

// Adding the functionality for change to the next person and adding the class to run the animation.
btnRandom.addEventListener("click", () => {
  changePerson("random");
  cardContainer.classList.add("random");
});

//  a fetch request of some random programmers data.
const getInfo = async () => {
  try {
    let request = await fetch("data/information.json");
    let result = await request.json();
    return result;
  } catch (error) {
    // Handling error.
    console.log(error);
  }
};

// Awaiting the info and sending it to the createCard.
const showInfo = async (index) => {
  let info = await getInfo();
  let personalData = info[index];
  createCard(personalData);
};

// Creates the HTML card adding the information from the showInfo.
const createCard = (info) => {
  let card = `<div class="img-person">
                    <img src="${info.url}" alt="person name">
                </div>
                <h2 class"name">${info.name}</h2>
                <h3 class='role'>${info.role}</h3>
                <p class="description">${info.text}</p>`;
  containerData.innerHTML = card;
};

// Changing the index of the JSON array and calling the showInfo with the new index.
const changePerson = (button) => {
  if (button === "next") {
    index++;
    if (index == 7) {
      index = 0;
    }
  } else if (button === "previous") {
    index--;
    if (index == -1) {
      index = 6;
    }
  } else if (button === "random") {
    let newIndex;
    do {
      // Do-while to ensure that the newIndex != than index.
      newIndex = Math.round(Math.random() * 6);
    } while (newIndex == index);
    index = newIndex;
  }
  setTimeout(() => showInfo(index), 500); // Setting the time for waiting the animation (that has a duration of 1s)
};

// Shows the JSON-array[0] by default (data of Richard Hendricks / CEO).
showInfo(index);
