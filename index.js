const area = document.getElementById('area')
let move = 0
let result = ''
const contentWrapper = document.getElementById('content')
const modalResult = document.getElementById('modal-result-wrapper')
const overlay = document.getElementById('overlay')
const binClose = document.getElementById('bin-close')
const scoreX = document.getElementById('score-x')
const scoreO = document.getElementById('score-o')
const resetButton = document.getElementById('reset-scores')
const resetAchievementsButton = document.getElementById('reset-achievements')

const achievementX = document.getElementById('achievement-x')
const achievementO = document.getElementById('achievement-o')
const achievementDraw = document.getElementById('achievement-draw')
const achievementXProgress = document.getElementById('achievement-x-progress')
const achievementOProgress = document.getElementById('achievement-o-progress')
const achievementDrawProgress = document.getElementById(
	'achievement-draw-progress'
)
const nextAchievementX = document.getElementById('next-achievement-x')
const nextAchievementO = document.getElementById('next-achievement-o')
const nextAchievementDraw = document.getElementById('next-achievement-draw')
const achievementSound = document.getElementById('achievement-sound')

let countX = localStorage.getItem('countX')
	? parseInt(localStorage.getItem('countX'))
	: 0
let countO = localStorage.getItem('countO')
	? parseInt(localStorage.getItem('countO'))
	: 0
let countDraws = localStorage.getItem('countDraws')
	? parseInt(localStorage.getItem('countDraws'))
	: 0
let achievementsX = localStorage.getItem('achievementsX')
	? parseInt(localStorage.getItem('achievementsX'))
	: 0
let achievementsO = localStorage.getItem('achievementsO')
	? parseInt(localStorage.getItem('achievementsO'))
	: 0
let achievementsDraw = localStorage.getItem('achievementsDraw')
	? parseInt(localStorage.getItem('achievementsDraw'))
	: 0

scoreX.innerText = countX
scoreO.innerText = countO
nextAchievementX.innerText = (achievementsX + 1) * 5
nextAchievementO.innerText = (achievementsO + 1) * 5
nextAchievementDraw.innerText = (achievementsDraw + 1) * 5

area.addEventListener('click', e => {
	if (e.target.className.includes('grid__box') && e.target.innerHTML === '') {
		if (move % 2 === 0) {
			e.target.innerHTML = 'X'
			e.target.classList.add('x') // Добавляем класс для крестиков
		} else {
			e.target.innerHTML = 'O'
			e.target.classList.add('o') // Добавляем класс для ноликов
		}
		move++
		check()
	}
})

const check = () => {
	const boxes = document.getElementsByClassName('grid__box')
	const arr = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]

	for (let i = 0; i < arr.length; i++) {
		if (
			boxes[arr[i][0]].innerHTML === 'X' &&
			boxes[arr[i][1]].innerHTML === 'X' &&
			boxes[arr[i][2]].innerHTML === 'X'
		) {
			result = 'крестики'
			countX++
			localStorage.setItem('countX', countX)
			highlightWinner(arr[i])
			prepareResult(result)
			updateScore()
			updateAchievements()
			return
		} else if (
			boxes[arr[i][0]].innerHTML === 'O' && // Исправляем здесь
			boxes[arr[i][1]].innerHTML === 'O' &&
			boxes[arr[i][2]].innerHTML === 'O'
		) {
			result = 'нолики'
			countO++
			localStorage.setItem('countO', countO)
			highlightWinner(arr[i])
			prepareResult(result)
			updateScore()
			updateAchievements()
			return
		}
	}

	let draw = true
	for (let box of boxes) {
		if (box.innerHTML === '') draw = false
	}
	if (draw) {
		result = 'ничья'
		countDraws++
		localStorage.setItem('countDraws', countDraws)
		prepareResult(result)
		updateAchievements()
	}
}

const highlightWinner = winningCells => {
	winningCells.forEach(index => {
		document.getElementsByClassName('grid__box')[index].classList.add('win')
	})
}

const prepareResult = winner => {
	if (winner === 'крестики') {
		contentWrapper.innerHTML = `Победили ${winner} !`
		contentWrapper.style.color = '#007bff' /* Голубой цвет */
	} else if (winner === 'нолики') {
		contentWrapper.innerHTML = `Победили ${winner} !`
		contentWrapper.style.color = '#ff6b6b' /* Оранжевый цвет */
	} else {
		contentWrapper.innerHTML = 'Ничья!'
		contentWrapper.style.color = '#333' /* Цвет текста по умолчанию */
	}
	modalResult.style.display = 'block'
}

const updateScore = () => {
	scoreX.innerText = countX
	scoreO.innerText = countO
}

const updateAchievements = () => {
	const nextMilestoneX = (achievementsX + 1) * 5
	const nextMilestoneO = (achievementsO + 1) * 5
	const nextMilestoneDraw = (achievementsDraw + 1) * 5

	achievementXProgress.innerText = `${
		countX % nextMilestoneX
	}/${nextMilestoneX}`
	achievementOProgress.innerText = `${
		countO % nextMilestoneO
	}/${nextMilestoneO}`
	achievementDrawProgress.innerText = `${
		countDraws % nextMilestoneDraw
	}/${nextMilestoneDraw}`

	nextAchievementX.innerText = nextMilestoneX
	nextAchievementO.innerText = nextMilestoneO
	nextAchievementDraw.innerText = nextMilestoneDraw

	if (countX >= nextMilestoneX) {
		achievementsX++
		localStorage.setItem('achievementsX', achievementsX)
		achievementX.classList.add('gold')
		achievementX.querySelector('.achievement-img').src = './img/img X.jpg'
		achievementX.querySelector('.achievement-img').alt = 'Супер Крестик'
		achievementX.innerHTML += `<p>Супер Крестик: ${achievementsX} ачивка(и)</p>`
		achievementSound.play()
	}
	if (countO >= nextMilestoneO) {
		achievementsO++
		localStorage.setItem('achievementsO', achievementsO)
		achievementO.classList.add('gold')
		achievementO.querySelector('.achievement-img').src = './img/img O.png'
		achievementO.querySelector('.achievement-img').alt = 'Супер Нолик'
		achievementO.innerHTML += `<p>Супер Нолик: ${achievementsO} ачивка(и)</п>`
		achievementSound.play()
	}
	if (countDraws >= nextMilestoneDraw) {
		achievementsDraw++
		localStorage.setItem('achievementsDraw', achievementsDraw)
		achievementDraw.classList.add('gold')
		achievementDraw.querySelector('.achievement-img').src = './img/image.png'
		achievementDraw.querySelector('.achievement-img').alt = 'Супер Ничья'
		achievementDraw.innerHTML += `<p>Супер Ничья: ${achievementsDraw} ачивка(и)</п>`
		achievementSound.play()
	}
}

const closeModal = () => {
	modalResult.style.display = 'none'
	location.reload()
}

const resetScores = () => {
	countX = 0
	countO = 0
	countDraws = 0
	localStorage.setItem('countX', countX)
	localStorage.setItem('countO', countO)
	localStorage.setItem('countDraws', countDraws)
	updateScore()
	updateAchievements() // Добавляем, чтобы обновить состояние после сброса
}

const resetAchievements = () => {
	localStorage.setItem('achievementsX', 0)
	localStorage.setItem('achievementsO', 0)
	localStorage.setItem('achievementsDraw', 0)
	achievementsX = 0
	achievementsO = 0
	achievementsDraw = 0
	updateAchievements()
}

overlay.addEventListener('click', closeModal)
binClose.addEventListener('click', closeModal)
resetButton.addEventListener('click', resetScores)
resetAchievementsButton.addEventListener('click', resetAchievements)

document.addEventListener('DOMContentLoaded', () => {
	updateScore()
	updateAchievements()
})
