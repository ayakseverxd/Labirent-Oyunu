const ROWS = 10;
const COLS = 10;
const container = document.getElementById("container");

// Duvarları saklamak için bir dizi oluşturun
const kayaElements = [];

function createMaze() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const verticalWall = document.createElement("div");
            verticalWall.classList.add("vertical-wall");
            verticalWall.style.top = row * 40 + "px";
            verticalWall.style.left = col * 40 + "px";
            container.appendChild(verticalWall);

            const horizontalWall = document.createElement("div");
            horizontalWall.classList.add("horizontal-wall");
            horizontalWall.style.top = row * 40 + "px";
            horizontalWall.style.left = col * 40 + "px";
            container.appendChild(horizontalWall);
        }
    }
}

createMaze();
const ball = document.getElementById("ball");
let ballX = 0;
let ballY = 0;
function checkCollision() {
    var ballRect = ball.getBoundingClientRect();

    for (var i = 0; i < kayaElements.length; i++) {
        var kayaRect = kayaElements[i].getBoundingClientRect();

        if (
            ballX + ballRect.width >= kayaRect.left &&
            ballX <= kayaRect.right &&
            ballY + ballRect.height >= kayaRect.top &&
            ballY <= kayaRect.bottom
        ) {
            return true;  // Çarpışma varsa true döndür
        }
    }

    return false;  // Çarpışma yoksa false döndür
}
document.addEventListener("keydown", (event) => {
    let newX = ballX;
    let newY = ballY;

    if (event.key === "ArrowUp") {
        newY -= 40;
    } else if (event.key === "ArrowDown") {
        newY += 40;
    } else if (event.key === "ArrowLeft") {
        newX -= 40;
    } else if (event.key === "ArrowRight") {
        newX += 40;
    }

    // Yeni pozisyon topun sınırlar içinde mi kontrol et
    const containerRect = container.getBoundingClientRect();
    if (
        newX >= 0 &&
        newX <= containerRect.width - ball.clientWidth &&
        newY >= 0 &&
        newY <= containerRect.height - ball.clientHeight
    ) {
        // Yeni pozisyon topun hareket etmesine izin veriyorsa güncelle
        ballX = newX;
        ballY = newY;
        ball.style.transform = `translate(${ballX}px, ${ballY}px)`;

        // Çarpışma kontrolü burada yapılabilir
        if (checkCollision()) {
            // Çarpışma varsa gerekli işlemleri yapabilirsiniz.
        }
        
        // Kazanma kontrolü burada yapılabilir
        checkWin();
    }
});
const resetButton = document.getElementById("reset-button");

function checkWin() {
    const exit = document.querySelector(".exit");
    const ballRect = ball.getBoundingClientRect();
    const exitRect = exit.getBoundingClientRect();

    if (
        ballRect.right > exitRect.left &&
        ballRect.left < exitRect.right &&
        ballRect.bottom > exitRect.top &&
        ballRect.top < exitRect.bottom
    ) {
        alert("Tebrikler! Labirenti geçtin!");
        resetGame();
    }
}

resetButton.addEventListener("click", resetGame);

function resetGame() {
    ballX = 0;
    ballY = 0;
    ball.style.transform = "translate(0, 0)";
}