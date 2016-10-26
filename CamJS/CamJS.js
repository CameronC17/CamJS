"use strict";

//classes
class Tile {
	constructor() {
		this.tiles = [];
		this.tileSize = [10, 10];
		this.mapSize = [0, 0];
		this.playerOffset = [0, 0];
		this.moveLimit = 0;
		console.log("Tile game loaded!");
	}

	set(settings) {
		if (settings.tiles)
			this.tiles = settings.tiles;
		if (settings.tileSize)
			this.tileSize = settings.tileSize;
		if (settings.playerOffset)
			this.playerOffset = settings.playerOffset;
		if (settings.moveLimit)
			this.moveLimit = settings.moveLimit;

		if (settings.tiles && settings.tileSize) {
			this.mapSize[0] = settings.tiles[0].length * settings.tileSize[0];
			this.mapSize[1] = settings.tiles.length * settings.tileSize[1];
		}
	}

	createPlayer(player) {
		var plyr = {
			"name": player.name,
			"position": player.position,
			"size": player.size,
			"offset": [0, 0]
		}
		return plyr;
	}

	engine(players) {

	}

	drawTile(ctx, x, y, tile) {
		ctx.fillStyle="#000";
		switch (tile) {
			case "1":
				ctx.fillStyle="#f3f355";
				break;
			case "2":
				ctx.fillStyle="#05f7f8";
				break;
			case "3":
				ctx.fillStyle="#ff6600";
				break;
			case "4":
				ctx.fillStyle="#333333";
				break;
			case "5":
				ctx.fillStyle="#f080f0";
				break;
			case "6":
				ctx.fillStyle="#33ff33";
				break;
			case "7":
				ctx.fillStyle="#ff2200";
				break;
		}
		ctx.fillRect(x, y, this.tileSize[0],this.tileSize[1]);
	}

	drawLand(c, ctx, camera) {
		var drawX = camera.anchor[0] - (this.mapSize[0]/2);
		var drawY = camera.anchor[1] - (this.mapSize[1]/2);

		for (var y = 0; y < this.tiles.length; y++) {
			for (var x = 0; x < this.tiles[y].length; x++) {
				this.drawTile(ctx, drawX, drawY, this.tiles[y][x]);
				drawX += this.tileSize[0];
			}
			drawX = camera.anchor[0] - (this.mapSize[0]/2);
			drawY += this.tileSize[1];
		}
	}

	drawPlayers(c, ctx, camera, players) {
		var drawX = camera.anchor[0] - (this.mapSize[0]/2);
		var drawY = camera.anchor[1] - (this.mapSize[1]/2);

		for (let player of players) {
			ctx.fillStyle="#ee33ff";
			var playerX = drawX + (player.position[0] * this.tileSize[0]) + this.playerOffset[0],
			 		playerY = drawY + (player.position[1] * this.tileSize[1]) + this.playerOffset[1];
			ctx.fillRect(playerX, playerY, player.size[0], player.size[1]);
		}
	}

	draw(c, ctx, camera, players) {
		this.drawLand(c, ctx, camera)
		this.drawPlayers(c, ctx, camera, players)
		//this.drawUI(c, ctx)
	}
}


/**
CamJS Engine. Copyright 2016 Cameron Chalmers

@params "canvas": string reference to the name of the canvas on the page
@params "gamemode": string denoting the type of game mode to be played.
*/
class CamJS {
	constructor(canvas, gamemode) {
		console.log("CamJS starting...");
		this.c = document.getElementById(canvas);
		this.ctx = this.c.getContext("2d");
		//0 - mouse down, 1 - mouse up, 2 - mouse move
		this.mousePos = [{"x": -1, "y": -1}, {"x": -1, "y": -1}, {"x": -1, "y": -1}];
		this.players = [];
		this.camera = {
			"type": null,
			"anchor": [0, 0]
		};
		this.Key = this.createKeyObject();
		this.mode = this.getGameMode(gamemode);
		this.controls = null;
		console.log("CamJS loaded.");
	}

	/**
	createKeyObject will return a JSON object that is used to store information about key presses
	*/
	createKeyObject() {
		var rtn = {
			_pressed: {},
		  LEFT: 65,
		  UP: 87,
		  RIGHT: 68,
		  DOWN: 83,
		  isDown: function(keyCode) {
		    return this._pressed[keyCode];
		  }
		}
		return rtn;
	}

	/**
	set accepts settings and changes the game modes based on the user input

	@params "settings": a json object that holds information about the game settings
	*/
	set(settings) {
		this.camera.type = settings.camera;
		if (settings.camera == "follow") {
			let cameraX = this.c.width / 2;
			let cameraY = this.c.height / 2;
			this.camera.anchor = [cameraX, cameraY];
		} else if (settings.camera == "static") {
			let cameraX = 0;
			let cameraY = 0;
			this.camera.anchor = [cameraX, cameraY];
		}
	}

	/**
	getGameMode sets the camJS class game mode to whatever the user requests

	@params "mode": a string that holds information as to what type of game
	*/
	getGameMode(mode) {
		switch (mode) {
			case "tile":
				return new Tile();
			default:
				console.log("That game mode does not exist.");
				return null;
		}
	}

	addPlayer(player) {
		var plyr = this.mode.createPlayer(player);
		this.players.push(plyr);
	}

	//keyboard stuff
	keyUp(event) {
		delete this.Key._pressed[event.keyCode];
	}

	keyDown(event) {
		this.Key._pressed[event.keyCode] = true;
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
	run() {
		this.mode.engine(this.players);
		this.mode.draw(this.c, this.ctx, this.camera, this.players);
	}
}
