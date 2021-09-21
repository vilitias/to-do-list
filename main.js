window.addEventListener("load", (event) => { // выполняем все действия только после прогрузки окна
    let addButton = document.querySelector("#add-button");
    
    function addTask() {
        let newTask = document.querySelector(".card input");
        let newCard = document.createElement("div");
        let newInput = document.createElement("input");
        let newImg = document.createElement("img");


        newCard.classList.add("card");
        newCard.draggable = true;
        newImg.classList.add("remove-button");

        newInput.value = newTask.value;
        newImg.src = "images/delete-button-inactive.svg";

        newCard.append(newInput);
        newCard.append(newImg);


        document.querySelector(".cards-inner-wrapper").append(newCard);
        newTask.value = "";


        newImg.addEventListener("click", removeTask);

        newCard.addEventListener("dragstart", eventHandler);
        newCard.addEventListener("dragenter", eventHandler);
        newCard.addEventListener("dragend", eventHandler);
    }
    
    let activeCard = null;
    function eventHandler(event) {
        switch(event.type) {
            case "dragstart":
                activeCard = event.currentTarget;
                event.target.classList.add("selected");
                break;
            case "dragenter":
                changeCards(activeCard, event.currentTarget);
                break;
            case "dragend":
                event.target.classList.remove("selected");
                break;
        }

    }

    function changeCards(active, toSwap) {
        const cardsArr = [...active.parentElement.children];
        const activeCardIndex = cardsArr.findIndex(element => element === active);
        const swapCardIndex = cardsArr.findIndex(element => element === toSwap);

        if (activeCardIndex < swapCardIndex) {
            active.parentElement.insertBefore(toSwap, active);
        } else if (activeCardIndex > swapCardIndex) {
            active.parentElement.insertBefore(active, toSwap);
        }
    }

    function removeTask(event) {
        event.target.parentElement.remove();
    }


    // создаем новые карточки при нажатии на кнопку Добавить
    addButton.addEventListener("click", addTask) 
    
    //при нажатии на enter на первой строке тоже срабатывает добавление
    document.querySelectorAll("input").forEach((element, index) => {
        if (index === 0) {
            element.addEventListener("keyup", (event) => {
                if (event.keyCode === 13) {
                    document.getElementById("add-button").click();
                }

            })
        }
    } )

    let sortButton = document.querySelector("#sort-button");
    sortButton.addEventListener("click", (event) => {

        //копируем коллекцию в массив, чтобы сделать сортировку
        // и убираем из массива первый элемент, чтобы начальное окно не участвовало в сортировке
        let cardsSelection = document.querySelectorAll(".card");
        let cardsArr = [...cardsSelection]; 
        cardsArr.shift(); 

        

        if (event.target.classList.contains("sort-button-up")) {
            event.target.classList.remove("sort-button-up");
            event.target.classList.add("sort-button-down");

            cardsArr.sort(function (a,b)  {
                let currentItem = a.firstElementChild.value;
                let nextItem = b.firstElementChild.value;
                
                if (!isNaN(currentItem)) {
                    currentItem = +currentItem;
                }

                if (!isNaN(nextItem)) {
                    nextItem = +nextItem;
                }

                if (currentItem > nextItem) {
                    return -1
                } else {
                    return 1;
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

            cardsArr.sort(function (a,b)  {
                let currentItem = a.firstElementChild.value;
                let nextItem = b.firstElementChild.value;
                if (!isNaN(currentItem)) {
                    currentItem = +currentItem;
                }

                if (!isNaN(nextItem)) {
                    nextItem = +nextItem;
                }

                if (currentItem < nextItem) {
                    return -1
                } else {
                    return 1;
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
        }
        
        
    })
})