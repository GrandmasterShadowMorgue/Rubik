/*
 *
 *
 *
 */

var scene;

$(document).ready(function() {
	
	var canvas = $('#myveryowncanvas')[0];
	var context = new Context3D(canvas);

	var modelview  = mat4.create(); 
	var projection = mat4.create();

	var scene =  [new Entity(	{position: [0,0,-1],
								 rotation: [0,0,0],
								 acceleration: [0,0,0],
								 velocity: [0,0,0],
								 angular: [1,1,1],
								 mesh: new Mesh(context, shapes.cube(0.1))} )];
	
	window.scene = scene;

	context.loadShaders({vertex: "vertexshader.txt", pixel: "pixelshader.txt"}).then(function(context){
		var clock;
		requestAnimationFrame(function tock(time) {
			var dt = (time - (clock || time))/1000;
			clock = time;
			scene.map(function(entity){ entity.animate(dt);});
			context.clear(modelview, projection);       
			scene.map(function(entity){ entity.render(modelview, projection);});
			requestAnimationFrame(tock);       
		});
	});
});

