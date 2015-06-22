/*
 *
 *
 *
 */



$(document).ready(function() {
	console.log("Guten tag");
	var canvas = $("#myveryowncanvas")[0];
	var context = new Context3D(canvas);

	var modelview  = mat4.create(); //
	var projection = mat4.create(); //

	var cube = new Mesh(context, shapes.cube(0.35), [0, 0, -0.14], [0, 12, 0]);

	scene = [cube];

	context.loadShaders({ vertex: 'vertexshader.txt', pixel: 'pixelshader.txt' }).then(function(context) { createRenderer(context, scene, modelview, projection)(); });
});

function createRenderer(context, scene, modelviewMatrix, projectionMatrix) {

	//
	var frame = 0;

	var render = function() {

		// 
		console.log('Rendering...');
		frame++;
		context.clear(modelviewMatrix, projectionMatrix); // Clear the frame and reset matrices

		/* Draw stuff */
		scene.map(function(object) { object.mesh.render(modelviewMatrix, projectionMatrix); });;

		/* Schedule the next frame */
		requestAnimationFrame(render); // TODO: Move this statement

	};

	return render;

};
/*function createContext (canvas) {
	var gl;
	try {
		gl = canvas.getContext("experimental-webgl");
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
		console.log("3d context created successfully!");
		return gl;
	} catch (e) {
		if(!gl) {
			console.error("Failed to create 3d context");
		}
	}
}*/