// Globals

var WIDTH = 800;
var HEIGHT = 600;

// some of these numbers are voodoo numbers
var VIEW_ANGLE = 60;
var ASPECT = WIDTH / HEIGHT;
var NEAR = 0.1;
var FAR = 10000;

// Grab our container div(from cube example code)
var container = null; //document.getElementById("container");

var reqFrame = null;

var playerMesh = null;

var mainCamera = null;
var camXrot = 0;
var camYrot = 0;

// function called per loop to update the input
var updateInput = null;