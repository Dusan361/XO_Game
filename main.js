// selektujem kontejner
let container = document.querySelector('.container');

createGrid();
// tu sam selektovao sve kvadrate
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
// pravim devet divova
function createGrid(){

    for(let i=0;i<9;i++){
// napravim DIV
        let box = document.createElement('DIV');
        // ovde mu dodam klasu
        box.className = "box";
// dodam mu da mogu da kliknem
        box.addEventListener('click',insertSign);
// i stavim ga u kontejner
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

// kad kliknem uzmem bas taj koji sam kliknuo i stavim mu X this mi omogucava da stavim bas taj na koji sam kliknuo X
function insertSign(){

    if (this.innerHTML === '' && playerTurn) {

        this.innerHTML = "X";
// kada kliknem i stavim znak da skine sa njega opciju da mogu opet na to mesto da kliknem
        this.removeEventListener('click', insertSign);
        
        playerTurn = false;
        
        checkLines();

        setTimeout(computerTurn,1000);
        
    }
        
}


function computerTurn(){

    //ako je pobednik igrac komp posle svakako odigra  potez pa na ovaj nacin prekidam njegovo izvrsenje
    if(winner===true){
        return;
    }

    let emptyBoxes = getEmptyBoxes();

    if (emptyBoxes.length > 0) {
        
         //da se generise random broj ne veci od duzine niza
        let randomIndex = Math.floor(Math.random() * emptyBoxes.length);

        emptyBoxes[randomIndex].innerHTML = 'O'; 

        playerTurn = true;

        checkLines();
    
    }

}


// ovde se poziva funkcija kojom  izlazim iz funkcije insertSign
function checkLines(){


    allCombinations.forEach(oneCombination=>{

            let box1 = allBoxes[oneCombination[0]];
            let box2 = allBoxes[oneCombination[1]];
            let box3 = allBoxes[oneCombination[2]];
// X je string tip podatka i zato na kraju stoji znak uzvika da proveri da ne moze da tri prazne kocke da racuna da je pogodio kao pobednik
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

// kada pogodim tri iste da posle svakoj kutiji skinem mogucnost da je kliknem
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