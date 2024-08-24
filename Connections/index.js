//I need a function that takes the input from the user and checks if the four selected boxes exist within the same array
//The "Submit" button should execute this function.

//I need 4 arrays that contain the same words; they can be different colors. They need to have the common connection as
//the first item.

red = {"Sage": 'Colors', "Terracotta": 'Colors', "Navy": 'Colors', "Goldenrod":'Colors'};
blue = {"Odyssey": 'Honda Models', "Civic":'Honda Models', "Accord":'Honda Models', "Pilot":'Honda Models'};
green = {"Jame":'Books of the Bible without "S"', "Number":'Books of the Bible without "S"', "Act":'Books of the Bible without "S"', "Roman":'Books of the Bible without "S"'};
yellow = {"Band":'Ends with a Conjunction',"Rebut":'Ends with a Conjunction',"Poor":'Ends with a Conjunction',"Torso":'Ends with a Conjunction'};

game = [red, blue, green, yellow];

let valuesDivsSelected = [];
let keysDivsSelected = [];


//Then, I need to feed this information into the different divs on the html page

//I will use a startGame function that will run onclick. It will fill in divs

//It will also create a "life" counter. The game player will have 4 attempts to
//submit a correct grouping.
function startGame(game) {
    const homeScreen = document.getElementById('home-screen');

   const gameDiv = document.getElementById("game-div");
   gameDiv.style.display = 'grid';
   gameDiv.innerHTML = '';

    const gameInfo = document.getElementById('game-info')
    const submitButton = document.createElement('button');
    submitButton.className = 'submit-button';
    submitButton.textContent = "Submit";
    submitButton.id = 'submit-button';
    submitButton.setAttribute('disabled', true);
    gameInfo.append(submitButton);

    const lifeCounter = document.createElement('div');
        lifeCounter.className = "life-counter";
    
        const lifeSpan1 = document.createElement('span');
        const lifeSpan2 = document.createElement('span');
        const lifeSpan3 = document.createElement('span');
        const lifeSpan4 = document.createElement('span');

        lifeSpan1.setAttribute('class', 'life');
        lifeSpan2.setAttribute('class', 'life');
        lifeSpan3.setAttribute('class', 'life');
        lifeSpan4.setAttribute('class', 'life');

        lifeSpan1.setAttribute('id', 'life1');
        lifeSpan2.setAttribute('id', 'life2');
        lifeSpan3.setAttribute('id', 'life3');
        lifeSpan4.setAttribute('id', 'life4');

        lifeSpan1.textContent = '';

        lifeCounter.appendChild(lifeSpan1);
        lifeCounter.appendChild(lifeSpan2);
        lifeCounter.appendChild(lifeSpan3);
        lifeCounter.appendChild(lifeSpan4);

        gameInfo.appendChild(lifeCounter);

    submitButton.addEventListener('click', function() {
        checkChoices(lifeCounter);
        
    })
    

    game.forEach(dataObj => {
        Object.keys(dataObj).forEach(key => {
            const value = dataObj[key];

        //Create a div element for the grid item
        const gameSquare = document.createElement('div');
        gameSquare.className = 'game-square';

        //Set the text content of the game square
        gameSquare.innerHTML = `${key}`;
        gameSquare.dataset.value = value;
        gameSquare.dataset.key = key;

        //Append the game square to the game container
        gameDiv.appendChild(gameSquare);
         

        gameSquare.addEventListener('click', function() {

            addChoices(this.dataset.value, this, this.dataset.key);
            
            if(keysDivsSelected.length === 4) {
                submitButton.removeAttribute('disabled');
                console.log("Set button to enabled");
            }
            
        })


    });
        });
    document.getElementById('start-game').remove();
}

document.getElementById("start-game").onclick = function() {
    startGame(game);
};

//I need to have a function that when a square is clicked, the Value will be
//added to an array. Then, when you click a Submit button, the array will be
//checked if all the values match. If they match, return a "Good job" message.
//If they don't subtract a "life".

//I will use an addChoices function that will fire upon selecting the game squares.
//When a game square is selected, that squares value will be added to an array,
//choicesArray. Then, I will need to write a function for the Submit button that checks
//the returned array. If they all match, then they will receive feedback. If wrong, lose
//a life. After clicking Submit, the array should be cleared.


function addChoices(value, element, key) {
    const index = keysDivsSelected.indexOf(key);

    if(index > -1) {
        keysDivsSelected.splice(index,1);
        valuesDivsSelected.splice(index, 1);
        element.classList.remove('selected');
            submitButton = document.getElementById('submit-button');
            submitButton.setAttribute('disabled', true);
            console.log("Disable the button again");

        console.log(element.classList);
    }
    else if(keysDivsSelected.length < 4) {
        keysDivsSelected.push(key);
        valuesDivsSelected.push(value)
        element.classList.add('selected');
        console.log(element.classList);
        
    }
    else {
        console.log("You can only select 4.")
    }


    console.log("Selected values: ", keysDivsSelected, valuesDivsSelected); //for debugging
}

let lives = 4;

function subtractLife() {
    if (valuesDivsSelected[0] !== valuesDivsSelected[1] || valuesDivsSelected[0] !== valuesDivsSelected[2] ||
        valuesDivsSelected[0] !== valuesDivsSelected[3]) {
            submitButton = document.getElementById('submit-button');
            submitButton.setAttribute('disabled', true);
            console.log("Disable the button again");
            
            if(lives === 4) {
            const life1 = document.getElementById('life1');
            life1.remove();
            lives--;
            }
            else if(lives === 3) {
             const life2 = document.getElementById('life2');
                life2.remove();
                lives--;
            }

            else if(lives === 2) {
                const life3 = document.getElementById('life3');
                   life3.remove();
                   lives--;
               }

            else if(lives === 1) {
                const life4 = document.getElementById('life4');
                   life4.remove();
                   const gameDiv = document.getElementById('game-div');
                   gameDiv.innerHTML= '';
                   currentRow = 1;
                   let addedVal = [];

                   let keysDiv = [];

                   game.forEach(obj => {
                    Object.entries(obj).forEach(([key, value]) => {
                            console.log(key);
                            
                            keysDiv.push(key);
                            console.log(keysDiv);
                            
                            addedVal.push(value);

                            if(keysDiv.length === 4) {
                            const categoryRectangle = document.createElement('div');

                            categoryRectangle.className = `category-rectangle`;
                            categoryRectangle.id = `${value}`;
                            categoryRectangle.innerHTML = `<div style="text-align: center; width: 100%;">
                            <div style="font-weight: bold;">${value}</div>
                            <div>${keysDiv.join(', ')}</div>
                            </div>`;
                            console.log(value);

                            categoryRectangle.style.gridRowStart = currentRow;
                            console.log(categoryRectangle.style.gridRowStart)
                            currentRow++;
                            categoryRectangle.style.gridColumn = 'span 4';
                            
                            gameDiv.append(categoryRectangle);

                            setTimeout(() => {
                                categoryRectangle.classList.add('show');
                            }, 10);

                            keysDiv = [];
                            }
                            
                            }
                        )
                    
                   });
                
                const submitButton = document.getElementById('submit-button');
                submitButton.remove();
                
                const modal = document.getElementById('modal');

                const span = document.getElementsByClassName('close')[0];
                
                const message = 'Better luck next time!';

                showModal(message);

                span.onclick = function() {
                    modal.style.display = "none";
                  }

                window.onclick = function(event) {
                    if (event.target == modal) {
                      modal.style.display = "none";
                    }
                  }


                   console.log('you lose!');
               }


        }
}



//Now that I have the values adding and removing correctly, I need to now check whether all 4 match or not
//Next, I need to disable the gamesquares if the guess is correct. If it is incorrect, I need to subtract a life
//I need a way to remove the 'selected'/ set the correct game squares to be disabled

let currentRow = 1;

function checkChoices(element) {
    if(valuesDivsSelected.length === 4) {
        if(valuesDivsSelected[0] === valuesDivsSelected[1] && valuesDivsSelected[1]===valuesDivsSelected[2]
        && valuesDivsSelected[2] === valuesDivsSelected[3]) {
            console.log("Good job! The category is: ", valuesDivsSelected[0]);

            submitButton = document.getElementById('submit-button');
            submitButton.setAttribute('disabled', true);
            console.log("Disable the button again");

            keysDivsSelected.forEach(key => {
                document.querySelector(`[data-key="${key}"]`).remove();
            });
            //need to put a a box up that spans 4 boxes that shows the correctly solved category
            const categoryRectangle = document.createElement('div');
            categoryRectangle.className = 'category-rectangle';
            //categoryRectangle.setAttribute('style', 'white-space: pre');

            categoryRectangle.innerHTML = `<div style="text-align: center; width: 100%;">
                <div style="font-weight: bold;">${valuesDivsSelected[0]}</div>
                <div>${keysDivsSelected.join(', ')}</div>
                </div>`;
            categoryRectangle.id = `${valuesDivsSelected[0]}`;


            categoryRectangle.style.gridRowStart = currentRow;
            categoryRectangle.style.gridColumn = 'span 4';
            
            const gameDiv = document.getElementById('game-div');
            gameDiv.prepend(categoryRectangle);

            setTimeout(() => {
                categoryRectangle.classList.add('show');
            }, 10);

            currentRow ++;

            if(currentRow === 5) {

                const submitButton = document.getElementById('submit-button');
                submitButton.remove();

                const modal = document.getElementById('modal');

                const span = document.getElementsByClassName('close')[0];
                
                const message = 'Congrats, you win!';

                showModal(message);

                span.onclick = function() {
                    modal.style.display = "none";
                  }

                window.onclick = function(event) {
                    if (event.target == modal) {
                      modal.style.display = "none";
                    }
                  }

                
                document.getElementById('submit-button').remove();

                
                console.log("you win!")
            }
        }
        else {
            console.log("Sorry, that's not correct.");
            
            subtractLife(element);


            if(document.getElementById('life4') !== null) {
            keysDivsSelected.forEach(key => {
                document.querySelector(`[data-key="${key}"]`).setAttribute('class', 'game-square');
            });
        }
        }
        keysDivsSelected = [];
        valuesDivsSelected = [];
    }
    else {
        console.log("Please select 4 values.");
    }
    
}

function showModal(message) {
    modal.style.display = "block";
    modal.querySelector('p').textContent = message;
  }

//Last TODOs:
//[X]  1. Disable the Submit button until 4 are selected
//[X]  2. Style the lives counter
//[X]  3. Style the "Start Game" screen
//[X]  4. Show correct choices if the user loses
//[X]  5. Style the congrats screen
//[X]  6. Add transition animation for the correct answer
//[X]  7. Remove submit button at the end 
//[X]  8. Introduce the game
//[X]  9. Display correct words in the correct answer rectangle
//[X] 10. Bold the category in the rectangle