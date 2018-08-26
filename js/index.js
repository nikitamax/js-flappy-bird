const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");


const bird = new Image();
const background = new Image();
const foreground = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

bird.src = "img/flappy_bird_bird.png";
background.src = "img/flappy_bird_bg.png";
foreground.src = "img/flappy_bird_fg.png";
pipeUp.src = "img/flappy_bird_pipeUp.png";
pipeBottom.src = "img/flappy_bird_pipeBottom.png";

const gap = 100;

document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 35;
}

const pipe = [];
pipe[0] = {
    x: canvas.width,
    y: 0
};

let score = 0;

let xPos = 10;
let yPos = 150;
let grav = 1.5;



function render() {
    context.drawImage(background, 0, 0);
    

    for (let i = 0; i < pipe.length; i++) {
        context.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        context.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if (pipe[i].x == 100) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        if (xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
            || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
            || yPos + bird.height >= canvas.height - foreground.height
        ) {
            alert("You LOSER!");
            location.reload();
        }

        if (pipe[i].x == 5) {
            score++; 
        }
    }
    
    context.drawImage(foreground, 0, canvas.height - foreground.height);
    context.drawImage(bird, xPos, yPos);

    context.fiilStyle = "#000";
    context.font = "22px Arial";
    context.fillText("Score: " + score, 10 , canvas.height - 10);

    yPos += grav;
    requestAnimationFrame(render);
}

pipeBottom.onload = render;

