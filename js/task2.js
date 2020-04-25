function randomInt(from, to) {
	let rand = from - 0.5 + Math.random()*(to - from + 1);
	return Math.round(rand);
}

$(function() {
	const Game = (function() {
		let target1 = $('.target:first-child');
		let target2 = $('.target:nth-child(2)');
		let target3 = $('.target:nth-child(3)');
		let target4 = $('.target:nth-child(4)');
		let keeper = $('.keeper');
		let ball = $('.ball');

		function game() {
			target1.on('click', function() {
				ball.animate({left: 755, top: 420}, 1000);
				let res = cathcing();
				setTimeout(() => {
					if (res == 1) {
						alert('You lose(');
					} else {
						alert('You win!');
					}
					restart();
				}, 1500);
			});
			target2.on('click', function() {
				ball.animate({left: 1165, top: 420}, 1000);
				let res = cathcing();
				setTimeout(() => {
					if (res == 2) {
						alert('You lose(');
					} else {
						alert('You win!');
					}
					restart();
				}, 1500);
			});
			target3.on('click', function() {
				ball.animate({left: 755, top: 655}, 1000);
				let res = cathcing();
				setTimeout(() => {
					if (res == 3) {
						alert('You lose(');
					} else {
						alert('You win!');
					}
					restart();
				}, 1500);
			});
			target4.on('click', function() {
				ball.animate({left: 1165, top: 655}, 1000);
				let res = cathcing();
				setTimeout(() => {
					if (res == 4) {
						alert('You lose(');
					} else {
						alert('You win!');
					}
					restart();
				}, 1500);
			});
		}
		function cathcing() {
			let res = randomInt(1, 4);
			switch(res) {
				case 1:
					keeper.attr('src', 'img/catcher1.png');
					keeper.css('width', '35%');
					keeper.animate({left: 100, top: 20}, 1000);
					return 1;
				case 2:
					keeper.attr('src', 'img/catcher2.png');
					keeper.css('width', '35%');
					keeper.animate({left: 350, top: -10}, 1000);
					return 2;
				case 3:
					keeper.attr('src', 'img/catcher1.png');
					keeper.css('width', '35%');
					keeper.animate({left: 100, top: 240}, 1000);
					return 3;
				case 4:
					keeper.attr('src', 'img/catcher2.png');
					keeper.css('width', '35%');
					keeper.animate({left: 350, top: 220}, 1000);
					return 4;
			}
		}
		function restart() {
			location.reload();
		}
		return {
			game: game,
		}
	})();
	Game.game();
});

