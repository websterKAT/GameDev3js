function CloudMover(scene, eventBus) {

	var cloud = new THREE.Cloud(0xeeeeee);

	cloud.scale.set(3, 3, 3);
	cloud.position.set(0, 0, -20);
	cloud.rotation.set(Math.PI * 0.25, Math.PI * 0.5, 0);

	scene.add( cloud );

	this.update = function (time) {

	}
	// eventBus.subscribe("powerUpCollected", function (lives) {
	// 	RandomPowerUp = generateRandomPowerUp()
	// 	mesh.position.x = makeRandomPosition()
	// 	mesh.position.y = makeRandomPosition()
	// })




}

