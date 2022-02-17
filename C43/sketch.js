var canvas;
var player;
var obstacle, obstacleGroup;
var path;
var blade, bladeGroup;
var score;
var backgroundImg, back;
var life1, life2, life3;

function preload() {
  player_running = loadAnimation("./assets/1.png", "./assets/2.png", "./assets/3.png", "./assets/4.png",
    "./assets/5.png", "./assets/6.png", "./assets/7.png", "./assets/8.png");
  blade_Img = loadImage("./assets/ninja blade.png");
  backgroundImg = loadImage("./assets/destroyed city.jpg");
}

function setup() {
  canvas = createCanvas(windowWidth - 100, windowHeight - 100);

  player = createSprite(500, 472, 25, 25);
  player.addAnimation("running", player_running);

  path = createSprite(width / 2, 500, windowWidth * 3, 30);
  path.velocityX = 4;
  path.visible = false;

  back = createSprite(width / 2, height / 2);
  back.scale = 2.5;
  back.addImage(backgroundImg);

  life1 = createSprite(width-175,80,25,25);
  life1.shapecolor = "red";
  life2 = createSprite(width-125,80,25,25);
  life3 = createSprite(width-75,80,25,25);

  back.depth = player.depth;
  player.depth += 1;

  bladeGroup = new Group();
  obstacleGroup = new Group();

  score = 0;
}

function draw() {
  background(100);

  if (keyIsDown(LEFT_ARROW)) {
    player.position.x -= 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.position.x += 5;
  }
  if (keyDown("space") && player.position.y > 395) {
    player.position.y -= 20;
    player.position.x += 3;
  }
  if (keyWentDown("e")) {
    spawnBlade1();
  }

  bladeGroup.collide(obstacleGroup, (spA, spB)=>{
    spA.remove()
    spB.remove()
  })

  if(player.collide(obstacleGroup) && life1.visible == true && life2.visible == true && life3.visible == true){
    life3.visible = false;
    obstacleGroup.destroyEach();
  }


  player.position.y += 8;
  if (path.x < 0) {
    path.x = width / 2;
  }
  if (player.collide(obstacleGroup)) {
    player.position.x = 500;
    player.position.y = 472;
  }

  player.collide(path);
  obstacleGroup.collide(path);
  player.collide(obstacleGroup);
  obstacleGroup.collide(player);

  spawnObstacles();

  drawSprites();
  fill("white");
  textSize(25);
  text("Score :" + score, 67, 70);
  if (frameCount % 50 == 0) {
    score += 1;
  }
}

function spawnBlade1() {
  blade = createSprite(player.position.x, player.position.y);
  blade.addImage(blade_Img);
  blade.scale = 0.25;
  blade.lifetime = 80;
  blade.setVelocity(7, 0);
  bladeGroup.add(blade);
}
function spawnObstacles() {
  if (frameCount % 60 === 0) {
    obstacle = createSprite(1000, 475, 15, 15);
    obstacle.setVelocity(-5, 0);
    
    obstacleGroup.add(obstacle)
  }
}
