"use strict";

//classes
class Tile {
	constructor() {
		this.tileSize = {"width": 0, "height": 0};
		console.log("Tile game loaded!");
	}

	set(settings) {
		this.tileSize = settings.tileSize;
	}
}




//actual CamJS game engine!
class CamJS {
	constructor(canvas, gametype) {
		this.c = document.getElementById(canvas);
		this.ctx = this.c.getContext("2d");
		//0 - mouse down, 1 - mouse up, 2 - mouse move
		this.mousePos = [{"x": -1, "y": -1}, {"x": -1, "y": -1}, {"x": -1, "y": -1}];
		this.type = this.getGameType(gametype);
	}

	getGameType(type) {
		switch (type) {
			case "tile":
				return new Tile();
			default:
				console.log("That game mode does not exist.");
				return null;
		}
	}

	//mouse stuff 
	mouseDown(e) {
		var pos = this.getMousePos(e);
		this.mousePos[0] = pos;
	}

	mouseUp(e) {
		var pos = this.getMousePos(e);
		this.mousePos[1] = pos;
	}

	mouseMove(e) {
		var pos = this.getMousePos(e);
		this.mousePos[2] = pos;
	}

	getMousePos(evt) {
	  var rect = this.c.getBoundingClientRect();
	  //Return mouse location related to canvas with JSON format
	  return {
	    x: evt.clientX - rect.left,
	    y: evt.clientY - rect.top
	  }
	}

	//main function that draws the game
	draw() {
		this.ctx.fillStyle="#000";
 		this.ctx.fillRect(50, 50, 100, 100);
	}
}