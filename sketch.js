//Create variables here
var dog, dogImg
var happyDog;
var database;
var foodS, foodStock;
var feedButton, addFoodButton;
var fedTime, lastFed;
var foodObj;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  
  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value",readStock);

  dog = createSprite(250,250,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.3;

foodObj = new Food();

  feedButton = createButton("Feed the Dog!");
  feedButton.position(450,95);
  feedButton.mousePressed(feedDog)

  addFoodButton = createButton("Add Food");
  addFoodButton.position(600,95);
  addFoodButton.mousePressed(addFoods);

}


function draw() {  
  background(46,139,87);

  foodObj.display();

  drawSprites();
  //add styles here
  textSize(20);
  fill("black");
  stroke(4);
  text("Food remaining: "+foodS,150,120);

  if(lastFed>=12){
    text("Last fed: "+lastFed%12+"PM",350,30);
  }else if(lastFed===0){
    text("Last fed: 12 AM",350,30);
  }else{
    text("Last fed: "+lastFed+"AM",350,30);
  }

  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  })
}

function addFoods(){
  foodS++;
  database.ref("/").update({
    food: foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);
  
  foodS = foodS-1;
  database.ref("/").update({
    food: foodS,
    FeedTime: hour() 
  })
}

function readStock(data){
  foodObj.updateFoodStock(foodS);
  foodS = data.val();
}

function writeStock(x){
  database.ref("/").update({
    food: x
  })
}