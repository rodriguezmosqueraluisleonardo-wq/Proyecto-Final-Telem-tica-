const canvas = document.getElementById("game");

const ctx = canvas.getContext("2d");

const tileSize = 40;

const rows = 15;

const cols = 15;

let score = 0;

const map = [

[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
[1,0,1,1,1,0,0,1,0,0,1,1,1,0,1],
[1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
[1,1,1,0,1,1,1,1,1,0,1,0,1,1,1],
[1,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
[1,0,1,1,1,1,1,0,1,1,1,1,1,0,1],
[1,0,0,0,0,0,1,0,0,0,0,0,1,0,1],
[1,1,1,1,1,0,1,1,1,1,1,0,1,0,1],
[1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
[1,0,1,0,1,1,1,1,1,0,1,1,1,0,1],
[1,0,1,0,0,0,0,0,1,0,0,0,1,0,1],
[1,0,1,1,1,1,1,0,1,1,1,0,1,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

];

let pacman = {

    x: 1,
    y: 1
};

let ghost = {

    x: 13,
    y: 13
};

document.addEventListener("keydown", movePacman);

function drawMap() {

    for(let y = 0; y < rows; y++) {

        for(let x = 0; x < cols; x++) {

            if(map[y][x] === 1) {

                ctx.fillStyle = "blue";

                ctx.fillRect(
                    x * tileSize,
                    y * tileSize,
                    tileSize,
                    tileSize
                );
            }

            if(map[y][x] === 0) {

                ctx.fillStyle = "white";

                ctx.beginPath();

                ctx.arc(
                    x * tileSize + tileSize / 2,
                    y * tileSize + tileSize / 2,
                    5,
                    0,
                    Math.PI * 2
                );

                ctx.fill();
            }
        }
    }
}

function drawPacman() {

    ctx.fillStyle = "yellow";

    ctx.beginPath();

    ctx.arc(
        pacman.x * tileSize + tileSize / 2,
        pacman.y * tileSize + tileSize / 2,
        15,
        0.2 * Math.PI,
        1.8 * Math.PI
    );

    ctx.lineTo(
        pacman.x * tileSize + tileSize / 2,
        pacman.y * tileSize + tileSize / 2
    );

    ctx.fill();
}

function drawGhost() {

    ctx.fillStyle = "red";

    ctx.beginPath();

    ctx.arc(
        ghost.x * tileSize + tileSize / 2,
        ghost.y * tileSize + tileSize / 2,
        15,
        0,
        Math.PI * 2
    );

    ctx.fill();
}

function movePacman(event) {

    let newX = pacman.x;

    let newY = pacman.y;

    if(event.key === "ArrowUp") {

        newY--;
    }

    if(event.key === "ArrowDown") {

        newY++;
    }

    if(event.key === "ArrowLeft") {

        newX--;
    }

    if(event.key === "ArrowRight") {

        newX++;
    }

    if(map[newY][newX] !== 1) {

        pacman.x = newX;

        pacman.y = newY;

        if(map[newY][newX] === 0) {

            map[newY][newX] = 2;

            score += 10;

            document.getElementById("score").innerText = "Score: " + score;
        }
    }

    checkCollision();

    drawGame();
}

function moveGhost() {

    const directions = [

        [0,-1],
        [0,1],
        [-1,0],
        [1,0]
    ];

    const random = directions[Math.floor(Math.random() * directions.length)];

    let newX = ghost.x + random[0];

    let newY = ghost.y + random[1];

    if(map[newY][newX] !== 1) {

        ghost.x = newX;

        ghost.y = newY;
    }

    checkCollision();

    drawGame();
}

function checkCollision() {

    if(pacman.x === ghost.x && pacman.y === ghost.y) {

        alert("GAME OVER");

        location.reload();
    }

    let remaining = 0;

    for(let y = 0; y < rows; y++) {

        for(let x = 0; x < cols; x++) {

            if(map[y][x] === 0) {

                remaining++;
            }
        }
    }

    if(remaining === 0) {

        alert("YOU WIN");

        location.reload();
    }
}

function drawGame() {

    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawMap();

    drawPacman();

    drawGhost();
}

setInterval(moveGhost, 500);

drawGame();
