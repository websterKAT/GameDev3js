function Handle2(scene,eventBus) {

	const width = 2;
	const height = 0.4;
	const depth = 0.1;
	const mesh = new THREE.Mesh(new THREE.BoxGeometry( width, height, depth ), new THREE.MeshBasicMaterial( { color: 0x00ff00 } ));
	
	mesh.position.set(0, 6			, -20);
	// mesh.linearVelocity.x=0;
	// mesh.linearVelocity.y=0;
	scene.add(mesh);
	this.update = function(time) {
		eventBus.post("playerAngle",mesh)
		eventBus.post("keyboard2",mesh);
		eventBus.post("collisionDetect",[mesh,"handle2"]);
		eventBus.post("isBallLost",[mesh,"2"]);
	}

	eventBus.subscribe("handleLong", function (lives) {
		mesh.scale.x=2
	})
	
	eventBus.subscribe("handleShort", function (lives) {
		mesh.scale.x=0.5

	})
	eventBus.subscribe("handleNormal", function (lives) {
		mesh.scale.x=1

	})



}
