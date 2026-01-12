//Dimensions de la fenêtre
let X = 640;
let Y = 400;
/*
* Il s'agit de la fonction centrale du projet qui permet d'exécuter le code au lancement
* Pour tester les fonctions il suffit de remplacer le nom de la fonction à la ligne 10
*/
function setup() {
  createCanvas(X, Y);
  tuez_moi();
}

/*
* Fonction qui permet de tracer la forme 1 "Lignes Epaisses"
* Il s'agit de tracer des rectangles de plus en plus petits avec un trait de plus en plus large
*/
function lignes_epaisses() {
  let N = 0;
  let D = 0;
  do {
    D = D +1;
    N=N+D+1;
    X=X-D-10;                
    Y=Y-D-10;

    //fonction qui permet de changer la taille du trait jusqu'à un nouvel appel de la fonction
    strokeWeight(D);

    //tracage des traits du rectangle trait par trait
    line(N, N, N, Y);
    line(N, Y, X, Y);
    line(X, Y, X, N);
    line(X, N, N, N);
  }
  while (N <= Y);
}

/*
* fonction qui permet de tracer la figure 5
* Je ne peux pas vous expliquer la figure, désolé :(
* La forme est coloriée dans un dégradé en partant du centre 
*/
function figure_cinq() {
  //Définition des couleurs du dégradé à l'avance
  let edgeColor = color('#ad5389');
  let centerColor = color('#3c1053'); 
  
  let A = X/2;
  let B = Y/2;

  //Création d'un R global pour le calcul de couleur
  let maxR = Y;
  
  for(let i = 1; i<11; i++) {
    
    let R = Y*0.7;
    
    for(let W = PI/4; W <=3.6; W=W+0.05){
      
      let X_draw = R*cos(W);
      let Y_draw = R*sin(W);

      //Fonctions qui permettent de calculer à quel endroit du dégradé on est et d'utiliser la bonne couleur
      let col = lerpColor(edgeColor, centerColor, R / maxR);
      stroke(col);
      
      line(A+X_draw, B-Y_draw, A-Y_draw, B-X_draw);
      line(A-Y_draw, B-X_draw, A-X_draw, B+X_draw);
      line(A-X_draw, B+Y_draw, A+X_draw, B-Y_draw);
      line(A-X_draw, B+Y_draw, A+Y_draw, B+X_draw);
      line(A+Y_draw, B+X_draw, A+X_draw, B-Y_draw);
      R=R*0.94;
    }
  }
}

/*
* Il s'agit de ma fonction personnelle, plus d'explications dans le readme.
*/
function tuez_moi(){
  A = Y/2;
  B = X/2;
  
  //Losange extérieur
  line(0,A,B,0);
  line(B,0,X,A);
  line(X,A,B,Y);
  line(B,Y,0,A);

  //Palette de couleurs
  let colors = ['#f72585', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0'];
  
  // Nombre de points pris pour tracer les segments
  let n = 15;

  // Boucle de création des segments/aplats de couleur de la partie supérieure gauche
  for (let i = 0; i < n; i++) {
    let t1 = i / n;
    let t2 = (i + 1) / n;

    // Calcul des coordonnées des deux points
    let x1 = lerp(0, B, t1);
    let y1 = lerp(A, 0, t1);
    let x2 = lerp(0, B, t2);
    let y2 = lerp(A, 0, t2);
    
    // Choix de la couleur pour l'aplat
    fill(colors[i % colors.length]);

    // Fonction qui retire les bords de l'aplat
    noStroke();

    // Creation du triangle dans lequel appliquer la couleur
    // vertex permet de lui donner les points qui ferment le triangle et donc de où appliquer la couleur
    beginShape();
    vertex(x1, y1);
    vertex(x2, y2);
    vertex(B, A);
    endShape(CLOSE);
  }

  // Boucle de création des segments/aplats de couleur de la partie supérieure droite
  // Il s'agit de la même chose que la boucle au dessus donc pas de commentaires redondants
  for (let i = 0; i < n; i++) {
    let t1 = i / n;
    let t2 = (i + 1) / n;

    // Les paramètres changent car les points ne suivent plus le même segment
    let x1 = lerp(B, X, t1);
    let y1 = lerp(0, A, t1);
    let x2 = lerp(B, X, t2);
    let y2 = lerp(0, A, t2);
    
    fill(colors[i % colors.length]);
    noStroke();
    
    beginShape();
    vertex(x1, y1);
    vertex(x2, y2);
    vertex(B, A);
    endShape(CLOSE);
  }

  //Cette partie permet de colorier le fond de la moitié inférieur du losange
  //Merci Chatgpt
  fill('#000000');
  noStroke();
  beginShape();
  vertex(0, A);
  vertex(B, Y);
  vertex(X, A);
  endShape(CLOSE);
  //Fin du remerciement

  //Les deux boucles suivantes permettent de créer des traits
  //Qui convergent vers le centre du losange
  for (let i = 0; i < n; i++) {
    let t1 = pow(i / n, 2);

    let x1 = lerp(0, B, t1);
    let y1 = lerp(A, Y, t1);
    stroke('#8C00FF');
    line(x1,y1,B,A);
  }
  for (let i = 0; i < n; i++) {
    let t1 = pow(i / n, 2);

    let x1 = lerp(X, B, t1);
    let y1 = lerp(A, Y, t1);
    stroke('#8C00FF');
    line(x1,y1,B,A);
  }
}

let n = 15;             // Nombre de traits
let movement = 0;       // variable qui permet le déplacement
let speed = 0.002;      // vitesse du glissement

/*
* Fonction à n'utiliser uniquement que pour la fonction tuez_moi()
* Elle permet d'animer la grille et simuler le déplacement.
*/
function draw() {
  // On appelle la fonction principale pour qu'elle reste affichée
  tuez_moi();

  let A = Y / 2;
  let B = X / 2;

  stroke('#8C00FF');

  // boucle qui crée les traits horizontaux
  for (let i = 0; i < n; i++) {

    // On utilise ici pow pour créer une différence croissance entre les traits et pour créer la perspective
    let t = pow((i / n + movement) % 1,2);

    let xLeft = lerp(0, B, t);
    let yLeft = lerp(A, Y, t);
    let xRight = lerp(X, B, t);
    let yRight = lerp(A, Y, t);

    line(xLeft, yLeft, xRight, yRight);
  }

  // Incrementation qui permet le déplacement.
  movement += speed;
}
