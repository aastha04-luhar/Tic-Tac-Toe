let boxes= document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");

let newGamebtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turn0=true;//playerO,playerX
let count = 0;

const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

const resetGame = () =>{
    turn0=true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("button is clicked");
        if(turn0){ //player O
            box.innerText="O";
            turn0=false;
        }else{     //player X
            box.innerText="X";
            turn0=true;
        }
        box.disabled=true;  //it will fix the value in the button which can't be changed
        count++;

        checkWinner();
    })
});

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;  //now after one winner game will stop 
    }
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;  //now after one winner game will stop 
        box.innerText = "";
    }
}

const showWinner=(winner) =>{
    msg.innerText=`Congratulations,Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const showDraw = () => {
    msg.innerText=`it's a draw!!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner=()=>{
    let winnerFound = false;

    for(let patterns of winPatterns){
        let pos1val= boxes[patterns[0]].innerText;
        let pos2val= boxes[patterns[1]].innerText;
        let pos3val= boxes[patterns[2]].innerText;

        if(pos1val!="" && pos2val!="" && pos3val!="")
        {
            if(pos1val===pos2val && pos2val===pos3val){
                showWinner(pos1val);
                winnerFound = true;
                return;
            }
        }
    }
    // If all boxes filled and no winner, it's a draw
              if (count === 9 && !winnerFound) {
              showDraw();
              }
}
newGamebtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);