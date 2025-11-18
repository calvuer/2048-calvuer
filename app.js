    document.addEventListener("DOMContentLoaded", () => {
    const gridDisplay = document.querySelector(".grid");
    const scoreDisplay = document.querySelector("#score");
    const resultDisplay = document.querySelector("#result");
    const restartBtn = document.querySelector('#restart-btn');
    restartBtn.addEventListener('click', reloadBoard);
    const width = 4
    let squares = []
    let score = 0

        

    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement("square")
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        generate()
        generate()
    }
    createBoard()

    function generate() {
        const randomNumber = Math.floor(Math.random() * squares.length)
        if (squares[randomNumber].innerHTML == 0) {
            const randomValue = Math.random()
            if (randomValue < 0.7) { 
                squares[randomNumber].innerHTML = 2
            } else if (randomValue < 0.9) { 
                squares[randomNumber].innerHTML = 4
            } else {
                squares[randomNumber].innerHTML = 8
            }
            checkForGameOver()
        } else {
            generate()
        }
    }
    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filteredRow)

                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }
    }

    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = filteredRow.concat(zeros)

                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }
    }

    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + width].innerHTML
            let totalThree = squares[i + width * 2].innerHTML
            let totalFour = squares[i + width * 3].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = filteredColumn.concat(zeros)

            squares[i].innerHTML = newColumn[0]
            squares[i + width].innerHTML = newColumn[1]
            squares[i + width * 2].innerHTML = newColumn[2]
            squares[i + width * 3].innerHTML = newColumn[3]
        }
    }

    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + width].innerHTML
            let totalThree = squares[i + width * 2].innerHTML
            let totalFour = squares[i + width * 3].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = zeros.concat(filteredColumn)

            squares[i].innerHTML = newColumn[0]
            squares[i + width].innerHTML = newColumn[1]
            squares[i + width * 2].innerHTML = newColumn[2]
            squares[i + width * 3].innerHTML = newColumn[3]
        }
    }

    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i + 1].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score}
        }
        checkForWin()
    }

    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i + width].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }

    function control(e) {
        if (e.key === "ArrowLeft") {
            keyLeft()
        } else if (e.key === "ArrowRight") {
            keyRight()
        } else if (e.key === "ArrowUp") {
            keyUp()
        } else if (e.key === "ArrowDown") {
            keyDown()
        }
    }
    document.addEventListener("keydown", control)

    function keyLeft() {
        moveLeft()
        combineRow()
        moveLeft()
        generate()
    }

    function keyRight() {
        moveRight()
        combineRow()
        moveRight()
        generate()
    }

    function keyUp() {
        moveUp()
        combineColumn()
        moveUp()
        generate()
    }

    function keyDown() {
        moveDown()
        combineColumn()
        moveDown()
        generate()
    }

    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = "Ты выйграл!"
                document.removeEventListener("keydown", control)
                setTimeout(clear, 3000)
            }
        }
    }

    function checkForGameOver() {
    let zeros = 0;
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].innerHTML == 0) {
            zeros++;
        }
    }
    if (zeros === 0) {
        resultDisplay.innerHTML = "Ты проиграл :(";
        document.removeEventListener("keydown", control);
        const restartBtn = document.querySelector('#restart-btn');
        restartBtn.style.visibility = 'visible';
    }
}

  function reloadBoard() {
    gridDisplay.innerHTML = '';
    squares = [];
    score = 0;
    scoreDisplay.innerHTML = '0';
    resultDisplay.innerHTML = '';

    createBoard();

    const restartBtn = document.querySelector('#restart-btn');
    restartBtn.style.visibility = 'hidden';

    document.addEventListener("keydown", control);
}

    function clear() {
        location.reload()
    }

    function addColours() {
        for (let i = 0; i < squares.length; i++) {
            const value = parseInt(squares[i].innerHTML);
            const square = squares[i];
            
            if (value === 0) {
                square.style.color = "#BDAC97";
                square.style.backgroundColor = "#BDAC97";
            }
            else if (value === 2) {
                square.style.color = "#756452";
                square.style.backgroundColor = "#EEE4DA";
            }
            else if (value === 4) {
                square.style.color = "#756452";
                square.style.backgroundColor = "#EBD8B6";
            }
            else if (value === 8) {
                square.style.color = "#ffffffff";
                square.style.backgroundColor = "#F2B177";
            }
            else if (value === 16) {
                square.style.color = "#ffffffff";
                square.style.backgroundColor = "#F69563";
            }
            else if (value === 32){
                square.style.color = "#ffffffff";
                square.style.backgroundColor = "#F77F63";
            }
            else if (value === 64){
                square.style.color = "#ffffffff";
                square.style.backgroundColor = "#F76645";
            }
            else if (value === 128){
                square.style.color = "#ffffffff";
                square.style.backgroundColor = "#F1D26C";
            }
            else if (value === 256){
                square.style.fontSize = '45px';
                square.style.color = "#ffffffff";
                square.style.backgroundColor = "#F2D15F";
            }
            else if (value === 512){
                square.style.fontSize = '45px';
                square.style.color = "#ffffffff";
                square.style.backgroundColor = "#EDC850";
            }
            else if (value === 1024) {
                square.style.color = "#ffffffff";
                square.style.backgroundColor = "#efc22eff";
                square.style.fontSize = '45px';
            }
            else if (value === 2048) {
                square.style.color = "#ffffffff";
                square.style.backgroundColor = "#f5ee7f";
                square.style.fontSize = '40px';
            }}
    }
    addColours()

    let myTimer = setInterval(addColours, 0)
})


