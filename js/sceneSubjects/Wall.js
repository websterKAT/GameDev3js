
//creating three walls for the mesh 
function WallSide(scene,eventBus,side) {
  var width = 0;
  var height = 0;
  var x=0;
  var y=1;
  if (side=="left") {
    width = 0.4;
    height = 12.4;
    x=-13.5;
  } else if (side=="right") {
    width = 0.4;
    height = 12.4;
    x=13.5;
  } else if (side=="top") {
    width = 25;
    height = 0.4;
    y=9;
  } else if(side=='bottom'){
    width=27.2;
    height=0.1;
    y=-5.2;
  }

  const depth = 0.1;    //width of the wall
  const meshColor = new THREE.MeshBasicMaterial( { color: 0xaa00ff } ); //walls color
	const mesh = new THREE.Mesh(new THREE.BoxGeometry( width, height, depth ),meshColor ); //creating walls
  //console.log("wall");
  //console.log(mesh);
	mesh.position.set(x, y, 0);
	scene.add(mesh);

	this.update = function(time) {
		eventBus.post("collisionDetect",[mesh,"wall "+side]);
	}
}

function Wall(scene,eventBus) {

	const mesh = new THREE.Mesh();

	mesh.position.set(0, 0, -20);
  
  //adding three walls for the wall 
  const wallSubjects = [
    new WallSide(mesh,eventBus,"left"),
    new WallSide(mesh,eventBus,"right"),
    new WallSide(mesh,eventBus,"top"),
    
  ];

  scene.add(mesh);
  this.update = function(time) {
    for(let i=0; i<wallSubjects.length; i++)
      wallSubjects[i].update(time);
	}
}
