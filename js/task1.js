function DoSomething(whatToDo, time, result) {
	console.log(whatToDo);
	setTimeout(function() {
		console.log(result);
	}, time);
}

function randomInt(from, to) {
	let rand = from - 0.5 + Math.random()*(to - from + 1);
	return Math.round(rand);
}

class Human {
	constructor(data) {
		this.name = data.name;
		this.dateOfBirth = data.dateOfBirth;
		this.height = data.height;
		this.weight = data.weight;
		this.skinColor = data.skinColor;
		this.currentPosition = data.currentPosition;
		this.age = (new Date - this.dateOfBirth)/(1000*3600*24*365) - (new Date - this.dateOfBirth)/(1000*3600*24*365)%1;
	}
	speak(message) {
		console.log(`${this.name}: ${message}`);
	}
	move(newPosition, range, speed) {
		let time = range/speed;
		DoSomething(`Going from ${this.currentPosition} to ${newPosition}. I need ${time} hours for that...`,
			time*1000, `We're done! Our new position is ${newPosition}`);
		this.currentPosition = newPosition;
	}
}

class Man extends Human {
	constructor (data) {
		super(data);
		this.sex = 'man';
	}
}

class Worker extends Man {
	constructor(data) {
		super(data);
		this.firewood = 0;
		this.food = 0;
	}
	findFirewood(number) {
		DoSomething(`Finding ${number} firewood, wait ${number} seconds...`, 1000*number, `${number} firewood are find`);
		this.firewood += number;
	}
	makeFood(number) {
		if (number <= this.firewood) {
			DoSomething(`Making ${number} of food... Wait ${number} seconds`, 1000*number, `We are make ${number} of food!`)
			this.food += number;
			this.firewood -= number;
		} else {
			console.log('Not enought firewood, find more');
		}
	}
	giveFood(number) {
		if (this.food >= number) {
			DoSomething(`Give ${number} of food to animals`);
			this.food -= number;
		} else {
			console.log('Not enogh food');
		}
	}
	checkFirewood() {
		console.log(this.firewood);
	}
	checkFood() {
		console.log(this.food);
	}
}

class Hunter extends Man {
	constructor(data) {
		super(data);
		this.sleepingDarts = 0;
		this.catchedAnimals = [];
	}
	makeSleepingDart() {
		DoSomething('Making sleepng dart, wait 3 seconds...', 3000, '1 sleeping dart are made');
		this.sleepingDarts++;
	}
	catchAnimal() {
		this.animals = ['Bear', 'Rabbit', 'Wolf', 'Lion', 'Tiger', 'Leopard'];
		if (this.sleepingDarts > 0) {
			let catchedAnimal = this.animals[randomInt(0, this.animals.length - 1)];
			DoSomething(`Catching animal... I need 5 seconds`, 5000, `We are catch the ${catchedAnimal}`);
			this.catchedAnimals.push(catchedAnimal);
			this.sleepingDarts--;
		} else {
			console.log('Not enought sleeping darts, make more');
		}
	}
	checkSleepingDarts() {
		console.log(this.sleepingDarts);
	}
	checkCathchedAnimals() {
		console.log(this.catchedAnimals);
	}
}

class Woman extends Human {
	constructor(data) {
		super(data);
		this.sex = 'woman';
	}
}

class Nurse extends Woman {
	constructor(data) {
		super(data);
		this.medicine = 0;
		this.efficiency = 1;
	}
	orderMedicine() {
		DoSomething('Waiting our order... Wait 10 seconds', 10000, 'Our order arrived! +5 medicine!');
		this.medicine += 5;
	}
	heal(who) {
		if (who == 'Human') {
			if (this.medicine >= 2) {
				DoSomething(`Healing human... Wait ${5/this.efficiency} seconds`, 5000/this.efficiency, `We are heal the human!`);
				this.medicine -= 2;
				this.checkEfficiency += 0.02;
			}
		} else if (who == 'Animal') {
			if (this.medicine >= 1) {
				DoSomething(`Healing animal... Wait ${3/this.efficiency} seconds`, 3000/this.efficiency, `We are heal the animal!`);
				this.medicine -= 1;
				this.efficiency += 0.01;
			}
		}
	}
	checkMedicine() {
		console.log(this.medicine);
	}
	checkEfficiency() {
		console.log(`Your modificator to heal time is ${this.efficiency}`);
	}
}

class Librarian extends Woman {
	constructor(data) {
		super(data);
		this.books = 100;
		this.money = 1000;
	}
	orderBooks() {
		DoSomething('Order new books... Wait 15 seconds', 15000, 'Our order arrived! +15 books!');
	}
	giveBooks(number) {
		if (number < this.books) {
			DoSomething('Give books to visitors', 0, 'visitors got their books!');
			this.books -= number;
			this.money += 10*number;
		}
		else {
			console.log('Not enough books, order more');
		}
	}
	checkBooks() {
		console.log(this.books);
	}
	checkMoney() {
		console.log(this.money);
	}
	makeNote() {
		console.log('Make note about new animal in Zoo');
	}
}

class Animal {
	constructor(data) {
		this.name = data.name;
		this.age = data.age;
		this.speed = data.speed; // from 1 to 10
		this.agility = data.agility // from 1 to 5
		this.hasTail = true;
		this.energy = 100;
		this.food = 0;
		this.potentialFood = 10;
	}
	move() {
		DoSomething('Going to the other location (-5 energy)... Wait 10 seconds', 10000/this.speed,
		 'Done! Maybe on new location you can find more food! (+10 potential food)');
		this.energy -= 5;
		this.potentialFood = 10;
	}
	eat() {
		if (this.energy <= 95) {
			if (this.food > 0) {
				DoSomething('Eat some food (-1 food)', 1000, 'It was delicious! (+5 energy)');
				this.food--;
				this.energy += 5;
			} else {
				console.log('Not enough food')
			}
		} else {
			console.log(`You have ${this.energy} energy and can't eat more`);
		}
	}
}

class Herbivorous extends Animal {
	constructor(data) {
		super(data);
	}
	findFood() {
		if (this.potentialFood > 0) {
			if (this.food < 20) {
				if (this.energy > 0) {
					DoSomething(`Finding food (-1 energy)... Wait ${10000/this.agility} seconds`, 10000/this.agility, `You find some food! (+1 food)`);
					this.food++;
					this.energy--;
					this.potentialFood--;
				} else {
					console.log('Not enough energy')
				}
			} else {
				console.log('Food limit, you can`t got more');
			}
		} else {
			console.log('No more food on this location, go to another');
		}
	}
}

class Predator extends Animal {
	constructor(data) {
		super(data);
	}
	hunt() {
		if (this.potentialFood > 0) {
			if (this.food < 30) {
				if (this.energy > 0) {
					DoSomething(`Hunting (-1 energy)... Wait ${10000/this.agility} seconds`, 10000/this.agility, `You find some food! (+1 food)`);
					this.food++;
					this.energy--;
					this.potentialFood--;
				} else {
					console.log('Not enough energy')
				}
			} else {
				console.log('Food limit, you can`t got more');
			}
		} 
	}
}

class Zoo {
	constructor(worker, hunter, nurse, librarian) {
		this.worker = worker;
		this.hunter = hunter;
		this.nurse = nurse;
		this.librarian = librarian;
	}
	newAnimals(number) {
		for (let i = 0; i < number; i++) {
			this.hunter.makeSleepingDart();
			this.hunter.catchAnimal();
			this.librarian.makeNote();
		}
	}
	feedAnimals(numOfFood) {
		this.worker.findFirewood(numOfFood);
		setTimeout(() => {
			this.worker.makeFood(numOfFood);
			setTimeout(() => {
				this.worker.giveFood(numOfFood);
			}, 1100*numOfFood)
		}, 1100*numOfFood);
	}
	healAnimals() {
		this.nurse.orderMedicine();
		setTimeout(() => {
			for (let i = 0; i < 5; i++) {
					this.nurse.heal('Animal');
			}
		}, 10100);
	}
}

const ZooService = (function() {
	let hunter = new Hunter({
		name: 'Vasya',
		dateOfBirth: new Date(1991, 11, 26),
		weight: 85,
		height: 180,
		skinColor: 'white',
		currentPosition: 'Ivano-Frankivsk'
	});

	let worker = new Worker({
		name: 'Paul',
		dateOfBirth: new Date(1996, 9, 12),
		weight: 70,
		height: 175,
		skinColor: 'black',
		currentPosition: 'Ivano-Frankivsk'
	});

	let nurse = new Nurse({
		name: 'Tanya',
		dateOfBirth: new Date(1988, 5, 17),
		weight: 53,
		height: 168,
		skinColor: 'white',
		currentPosition: 'Ivano-Frankivsk'
	});

	let librarian = new Librarian({
		name: 'Svetlana',
		dateOfBirth: new Date(1997, 3, 3),
		weight: 55,
		height: 170,
		skinColor: 'white',
		currentPosition: 'Ivano-Frankivsk'
	});

	let zoo = new Zoo(worker, hunter, nurse, librarian);

	function zooWork() {
		zoo.newAnimals(5);
		zoo.feedAnimals(10);
		zoo.healAnimals();
	}

	return {
		zooWork: zooWork
	}
})();

ZooService.zooWork();