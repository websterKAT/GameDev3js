function Ball(scene, eventBus) {
	const maxSpeedChange = 0
	const AccelarationDown = 0.1;
	const AccelarationX = 0.1
	const pi = 3.14159;
	const radius = 0.2;
	const widthSegments = 8;
	const heightSegments = 8;
	const ball = new THREE.Mesh(new THREE.SphereGeometry(radius, widthSegments, heightSegments), new THREE.MeshBasicMaterial({ color: 0xffff00 }));
	const maxBounceAngle = pi / 3
	var linearVelocity = new THREE.Vector3(0, 0, 0);
	var angle = pi / 3;
	var force = 0.2;  //speed of the ball 
	const speedMultiplier = 1.2
	var count = 0;
	var duration = 4;
	var isPoweredUp = false;
	var scale = 1;
	var isBlinking = false;
	var g_x = 0;
	var g_y = 0;
	const g = 0.002;
	var clock = new THREE.Clock();
	var timeElapsed = 0

	var geometry = new THREE.CircleBufferGeometry(0.5, 10);
	var material = new THREE.MeshBasicMaterial({ color: 0xff4081 });
	var powerupIcon = new THREE.Mesh(geometry, material);

	ball.position.set(0, 0, -20);
	scene.add(ball);

	var handle = "";
	var handle2 = "";

	eventBus.subscribe("playerAngle", function (args) {
		handle = args
	});


	eventBus.subscribe("collisionDetect", function (args) {
		if (isBallIntersectingObject(args)) {
			console.log('from colision detection' + args[1]);
			collide(args);
		}
	});


	eventBus.subscribe("startGame", function (object) {
		//soundController.playMenuAudio();	
		linearVelocity.y = force * THREE.Math.randInt(-1, 1) * Math.sin(angle);
		linearVelocity.x = force * THREE.Math.randInt(-1, 1) * Math.cos(angle);
		if (linearVelocity.y == 0) {
			linearVelocity.y = 0.05;
		}
		if (linearVelocity.x == 0) {
			linearVelocity.x = 0.05;
		}
	});

	eventBus.subscribe("isBallLost", function (handle) {

		handleType = handle[1]
		handle = handle[0]
		if (handleType == 1) {
			if (handle.position.y >= ball.position.y) {
				soundController.playBallWentOut();
				eventBus.post("ballLost");
        document.getElementById("powerimage").src = "images/calm.gif";
        clearEffects();
			}
		}
		if (handleType == 2) {
			if (handle.position.y <= ball.position.y) {
				soundController.playBallWentOut();
				eventBus.post("ballLost");
        document.getElementById("powerimage").src = "images/calm.gif";
        clearEffects();
			}

		}
	});

	eventBus.subscribe("ballReset", function (object) {
		ball.position.y = 0;
		ball.position.x = 0;
		linearVelocity.y = 0;
		linearVelocity.x = 0;
		scene.remove(powerupIcon);
		document.getElementById("powerimage").src = "images/calm.gif";
		clearEffects();
	});

	this.update = function (time) {
		ball.position.y += linearVelocity.y;
		ball.position.x += linearVelocity.x;
		linearVelocity.x = linearVelocity.x + g_x;
		//linearVelocity.y=linearVelocity.y+g_y;

		if (isBlinking) {
			timeElapsed += clock.getDelta()
			if (timeElapsed < 0.5) {
				ball.position.z = -20;
			}
			else if (timeElapsed > 0.5 && timeElapsed < 1) {
				ball.position.z = 20;
			}
			else {
				timeElapsed = 0
			}

		}
	}


	function isBallIntersectingObject(Obj) {

		var ball_Ymax = ball.position.y + radius;
		var ball_Ymin = ball.position.y - radius;
		var ball_Xmax = ball.position.x + radius;
		var ball_Xmin = ball.position.x - radius;
		var localScale = 1
		if (Obj[1] == "handle" || Obj[1] == "handle2") {
			localScale = scale
		}
		const object = Obj[0]
		var object_Ymax = object.position.y + (object.geometry.parameters.height) * localScale / 2; //+object.geometry.parameters.depth;
		var object_Ymin = object.position.y - (object.geometry.parameters.height) * localScale / 2; //+object.geometry.parameters.depth;
		var object_Xmax = object.position.x + (object.geometry.parameters.width) * localScale / 2; //+object.geometry.parameters.depth;
		var object_Xmin = object.position.x - (object.geometry.parameters.width) * localScale / 2; //+object.geometry.parameters.depth;

		//var vle = object.linearVelocity.x;
		//console.log('dfwqdwq'+vle); 	
		if (ball_Xmin <= object_Xmax && ball_Xmin >= object_Xmin) {
			if (ball_Ymin <= object_Ymax && ball_Ymin >= object_Ymin) {
				console.log("1 1");
				return true;
			} else if (ball_Ymax >= object_Ymin && ball_Ymax <= object_Ymax) {
				console.log("1 2");
				// console.log(ball_Ymax);
				// console.log(object_Ymin);
				return true;
			}
		} else if (ball_Xmax >= object_Xmin && ball_Xmin <= object_Xmax) {
			if (ball_Ymin <= object_Ymax && ball_Ymin >= object_Ymin) {
				console.log("2 1");
				return true;
			} else if (ball_Ymax >= object_Ymin && ball_Ymax <= object_Ymax) {
				console.log("2 2");
				return true;
			}
		}
		return false;
	}
	function clearEffects() {
		document.getElementById("powerimage").src = "images/calm.gif";
		$("#currentpowerup").text("Normal");
		//scene.remove(powerupIcon);
		force = 0.1
		count = 0
		g_x = 0
		g_y = 0
		isBlinking = false
		ball.position.z = -20;
		eventBus.post("handleNormal", function (handle) {
			console.log("handleNormal");
		});
		scale = 1
	}



	function collide(args) {
		soundController.playBallHitTheHadle();
		var type = args[1];
		console.log("type : " + type)
		if (type == "P") {
			clearEffects()
			console.log("power Up Collided")
			soundController.playStartPowerups();
			if (args[2] == 0) {
				if (args[3] == 0) {

					count = 0;
					duration = 5;
					force = force*2;
					document.getElementById("powerimage").src = "images/fastball.gif";
					

				}
				else if (args[3] == 1) {
				//	$("#currentpowerup").text("Ball Slow ")
					// console.log("slow")

					count = 0;
					duration = 3;
					force = force*0.5;
					document.getElementById("powerimage").src= "images/slowball.gif";
					

				}
			}

			else if (args[2] == 1) {
				
				// console.log("power regarding handle")
				if (args[3] == 0) {
					count = 0
					duration = 5
					eventBus.post("handleShort", function (handle) {
						console.log("handleShort");
					});
					scale = 0.5;
					document.getElementById("powerimage").src = "images/shorthandle.gif";
					
				}
				else if (args[3] == 1) {
				
					count = 0
					duration = 5
					eventBus.post("handleLong", function (handle) {
						console.log("handleLong");
					});
					scale = 2;
				//	$("#currentpowerup").text("Haddle Long")
					document.getElementById("powerimage").src = "images/longhandle.gif";
					

				}

			}

			else if (args[2] == 2) {
			
				// console.log("environment")
				if (args[3] == 0) {
					console.log("wind")
					count = 0
					duration = 5
					var randomAngle = Math.random() * 2 * pi
					g_x = g * Math.cos(randomAngle)
					//g_y=g*0.5*Math.sin(randomAngle)
					//$("#currentpowerup").text("Wind")
					document.getElementById("powerimage").src = "images/wind.gif";
					
				}
				else if (args[3] == 1) {
					count = 0
					isBlinking = true
					duration = 5
					//$("#currentpowerup").text("Blinking")
					document.getElementById("powerimage").src = "images/blind.gif";
					
				}

			}
			isPoweredUp = true;
			eventBus.post("powerUpCollected", function (handle) {
				console.log(changeLocation);
			});
		}

		else if (type == "wall left" || type == "wall right") {
			linearVelocity.y *= 1;
			linearVelocity.x *= -1;

		}
		else if (type == "handle") {
			
			//scene.add(clock);	
			if (isPoweredUp) {
				count++
				if (count >= duration) {
					isPoweredUp = false
					console.log("powerUp Downed")
					clearEffects()
				}
			}

			const bounceArea = (handle.position.x - ball.position.x) / (handle.geometry.parameters.width * scale / 2)
			const bounceAngle = bounceArea * maxBounceAngle
			const extraForce = Math.abs(bounceArea) * maxSpeedChange
			linearVelocity.y = (force) * Math.exp(extraForce) * Math.cos(bounceAngle);
			linearVelocity.x = -(force) * Math.exp(extraForce) * Math.sin(bounceAngle);
		}

		else if (type == "handle2") {
			powerupIcon.position.set(8, -6.5, -20);
			scene.add(powerupIcon);
			//scene.add(clock);	
			if (isPoweredUp) {
				count++
				if (count >= duration) {
					isPoweredUp = false
					console.log("powerUp Downed")
					clearEffects()
				}
			}

			const bounceArea = (handle.position.x - ball.position.x) / (handle.geometry.parameters.width * scale / 2)
			const bounceAngle = bounceArea * maxBounceAngle
			const extraForce = Math.abs(bounceArea) * maxSpeedChange
			linearVelocity.y = -(force) * Math.exp(extraForce) * Math.cos(bounceAngle);
			linearVelocity.x = -(force) * Math.exp(extraForce) * Math.sin(bounceAngle);
		}

		else {
			linearVelocity.y *= -1;
			linearVelocity.x *= 1;
		}

	}
}
