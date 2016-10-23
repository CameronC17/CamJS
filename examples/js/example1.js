var animFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame    || window.oRequestAnimationFrame      || window.msRequestAnimationFrame     || null ;

window.addEventListener('mousedown', mouseDown, false);
window.addEventListener('mouseup', mouseUp, false);
window.addEventListener('mousemove', mouseMove, false);

//create a new instance of camJS, using the tile game mode
var game = new CamJS("canvas", "tile");

game.type.set({
	"tileSize" : {"width": 40, "height": 40},
	""

})



//now the animation part
var recursiveAnim = function() {
          game.draw();
          animFrame(recursiveAnim);
    };
animFrame(recursiveAnim);

// MouseDown
function mouseDown(e) {
  game.mouseDown(e);
}
// MouseUp
function mouseUp(e) {
  game.mouseUp(e);
}
// MouseMove
function mouseMove(e) {
  game.mouseMove(e);
}
