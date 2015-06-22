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
function createAnimator(tick, render) {

	//
	// NOTE: Animate should not be called directly (invoke it via requestAnimationFrame)
	var clock = undefined;

	function animate(time) {
		// TODO: Move scene updates to separate function (âœ“)
		var dt = (time-(clock || time))*0.001; // Time delta (seconds)
		tick(dt);                              //
		render();                              //
		requestAnimationFrame(animate);        // Schedule the next frame
		clock = time;                          // 
	}

	return animate;

}



function createRenderer(context, scene, modelviewMatrix, projectionMatrix) {

	//

	var render = function(time) {

		// 
		console.log('Rendering...');
		context.clear(modelviewMatrix, projectionMatrix); // Clear the frame and reset matrices

		scene.map(function(object) { object.mesh.render(modelviewMatrix, projectionMatrix); }); // Draw stuff

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