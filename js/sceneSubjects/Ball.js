function Ball(scene,eventBus) {
	
	const AccelarationDown = 0.1;
	const AccelarationX = 0.1
	const pi = 3.14159;
	const radius = 0.2;
	const widthSegments = 8;
	const heightSegments = 8;
	const ball = new THREE.Mesh(new THREE.SphereGeometry( radius, widthSegments, heightSegments ), new THREE.MeshBasicMaterial( {color: 0xffff00} ));

  var linearVelocity = new THREE.Vector3(0,0,0);
	var angle=pi/3;
	var force=0.1;  //speed of the ball 

	ball.position.set(0, 0, -20);
	scene.add(ball);



  eventBus.subscribe("collisionDetect",function(args){
    if (isBallIntersectingObject(args[0])){
			//console.log(args[0].linearVelocity.x+'fuck');
			console.log('from colision detection'+args[1]);
      collide(args);
    }
  });

  eventBus.subscribe("startGame",function(object){
		console.log(Math);
    linearVelocity.y=force*THREE.Math.randInt(-1,1)*Math.sin(angle);
		linearVelocity.x=force*THREE.Math.randInt(-1,1)*Math.cos(angle);
		if(linearVelocity.y == 0){
				linearVelocity.y = 0.05;  
		}
		if(linearVelocity.x == 0){
			linearVelocity.x = 0.05;
		}
  });

  eventBus.subscribe("isBallLost",function(handle){
    if(handle.position.y >= ball.position.y){
      eventBus.post("ballLost");
    }
  });

  eventBus.subscribe("ballReset",function(object) {
   ball.position.y=0;
		ball.position.x=0;
    linearVelocity.y=0;
		linearVelocity.x=0;
  });

	this.update = function(time) {
    ball.position.y += linearVelocity.y;
		ball.position.x += linearVelocity.x;
	}


  function isBallIntersectingObject(object){

		var ball_Ymax=ball.position.y+radius;
		var ball_Ymin=ball.position.y-radius;
		var ball_Xmax=ball.position.x+radius;
		var ball_Xmin=ball.position.x-radius;

		var object_Ymax=object.position.y+(object.geometry.parameters.height)/2; //+object.geometry.parameters.depth;
		var object_Ymin=object.position.y-(object.geometry.parameters.height)/2; //+object.geometry.parameters.depth;
		var object_Xmax=object.position.x+(object.geometry.parameters.width)/2; //+object.geometry.parameters.depth;
		var object_Xmin=object.position.x-(object.geometry.parameters.width)/2; //+object.geometry.parameters.depth;

		//var vle = object.linearVelocity.x;
		//console.log('dfwqdwq'+vle); 	
	  if( ball_Xmin<=object_Xmax && ball_Xmin>=object_Xmin){
      if(ball_Ymin<=object_Ymax && ball_Ymin>=object_Ymin){
				console.log("1 1");
        return true;
      }else if(ball_Ymax>=object_Ymin && ball_Ymax<=object_Ymax){
				console.log("1 2");
				console.log(ball_Ymax);
				console.log(object_Ymin);
        return true;
      }
    }else if(ball_Xmax>=object_Xmin && ball_Xmin<=object_Xmax){
			if(ball_Ymin<=object_Ymax && ball_Ymin>=object_Ymin){
				console.log("2 1");
        return true;
      }else if(ball_Ymax>=object_Ymin && ball_Ymax<=object_Ymax){
				console.log("2 2");
        return true;
      }
		}
    return false;
  }

  function collide(args) {
		var type=args[1];
		if(type=="wall left"||type=="wall right") {
			linearVelocity.y*=1;
			linearVelocity.x*=-1;
		// } else if(type="handle"){
		// 	console.log('handle'+handle.linearVelocity.x);
		// 	console.log('handle'+handle.linearVelocity.y)
		// 	linearVelocity.x
		} 
		else {
			linearVelocity.y*=-1;
			linearVelocity.x*=1;
			if (type=="brick") {
				eventBus.post("damaged",args[2]);
			}
		}
  }
}
