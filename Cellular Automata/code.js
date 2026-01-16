//Préparation de la grille de la simulation
let cellSize = 20;
let columnCount;
let rowCount;
let currentCells = [];
let nextCells = [];

// Variables en rapport avec le bouton
let running = false;
let startButton;

/*
* La fonction setup met en place la grille
*/
function setup() {
  frameRate(15);
  createCanvas(1420, 800);

  columnCount = floor(width / cellSize);
  rowCount = floor(height / cellSize);

  for (let column = 0; column < columnCount; column++) {
    currentCells[column] = [];
    nextCells[column] = [];
    for (let row = 0; row < rowCount; row++) {
      currentCells[column][row] = 0;
      nextCells[column][row] = 0;
    }
  }

  startButton = createButton("Start");
  startButton.mousePressed(toggleSimulation);

  // La fonction permet de stopper la fonction draw(), qu'elle ne se lance uniquement qu'au bouton
  noLoop();
}

/*
* La fonction draw() sert à mettre à jour la grille par rapport à l'état des cellules
*/
function draw() {
  if (running) {
    generate();
  }

  background(255);

  for (let column = 0; column < columnCount; column++) {
    for (let row = 0; row < rowCount; row++) {
      let cell = currentCells[column][row];
      fill(cell ? 0 : 255);
      stroke(0);
      rect(column * cellSize, row * cellSize, cellSize, cellSize);
    }
  }
}

/* 
* La fonction qui permet de choisir les cellules vivantes avant de lancer la simulation
*/
function mousePressed() {
  // Si la simulation est en cours, il est impossible d'ajouter de nouvelles cellules en vie
  if (running) return;

  let column = floor(mouseX / cellSize);
  let row = floor(mouseY / cellSize);

  if (
    column >= 0 &&
    column < columnCount &&
    row >= 0 &&
    row < rowCount
  ) {
    currentCells[column][row] = 1 - currentCells[column][row];
    redraw();
  }
}

/*
* La fonction qui se trouve derrière le bouton, il permet de lancer ou de mettre en pause la simulation
*/
function toggleSimulation() {
  running = !running;
  startButton.html(running ? "Stop" : "Start");

  if (running) {
    // Lancer la simulation
    loop();
  } else {
    // Mettre en pause
    noLoop();
  }
}

/*
* Le coeur de la simulation, la fonction qui, pour chaque cellule, va regarde son état actuel, 
*/
function generate() {
  for (let column = 0; column < columnCount; column++) {
    for (let row = 0; row < rowCount; row++) {
      // Les modulos permettent de sortir de la grille et de revenir de l'autre côté
      let left = (column - 1 + columnCount) % columnCount;
      let right = (column + 1) % columnCount;
      let above = (row - 1 + rowCount) % rowCount;
      let below = (row + 1) % rowCount;
      
      // Si une ligne de trois, le milieu en dessous devient noir
      if (currentCells[left][above] == 1 &&
        currentCells[column][above]  == 1 &&
        currentCells[right][above] == 1 &&
        currentCells[right][row] == 0 &&
        currentCells[left][row] == 0) {
        nextCells[column][row] = 1;
      } 
      
      // Si une cellule seule est vivante au dessus, ::naitre::
      else if (currentCells[column][above]  == 1) {
        nextCells[column][row] = 1;
      }
      
      // Si gauche morte et droite et haut vivant, mourir
      else if  (currentCells[left][row] == 0 &&
        currentCells[right][row] == 1 &&
        currentCells[column][below] == 1) {
        nextCells[column][row] = 0;
      } 
      
      // Si droite morte et gauche et haut vivant, mourir
      else if  (currentCells[left][row] == 1 &&
        currentCells[right][row] == 0 &&
        currentCells[column][below] == 1) {
        nextCells[column][row] = 0;
      } 
      
      
      // Si coin gauche supérieur est en vie, mourir
      else if  (currentCells[left][row] == 1 &&
        currentCells[left][above] == 1 &&
        currentCells[column][above] == 1) {
        nextCells[column][row] = 0;
      } 
      
      //Si coin supérieur droit est en vie, mourir
      else if  (currentCells[right][row] == 1 &&
        currentCells[right][above] == 1 &&
        currentCells[column][above] == 1) {
        nextCells[column][row] = 0;
      }
      
      // Si gauche, droite et bas en vie, mourir
      else if(currentCells[right][row] == 1 &&
        currentCells[left][row] == 1 &&
        currentCells[column][below] == 1) {
        nextCells[column][row] = 0;      
      }
      
      // Si droite en vie, naître
      else if(currentCells[right][row] == 1) {
        nextCells[column][row] = 1;      
      }
      
      // Si gauche en vie, naître
      else if(currentCells[left][row] == 1) {
        nextCells[column][row] = 1;      
      }

      // Sinon, l'état ne change pas
      else {
        nextCells[column][row] = currentCells[column][row];
      }
    }
  }

  let temp = currentCells;
  currentCells = nextCells;
  nextCells = temp;
}
