module.exports = function() {

  var sounds = [
    {name: "metal_plate"},
    {name: "metal_plate_2"},
    {name: "water_droplet_2"},
    {name: "water_droplet_3"}
  ];

  start();

  return {
    start: start,
    stop: stop,
    archive: archive,
    deleteCase: deleteCase,
    deleteFile: deleteFile,
    extract: extract
  };


  function start() {
    ion.sound({
      sounds: sounds,
      path: "node_modules/ion-sound/sounds/",
      preload: true,
      volume: 1.0
    });
  }

  function stop() {
    sounds.forEach(sound=>ion.sound.destroy(sound.name));
  }

  function archive() {
    ion.sound.play("water_droplet_2");
  }

  function deleteCase() {
    ion.sound.play("metal_plate_2");
  }

  function deleteFile() {
    ion.sound.play("metal_plate");
  }

  function extract() {
    ion.sound.play("water_droplet_3");
  }
}