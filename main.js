window.addEventListener("load", (event) => {
    let taskArray = [];
    let addButton = document.querySelector("#add-button");

    addButton.addEventListener("click", (event) => {
        // taskArray.unshift(newTask);
        let newTask = document.querySelector(".card input");
        let newCard = document.createElement("div");
        let newInput = document.createElement("input");
        let newImg = document.createElement("img");

        newCard.classList.add("card");
        newCard.append(newInput);
        newCard.append(newImg);
        newInput.value = newTask.value;
        newImg.src = "images/delete-button.svg";


        document.querySelector(".cards-inner-wrapper").append(newCard);
        newTask.value = "";
    })

    
})