function PowerUps(scene, eventBus) {

	const width = 1;
	const height = 1;
	const depth = 0.1;
	var mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), new THREE.MeshBasicMaterial({ color: 0x0000ff }));

	function makeRandomPosition_x() {
		const randomPosition = Math.random() * (24) + -12
		return randomPosition
	}
	
	function makeRandomPosition_y() {
		const randomPosition = Math.random() * (10) + -4
		return randomPosition
	}


	mesh.position.set(makeRandomPosition_x(), makeRandomPosition_y(), -20);
	scene.add(mesh);

	function generateRandomPowerUpType() {
		const RandomPowerUpType = Math.floor(Math.random() * 3)
		console.log("RandomPowerUpType" + RandomPowerUpType)
		return RandomPowerUpType
	}

	function generateRandomPowerUp() {
		const RandomPowerUp = Math.floor(Math.random() * 2)
		console.log("RandomPowerUp" + RandomPowerUp)
		return RandomPowerUp
	}

	var  RandomPowerUpType = generateRandomPowerUpType()
	var RandomPowerUp = generateRandomPowerUp()

	this.update = function (time) {
		eventBus.post("collisionDetect", [mesh, "P", RandomPowerUpType, RandomPowerUp]);
	}
	
	eventBus.subscribe("powerUpCollected", function (lives) {
		RandomPowerUpType=generateRandomPowerUpType()
		RandomPowerUp=generateRandomPowerUp()
		mesh.position.x=makeRandomPosition_x()
		mesh.position.y=makeRandomPosition_y()
	})




}

