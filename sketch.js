var heart1,heart2,player,player1_img,computer,player1ducked_img,player1ducked,ground,playerAxe,computerAxe;
var bg,Img;
var edges;
var fplayer1,fplayer2;
var trident1,trident_img,trident2,trident2_img;
var flag,flag1;
var axe;
var heart8,heart7,heart6,heart5,heart4,heart3,heart2,heart1;
var h1,h2;
var hearts,hearts2;
var base,img;
var upButton,downButton,lestButton,rightButton,upImg,downImg,leftImg,rightImg
var gameState,backgroundImg;
function preload(){
  bg=loadImage("photos/background.png");
  player1_img=loadImage("photos/1noweapons1.png");
  playerAxeUpImg=loadImage("photos/weapon2.png");
  player2_img=loadImage("photos/2noweapon.png");
  playerAxeDownImg=loadImage("photos/weapon22.png");
  fplayer1=loadImage("photos/1noweapons.png");
  fplayer2=loadImage("photos/2noweapon2.png");
  playerTridentImg=loadImage("photos/trident2.png");
  computerTridentImg=loadImage("photos/trident.png");
  weapon12_img=loadImage("photos/weapon22.png")
  weapon22_img=loadImage("photos/weapon12.png")
  heart8=loadImage("photos/heart8.png");
  heart7=loadImage("photos/heart7.png")
  heart6=loadImage("photos/heart6.png")
  heart5=loadImage("photos/heart5.png")
  heart4=loadImage("photos/heart4.png")
  heart3=loadImage("photos/heart3.png")
  heart2=loadImage("photos/heart2.png")
  heart1=loadImage("photos/heart1.png")
  base=loadImage("photos/base.png")
  upImg=loadImage("photos/upButton.png")
  downImg=loadImage("photos/DownButton.png")
  leftImg=loadImage("photos/rightButton.png")
  rightImg=loadImage("photos/leftButton.png");
  computerAxeUpImg=loadImage("photos/weapon1.png");
  computerAxeDownImg=loadImage("photos/weapon12.png");

  
}
function setup() {
  var canvas = createCanvas(windowWidth,windowHeight);

  getBackgroundImg()
  
    ground=createSprite(width/2,height-50,width+50,20);
    ground.visible=false;

    player=createSprite(100,height-100,20,20);
    player.addImage(player1_img);
    player.scale=0.5;
    player.debug=true;
    player.setCollider("rectangle",0,0,160,300)

    computer=createSprite(width-100,height-100,20,20);
    computer.addImage(player2_img);
    computer.scale=0.5;
    computer.debug=true;
    computer.setCollider("rectangle",0,0,160,300)

    gameState="play";

    playerAxe=createSprite(player.x+50,player.y-45);
    playerAxe.addImage(playerAxeUpImg);
    playerAxe.scale=0.2
    playerAxe.visible=false
    // p1AxeDown=createSprite(player.x+50,player.y-65);
    // p1AxeDown.addImage(weapon12_img);
    // p1AxeDown.scale=0.2
    // p1AxeDown.visible=false;

    computerAxe=createSprite(computer.x-50,computer.y-65);
    computerAxe.addImage(computerAxeUpImg);
    computerAxe.scale=0.2
    computerAxe.visible=false;

    playerTrident=createSprite(player.x,player.y);
    playerTrident.addImage(playerTridentImg);
    playerTrident.scale=0.5;

    computerTrident=createSprite(computer.x,computer.y);
    computerTrident.addImage(computerTridentImg);
    computerTrident.scale=0.5;

    playerHearts=createSprite(150,90,10,10)
    playerHearts.addImage(heart8)
    playerHearts.scale=0.2
   playerScore=8;
 
    computerHearts=createSprite(width-200,90,10,10)
    computerHearts.addImage(heart8)
    computerHearts.scale=0.2
  computerScore=8;

    flag="trident"
    axe=false;
    flag1=0;

    restart=createButton("Play Again")
    restart.position(550,200)
    restart.hide()
}
function draw() {
  if(backgroundImg){
    background(backgroundImg);
  }
 
/////////////////////////////////////////////////CREATE EDGES////////////////////////////////////////////////////////////////
edges=createEdgeSprites();
/////////////////////////////////////////////////COLLIDE PLAYERS WITH GROUND AND EDGES/////////////////////////////////////////////////
player.collide(ground);
computer.collide(ground);
player.collide(edges);
computer.collide(edges);


/////////////////////////////////////////////////GAMESTATE PLAY////////////////////////////////////////////////////////////////
if(gameState==="play"){

////////////////////////////////////////////////////PLAYER1 MOVEMENT///////////////////////////////////////////////////////////
if(keyDown(UP_ARROW)&&player.y>=height-200){
  player.velocityY=-15;
}
////////////////////////////////////////GRAVITY///////////////////////////////////
player.velocityY+=0.7;

if(keyDown(LEFT_ARROW)){
  player.x-=5;
  computer.x+=4
}
if(keyDown(RIGHT_ARROW)&&player.x<=computer.x-70){
  player.x+=5;
  computer.x-=4
}
///////////////////////////////////////Changing Weapons///////////////////////////////////////
if(keyDown("a")){

  axe=true;
  flag="axe";
  playerTrident.visible=false;
  computerTrident.visible=false;

  playerAxe.visible=true;
  computerAxe.visible=true;
}
if(keyDown("t")){

  axe=false;
  flag="trident";
  playerTrident.visible=true;
  computerTrident.visible=true;

  playerAxe.visible=false;
  computerAxe.visible=false;
}

//////////////////////////////////////ATTACHING WEAPONS TO THE PLAYER/////////////////////////////////////////////
//AXE
if(flag==="axe"){
  playerAxe.x=player.x+50;
  playerAxe.y=player.y-45;

  computerAxe.x=computer.x-50;
  computerAxe.y=computer.y-35;
}
if(keyWentDown("space")){
  playerAxe.addImage(playerAxeDownImg);
}else{
  playerAxe.addImage(playerAxeUpImg);
}
//TRIDENT
if(flag==="trident"&&flag1===0){
  playerTrident.x=player.x+60;
  playerTrident.y=player.y-25;

  computerTrident.x=computer.x-60;
  computerTrident.y=computer.y-20;

  playerTrident.visible=true;
  computerTrident.visible=true;
  if(keyDown("space")&&computer.x-player.x>800){
    flag1=1;
  }
  if(flag1===1){
    playerTrident.velocityX=15;
  }
  
}
//resetting trident
if(playerTrident.x>width){
  playerTrident.x=player.x+60;
  flag1=0;
}

///////////////////////////////////////LIFE///////////////////////////////////////////////
//Reducing computer life
if(playerAxe.isTouching(computer)&&keyDown("space")&&frameCount%3===0){
  computerScore--;
  
  switch(computerScore){
   
    case 7:computerHearts.addImage(heart7)
    computerHearts.scale=0.2;
    break;
    case 6:computerHearts.addImage(heart6)
    computerHearts.scale=0.2;
    break;
    case 5:computerHearts.addImage(heart5)
    computerHearts.scale=0.2;
    break;
    case 4:computerHearts.addImage(heart4)
    computerHearts.scale=0.2;
    break;
    case 3:computerHearts.addImage(heart3)
    computerHearts.scale=0.2;
    break;
    case 2:computerHearts.addImage(heart2)
    computerHearts.scale=0.2;
    break;
    case 1:computerHearts.addImage(heart1)
    computerHearts.scale=0.2;
    break;
    
    default:break;
 }
 }
}

//////////////////////////////////////////////////GameState END//////////////////////////////////
if(computerScore===0){
  gameState="end";
}
if(gameState==="end"){
  player.velocityX=0;
  player.velocityY=0;
 computer.velocityX=0;
  computer.velocityX=0;
  restart.show()
}
restart.mousePressed(()=>{
  gameState="play";
  player.x=100;
  computer.x=width-100;
  computerScore=8;
  playerScore=8;
  flag="trident"
  axe=false;
  flag1=0;

  playerAxe.visible=false;
  computerAxe.visible=false;
  computerHearts.addImage(heart8)
  playerHearts.addImage(heart8)
  restart.hide();
})

drawSprites();
}
async function getBackgroundImg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  
  if(hour>=0600 && hour<=1900){
      bg = "photos/background.png";
  }
  else{
      bg = "photos/night.jpg";
  }

  backgroundImg = loadImage(bg);
  console.log(backgroundImg);
}
