function Player2Controller(eventBus, clock) {

    const keyboard = new THREEx.KeyboardState();
    var lastKeyStroke = "nothing"
  
    const accelrator = 2;
    var moveSpeed = 0.1;
  
    var lives = 3;
    var bricks = 2;
    var score = 1;
    var timeBonus = 1000 * bricks;
    
    var leftKey = "a";
    var rightKey = "d";
  
   
  
    var limit_Xmin = -12.5 + 1.4;
    var limit_Xmax = 12.5 - 1.4;
  
    this.getLives = function () {
      return lives;
    }
  
    this.getBricks = function () {
      return bricks;
    }
    var c = new THREE.Clock();
  
  
   
  
  
    this.keyPressed = function (player) {
      
      if (keyboard.pressed(leftKey)) {
        moveLeft(player);
      } 
  
      else if (keyboard.pressed(rightKey)) {
        moveRight(player);
      } 
  
    //   else if (keyboard.pressed('enter')) {
    //     eventBus.post("startGame");
    //   }
    }
  
    eventBus.subscribe("keyboardControls", function (args) {
      leftKey = "a";
      rightKey = "d";
    });
  
    // eventBus.subscribe("gameControls", function (args) {
    //   lives = args[0];
    //   bricks = args[1];
    //   moveSpeed = args[2];
    //   //eventBus.post("removeAllLives");
    //   //eventBus.post("lives", lives);
    //  // eventBus.post("removeAllBricks");
    //  // eventBus.post("bricks", bricks);
    // });
  
    eventBus.subscribe("ballLost", function () {
        eventBus.post("ballReset");
    });
  
    // eventBus.subscribe("brickDamaged", function () {
    //   bricks--;
    //   score += Math.floor(timeBonus - clock.getElapsedTime()) + lives;
    //   eventBus.post("scoreChange", score);
    //   if (bricks == 0) {
    //     eventBus.post("win", score);
    //     eventBus.post("ballReset");
    //   }
  
    // })
  
    // this.startGame = function () {
    //   if (keyboard.pressed('enter')) {
    //     eventBus.post("startGame");
    //   }
    // }
  
    function moveLeft(player) {
      if (limit_Xmin < player.position.x) {
        player.position.x = player.position.x - moveSpeed * accelrator;
      }
    }
  
    function moveRight(player) {
      if (limit_Xmax > player.position.x) {
        player.position.x = player.position.x + moveSpeed * accelrator;
        //player.position.x += parseFloat(moveSpeed);
      }
    }
  
    // function moveUp(player) {
    //   player.position.y += moveSpeed;
    // }
  
    // function moveDown(player) {
    //   player.position.y -= moveSpeed;
    // }
  
  }
  