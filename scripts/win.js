"use strict";
var fireworks = [];
var gravity;
let button = undefined;
function wininit() {
  mouseClicked = wmouseClicked;
  createCanvas(canvasSize, canvasSize);

  stroke(255);
  strokeWeight(4);
  colorMode(HSL);
  gravity = createVector(0, 0.1);

  fireworks.push(new Firework());
}
function wmouseClicked() {
  window.location.reload();
}
function windraw() {
  fill('white');
  text('Click để chơi lại', 400, 700);
  colorMode(RGB);
  background(0, 25);
  if (random(1) < 0.1) {
    fireworks.push(new Firework());
  }

  for (var i = fireworks.length - 1; i >= 0; i--) {
    //var f = fireworks[i];

    fireworks[i].update();
    fireworks[i].show();

    if (fireworks[i].done()) {
      fireworks.splice(i, 1);

    }
  }
}

function Particle(x, y, h, exploding) {
  this.h = h;
  this.loc = createVector(x, y);
  this.lifespan = 255;
  this.exploding = exploding;
  this.acc = createVector(0, 0);

  if (this.exploding) {
    this.vel = createVector(0, random(-11, - 6));
  } else {
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(2, 10));
  }

  this.update = function () {
    if (!this.exploding) {
      this.vel.mult(0.9);
      this.lifespan -= 4;
    }
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.acc.mult(0);
  }

  this.applyForce = function (force) {
    this.acc.add(force);
  }

  this.show = function () {
    colorMode(HSL);
    if (!this.exploding) {
      strokeWeight(2);
      stroke(this.h, 100, 50, this.lifespan);
    } else {
      strokeWeight(2);
      stroke(this.h, 100, 50);
    }
    point(this.loc.x, this.loc.y);
  }

  this.done = function () {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }
}
function Firework() {
  this.h = random(360);
  this.firework = new Particle(random(width), height, this.h, true);
  this.exploded = false;
  this.particles = [];

  this.update = function () {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();

      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }
    //we have to add i> or = 0, otherwise the last firework won't explode
    for (var i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }

  this.done = function () {
    if (this.exploded && this.particles.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  this.explode = function () {
    for (var i = 0; i < 100; i++) {

      //var x = 16 * pow(sin(i),3);
      //var y = 13 * cos(i)-5*cos(2*i)-2*cos(3*i)-cos(4*i);
      var p = new Particle(this.firework.loc.x, this.firework.loc.y, this.h, false);
      this.particles.push(p);
    }
  }

  this.show = function () {
    if (!this.exploded) {
      this.firework.show();
    }
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  }
}
