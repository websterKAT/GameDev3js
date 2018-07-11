function SoundController() {
    // create an AudioListener and add it to the camera
    var listener = new THREE.AudioListener();
    sceneManager.getCamera().add(listener);
  
    // create a global audio source
    var sound = new THREE.Audio( listener );
  
    // load a sound and set it as the Audio object's buffer
    var audioLoader = new THREE.AudioLoader();
  
  
    this.stopAudio = function(){
      sound.stop();
    }
  
    this.playMenuAudio = function(){
      audioLoader.load( './sounds/menuMusic.mp3', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop(true);
        sound.setVolume(0.5 );
        sound.play();
      });
    }
  
    this.playBallHitTheHadle = function(){
      var bounceSound = new THREE.Audio( listener );
      var bounceAudioLoader = new THREE.AudioLoader();
      bounceAudioLoader.load( './sounds/ballHitTheHandle.mp3', function( buffer ) {
        bounceSound.setBuffer( buffer );
        bounceSound.setLoop(false);
        bounceSound.setVolume(0.9);
        bounceSound.play();
      });
    }
  
    this.playBallWentOut = function(){
      var bounceSound = new THREE.Audio( listener );
      var bounceAudioLoader = new THREE.AudioLoader();
      bounceAudioLoader.load( './sounds/ballWentOut.mp3', function( buffer ) {
        bounceSound.setBuffer( buffer );
        bounceSound.setLoop(false);
        bounceSound.setVolume(0.9);
        bounceSound.play();
      });
    }

    this.playStartPowerups = function(){
        var bounceSound = new THREE.Audio( listener );
        var bounceAudioLoader = new THREE.AudioLoader();
        bounceAudioLoader.load( './sounds/hitOnPowerUps.mp3', function( buffer ) {
          bounceSound.setBuffer( buffer );
          bounceSound.setLoop(false);
          bounceSound.setVolume(0.9);
          bounceSound.play();
        });
    }
  
  }
  