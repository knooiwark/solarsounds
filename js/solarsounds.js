//------------------------------------------------------------------------------
// Description: Sonification experiment
// Created by: Geert Dijkstra (Knooiwark)
// Date: january 2020
//------------------------------------------------------------------------------

let sun;
let mercury;
let venus;
let earth;
let mars;
let jupiter;
let saturn;
let neptune;
let pluto;

let toneRunning = false;

let mercuryRunning = false;
let venusRunning = false
let earthRunning = false;
let marsRunning = false;
let jupiterRunning = false;
let saturnRunning = false;
let uranusRunning = false;
let neptuneRunning = false;
let plutoRunning = false;

let mercuryInit = false;
let venusInit = true;
let earthInit = true;
let marsInit = true;
let jupiterInit = true;
let saturnColorInit = true;
let uranusInit = true;
let neptuneInit = true;
let plutotInit = true;

let mercurySynth;
let venusSynth;
let eartSynth;
let marsSynth;
let jupiterSynth;
let saturnSynth;
let uranusSynth;
let neptuneSynth;
let plutoSynth;

let mercuryPattern;
let venusPattern;
let earthPattern;
let marsPattern;
let jupiterPattern;
let saturnPattern;
let uranusPattern;
let neptunePattern;
let plutoPattern;

let mercurySequence = [300, 340, 380, 420];
let venusSequence = ["E5", "F5" ];
let earthSequence = ["E4", "B4", "G4", "E4", "B4", "G3", "E4", "G4"];
let marsSequence = ["E3", "G3", "E4", "E3", "G3", "E4","B3", "G3", "E4", "G3", "A3", "C4",];
let jupiterSequence = ["E2"];
let saturnSequence = ["E2", "E3"];
let uranusSequence = ["E6"];
let neptuneSequence = ["E2","E3","E2","E3","E2","E3","E2","E3","C2","C3","C2","C3","C2","C3","C2","C3","A1","A2","A1","A2","A1","A2","A1","A2","F1","F2","F1","F2","F1","F2","F1","F2"];
let plutoSequence = [40];

let freeVerb;
let freeVerb2;
let limiter
let chorus
let stereo;

document.getElementById('mercury').addEventListener('click', function(){ mercury.setup("synth", "sine", 0.05, 0.2, 0.2, 0.5, "64n", "32n", mercurySequence, -25); updateButton("mercury"); }, false);
document.getElementById('venus').addEventListener('click', function(){ venus.setup("FM", "sine", 0.5, 0.5, 0.5, 0.5, "48n", "24n", venusSequence, -20 ); updateButton("venus"); }, false);
document.getElementById('earth').addEventListener('click', function(){ earth.setup("FM", "sine", 0.75, 0.2, 0.4, 0.8, "32n", "22n", earthSequence,  -20); updateButton("earth"); }, false);
document.getElementById('mars').addEventListener('click', function(){ mars.setup("FM", "sine", 0.5, 0.72, 0.5, 0.8, "8n", "14n", marsSequence, -35); updateButton("mars"); }, false);
document.getElementById('jupiter').addEventListener('click', function(){ jupiter.setup("FM", "sine", 0.75, 0.02, 0.4, 1., "8n", "12n", jupiterSequence, -30); updateButton("jupiter"); }, false);
document.getElementById('saturn').addEventListener('click', function(){ saturn.setup("FM", "square", 0.05, 0.02, 0.24, 1., "16n", "12n", saturnSequence, -25); updateButton("saturn"); }, false);
document.getElementById('uranus').addEventListener('click', function(){ uranus.setup("noise", "white", 0.005, 0.1, 0, 0, "32n", "16n", uranusSequence, -35); updateButton("uranus"); }, false);
document.getElementById('neptune').addEventListener('click', function(){ neptune.setup("synth", "triangle", 0.01, 0.4, 0.8, 0.2, "12n", "8n", neptuneSequence, -20); updateButton("neptune"); }, false);
document.getElementById('pluto').addEventListener('click', function(){ pluto.setup("membrane", "sine", 0.001, 0.4, 0.02, 0.05, "4n", "4n", plutoSequence, -10); updateButton("pluto"); }, false);

document.getElementById('sun').addEventListener('click', function() {sun.setup(); updateButton("sun")}, false );


function updateButton(planet){

  var color = planet + "-active";
  document.getElementById(planet).classList.toggle(color);
}

function setup(){

  // // Create a p5 canvas
  var cnv = createCanvas(500, 500);
  cnv.parent('canvas-container');

  // Planet colors
  let mercuryColor = "sandybrown";
  let venusColor = "pink"; //color(244, 187, 29);
  let earthColor = "cornflowerblue"; //color(109, 185, 231);
  let marsColor = "firebrick"; //color(221, 69, 48);
  let jupiterColor = "tan"; //color(104, 51, 21);
  let saturnColor = "orange"; //color(255, 219, 96);
  let uranusColor = "skyblue" //color(124, 189, 255);
  let neptuneColor = "slateblue"; //color(30, 60, 100);
  let plutoColor = "slategrey"; //color(107, 125, 135);

  sun = new Sun();
  mercury = new Planet(25, 8, mercuryColor);
  venus = new Planet(50, 16, venusColor);
  earth = new Planet(75, 25, earthColor);
  mars = new Planet(100, 30, marsColor);
  jupiter = new Planet(125, 40, jupiterColor);
  saturn = new Planet(150, 45, saturnColor);
  uranus = new Planet(175, 56, uranusColor);
  neptune = new Planet(200, 60, neptuneColor);
  pluto = new Planet(225, 70, plutoColor);



  freeVerb = new Tone.Freeverb().toMaster();

  freeVerb2 = new Tone.Freeverb().toMaster();
  compressor = new Tone.Compressor({
    "ratio" : 12,
    "threshold" : -24,
    "release" : 0.25,
    "attack" : 0.003,
    "knee" : 30
  }).connect(freeVerb2);

  setTempo();

}


function setTempo(){

    Tone.Transport.bpm.value = 124;
    //Tone.Transport.bpm.value = this.value;
}


function draw(){

  translate(width/2, height/2);

  angleMode(DEGREES);
  background(255);


  // sun & orbit circles
  noFill();
  stroke(175);
  ellipse(0, 0, 50);
  ellipse(0, 0, 100);
  ellipse(0, 0, 150);
  ellipse(0, 0, 200);
  ellipse(0, 0, 250);
  ellipse(0, 0, 300);
  ellipse(0, 0, 350);
  ellipse(0, 0, 400);
  ellipse(0, 0, 450);


  //stroke(200);

  sun.draw();
  mercury.draw();
  venus.draw();
  earth.draw();
  mars.draw();
  jupiter.draw();
  saturn.draw();
  uranus.draw();
  neptune.draw();
  pluto.draw();

}

class Cell{

 constructor(r){

  this.radius = 16;
  this.active = false;
  this.color;
  }

  draw(color){

    if (this.active){
      fill(color);
      ellipse(0, 0, this.radius);
    } else {
      fill(255);
      ellipse(0, 0, this.radius);
    }

    //fill(this.color);
    //ellipse(0, 0, this.radius);
  }
}

class Sun{

  constructor(){
    this.init = true;
    this.player;
    this.running = false;
    this.sampleLoaded = false;
    this.color = "gold";
    this.player = new Tone.Player("./sounds/sun.mp3").toMaster();
  }


  setup(){

    if (this.init){
      //this.player = new Tone.Player("./media/sounds/sun.mp3").toMaster();
      this.player.autostart = true;
      //this.player.start();
      this.init = false;
    }



    if (!this.running){
      this.running = true;
      this.player.start();
    }
    else {
      this.running = false;
      this.player.stop();
    }
  }

  draw(){

    if (this.running){
      fill (this.color);
      ellipse(0, 0, 25)
    } else {
      fill(255);
      ellipse(0, 0, 25);
    }
  }
}


class Planet{

  constructor(distance, length, color){

    this.distance = distance;
    this.length = length;
    this.color = color;
    this.cells = [];
    this.angle = 360 / this.length
    this.count = 0;

    //this.synth;
    this.type;
    this.wave;
    this.attack;
    this.decay;
    this.sustain;
    this.release;
    this.metrum;
    this.noteLength;
    this.sequence = [];
    this.pattern;
    this.part = [];
    this.volume;
    this.running = false;
    this.init = true;

    for (var i=0; i < this.length; i++){

      this.cells.push(new Cell());
    }
  }

  volume(){
    console.log(this.value);
    this.synth.volume.value = this.value;
  }

  setup(type, wave, a, d, s, r, noteLength, metrum, sequence, volume){

    if (this.init){

      this.init = false;
      this.type = type;
      this.wave = wave;
      this.attack = a;
      this.decay = d;
      this.sustain = s;
      this.release = r;
      this.noteLength = noteLength;
      this.metrum = metrum;
      this.sequence = sequence;
      this.volume = volume;

      if (this.type == "synth"){
        this.synth = new Tone.Synth({
          "oscillator": {
            "type": this.wave,
          },
          "envelope" : {
            "attack" : this.attack,
            "decay" : this.decay,
            "sustain": this.sustain,
            "release" : this.release
          },
        }).toMaster();
      }
      else if (this.type == "FM"){
        this.synth = new Tone.FMSynth({
          "harmonicity": 5,
          "modulationIndex": 15,
          "modulation": {
            "type": "sine"
          },
          "oscillator": {
            "type": this.wave,
          },
          "envelope" : {
            "attack" : this.attack,
            "decay" : this.decay,
            "sustain": this.sustain,
            "release" : this.release
          },
        }).connect(compressor);
      }
      else if (this.type == "membrane"){
        this.synth = new Tone.MembraneSynth({
          "pitchDecay": 0.075,
          "octaves": 4,
          "oscillator": {
            "type": this.wave,
          },
          "envelope" : {
            "attack" : this.attack,
            "decay" : this.decay,
            "sustain": this.sustain,
            "release" : this.release,
            "attackCurve": "exponential"
          },
        }).toMaster();
      }
      else if (this.type == "noise"){
        this.synth = new Tone.NoiseSynth().toMaster({
          "noise" : {
            "type" : this.type
          },
          "envelope" : {
            "attack" : this.attack,
            "decay" : this.decay,
            "sustain" : this.sustain,
            "release" : this.release
          }
        }).toMaster();
      }

      var that = this;

      this.pattern = new Tone.Pattern(function(time, note){

        if (that.type !="noise"){
          that.synth.triggerAttackRelease(note, that.noteLength, time);
        } else {
          that.synth.triggerAttackRelease(note, time);
        }
      }, this.sequence, "upDown");

      this.pattern.interval = this.metrum;
      this.synth.volume.value = this.volume;


      Tone.Transport.scheduleRepeat(function(time){

        if (that.running){

          if (that.count != 0){
            that.cells[that.count-1].active = false
          } else if (that.cells[that.cells.length - 1].active == true) {
            that.cells[that.cells.length - 1].active = false;
          }

          that.cells[that.count].active = true;
          that.count++;

          if(that.count == that.cells.length){
            that.count = 0;
          }
        }

      }, this.metrum );
  }


  if (!this.running){
      this.running = true;
      this.pattern.start(0);
      //this.part.start(0);
    } else {
      this.pattern.stop(0);
      //this.part.stop();
      this.running = false;
    }

  if (!toneRunning){
    Tone.Transport.start();
    // Tone.Transport.bpm.value = 120;
    toneRunning = true;
  }
}

  draw(){

    for (var i=0; i < this.cells.length; i++){

      push();
      rotate(this.angle * i);
      translate(this.distance, 0);
      this.cells[i].draw(this.color);
      pop();
    }
  }
}
