var animFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame    || window.oRequestAnimationFrame      || window.msRequestAnimationFrame     || null ;

//create a new instance of camJS, using the tile game mode
var game = new CamJS("canvas", "tile");

//mouse listeners
window.addEventListener('mousedown', function(event) { game.mouseDown(event); }, false);
window.addEventListener('mouseup', function(event) { game.mouseUp(event); }, false);
window.addEventListener('mousemove', function(event) { game.mouseMove(event); }, false);

//key listeners
window.addEventListener('keyup', function(event) { game.keyUp(event); }, false);
window.addEventListener('keydown', function(event) { game.keyDown(event); }, false);

game.set({
	"camera": "follow",
	"controls": "wasd"
})

game.addPlayer({
	"name": "Cameron",
	"position": [3, 5],
	"size": [30, 60]
})

game.mode.set({
	"tiles": 	[ ["1","2","3","4","5","6","7"],
							["2","3","6","7","4","2","1"],
							["4","5","1","2","3","5","1"],
						  ["3","2","5","3","7","5","6"],
						  ["6","2","3","7","2","3","4"]  ],
	"tileSize": [50, 50],
	"playerOffset": [10, -70],
	"moveLimit": 100
});


//now the animation part
var recursiveAnim = function() {
          game.run();
          animFrame(recursiveAnim);
    };
animFrame(recursiveAnim);
