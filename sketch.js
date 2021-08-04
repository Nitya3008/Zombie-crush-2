const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var wall1,wall2,ground;
var stones=[];

function preload(){
  zombie1=loadImage("./assets/zombie1.png");
  zombie2=loadImage("./assets/zombie2.png");
  zombie3=loadImage("./assets/zombie3.png");
  zombie4=loadImage("./assets/zombie4.png");
  backgroundImg=loadImage("./assets/background.png");
  buttonImg=loadImage("./assets/axe.png");
 bridgeImg=loadImage("./assets/wood.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  frameRate(80);

 wall1=new Base(100, height-300, 200, height/2+100);
 wall2 = new Base(width - 100, height-300, 200, height/2+100);
ground=new Base(0,height-10,width*2,20);
 bridge=new Bridge(30,{x:50,y:height/2-140});
 
 jointPoint = new Base(width-250,height/2-100,40,20);

 zombie=createSprite(width/2,height-110);
 zombie.addAnimation("lefttoright",zombie1,zombie2,zombie1);
 zombie.addAnimation("righttoleft",zombie3,zombie4,zombie3);
 zombie.scale=0.1;
 zombie.velocityX=10;

 breakButton=createButton("buttonImg");
 breakButton.position(width-200,height/2-50);
 breakButton.class("breakButton");
 breakButton.mousePressed(handleButtonPress);


  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  for (var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-10, 140);
    var stone = new Stone(x, y, 80, 80);
    
    stones.push(stone);
  }
 

}

function draw() {
  background(51);
  image(backgroundImg,0,0,width,height);
  Engine.update(engine);

 ground.show();
 wall1.show();
 wall2.show();
 bridge.show();
 
  for (var stone of stones) {
    stone.show();
  }

  if(zombie.position.x>=width-300){
    zombie.velocityX=-10;
    zombie.changeAnimation("righttoleft");
  }
  if(zombie.position.x<=300){
    zombie.velocityX=10;
    zombie.changeAnimation("lefttoright");
  }

  drawSprites();
}

function handleButtonPress(){
  
  jointLink.detach();
  setTimeout(()=>{
    bridge.break();
   },1500);
}