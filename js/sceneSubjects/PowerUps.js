function PowerUps(scene, eventBus, brick) {

	const width = 1;
	const height = 1;
	const depth = 1;
	var mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), new THREE.MeshBasicMaterial({ color: 0x0000ff }));

	function makeRandomPosition() {
		const randomPosition = Math.random() * (8) + -4
		return randomPosition
	}

	mesh.position.set(makeRandomPosition(), makeRandomPosition(), -20);
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

	const RandomPowerUpType = generateRandomPowerUpType()
	var RandomPowerUp = generateRandomPowerUp()

	this.update = function (time) {
		eventBus.post("collisionDetect", [mesh, "P", generateRandomPowerUp(), RandomPowerUp]);
	}
	eventBus.subscribe("powerUpCollected", function (lives) {
		RandomPowerUp=generateRandomPowerUp()
		mesh.position.x=makeRandomPosition()
		mesh.position.y=makeRandomPosition()
	})




}

