var bg,bg_img;
var shooter,shooter_shootingimg,shooter_img;
var zombies,zombies_img;
var heart1,heart2,heart3,heart_img1,heart_img2,heart_img3;
var bullets = 70;
var gameState = "fight";
var win_sound;
var bullets_sound;
var lose_sound;
var lives = 3;
var score = 0;
var gun,gun_img;

 
function preload() {
  bg_img = loadImage("assets/bg.jpeg");
  shooter_shootingimg = loadImage("assets/shooter_3.png");
  shooter_img = loadImage("assets/shooter_2.png");
  heart_img1 = loadImage("assets/heart_1.png");
  heart_img2 = loadImage("assets/heart_2.png");
  heart_img3 = loadImage("assets/heart_3.png");
  zombies_img = loadImage("assets/zombie.png");
  win_sound = loadSound("assets/win.mp3");
  lose_sound = loadSound("assets/lose.mp3");
  bullets_sound = loadSound("assets/explosion.mp3");
  gun_img = loadImage("assets/Firing2.png");


}

function setup() {
  createCanvas(windowWidth,windowHeight);
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
  bg.addImage(bg_img);
  bg.scale = 1.1;
  shooter = createSprite(displayWidth-1150,displayHeight-300,50,50);
  shooter.addImage(shooter_img);
  shooter.scale = 0.3;

  gun = createSprite(displayWidth-1150,displayHeight-500,50,50);
  


  heart1 = createSprite(displayWidth-150,40,20,20);
  heart1.visible = false 
  heart1.addImage(heart_img1);
  heart1.scale = 0.4;

  heart2 = createSprite(displayWidth-100,40,20,20);
  heart2.visible = false 
  heart2.addImage(heart_img2);
  heart2.scale = 0.4;

  heart3 = createSprite(displayWidth-150,40,20,20);
  heart3.visible = true 
  heart3.addImage(heart_img3);
  heart3.scale = 0.4;

  zombieGroup = new Group()
  bulletsGroup = new Group();


  shooter.debug= true;
  shooter.setCollider("rectangle",0,0,300,300);
}

function draw() {
  background(0)
  if(gameState === "fight"){
    if(lives === 3){
      heart3.visible =  true;
      heart2.visible = false;
      heart1.visible = false;
    }
    if(lives === 2){
      heart3.visible =  false;
      heart2.visible = true;
      heart1.visible = false;
    }
    if(lives === 1){
      heart3.visible =  false;
      heart2.visible = false;
      heart1.visible = true;
    }
    if(score === 100){
      gameState = "won";
      win_sound.play();
    }
    if(lives === 0){
      gameState = "lost";
    }

    if(keyDown("DOWN_ARROW")|| touches.length > 0){
      shooter.y+=30
    }
    
    if(keyDown("UP_ARROW")|| touches.length > 0){
      shooter.y-=30
    }
    
    if(keyWentDown("SPACE")){
      shooter.addImage(shooter_shootingimg);
      var bullet = createSprite(displayWidth-1150,shooter.y-30,20,10);
      bullet.velocityX = 20;
      bulletsGroup.add(bullet);
      bullets -= 1; 
      bullets_sound.play();
    }

    else if (keyWentUp("SPACE")){
      shooter.addImage(shooter_img);
    }
    if(keyWentDown("F")){
      gun.addImage(gun_img);
      var bullet = createSprite(displayWidth-1099,gun.y-3,20,10);
      bullet.velocityX = 20;
      bulletsGroup.add(bullet);
      bullets -= 1; 
      bullets_sound.play();
      

    }
    else if(keyWentDown("F")){
      gun.addImage(gun_img);
    }

  
    if(keyDown("RIGHT_ARROW")){
      shooter.x+=30;
    }
  
    if(keyDown("LEFT_ARROW")){
      shooter.x-=30;
    }

    if(keyDown("DOWN_ARROW")|| touches.length > 0){
      gun.y+=30
    }
    
    if(keyDown("UP_ARROW")|| touches.length > 0){
      gun.y-=30
    }
    
    
    if(zombieGroup.isTouching(shooter)){
      for(var i = 0; i < zombieGroup.length;i++){
        if(zombieGroup[i].isTouching(shooter)){
          zombieGroup[i].destroy();
          lives -= 1;
        }
      }
      lose_sound.play();
    }
  
    if(zombieGroup.isTouching(bulletsGroup)){
      for(var i = 0; i < zombieGroup.length;i++){
        if(zombieGroup[i].isTouching(bulletsGroup)){
          zombieGroup[i].destroy();
          bulletsGroup.destroyEach();
        score += 2;
        }
      }
      bullets_sound.play();
    }
    if(bullets === 0){
      gameState = "bullets";
      lose_sound.play();
    }
    enemy(); 
  }
  drawSprites();
  if(gameState === "lost"){
    console.log("in lost");
    textSize(100);
    fill("red");
    text("YOU LOST",400,400);
    zombieGroup.destroyEach();
    shooter.destroy();
  }
  else if( gameState === "won"){
  textSize(100);
  fill("yellow");
  text("YOU WON",400,400);
  zombieGroup.destroyEach();
  shooter.destroy();
  }
  else if(gameState === "bullets"){
    textSize(100);
    fill("blue");
  text("NO MORE BULLETS",400,400);
  zombieGroup.destroyEach();
  shooter.destroy();
  }
  

  textSize(20);
  fill("white");
  text("BULLETS = "+bullets,displayWidth-210,displayHeight/2 - 250);
  text("SCORE = "+score,displayWidth-200,displayHeight/2- 200);
  text("lives = "+lives,displayWidth-200,displayHeight/2 - 280);
}

function enemy() {
  if(frameCount%50 === 0){
    zombies = createSprite(random(500,1100),random(100,500),40,40);
    zombies.addImage(zombies_img);
    zombies.scale = 0.15,
    zombies.velocityX = -3;
    zombies.debug = true;
    zombies.setCollider("rectangle",0,0,400,400);
    zombies.lifetime = 400;
    zombieGroup.add(zombies);
  }
}