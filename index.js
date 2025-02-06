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

let countX = localStorage.getItem('countX')
	? parseInt(localStorage.getItem('countX'))
	: 0
let countO = localStorage.getItem('countO')
	? parseInt(localStorage.getItem('countO'))
	: 0

scoreX.innerText = countX
scoreO.innerText = countO

area.addEventListener('click', e => {
	if (e.target.className.includes('grid__box') && e.target.innerHTML === '') {
		move % 2 === 0 ? (e.target.innerHTML = 'X') : (e.target.innerHTML = '0')
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
			return
		} else if (
			boxes[arr[i][0]].innerHTML === '0' &&
			boxes[arr[i][1]].innerHTML === '0' &&
			boxes[arr[i][2]].innerHTML === '0'
		) {
			result = 'нолики'
			countO++
			localStorage.setItem('countO', countO)
			highlightWinner(arr[i])
			prepareResult(result)
			updateScore()
			return
		}
	}

	let draw = true
	for (let box of boxes) {
		if (box.innerHTML === '') draw = false
	}
	if (draw) {
		result = 'ничья'
		prepareResult(result)
	}
}

const highlightWinner = winningCells => {
	winningCells.forEach(index => {
		document.getElementsByClassName('grid__box')[index].classList.add('win')
	})
}

const prepareResult = winner => {
	contentWrapper.innerHTML = `Победили ${winner} !`
	modalResult.style.display = 'block'
}

const updateScore = () => {
	scoreX.innerText = countX
	scoreO.innerText = countO
}

const closeModal = () => {
	modalResult.style.display = 'none'
	location.reload()
}

const resetScores = () => {
	localStorage.setItem('countX', 0)
	localStorage.setItem('countO', 0)
	countX = 0
	countO = 0
	updateScore()
}

overlay.addEventListener('click', closeModal)
binClose.addEventListener('click', closeModal)
resetButton.addEventListener('click', resetScores)

document.addEventListener('DOMContentLoaded', () => {
	updateScore()
})
