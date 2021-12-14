import inquirer from "inquirer";

let questions = [
    {
        type:"input",
        name:"playerName",
        message:"Please type in your name"
    },
    {
        type:"list",
        name:"choosePetType",
        message: "Which type of pet would you like to take care of?",
        choices: [
            "dog",
            "cat",
            "rabbit"
        ]
    },
    {
        type:"input",
        name:"petName",
        message:"Please type in the name of your new pet"
    }
]

let activityQuestions = [
    {
        type:"list",
        name:"petActivity",
        message:"Please select which activity you would like to do with your pet",
        choices: [
            "play",
            "take for a walk",
            "feed",
            "water"
        ]
    }
]


class Pet {
    constructor(name, type, age) {
        this.name = name;
        this.type = type;
        this.age = age; //in days
        this.health = 100;
        this.happiness = 100;
        this.thirst = 100;
        this.hunger = 100;
    }
};




class Dog extends Pet {
    constructor(name, type, age, weight) {
        super(name, type, age);
        this.weight = weight; //in kilos
    }
}


Dog.prototype.walkies = function walkies() {
    console.log("walkies");
    if (this.hunger < 91){
        this.health = this.health + 10;  
    } else this.health = 100 ;
    if (this.happiness < 91){
        this.happiness = this.happiness + 10;  
    } else this.happiness = 100 ;
    if (this.thirst < 6){
        this.thirst =0;
        gameOver();  
    } else this.thirst = this.thirst - 5;
    if (this.hunger < 6){
        this.hunger =0;
        gameOver();
    } else this.hunger = this.hunger - 5;
}


Dog.prototype.play = function play() {
    console.log("play");
    if (this.health < 96){
        this.health = this.health + 5;  
    } else this.health = 100 ;
    console.log(myPet)
    if (this.happiness < 91){
        this.happiness = this.happiness + 10;
        console.log(myPet)  
    } else this.happiness = 100 ;
    if (this.thirst < 6){
        this.thirst =0;
        gameOver(); 
    } else this.thirst = this.thirst - 5;
    console.log(myPet)
    if (this.hunger < 6){
        this.hunger =0;
        gameOver();
    } else this.hunger = this.hunger - 5;
    console.log(myPet)
}

Dog.prototype.feed = function feed() {
    console.log ("feed");
    if (this.hunger < 66){
        this.hunger = this.hunger + 35;  
        console.log(myPet)
    } else this.hunger = 100 ;
};  

Dog.prototype.drinkies = function drinkies() {
    console.log ("drinkies");
    if (this.thirst < 61){
        this.thirst = myPet.thirst + 40;  
        console.log(myPet)
    } else this.thirst = 100 ;
}

Dog.prototype.dayGoesBy = function dayGoesBy() {
    console.log ("day goes by");
    if (this.thirst < 20){
        this.thirst =0;
        gameOver(); 
    } else this.thirst = this.thirst - 20;
    if (this.hunger < 20){
        this.hunger =0;
        gameOver();  
    } else this.hunger = this.hunger - 20;
    if (this.health < 3){
        this.health =0;
        gameOver();
    } else {this.health = this.health - 2;
    if (this.happiness < 3){
        this.thirst =0;
        gameOver();
    } else {
        this.happiness = this.happiness - 2;
    }
    this.age = this.age + 1;
    }
}




async function timeGoesBy() {
    if (myPet.health>0 && myPet.thirst>0 && myPet.hunger>0) {
        setInterval(() => {
        myPet.dayGoesBy();
        console.log(myPet)
      }, 20000);
      await activity();
      if (myPet.health>0 && myPet.thirst>0 && myPet.hunger>0) {
      await timeGoesBy();
      } else {gameOver()}
    } else {gameOver()}
}

async function activity() {
    if (myPet.health>0 && myPet.thirst>0 && myPet.hunger>0) {
    let response = await inquirer.prompt(activityQuestions);
    console.log(response);
    if (response.petActivity === "play") {
        myPet.play()
    } else if (response.petActivity === "take for a walk") {
        myPet.walkies()
        } else if (response.petActivity === "feed"){
        myPet.feed()
    } else if (response.petActivity === "water"){
        myPet.drinkies()}
    }else {gameOver()}
}


async function initialQuestions() {
    let response = await inquirer.prompt(questions);
    console.log(response);
    if (response.choosePetType === "dog"){
        myPet.name = response.petName
        myPet.type = response.choosePetType
        myPet.age = 42
        myPet.weight = 32
        console.log(myPet);
      } else {
        myPet.name = response.petName
        myPet.type = response.choosePetType
        myPet.age = 42
        console.log(myPet);
    }
    console.log(myPet);
}

function gameOver() {
    console.log(myPet)
    if (myPet.thirst < 1) {
        console.log(`Your ${myPet.type} ${myPet.name} has died of thirst!`);  
    } else if (myPet.hunger < 1){
        console.log(`Your ${myPet.type} ${myPet.name} has died of hunger!`); 
    } else if (myPet.happiness < 1) {
        console.log(`Your ${myPet.type} ${myPet.name} has died of unhappiness!`);
    } else if (myPet.health < 1) {
        console.log(`Your ${myPet.type} ${myPet.name} has died of ill health!`);
    }
    console.log("Game Over");
    process.exit()
   
}

let myPet = new Dog;
await initialQuestions();

await activity()
await timeGoesBy();






