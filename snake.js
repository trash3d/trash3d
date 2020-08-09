document.addEventListener('DOMContentLoaded', () => {
 const squares = document.querySelectorAll('.grid div')
 const scoreDisplay = document.querySelector('span')
 const startBtn = document.querySelector('.start')

 const width=10
 let currentIndex = 0 
 let appleIndex = 0
 let currentSnake = [2,1,0] //2 HEAD 0 TAIL 1 BODY
 let direction = 1
 let score = 0
 let speed = 0.9
 let intervalTime = 0
 let interval = 0

 function startGame(){
	currentSnake.forEach(index => squares[index].classList.remove('snake'))
	squares[appleIndex].classList.remove('apple')
	clearInterval(interval)
	score = 0
	randomApple()
	direction = 1
	scoreDisplay.innerText = score
	intervalTime = 500
	currentSnake = [2,1,0]
	currentIndex = 0
	currentSnake.forEach(index => squares[index].classList.add('snake'))
	interval = setInterval(moveOutcomes, intervalTime)
	console.log(interval)
 }
 
 function moveOutcomes () {
	if (
		(currentSnake[0] + width >= (width * width) && direction === width ) || 
		(currentSnake[0] % width === width -1 && direction === 1 ) || 
		(currentSnake[0] % width === 0 && direction === -1) ||
		(currentSnake[0] - width < 0 && direction === -width) ||
		squares[currentSnake[0] + direction].classList.contains('snake')
	) {
		alert("you loose");
		return clearInterval(interval)
	}
	
	const tail = currentSnake.pop()
	squares[tail].classList.remove('snake')
        console.log(currentSnake, direction)
	currentSnake.unshift(currentSnake[0] + direction)
        console.log(currentSnake)

	if(squares[currentSnake[0]].classList.contains('apple')) {
		squares[currentSnake[0]].classList.remove('apple')	
		squares[tail].classList.add('snake')
		currentSnake.push(tail)	
		randomApple()
		score++
		scoreDisplay.textContent = score
		clearInterval(interval)
		intervalTime = intervalTime * speed	
		interval = setInterval(moveOutcomes, intervalTime)
		console.log(interval)
	}
	squares[currentSnake[0]].classList.add('snake')	
 }


 function randomApple(){
	do{
		appleIndex = Math.floor(Math.random() * squares.length)
	} while(squares[appleIndex].classList.contains('snake'))
	squares[appleIndex].classList.add('apple')

 }

 function control(e) {
	squares[currentIndex].classList.remove('snake')
	console.log(e)
	if(e.keyCode === 39) {
		direction = 1
	}else if (e.keyCode === 38) {
		direction = -width
	}else if (e.keyCode === 37) {
		direction = -1
	}else if (e.keyCode === 40) {
		direction = +width
	}
 }

 document.addEventListener('keyup',control)
 startBtn.addEventListener('click', startGame)

})
