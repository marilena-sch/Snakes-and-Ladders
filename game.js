function setPositions() {
	var positions=[];
	var snakePositions   =[13,20,28,44,58,59,65,72,78]
	var snakeNewPositions=[11,10,7,34,48,39,25,52,69]

	var ladderPositions   =[5,16,21,37,42,54,60,67,73]
	var ladderNewPositions=[33,36,61,56,53,64,80,77,76]

	for (var i = 1; i <=80 ; i++) {
	 positions[i]=new Object();
	 positions[i].from=i;
	 
	  
	 if(snakePositions.indexOf(i)!=-1){
	   positions[i].to=snakeNewPositions[snakePositions.indexOf(i)];
	   positions[i].type="Snake";
	 }
	 else if(ladderPositions.indexOf(i)!=-1){
	   positions[i].to=ladderNewPositions[ladderPositions.indexOf(i)];
	   positions[i].type="Ladders";
	 }
	 else if(i===29 || i===46){
		positions[i].to=i;
		positions[i].type="pythonEffect";   
	 }
	 else{
	   positions[i].to=i;
		positions[i].type="Normal";   
	   
	 }
	}
	 return positions; 
	}

var cells=setPositions();
for (var i = 1; i <=80 ; i++) {
    console.log("Cell: "+i+" type: "+cells[i].type+" From: "+cells[i].from+" To: "+cells[i].to)
}


function changePlayerTurn(){
	if(newGame.steps === 6){
		if(newGame.plays=='Player Red' && newGame.winner===false){
			newGame.plays='Player Red';
		}
    	else if(newGame.plays=='Player White' && newGame.winner===false){
        	newGame.plays='Player White';
    	}
	}
	else{
		if(newGame.plays=='Player Red' && newGame.winner===false){
			newGame.plays='Player White';
		}
		else if(newGame.plays=='Player White' && newGame.winner===false){
			newGame.plays='Player Red';
		}
	}
}

function updatePage(){
	if(newGame.immunity_red === true){
		document.getElementById('red_python').innerHTML="Red player has python effect."
		document.getElementById('red_python').style.color="red";
	}
	if(newGame.immunity_white === true){
		document.getElementById('white_python').innerHTML="White player has python effect."
		document.getElementById('white_python').style.color="white";
	}
    if(newGame.plays=='Player Red'){
        document.getElementById('message').innerHTML+="Current Player: "+newGame.plays +" from type "+ newGame.current_cell +" cell: " + newGame.cell_from + " to " + newGame.cell_to + "<br>";   
    }
    else{
        document.getElementById('message').innerHTML+="Current Player: "+newGame.plays +" from type "+ newGame.current_cell +" cell: " + newGame.cell_from + " to " + newGame.cell_to + "<br>";   
	}
    changePlayerTurn();
	if(newGame.winner === true){
        document.getElementById('message').style.display="none";
		document.getElementById('header').style.display="block";
		if(newGame.final_winner === "Player Red"){
			document.getElementById('header').innerHTML+=newGame.final_winner +"<br>"+ "&nbsp;&nbsp; has won" +"<br>";
		}
		else{
			document.getElementById('header').innerHTML+=newGame.final_winner +"<br>"+ "&nbsp;&nbsp;&nbsp; has won" +"<br>";
		}
    }
	else{
		document.getElementById('message').innerHTML+="Next player's turn: "+newGame.plays+"<br>";
	}
}

function getRandomDiceRole(){
	let img = document.getElementById("dice_div");
	let roll_result = document.getElementById("roll_result");
	let val= Math.floor(Math.random() * 6);
	let player_red = document.getElementById("player_red");
	let player_white = document.getElementById("player_white");
	let general_dice = document.getElementById("general_dice");

	img.style.display="block";
	if(val===0){
		img.setAttribute('src', 'ImagesDice/one.png');
		newGame.steps=1;
		roll_result.innerHTML+= newGame.plays + " dice result is: " + newGame.steps + "<br>";
	}
	else if(val===1){
		img.setAttribute('src', 'ImagesDice/two.png');
		newGame.steps=2;
		roll_result.innerHTML+= newGame.plays + " dice result is: " + newGame.steps + "<br>";
	}
	else if(val===2){
		img.setAttribute('src', 'ImagesDice/three.png');
		newGame.steps=3;
		roll_result.innerHTML+= newGame.plays + " dice result is: " + newGame.steps + "<br>";
	}
	else if(val===3){
		img.setAttribute('src', 'ImagesDice/four.png');
		newGame.steps=4;
		roll_result.innerHTML+= newGame.plays + " dice result is: " + newGame.steps + "<br>";
	}
	else if(val===4){
		img.setAttribute('src', 'ImagesDice/five.png');
		newGame.steps=5;
		roll_result.innerHTML+= newGame.plays + " dice result is: " + newGame.steps + "<br>";
	}
	else if(val===5){
		img.setAttribute('src', 'ImagesDice/six.png');
		newGame.steps=6;
		roll_result.innerHTML+= newGame.plays + " dice result is: " + newGame.steps + "<br>";
	}
	if(newGame.plays=='Player Red'){
		player_red.disabled=false;
		player_white.disabled=true;
	}
	else{
		player_red.disabled=true;
		player_white.disabled=false;
	}
	general_dice.disabled=true;
}

function hasPlayerWon(){
	let player_red = document.getElementById("player_red");
	let player_white = document.getElementById("player_white");
	let general_dice = document.getElementById("general_dice");
	if(newGame.total_redsteps === 80 || newGame.total_whitesteps === 80){
		newGame.winner=true;
		general_dice.disabled=true;
		player_red.disabled=true;
		player_white.disabled=true;
	}
	if(newGame.total_redsteps === 80){
		newGame.final_winner = "Player Red";
		document.getElementById("position"+newGame.total_redsteps).innerHTML="<img  src='imagesRed/"+newGame.total_redsteps+".png'  height=70 width=70></div>";
		if(newGame.prev_red === newGame.prev_white){
			document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='imagesWhite/"+newGame.prev_red+".png'  height=70 width=70></div>";
		}
		else{
			document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='images/"+newGame.prev_red+".png'  height=70 width=70></div>";	
		} 
	}
	else if(newGame.total_whitesteps === 80){
		newGame.final_winner = "Player White";
		document.getElementById("position"+newGame.total_whitesteps).innerHTML="<img  src='imagesWhite/"+newGame.total_whitesteps+".png'  height=70 width=70></div>";
		if(newGame.prev_red === newGame.prev_white){
			document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='imagesRed/"+newGame.prev_white+".png'  height=70 width=70></div>";
		}
		else{
			document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='images/"+newGame.prev_white+".png'  height=70 width=70></div>";	
		} 
	}
}

function play(){
	var red_steps=0, white_steps=0, from=0, to=0, tmp_redsteps=0, tmp_whitesteps=0;
	let player_red = document.getElementById("player_red");
	let player_white = document.getElementById("player_white");
	let general_dice = document.getElementById("general_dice");
	if(newGame.plays=='Player Red'){
		newGame.prev_red = newGame.total_redsteps;
		newGame.prev_white = newGame.total_whitesteps;
		newGame.total_redsteps = newGame.total_redsteps + newGame.steps;
		red_steps = newGame.total_redsteps;               
		if(newGame.total_redsteps === newGame.total_whitesteps){
			if(red_steps > 80){
				tmp_redsteps=red_steps - 80;
				tmp_redsteps=80-tmp_redsteps; 
				if(cells[tmp_redsteps].type === "Normal"){
					newGame.current_cell=cells[tmp_redsteps].type;
					newGame.cell_from=cells[tmp_redsteps].from;
					newGame.cell_to=cells[tmp_redsteps].to;
					from=cells[tmp_redsteps].from;
					to=cells[tmp_redsteps].to;
					newGame.total_redsteps = to;
					document.getElementById("position"+to).innerHTML="<img  src='imagesBoth/"+to+".png'  height=70 width=70></div>";
					if(to === newGame.prev_white && tmp_redsteps === newGame.prev_red){
						document.getElementById("position"+to).innerHTML="<img  src='imagesBoth/"+to+".png'  height=70 width=70></div>";
					}
					if(newGame.prev_red !== 0 && tmp_redsteps !== newGame.prev_red){
						document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='images/"+newGame.prev_red+".png'  height=70 width=70></div>";
					}
					else{
						console.log("First Move");
					}
					
					from=0;
					to=0;
				}
				else if(cells[tmp_redsteps].type === "Snake"){
					newGame.current_cell=cells[tmp_redsteps].type;
					newGame.cell_from=cells[tmp_redsteps].from;
					from=cells[tmp_redsteps].from;
					to=cells[tmp_redsteps].to;
					if(newGame.immunity_red === true){
						newGame.cell_to=tmp_redsteps;
						if(newGame.prev_red !== 0 && tmp_redsteps !== newGame.prev_red){
							if(newGame.immunity_white === false){
								document.getElementById("position"+to).innerHTML="<img  src='imagesRed/"+to+".png'  height=70 width=70></div>";
								document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='imagesWhite/"+newGame.prev_red+".png'  height=70 width=70></div>";
								newGame.total_redsteps = tmp_redsteps;
							}
							else{
								document.getElementById("position"+to).innerHTML="<img  src='imagesBoth/"+to+".png'  height=70 width=70></div>";
								document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='images/"+newGame.prev_red+".png'  height=70 width=70></div>";
								newGame.total_redsteps = tmp_redsteps;
							}
						}
						else{
							console.log("First Move");
						}
					}
					else if(newGame.immunity_red === false){
						newGame.cell_to=cells[tmp_redsteps].to;
						if(newGame.prev_red !== 0 && tmp_redsteps !== newGame.prev_red){
							if(newGame.immunity_white === true){
								document.getElementById("position"+to).innerHTML="<img  src='imagesRed/"+to+".png'  height=70 width=70></div>";
								document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='imagesWhite/"+newGame.prev_red+".png'  height=70 width=70></div>";
								newGame.total_redsteps = to;
							}
							else{
								document.getElementById("position"+to).innerHTML="<img  src='imagesBoth/"+to+".png'  height=70 width=70></div>";
								document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='images/"+newGame.prev_red+".png'  height=70 width=70></div>";
								newGame.total_redsteps = to;
							}
						}
						else{
							console.log("First Move");
						}
					}
					from=0;
					to=0;
				}
			}
			else if(red_steps < 80){
				if(cells[red_steps].type === "Normal"){
					newGame.current_cell=cells[red_steps].type;
					newGame.cell_from=cells[red_steps].from;
					newGame.cell_to=cells[red_steps].to;
					from=cells[red_steps].from;
					to=cells[red_steps].to;
					newGame.total_redsteps = to;
					document.getElementById("position"+to).innerHTML="<img  src='imagesBoth/"+to+".png'  height=70 width=70></div>";
					if(newGame.prev_red !== 0){
						document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='images/"+newGame.prev_red+".png'  height=70 width=70></div>";
					}
					else{
						console.log("First Move");
					}
					from=0;
					to=0;
				}
				else if(cells[red_steps].type === "Ladders"){
					newGame.current_cell=cells[red_steps].type;
					newGame.cell_from=cells[red_steps].from;
					newGame.cell_to=cells[red_steps].to;
					from=cells[red_steps].from;
					to=cells[red_steps].to;
					document.getElementById("position"+to).innerHTML="<img  src='imagesBoth/"+to+".png'  height=70 width=70></div>";
					newGame.total_redsteps = to;
					if(newGame.prev_red !== 0){
						document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='images/"+newGame.prev_red+".png'  height=70 width=70></div>";
					}
					else{
						console.log("First Move");
					}
					from=0;
					to=0;
				}
				else if(cells[red_steps].type === "pythonEffect"){
					newGame.immunity_red = true;
					newGame.current_cell=cells[red_steps].type;
					newGame.cell_from=cells[red_steps].from;
					newGame.cell_to=cells[red_steps].to;
					from=cells[red_steps].from;
					to=cells[red_steps].to;
					newGame.total_redsteps = to;
					document.getElementById("position"+to).innerHTML="<img  src='imagesBoth/"+to+".png'  height=70 width=70></div>";
					if(newGame.prev_red !== 0){
						document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='images/"+newGame.prev_red+".png'  height=70 width=70></div>";
					}
					else{
						console.log("First Move");
					}
					from=0;
					to=0;
				}
				else if(cells[red_steps].type === "Snake"){
					newGame.current_cell=cells[red_steps].type;
					newGame.cell_from=cells[red_steps].from;
					from=cells[red_steps].from;
					to=cells[red_steps].to;
					if(newGame.immunity_red === true){
						newGame.cell_to=red_steps;
						if(newGame.prev_red !== 0){
							if(newGame.immunity_white === false){
								document.getElementById("position"+red_steps).innerHTML="<img  src='imagesRed/"+red_steps+".png'  height=70 width=70></div>";
								document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='imagesWhite/"+newGame.prev_red+".png'  height=70 width=70></div>";
								newGame.total_redsteps = red_steps;
							}
							else{
								document.getElementById("position"+red_steps).innerHTML="<img  src='imagesBoth/"+red_steps+".png'  height=70 width=70></div>";
								document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='images/"+newGame.prev_red+".png'  height=70 width=70></div>";
								newGame.total_redsteps = red_steps;
							}
						}
						else{
							console.log("First Move");
						}
					}
					else if(newGame.immunity_red === false){
					newGame.cell_to=cells[red_steps].to;
						if(newGame.prev_red !== 0){
							if(newGame.immunity_white === true){
								document.getElementById("position"+to).innerHTML="<img  src='imagesRed/"+to+".png'  height=70 width=70></div>";
								document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='imagesWhite/"+newGame.prev_red+".png'  height=70 width=70></div>";
								newGame.total_redsteps = to;
							}
							else{
								document.getElementById("position"+to).innerHTML="<img  src='imagesBoth/"+to+".png'  height=70 width=70></div>";
								document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='images/"+newGame.prev_red+".png'  height=70 width=70></div>";
								newGame.total_redsteps = to;
							}
						}
						else{
							console.log("First Move");
						}
					}
					from=0;
					to=0;
				}
		
			}
		}
		else if(newGame.total_whitesteps  !== newGame.total_redsteps){
			if(red_steps > 80){
				tmp_redsteps=red_steps - 80;
				tmp_redsteps=80-tmp_redsteps;
				if(cells[tmp_redsteps].type === "Normal"){
					newGame.current_cell=cells[tmp_redsteps].type;
					newGame.cell_from=cells[tmp_redsteps].from;
					newGame.cell_to=cells[tmp_redsteps].to;
					from=cells[tmp_redsteps].from;
					to=cells[tmp_redsteps].to;
					newGame.total_redsteps = to;
					if(tmp_redsteps === newGame.prev_white){
						document.getElementById("position"+to).innerHTML="<img  src='imagesBoth/"+to+".png'  height=70 width=70></div>";
						if(tmp_redsteps !== newGame.prev_red){
							document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='images/"+newGame.prev_red+".png'  height=70 width=70></div>";
						}
					}
					else if(tmp_redsteps !== newGame.prev_white){
						document.getElementById("position"+tmp_redsteps).innerHTML="<img  src='imagesRed/"+tmp_redsteps+".png'  height=70 width=70></div>";
						if(newGame.prev_white===newGame.prev_red){
							document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='imagesWhite/"+newGame.prev_red+".png'  height=70 width=70></div>";
						}
						else{
							if(tmp_redsteps !== newGame.prev_red){
								document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='images/"+newGame.prev_red+".png'  height=70 width=70></div>";
							}
						}
					}

					from=0;
					to=0;
				}
				else if(cells[tmp_redsteps].type === "Snake"){
					newGame.current_cell=cells[tmp_redsteps].type;
					newGame.cell_from=cells[tmp_redsteps].from;
					from=cells[tmp_redsteps].from;
					to=cells[tmp_redsteps].to;
					if(newGame.immunity_red === true){
						newGame.cell_to=tmp_redsteps;
						newGame.total_redsteps = tmp_redsteps;
						if(tmp_redsteps === newGame.prev_white){
							document.getElementById("position"+tmp_redsteps).innerHTML="<img  src='imagesBoth/"+tmp_redsteps+".png'  height=70 width=70></div>";
							if(tmp_redsteps !== newGame.prev_red){
								document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='images/"+newGame.prev_red+".png'  height=70 width=70></div>";
							}
						}
						else if(tmp_redsteps !== newGame.prev_white){
							document.getElementById("position"+tmp_redsteps).innerHTML="<img  src='imagesRed/"+tmp_redsteps+".png'  height=70 width=70></div>";
							if(newGame.prev_white===newGame.prev_red){
								document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='imagesWhite/"+newGame.prev_red+".png'  height=70 width=70></div>";
							}
							else{
								if(tmp_redsteps !== newGame.prev_red){
									document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='images/"+newGame.prev_red+".png'  height=70 width=70></div>";
								}
							}
						}
					}
					else if(newGame.immunity_red === false){
						newGame.cell_to=cells[tmp_redsteps].to;
						newGame.total_redsteps = to;
						if(to === newGame.prev_white){
							document.getElementById("position"+tmp_redsteps).innerHTML="<img  src='imagesBoth/"+tmp_redsteps+".png'  height=70 width=70></div>";
							if(tmp_redsteps !== newGame.prev_white){
								document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='images/"+newGame.prev_white+".png'  height=70 width=70></div>";
							}
						}
						else if(tmp_whitesteps !== newGame.prev_white){
							document.getElementById("position"+to).innerHTML="<img  src='imagesRed/"+to+".png'  height=70 width=70></div>";
							if(newGame.prev_white===newGame.prev_red){
								document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='imagesWhite/"+newGame.prev_red+".png'  height=70 width=70></div>";
							}
							else{
								if(to !== newGame.prev_red){
									document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='images/"+newGame.prev_red+".png'  height=70 width=70></div>";
								}
							}
						}
					}
					from=0;
					to=0;
				}
			}
			else if(red_steps < 80){
				if(cells[red_steps].type === "Normal"){
					newGame.current_cell=cells[red_steps].type;
					newGame.cell_from=cells[red_steps].from;
					newGame.cell_to=cells[red_steps].to;
					from=cells[red_steps].from;
					to=cells[red_steps].to;
					newGame.total_redsteps=to;
					document.getElementById("position"+to).innerHTML="<img  src='imagesRed/"+to+".png'  height=70 width=70></div>";
					if(newGame.prev_red !== 0){
						if(newGame.prev_white === newGame.prev_red){
							document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='imagesWhite/"+newGame.prev_red+".png'  height=70 width=70></div>";
						}
						else{
							document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='images/"+newGame.prev_red+".png'  height=70 width=70></div>";
						}
					}
					else{
						console.log("First Move");
					}
					from=0;
					to=0;
				}
				else if(cells[red_steps].type === "Ladders"){
					newGame.current_cell=cells[red_steps].type;
					newGame.cell_from=cells[red_steps].from;
					newGame.cell_to=cells[red_steps].to;
					from=cells[red_steps].from;
					to=cells[red_steps].to;
					newGame.total_redsteps = to;
					if(newGame.prev_red === 0 && newGame.steps === 5){
						if(newGame.prev_white === 33){
							document.getElementById("position"+to).innerHTML="<img  src='imagesBoth/"+to+".png'  height=70 width=70></div>";
						}
						else{
							document.getElementById("position"+to).innerHTML="<img  src='imagesRed/"+to+".png'  height=70 width=70></div>";
						}
					}
					else if(newGame.prev_red !== 0){
						if(newGame.prev_red === newGame.prev_white){
							document.getElementById("position"+to).innerHTML="<img  src='imagesRed/"+to+".png'  height=70 width=70></div>";
							document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='imagesWhite/"+newGame.prev_red+".png'  height=70 width=70></div>";
						}
						else if(to === newGame.prev_white){
							document.getElementById("position"+to).innerHTML="<img  src='imagesBoth/"+to+".png'  height=70 width=70></div>";
							document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='images/"+newGame.prev_red+".png'  height=70 width=70></div>";
						}
						else if(newGame.prev_red !== newGame.prev_white){
							document.getElementById("position"+to).innerHTML="<img  src='imagesRed/"+to+".png'  height=70 width=70></div>";
							document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='images/"+newGame.prev_red+".png'  height=70 width=70></div>";
						}
					}
					else if(newGame.prev_white === 0 && newGame.steps !== 5){
						console.log("First Move");
					}
					from=0;
					to=0;
				}
				else if(cells[red_steps].type === "pythonEffect"){
					newGame.immunity_red = true;
					newGame.current_cell=cells[red_steps].type;
					newGame.cell_from=cells[red_steps].from;
					newGame.cell_to=cells[red_steps].to;
					from=cells[red_steps].from;
					to=cells[red_steps].to;
					newGame.total_redsteps=to;
					document.getElementById("position"+to).innerHTML="<img  src='imagesRed/"+to+".png'  height=70 width=70></div>";
					if(newGame.prev_red !== 0){
						if(newGame.prev_white === newGame.prev_red){
							document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='imagesWhite/"+newGame.prev_red+".png'  height=70 width=70></div>";
						}
						else{
							document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='images/"+newGame.prev_red+".png'  height=70 width=70></div>";
						}
					}
					else{
						console.log("First Move");
					}
					from=0;
					to=0;
				}
				else if(cells[red_steps].type === "Snake"){
					newGame.current_cell=cells[red_steps].type;
					newGame.cell_from=cells[red_steps].from;
					from=cells[red_steps].from;
					to=cells[red_steps].to;
					if(newGame.immunity_red === true){
						newGame.cell_to=red_steps;
						if(newGame.prev_red !== 0){
							newGame.total_redsteps = red_steps;
							document.getElementById("position"+red_steps).innerHTML="<img  src='imagesRed/"+red_steps+".png'  height=70 width=70></div>";
							if(red_steps === newGame.prev_white){
								document.getElementById("position"+newGame.red_steps).innerHTML="<img  src='imagesBoth/"+newGame.red_steps+".png'  height=70 width=70></div>";
								document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='images/"+newGame.prev_red+".png'  height=70 width=70></div>";
							}
							else if (newGame.prev_red === newGame.prev_white){
								document.getElementById("position"+red_steps).innerHTML="<img  src='imagesRed/"+red_steps+".png'  height=70 width=70></div>";
								document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='imagesWhite/"+newGame.prev_red+".png'  height=70 width=70></div>";
							}
							else{
								document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='images/"+newGame.prev_red+".png'  height=70 width=70></div>";
							}
						}
						else{
							console.log("First Move");
						}
					}
					else if(newGame.immunity_red === false){						
						newGame.cell_to=cells[red_steps].to;
						newGame.total_redsteps = to;
						document.getElementById("position"+to).innerHTML="<img  src='imagesRed/"+to+".png'  height=70 width=70></div>";
						if(newGame.prev_red !== 0){
							if(newGame.prev_red === 11 && to === 11 && newGame.prev_white !== 11){
								document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='imagesRed/"+newGame.prev_red+".png'  height=70 width=70></div>";
							}
							else if(newGame.prev_red === newGame.prev_white){
								document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='imagesWhite/"+newGame.prev_red+".png'  height=70 width=70></div>";
							}
							else if(to === newGame.prev_white && newGame.prev_red !== 11){
								document.getElementById("position"+to).innerHTML="<img  src='imagesBoth/"+to+".png'  height=70 width=70></div>";
								document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='images/"+newGame.prev_red+".png'  height=70 width=70></div>";
							}
							else{
								document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='images/"+newGame.prev_red+".png'  height=70 width=70></div>";
							}
							if(to === 11 && newGame.prev_white === 11){
								document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='imagesBoth/"+newGame.prev_red+".png'  height=70 width=70></div>";
								document.getElementById("position"+newGame.prev_red).innerHTML="<img  src='images/"+newGame.prev_red+".png'  height=70 width=70></div>";
							}
						}
						else{
							console.log("First Move");
						}
					}
					from=0;
					to=0;
				}
			}
		}
	}
	else if(newGame.plays=='Player White'){
		newGame.prev_red = newGame.total_redsteps;
		newGame.prev_white = newGame.total_whitesteps;
		newGame.total_whitesteps = newGame.total_whitesteps + newGame.steps;
		white_steps = newGame.total_whitesteps; 
		if(newGame.total_whitesteps  === newGame.total_redsteps){
			if(white_steps > 80){
				tmp_whitesteps=white_steps - 80;
				tmp_whitesteps=80-tmp_whitesteps;
				if(cells[tmp_whitesteps].type === "Normal"){
					newGame.current_cell=cells[tmp_whitesteps].type;
					newGame.cell_from=cells[tmp_whitesteps].from;
					newGame.cell_to=cells[tmp_whitesteps].to;
					from=cells[tmp_whitesteps].from;
					to=cells[tmp_whitesteps].to;
					newGame.total_whitesteps=to;
					document.getElementById("position"+tmp_whitesteps).innerHTML="<img  src='imagesBoth/"+tmp_whitesteps+".png'  height=70 width=70></div>";
					if(to === newGame.prev_red && tmp_whitesteps === newGame.prev_white){
						document.getElementById("position"+to).innerHTML="<img  src='imagesBoth/"+to+".png'  height=70 width=70></div>";
					}
					if(newGame.prev_white !== 0 && tmp_whitesteps !== newGame.prev_white){
						document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='images/"+newGame.prev_white+".png'  height=70 width=70></div>";
					}
					else{
						console.log("First Move");
					}
					
					from=0;
					to=0;
				}
				else if(cells[tmp_whitesteps].type === "Snake"){
					newGame.current_cell=cells[tmp_whitesteps].type;
					newGame.cell_from=cells[tmp_whitesteps].from;
					from=cells[tmp_whitesteps].from;
					to=cells[tmp_whitesteps].to;
					if(newGame.immunity_white === true){
						newGame.cell_to=tmp_whitesteps;
						if(newGame.prev_white !== 0 && tmp_whitesteps !== newGame.prev_white){
							if(newGame.immunity_red === false){
								document.getElementById("position"+tmp_whitesteps).innerHTML="<img  src='imagesWhite/"+tmp_whitesteps+".png'  height=70 width=70></div>";
								document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='imagesRed/"+newGame.prev_white+".png'  height=70 width=70></div>";
								newGame.total_whitesteps = tmp_whitesteps;
							}
							else{
								document.getElementById("position"+tmp_whitesteps).innerHTML="<img  src='imagesBoth/"+tmp_whitesteps+".png'  height=70 width=70></div>";
								document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='images/"+newGame.prev_white+".png'  height=70 width=70></div>";
								newGame.total_whitesteps = tmp_whitesteps;
							}
						}
						else{
							console.log("First Move");
						}
					}
					else if(newGame.immunity_white === false){
						newGame.cell_to=cells[tmp_whitesteps].to;
						if(newGame.prev_white !== 0){
							if(newGame.immunity_red === true){
								document.getElementById("position"+to).innerHTML="<img  src='imagesWhite/"+to+".png'  height=70 width=70></div>";
								document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='imagesRed/"+newGame.prev_white+".png'  height=70 width=70></div>";
								newGame.total_redsteps = to;
							}
							else{
								document.getElementById("position"+to).innerHTML="<img  src='imagesBoth/"+to+".png'  height=70 width=70></div>";
								document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='images/"+newGame.prev_white+".png'  height=70 width=70></div>";
								newGame.total_whitesteps = to;
							}
						}
						else{
							console.log("First Move");
						}
					}
					from=0;
					to=0;
				}
			}
			else if(white_steps < 80){
				if(cells[white_steps].type === "Normal"){
					newGame.current_cell=cells[white_steps].type;
					newGame.cell_from=cells[white_steps].from;
					newGame.cell_to=cells[white_steps].to;
					from=cells[white_steps].from;
					to=cells[white_steps].to;
					newGame.total_whitesteps = to;
					document.getElementById("position"+to).innerHTML="<img  src='imagesBoth/"+to+".png'  height=70 width=70></div>";
					if(newGame.prev_white !== 0){
						document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='images/"+newGame.prev_white+".png'  height=70 width=70></div>";
					}
					else{
						console.log("First Move");
					}
					from=0;
					to=0;
				}
				else if(cells[white_steps].type === "Ladders"){
					newGame.current_cell=cells[white_steps].type;
					newGame.cell_from=cells[white_steps].from;
					newGame.cell_to=cells[white_steps].to;
					from=cells[white_steps].from;
					to=cells[white_steps].to;
					document.getElementById("position"+to).innerHTML="<img  src='imagesBoth/"+to+".png'  height=70 width=70></div>";
					newGame.total_whitesteps = to;
					if(newGame.prev_white !== 0){
						document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='images/"+newGame.prev_white+".png'  height=70 width=70></div>";
					}
					else{
						console.log("First Move");
					}
					from=0;
					to=0;
				}
				else if(cells[white_steps].type === "pythonEffect"){
					newGame.immunity_white=true;
					newGame.current_cell=cells[white_steps].type;
					newGame.cell_from=cells[white_steps].from;
					newGame.cell_to=cells[white_steps].to;
					from=cells[white_steps].from;
					to=cells[white_steps].to;
					newGame.total_whitesteps=to;
					document.getElementById("position"+to).innerHTML="<img  src='imagesBoth/"+to+".png'  height=70 width=70></div>";
					if(newGame.prev_white !== 0){
						document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='images/"+newGame.prev_white+".png'  height=70 width=70></div>";
					}
					else{
						console.log("First Move");
					}
					from=0;
					to=0;
				}
				else if(cells[white_steps].type === "Snake"){
					newGame.current_cell=cells[white_steps].type;
					newGame.cell_from=cells[white_steps].from;
					from=cells[white_steps].from;
					to=cells[white_steps].to;
					if(newGame.immunity_white === true){
						newGame.cell_to=white_steps;
						if(newGame.prev_white !== 0){
							document.getElementById("position"+white_steps).innerHTML="<img  src='imagesBoth/"+white_steps+".png'  height=70 width=70></div>";
							document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='images/"+newGame.prev_white+".png'  height=70 width=70></div>";
							newGame.total_whitesteps = white_steps;
						}
						else{
							console.log("First Move");
						}
					}
					else if(newGame.immunity_white === false){
						newGame.cell_to=cells[white_steps].to;
						if(newGame.prev_white !== 0){
							document.getElementById("position"+to).innerHTML="<img  src='imagesBoth/"+to+".png'  height=70 width=70></div>";
							document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='images/"+newGame.prev_white+".png'  height=70 width=70></div>";
							newGame.total_whitesteps = to;
						}
						else{
							console.log("First Move");
						}
					}
					from=0;
					to=0;
				}
			}
		}
		else if(newGame.total_whitesteps  !== newGame.total_redsteps){
			if(white_steps > 80){
				tmp_whitesteps=white_steps - 80;
				tmp_whitesteps=80-tmp_whitesteps;
				if(cells[tmp_whitesteps].type === "Normal"){
					newGame.current_cell=cells[tmp_whitesteps].type;
					newGame.cell_from=cells[tmp_whitesteps].from;
					newGame.cell_to=cells[tmp_whitesteps].to;
					from=cells[tmp_whitesteps].from;
					to=cells[tmp_whitesteps].to;
					newGame.total_whitesteps = to;
					if(tmp_whitesteps === newGame.prev_red){
						document.getElementById("position"+tmp_whitesteps).innerHTML="<img  src='imagesBoth/"+tmp_whitesteps+".png'  height=70 width=70></div>";
						if(tmp_whitesteps !== newGame.prev_white){
							document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='images/"+newGame.prev_white+".png'  height=70 width=70></div>";
						}
					}
					else if(tmp_whitesteps !== newGame.prev_red){
						document.getElementById("position"+tmp_whitesteps).innerHTML="<img  src='imagesWhite/"+tmp_whitesteps+".png'  height=70 width=70></div>";
						if(newGame.prev_white===newGame.prev_red){
							document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='imagesRed/"+newGame.prev_white+".png'  height=70 width=70></div>";
						}
						else{
							if(tmp_whitesteps !== newGame.prev_white){
								document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='images/"+newGame.prev_white+".png'  height=70 width=70></div>";
							}
						}
					}

					from=0;
					to=0;
				}
				else if(cells[tmp_whitesteps].type === "Snake"){
					newGame.current_cell=cells[tmp_whitesteps].type;
					newGame.cell_from=cells[tmp_whitesteps].from;
					from=cells[tmp_whitesteps].from;
					to=cells[tmp_whitesteps].to;
					if(newGame.immunity_white === true){
						newGame.cell_to=tmp_whitesteps;
						newGame.total_whitesteps = tmp_whitesteps;
						if(tmp_whitesteps === newGame.prev_red){
							document.getElementById("position"+tmp_whitesteps).innerHTML="<img  src='imagesBoth/"+tmp_whitesteps+".png'  height=70 width=70></div>";
							if(tmp_whitesteps !== newGame.prev_white){
								document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='images/"+newGame.prev_white+".png'  height=70 width=70></div>";
							}
						}
						else if(tmp_whitesteps !== newGame.prev_red){
							document.getElementById("position"+tmp_whitesteps).innerHTML="<img  src='imagesWhite/"+tmp_whitesteps+".png'  height=70 width=70></div>";
							if(newGame.prev_white===newGame.prev_red){
								document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='imagesRed/"+newGame.prev_white+".png'  height=70 width=70></div>";
							}
							else{
								if(tmp_whitesteps !== newGame.prev_white){
									document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='images/"+newGame.prev_white+".png'  height=70 width=70></div>";
								}
							}
						}
					}
					else if(newGame.immunity_white === false){
						newGame.cell_to=cells[tmp_whitesteps].to;
						newGame.total_whitesteps = to;
						if(to === newGame.prev_red){
							document.getElementById("position"+tmp_whitesteps).innerHTML="<img  src='imagesBoth/"+tmp_whitesteps+".png'  height=70 width=70></div>";
							if(tmp_whitesteps !== newGame.prev_white){
								document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='images/"+newGame.prev_white+".png'  height=70 width=70></div>";
							}
						}
						else if(tmp_whitesteps !== newGame.prev_red){
							document.getElementById("position"+to).innerHTML="<img  src='imagesWhite/"+to+".png'  height=70 width=70></div>";
							if(newGame.prev_white===newGame.prev_red){
								document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='imagesRed/"+newGame.prev_white+".png'  height=70 width=70></div>";
							}
							else{
								if(to !== newGame.prev_white){
									document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='images/"+newGame.prev_white+".png'  height=70 width=70></div>";
								}
							}
						}
					}
					from=0;
					to=0;
				}
			}
			else if(white_steps < 80){
				if(cells[white_steps].type === "Normal"){
					newGame.current_cell=cells[white_steps].type;
					newGame.cell_from=cells[white_steps].from;
					newGame.cell_to=cells[white_steps].to;
					from=cells[white_steps].from;
					to=cells[white_steps].to;
					newGame.total_whitesteps=to;
					document.getElementById("position"+to).innerHTML="<img  src='imagesWhite/"+to+".png'  height=70 width=70></div>";
					if(newGame.prev_white !== 0){
						if(newGame.prev_white === newGame.prev_red){
							document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='imagesRed/"+newGame.prev_white+".png'  height=70 width=70></div>";
						}
						else{
							document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='images/"+newGame.prev_white+".png'  height=70 width=70></div>";
						}
					}
					else{
						console.log("First Move");
					}
					from=0;
					to=0;
				}
				else if(cells[white_steps].type === "Ladders"){
					newGame.current_cell=cells[white_steps].type;
					newGame.cell_from=cells[white_steps].from;
					newGame.cell_to=cells[white_steps].to;
					from=cells[white_steps].from;
					to=cells[white_steps].to;
					newGame.total_whitesteps = to;
					if(newGame.prev_white === 0 && newGame.steps === 5){
						if(newGame.prev_red === 33){
							document.getElementById("position"+to).innerHTML="<img  src='imagesBoth/"+to+".png'  height=70 width=70></div>";
						}
						else{
							document.getElementById("position"+to).innerHTML="<img  src='imagesWhite/"+to+".png'  height=70 width=70></div>";
						}
					}
					else if(newGame.prev_white !== 0){
						if(newGame.prev_red === newGame.prev_white){
							document.getElementById("position"+to).innerHTML="<img  src='imagesWhite/"+to+".png'  height=70 width=70></div>";
							document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='imagesRed/"+newGame.prev_white+".png'  height=70 width=70></div>";
						}
						else if(to === newGame.prev_red){
							document.getElementById("position"+to).innerHTML="<img  src='imagesBoth/"+to+".png'  height=70 width=70></div>";
							document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='images/"+newGame.prev_white+".png'  height=70 width=70></div>";
						}
						else if(newGame.prev_red !== newGame.prev_white){
							document.getElementById("position"+to).innerHTML="<img  src='imagesWhite/"+to+".png'  height=70 width=70></div>";
							document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='images/"+newGame.prev_white+".png'  height=70 width=70></div>";
						}
					}
					else if(newGame.prev_white === 0 && newGame.steps !== 5){
						console.log("First Move");
					}
					from=0;
					to=0;
				}
				else if(cells[white_steps].type === "pythonEffect"){
					newGame.immunity_white=true;
					newGame.current_cell=cells[white_steps].type;
					newGame.cell_from=cells[white_steps].from;
					newGame.cell_to=cells[white_steps].to;				
					from=cells[white_steps].from;
					to=cells[white_steps].to;
					newGame.total_whitesteps=to;
					document.getElementById("position"+to).innerHTML="<img  src='imagesWhite/"+to+".png'  height=70 width=70></div>";
					if(newGame.prev_white !== 0){
						if(newGame.prev_red === newGame.prev_white){
							document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='imagesRed/"+newGame.prev_white+".png'  height=70 width=70></div>";
						}
						else{
							document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='images/"+newGame.prev_white+".png'  height=70 width=70></div>";
						}
					}
					else{
						console.log("First Move");
					}
					from=0;
					to=0;
				}
				else if(cells[white_steps].type === "Snake"){
					newGame.current_cell=cells[white_steps].type;
					newGame.cell_from=cells[white_steps].from;
					from=cells[white_steps].from;
					to=cells[white_steps].to;
					if(newGame.immunity_white === true){
						newGame.cell_to=white_steps;
						newGame.total_whitesteps = white_steps;
						document.getElementById("position"+white_steps).innerHTML="<img  src='imagesWhite/"+white_steps+".png'  height=70 width=70></div>";
						if(newGame.prev_white !== 0){
							if(white_steps === newGame.prev_red){
								document.getElementById("position"+newGame.white_steps).innerHTML="<img  src='imagesBoth/"+newGame.white_steps+".png'  height=70 width=70></div>";
								document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='images/"+newGame.prev_white+".png'  height=70 width=70></div>";
							}
							else if (newGame.prev_red === newGame.prev_white){
								document.getElementById("position"+white_steps).innerHTML="<img  src='imagesWhite/"+white_steps+".png'  height=70 width=70></div>";
								document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='imagesRed/"+newGame.prev_white+".png'  height=70 width=70></div>";
							}
							else{
								document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='images/"+newGame.prev_white+".png'  height=70 width=70></div>";
							}
						}
						else{
							console.log("First Move");
						}
					}
					else if(newGame.immunity_white === false){
						newGame.cell_to=cells[white_steps].to;
						newGame.total_whitesteps = to;
						document.getElementById("position"+to).innerHTML="<img  src='imagesWhite/"+to+".png'  height=70 width=70></div>";
						if(newGame.prev_white !== 0){
							if(newGame.prev_white === 11 && to === 11 && newGame.prev_red !== 11){
								document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='imagesWhite/"+newGame.prev_white+".png'  height=70 width=70></div>";
							}
							else if(newGame.prev_red === newGame.prev_white){
								document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='imagesRed/"+newGame.prev_white+".png'  height=70 width=70></div>";
							}
							else if(to === newGame.prev_red && newGame.prev_white !== 11){
								document.getElementById("position"+to).innerHTML="<img  src='imagesBoth/"+to+".png'  height=70 width=70></div>";
								document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='images/"+newGame.prev_white+".png'  height=70 width=70></div>";
							}
							else{
								document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='images/"+newGame.prev_white+".png'  height=70 width=70></div>";
							}
							if(to === 11 && newGame.prev_red === 11){
								document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='imagesBoth/"+newGame.prev_white+".png'  height=70 width=70></div>";
								document.getElementById("position"+newGame.prev_white).innerHTML="<img  src='images/"+newGame.prev_white+".png'  height=70 width=70></div>";
							}
						}
						else{
							console.log("First Move");
						}
					}
					from=0;
					to=0;
				}
			}
		}
	}

	player_red.disabled=true;
	player_white.disabled=true;
	general_dice.disabled=false;

	hasPlayerWon();
	updatePage();
}