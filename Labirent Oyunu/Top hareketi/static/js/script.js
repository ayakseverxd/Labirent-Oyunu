const ROWS = 10;
const COLS = 10;
let startRow, startCol, exitRow, exitCol;

// Labirenti oluşturan fonksiyon
function generateMaze() {
    let visited = [];   // Ziyaret edilen hücreleri takip etmek için bir dizi
    let walls = [];     // Duvarları saklamak için bir dizi

    // Ziyaret dizisini ve duvarları başlat
    for (let i = 0; i < ROWS; i++) {
        visited[i] = [];
        for (let j = 0; j < COLS; j++) {
            visited[i][j] = false;  // Başlangıçta hiçbir hücre ziyaret edilmemiş olarak işaretlenir
        }
    }

    // Rastgele bir başlangıç noktası seç
    startRow = Math.floor(Math.random() * ROWS);
    startCol = Math.floor(Math.random() * COLS);

    // Rastgele bir çıkış noktası seç
    do {
        exitRow = Math.floor(Math.random() * ROWS);
        exitCol = Math.floor(Math.random() * COLS);
    } while (exitRow === startRow && exitCol === startCol);

    console.log(exitRow,exitCol);

    // Başlangıç ve çıkış noktalarını etiketle
    visited[startRow][startCol] = true;
    visited[exitRow][exitCol] = true;

    // Başlangıç noktasının etrafındaki duvarları ekle
    addWalls(startRow, startCol, walls);

    // Duvarlar dizisi boş olana kadar döngü devam eder
    while (walls.length) {
        let randomIndex = Math.floor(Math.random() * walls.length);
        let [currentRow, currentCol, nextRow, nextCol] = walls[randomIndex];
        walls.splice(randomIndex, 1);

        // Eğer ziyaret edilmemiş bir hücreye bağlanıyorsak devam et
        if (visited[nextRow][nextCol]) continue;

        // Duvarları görsel olarak temsil eden <div> oluştur
        let div = document.createElement("div");
        div.classList.add("kaya");
        if (nextRow === currentRow) {
            div.classList.add("yatay");
            div.style.left = Math.min(currentCol, nextCol) * 100 + "px";
            div.style.top = nextRow * 100 + "px";
        } else {
            div.classList.add("dik");
            div.style.left = nextCol * 100 + "px";
            div.style.top = Math.min(currentRow, nextRow) * 100 + "px";
        }
        document.getElementById("container").appendChild(div);

        // Ziyaret edilen hücre olarak işaretle ve yeni duvarları ekle
        visited[nextRow][nextCol] = true;
        addWalls(nextRow, nextCol, walls);
    }

    // Belirtilen hücrenin etrafındaki duvarları duvarlar dizisine ekleyen fonksiyon
    function addWalls(row, col, wallsList) {
        if (row > 0) wallsList.push([row, col, row - 1, col]);
        if (row < ROWS - 1) wallsList.push([row, col, row + 1, col]);
        if (col > 0) wallsList.push([row, col, row, col - 1]);
        if (col < COLS - 1) wallsList.push([row, col, row, col + 1]);

        // Rastgele bir çıkış noktası seç
function chooseRandomExit() {
    exitCol = Math.floor(Math.random() * COLS); // COLS, sütun sayısı (örneğin 10)
    exitRow = Math.floor(Math.random() * ROWS); // ROWS, satır sayısı (örneğin 10)

    // Başlangıç noktası ile aynı hücrede değillerse, çıkış noktası uygundur.
    if (exitCol !== startCol || exitRow !== startRow) {
        return;
    } else {
        // Başlangıç noktasıyla aynı hücredeyse tekrar seç
        chooseRandomExit();
    }
}

// Çıkış noktasını rastgele seç
chooseRandomExit();
    }
}

// Labirenti oluştur
generateMaze();

// Topun başlangıç pozisyonunu ve hareketini izlemek için değişkenler ekleyin
var container = document.getElementById("container");
var ball = document.getElementById("ball");
var kayaElements = document.querySelectorAll(".kaya");
var ballX = startCol * 100 + 50; // Başlangıç hücresinin merkezi
var ballY = startRow * 100 + 50; // Başlangıç hücresinin merkezi
var ballXSpeed = 0;
var ballYSpeed = 0;

// Klavye girişlerini izlemek için bir nesne oluşturun
var Keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

// Klavye tuşlarının basılmasını ve bırakılmasını dinlemek için olay dinleyicilerini ekleyin
function useLettersAndArrows() {
    window.addEventListener("keydown", function (event) {
        var key = event.key;
        if (key === "ArrowUp" || key === "w") {
            Keys.up = true;
        } else if (key === "ArrowDown" || key === "s") {
            Keys.down = true;
        } else if (key === "ArrowLeft" || key === "a") {
            Keys.left = true;
        } else if (key === "ArrowRight" || key === "d") {
            Keys.right = true;
        }
    });

    window.addEventListener("keyup", function (event) {
        var key = event.key;
        if (key === "ArrowUp" || key === "w") {
            Keys.up = false;
        } else if (key === "ArrowDown" || key === "s") {
            Keys.down = false;
        } else if (key === "ArrowLeft" || key === "a") {
            Keys.left = false;
        } else if (key === "ArrowRight" || key === "d") {
            Keys.right = false;
        }
    });
}

// Topun pozisyonunu güncelleyen bir zamanlayıcı kullan
// Topun pozisyonunu güncelleyen bir zamanlayıcı kullan
function updateBallPosition() {
    var prevX = ballX;
    var prevY = ballY;

    if (Keys.left) {
        ballXSpeed = -1;
    } else if (Keys.right) {
        ballXSpeed = 1;
    } else {
        ballXSpeed = 0;
    }

    if (Keys.up) {
        ballYSpeed = -1;
    } else if (Keys.down) {
        ballYSpeed = 1;
    } else {
        ballYSpeed = 0;
    }

    // Yeni pozisyonu hesapla
    var newBallX = ballX + ballXSpeed;
    var newBallY = ballY + ballYSpeed;

    // Yeni pozisyon topun sınırlar içinde mi kontrol et
    var withinBoundsX = newBallX >= 0 && newBallX <= container.clientWidth - ball.clientWidth;
    var withinBoundsY = newBallY >= 0 && newBallY <= container.clientHeight - ball.clientHeight;

    if (withinBoundsX && withinBoundsY) {
        // Yeni pozisyon topun hareket etmesine izin veriyorsa güncelle
        if (!checkCollision(newBallX, newBallY)) {
            ballX = newBallX;
            ballY = newBallY;
        }
    }

    // Topun çıkışa ulaşıp ulaşmadığını kontrol et
    if (ballX === exitCol * 100 && ballY === exitRow * 100) {
        alert("Tebrikler! Labirenti başarıyla geçtin.");
        resetGame();  // Oyunu sıfırla
    }

    // Topun ekran sınırları içinde kalmasını sağla
    ballX = Math.min(container.clientWidth - ball.clientWidth, Math.max(0, ballX));
    ballY = Math.min(container.clientHeight - ball.clientHeight, Math.max(0, ballY));

    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
}
// Topun hareketi sırasında duvarlarla çarpışmayı kontrol eden fonksiyon
function checkCollision(newX, newY) {
    var ballRect = ball.getBoundingClientRect();

    for (var i = 0; i < kayaElements.length; i++) {
        var kayaRect = kayaElements[i].getBoundingClientRect();

        if (
            newX + ballRect.width >= kayaRect.left &&
            newX <= kayaRect.right &&
            newY + ballRect.height >= kayaRect.top &&
            newY <= kayaRect.bottom
        ) {
            return true;  // Çarpışma varsa true döndür
        }
    }

    return false;  // Çarpışma yoksa false döndür
}

// Oyunu sıfırlamak için bir fonksiyon
function resetGame() {
    ballX = startCol * 100;
    ballY = startRow * 100;
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
    Keys = {
        up: false,
        down: false,
        left: false,
        right: false
    };
}

// Topun pozisyonunu düzenli olarak güncelleyen bir zamanlayıcı kullan
setInterval(updateBallPosition, 5);

// Klavye girişlerini izleyen fonksiyonu kullan
useLettersAndArrows();