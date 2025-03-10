let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turn0=true;//playerO starts
let count = 0; // Track moves for Draw condition

const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],      
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8],
];
const resetGame=()=>{
    turn0=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");

};
      
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        // console.log("Box was clicked");
        if(turn0)//playerO
        {
            box.innerText="O";
            turn0=false;
        }
        else{ //playerX
            box.innerText="X";
            turn0=true;
             
        }
        box.disabled=true;// Prevents clicking the same box again
        count++; // Increment move count
        let isWinner=checkWinner();// Check if a player has won

        if (count === 9 && !isWinner) {
          gameDraw();
        }
      });
    });
    const gameDraw=()=>{
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
const enableBoxes=()=>
{
    for(let box of boxes)
        {
            box.disabled=false;
            box.innerText="";
        }

}
const disableBoxes=()=>
{
    for(let box of boxes)
    {
        box.disabled=true;
    }
};

const showWinner=(winner)=>{
  msg.innerText=`Congratulations,Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};
const checkWinner=()=>{
    for(let pattern of winPatterns){
        //get the index of each pattern
        // console.log(pattern[0],pattern[1],pattern[2]);
        // console.log(
        //     boxes[pattern[0]].innerText,
        //     boxes[pattern[1]].innerText,
        //     boxes[pattern[2]].innerText,
        // );
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;
        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val)
            {
                // console.log("winner",pos1Val);
                showWinner(pos1Val);
                return true;
            }

        }

    }
};

newGameBtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);