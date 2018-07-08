function PlayerController(eventBus,clock) {
  
  const keyboard	= new THREEx.KeyboardState();

  const accelrator = 1.5;
  var moveSpeed = 0.1;

  var lives = 3;
  var bricks = 2;
  var score = 1;
  var timeBonus = 1000*bricks;
  var leftKey="left";
  var rightKey="right";
  var limit_Xmin=-13.6+1.4;
  var limit_Xmax=13.6-1.4;
  
  this.getLives = function() {
    return lives;
  }
  
  this.getBricks = function() {
    return bricks;
  }
  //var c = new THREE.Clock();
  //c.getDelta();
  // var updateFrame = function() {
  //   var c = new THREE.Clock();
  //   c.getDelta();
  //   deltaTime = c.getDelta();
  //   console.log(deltaTime+'deltatime');
  //   moveSpeed += accelrator*deltaTime;
  //   console.log('from move speed'+moveSpeed);

  // }
  
  //  var epdat = this.update = function(time) {
  //   console.log('this is calling');
  //   moveSpeed += 0.0001;
  //   //console.log(time.mi);
	// }
  

  this.keyPressed = function(player){
    
    //updateFrame();
		if( keyboard.pressed(leftKey) ){
      //moveSpeed = 0.01;
      //epdat();
			moveLeft(player);
		}else if(keyboard.pressed(rightKey)){
      //moveSpeed = 0.01;
      //epdat();
			moveRight(player);
		} else if( keyboard.pressed('enter')){
			eventBus.post("startGame");
		}
	}

  eventBus.subscribe("keyboardControls",function(args){
    leftKey=args[0];
    rightKey=args[1];
  });

  eventBus.subscribe("gameControls",function(args) {
    lives=args[0];
    bricks=args[1];
    moveSpeed=args[2];
    eventBus.post("removeAllLives");
    eventBus.post("lives",lives);
    eventBus.post("removeAllBricks");
    eventBus.post("bricks",bricks);
  });

  eventBus.subscribe("ballLost",function() {
    lives--;
    if (lives==0) {
      eventBus.post("lost");
    }
    eventBus.post("removeLife",lives);
    eventBus.post("ballReset");
  });

  eventBus.subscribe("brickDamaged",function(){
    bricks--;
    score+=Math.floor(timeBonus-clock.getElapsedTime())+lives;
    eventBus.post("scoreChange",score);
    if (bricks==0) {
      eventBus.post("win",score);
      eventBus.post("ballReset");
    }

  })

  this.startGame = function(){
    if( keyboard.pressed('enter') ){
			eventBus.post("startGame");
		}
  }

  function moveLeft(player) {
    if (limit_Xmin<player.position.x) {
      player.position.x = player.position.x - moveSpeed*accelrator;
    }
  }

  function moveRight(player) {
    if (limit_Xmax>player.position.x) {
      player.position.x = player.position.x + moveSpeed*accelrator;
      //player.position.x += parseFloat(moveSpeed);
    }
  }

  function moveUp(player) {
    player.position.y += moveSpeed;
  }

  function moveDown(player) {
    player.position.y -= moveSpeed;
  }

}
