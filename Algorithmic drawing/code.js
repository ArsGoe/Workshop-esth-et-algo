let X = 640;
let Y = 400;

function setup() {
  createCanvas(X, Y);
  tuez_moi();
}

function lignes_epaisses() {
  let N = 0;
  let D = 0;
  do {
    D = D +1;
    N=N+D+1;
    X=X-D-10;                
    Y=Y-D-10;
    // Draw N,N To N,Y To X,Y To X,N To N,N
    strokeWeight(D);
    line(N, N, N, Y);
    line(N, Y, X, Y);
    line(X, Y, X, N);
    line(X, N, N, N);
  }
  while (N <= Y);
}

function figure_cinq() {
  let edgeColor = color('#ad5389');
  let centerColor = color('#3c1053'); 
  
  
  let A = X/2;
  let B = Y/2;
  let maxR = Y;
  for(let i = 1; i<11; i++) {
    let R = Y*0.7;
    for(let W = PI/4; W <=3.6; W=W+0.05){
      let X_draw = R*cos(W);
      let Y_draw = R*sin(W);
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

function tuez_moi(){
  A = Y/2;
  B = X/2;
  
  //Losange extérieur
  line(0,A,B,0);
  line(B,0,X,A);
  line(X,A,B,Y);
  line(B,Y,0,A);
  
  let colors = ['#f72585', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0'];
  
  let n = 15; // number of points

  for (let i = 0; i < n; i++) {
    let t1 = i / n;
    let t2 = (i + 1) / n;
    
    let x1 = lerp(0, B, t1);
    let y1 = lerp(A, 0, t1);
    let x2 = lerp(0, B, t2);
    let y2 = lerp(A, 0, t2);
    
    fill(colors[i % colors.length]);
    noStroke();
    
    beginShape();
    vertex(x1, y1);
    vertex(x2, y2);
    vertex(B, A);
    endShape(CLOSE);
  }
  for (let i = 0; i < n; i++) {
    let t1 = i / n;
    let t2 = (i + 1) / n;
    
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
  
  //Merci Chatgpt
  fill(50, 50, 50);
  noStroke();
  beginShape();
  vertex(0, A);
  vertex(B, Y);
  vertex(X, A);
  endShape(CLOSE);
  //Fin du remerciement
  
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

function draw() {
  tuez_moi();

  let A = Y / 2;
  let B = X / 2;

  stroke('#8C00FF');

  for (let i = 0; i < n; i++) {
    let t = pow((i / n + movement) % 1,2);

    let xLeft = lerp(0, B, t);
    let yLeft = lerp(A, Y, t);
    let xRight = lerp(X, B, t);
    let yRight = lerp(A, Y, t);

    line(xLeft, yLeft, xRight, yRight);
  }

  // Incrementation qui permet le déplacement.
  movement += speed;
  if (movement > 1) movement = 0;
}
