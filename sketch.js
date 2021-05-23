var dog,dogImg,happyDogImg;
var foodStock, foodS;
var database;
var feed,addFood;
var fedTime, lastFed;
var foodObj;

function preload()
{
  happyDogImg = loadImage("images/dogImg.png");
  dogImg= loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1000, 600);
  database = firebase.database();
  dog = createSprite(700,300);
  dog.addImage("dog",dogImg);
  dog.scale =0.5;
  
  feed=createButton("Feed the dog"); 
  feed.position(350,95); 
  feed.mousePressed(feedDog); 
  addFood=createButton("Add Food"); 
  addFood.position(450,95); 
  addFood.mousePressed(addFoods);   
  foodStock = database.ref('Food');
  foodStock.on("value",function(data){
    foodS = data.val();
  })
  foodObj = new Food(foodS,lastFed);
}


function feedDog(){ 
  dog.addImage("dog",happyDogImg); 
  foodObj.updateFoodStock(foodObj.getFoodStock()-1); 
  database.ref('/').update({ 
    Food:foodObj.getFoodStock(),
    hour:hour()
  })
} 

function addFoods(){ 
  foodS++; 
  database.ref('/').update({ 
    Food:foodS 
  }) 
} 


function draw() {  
  background(46,139,87);
  
  fedTime = database.ref('hour');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  fill("white");
  textSize(30);
 
  text("Food left:" + foodS,200,500);
  drawSprites();
  
  foodObj.display();
  fill(255,255,254); 
  textSize(15); 
  if(lastFed>=12){ 
    text("Last Feed : "+ lastFed%12 + " PM", 350,30); 
  }else if(lastFed==0){ 
    text("Last Feed : 12 AM",350,30); 
  }else{ 
    text("Last Feed : "+ lastFed + " AM", 350,30); 
  } 
  
}










/*var  dog, happyDog, database, foodS, foodStock;
var happyDogImg, dogImg;
var buttonAddFood, buttonFeedPet;
var fedTime, lastFed;
var foodObj;

function preload()
{
happyDogImg = loadImage("images/dogImg.png");
  dogImg = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(700, 700);

  dog = createSprite(300,300)
  dog.addImage("dog",dogImg)
  dog.scale=0.5;
  database= firebase.database();
  foodStock=database.ref("Food");
  foodStock.on("value", readStock);

  buttonFeedPet=createButton("Feed the dog"); 
  buttonFeedPet.position(350,95); 
  buttonFeedPet.mousePressed(feedDog); 
  buttonAddFood=createButton("Add Food"); 
  buttonAddFood.position(450,95); 
  buttonAddFood.mousePressed(buttonAddFood);   
    foodS = data.val();
  foodObj = new Food(foodS,lastFed);
}



function draw() {  
background(46, 139, 87);
fedTime = database.ref('hour');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  fill("white")
  textSize(30)
  strokeWeight(4);
  text("Food left:" + foodS,200,500)
  drawSprites();

  foodObj.display();
  fill(255,255,254); 
  textSize(15); 
  if(lastFed>=12){ 
    text("Last Feed : "+ lastFed%12 + " PM", 350,30); 
  }else if(lastFed==0){ 
    text("Last Feed : 12 AM",350,30); 
  }else{ 
    text("Last Feed : "+ lastFed + " AM", 350,30); 
  } 

  
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref("/").update({
    Food:x
  })
}

function feedDog(){ 
  dog.addImage("dog",happyDogImg); 
  foodObj.updateFoodStock(foodObj.getFoodStock()-1); 
  database.ref('/').update({ 
    Food:foodObj.getFoodStock(),
    hour:hour()
  })
} 

function addFoods(){ 
  foodS++; 
  database.ref('/').update({ 
    Food:foodS 
  }) 
*/
