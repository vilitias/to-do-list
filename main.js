window.addEventListener("load", (event) => {
    let addButton = document.querySelector("#add-button");
    

    addButton.addEventListener("click", (event) => {
        let newTask = document.querySelector(".card input");
        let newCard = document.createElement("div");
        let newInput = document.createElement("input");
        let newImg = document.createElement("img");


        newCard.classList.add("card");
        newImg.classList.add("remove-button");

        newInput.value = newTask.value;
        newImg.src = "images/delete-button-inactive.svg";

        newCard.append(newInput);
        newCard.append(newImg);


        document.querySelector(".cards-inner-wrapper").append(newCard);
        newTask.value = "";


        newImg.addEventListener("click", removeTask);;

        function removeTask(event) {
            event.target.parentElement.remove();
        }

    })
    // как написать удаление в отдельной функции?

    // let removeButtons = document.querySelectorAll(".remove-button");
    // console.log(removeButtons);
    // removeButtons.forEach(element => {
    //     element.addEventListener("click", (event) => {
    //         event.target.parentElement.remove();
    //         console.log("remove")
    //     })
    // })

    let sortButton = document.querySelector("#sort-button");
    sortButton.addEventListener("click", (event) => {

        let cardsSelection = document.querySelectorAll(".card");
        let cardsArr = [...cardsSelection];
        cardsArr.shift();

        

        if (event.target.classList.contains("sort-button-up")) {
            event.target.classList.remove("sort-button-up");
            event.target.classList.add("sort-button-down");

            cardsArr.sort(function (a,b)  {
                if (a.firstElementChild.value > b.firstElementChild.value) {
                    return 1
                } else {
                    return -1;
                }
            })
            cardsSelection.forEach((element,index) => {
                if (index > 0) {
                    element.remove();
                }
            })
    
            cardsArr.forEach(element => {      
                document.querySelector(".cards-inner-wrapper").append(element);
            })

            
        } else {
            event.target.classList.remove("sort-button-down");
            event.target.classList.add("sort-button-up");
        }
        
        
    })
})