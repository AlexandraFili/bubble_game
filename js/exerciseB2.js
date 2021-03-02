document.body.onload = setupCanvas();

function setupCanvas(){
	var canvas = document.getElementById("session4");
	var ctx;
	var xPositions = [];
	var	yPositions = [];
	var	colours = [];
	var	speed = [];
	// size modified to also be an array
	var	size = [];
	var numBubbles = 20;
	
	if (canvas.getContext) {
		ctx = canvas.getContext("2d");
		
		//add values to the arrays
		for(var i = 0; i < numBubbles; i++){
			xPositions.push(Math.random() * 900);
			yPositions.push(Math.random() * 600);
			colours.push(randomColour());
			speed.push(randomSpeed());
			// adding values to the size array
			size.push(randomSize());
		}
		window.setInterval(draw, 50);		
	}
	
	// added function for generating a random size
	function randomSize(){
		return Math.floor(Math.random() * 8 + 8);
	}
	
	//generates random colour
	function randomColour(){
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		return "rgb(" + r + "," + g + "," + b + ")";
	};
		
	//generates a random speed
	function randomSpeed(){
		// Remember that the value added here is added to both the lower
		// value and the upper value. Also remember that the upper value is 
		// not included in the generated number. This will generate a number 
		// from 2 to 10 (9 + 2 = 11, but it does include the upper value so 
		// the decimal number will be rounded down to 10	)
		return Math.floor(Math.random() * 9 + 2); 
	}
	
	function draw(){
		//code to be run every 50 milliseconds
		//drawing the background
		ctx.fillStyle = "#66b3ff";
		ctx.rect(0, 0, 900, 600);
		ctx.fill();
		
		// We need to modify this for loop to go by the array length now
		// as we are changing the the number of bubbles (adding and removing)
		// which will require us to make additions to our code if we wanted 
		// to keep using numBubbles in our condition here. It is easier to 
		// simply use the length of one of the arrays.
		for(var i = 0; i < size.length; i++){
			//fills with colour values from colours arrays
			ctx.fillStyle = colours[i];
			//draw bubbles
			ctx.beginPath();
			// modified to reference size array value
			ctx.arc(xPositions[i], yPositions[i], size[i], 0, Math.PI * 2, false);
			ctx.fill();			
			
			// animate
			// if the flower is off the canvas
			if(yPositions[i] < 0){
				// offsets the y position to a random positive number
				// instead of just resetting to the initial value
				yPositions[i] = Math.random() + 650;
				xPositions[i] = Math.random() * 900;
			}else{
				// if the bubble is still on the canvas
				// decrease the y position by the bubble's speed
				// so it is re-drawn (animted) further up the canvas
				yPositions[i] -= speed[i];
			}
			
		}
	}
	
	//event listener to run function addFlower on click of the canvas
	document.getElementById("btnAdd").addEventListener("click", addBubble);
	function addBubble(){		
		//code to add bubble on click of button
		xPositions.push(Math.random() * 900);
		yPositions.push(Math.random() * 600);
		colours.push(randomColour());
		speed.push(randomSpeed());
		size.push(randomSize());
	}
	
	//event listener to run function removeBubble on click of the button
	document.getElementById("btnRemove").addEventListener("click", removeBubble);
	function removeBubble(){
		//code to remove values from the beginning of the arrays
		xPositions.splice(0, 1);
		yPositions.splice(0, 1);
		colours.splice(0, 1);
		speed.splice(0, 1);
		// including removal from size array
		size.splice(0, 1);
	}
}