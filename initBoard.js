const newGame = {
    plays: "",
    winner: false,
	final_winner: "",
	steps: 0,
	plays_again: false,
	immunity_red: false,
	immunity_white: false,
	total_redsteps: 0,
	total_whitesteps: 0,
	current_cell: "",
	cell_from: 0,
	cell_to: 0,
	prev_red: 0,
	prev_white: 0,
};

function getFirstPlayer(){
	let val= Math.floor(Math.random() * 2);
	if(val===0){
		newGame.plays = "Player Red";
	}
	else{
		newGame.plays = "Player White";
	}
}

function getPlayerTurn(){
	var first_player = document.getElementById("first_player");
	let general_dice = document.getElementById("general_dice");

	getFirstPlayer();

	document.getElementById('message').innerHTML+="First Player: "+newGame.plays + "<br>";
    first_player.disabled=true;
	general_dice.disabled=false;
}

function initBoard(){
	var table = document.getElementById('mainTable');
	var tr = document.createElement('tr');

	for (var i = 8; i >=1; i--) {
	  var tr = document.createElement('tr');
	  for (var j = 9; j >=0; j--) {
	  var td1 = document.createElement('td');
	  var num=i*10-j;
	  td1.innerHTML="<div id='position"+num+"'><img  src='images/"+num+".png'  height=70 width=70></div>";
	  
	  tr.appendChild(td1);
	  
	  }
	  table.appendChild(tr);
	}
}


