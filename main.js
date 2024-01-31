
let container = document.querySelector('.container');

createGrid();

let allBoxes = document.querySelectorAll('.box');
let message = document.querySelector('.message');

let allCombinations = [

    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let sign = "O";
let playerTurn =true;
let winner=false;

function createGrid(){

    for(let i=0;i<9;i++){

        let box = document.createElement('DIV');
        
        box.className = "box";

        box.addEventListener('click',insertSign);

        container.appendChild(box);

    }
    
}

function getEmptyBoxes() {

    let emptyBoxes = []; 

    allBoxes.forEach(box => {

        if (box.innerHTML === '') { 
            emptyBoxes.push(box); 
        }

    });

    return emptyBoxes; 
}


function insertSign(){

    if (this.innerHTML === '' && playerTurn) {

        this.innerHTML = "X";

        this.removeEventListener('click', insertSign);
        
        playerTurn = false;
        
        checkLines();

        setTimeout(computerTurn,1000);
        
    }
        
}


function computerTurn(){

    if(winner===true){
        return;
    }

    let emptyBoxes = getEmptyBoxes();

    if (emptyBoxes.length > 0) {
        
        let randomIndex = Math.floor(Math.random() * emptyBoxes.length);

        emptyBoxes[randomIndex].innerHTML = 'O'; 

        playerTurn = true;

        checkLines();
    
    }

}



function checkLines(){


    allCombinations.forEach(oneCombination=>{

            let box1 = allBoxes[oneCombination[0]];
            let box2 = allBoxes[oneCombination[1]];
            let box3 = allBoxes[oneCombination[2]];

            if(box1.innerHTML === box2.innerHTML && box1.innerHTML === box3.innerHTML && box1.innerHTML !=""){
                box1.style.background = "tomato";
                box2.style.background = "tomato";
                box3.style.background = "tomato";

                winner = true;
                
                displayWinner(box1,box2,box3);

                stopGame();
            }
            
        });
}


function stopGame(){
    allBoxes.forEach(box=>box.removeEventListener('click',insertSign));
}


function displayWinner(box1,box2,box3){
    let text=``;

    if(box1.innerHTML === box2.innerHTML && box1.innerHTML === box3.innerHTML && box1.innerHTML !="" && box1.innerHTML==="X"){
         text = `
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
            Der Gewinner ist der Spieler !!!
        `;

    }else if(box1.innerHTML === box2.innerHTML && box1.innerHTML === box3.innerHTML && box1.innerHTML !="" && box1.innerHTML==="O"){
         text = `
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
            Der Gewinner ist der Computer !!!
        `;
    }
    

    message.className =" alert";
    message.innerHTML = text;
}