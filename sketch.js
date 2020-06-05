let cities = [];
var totalcities = 8;
let minDistance;
var bestEver;
let order = [];
let totalpermutations;
let count = 0;

function setup() {
  createCanvas(600, 600);

  for (var i = 0; i < totalcities; i++) {
    var v = createVector(random(width), random(height / 2));
    cities[i] = v;
    order[i] = i;
  }

  var d = calcDistance(cities, order);
  minDistance = d;
  bestEver = order.slice();
  console.log(minDistance);
  totalpermutations = factorial(totalcities);
  //console.log(totalpermutations);
}

function draw() {
  background(0);

  for (var i = 0; i < cities.length; i++) {
    stroke(255);
    ellipse(cities[i].x, cities[i].y, 8, 8);
  }

  beginShape();
  for (var i = 0; i < order.length; i++) {
    strokeWeight(3);
    noFill();
    stroke(255, 0, 0);
    let n = bestEver[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();

  translate(0, height / 2);
  beginShape();
  for (var i = 0; i < order.length; i++) {
    strokeWeight(1);
    stroke(255, 100);
    noFill();
    let n = order[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();

  var d = calcDistance(cities, order);
  if (d < minDistance) {
    minDistance = d;
    console.log(minDistance);
    bestEver = order.slice();
  }

  textSize(30);

  //background(0);
  //let s = "";
  let percent = 100 * (count / totalpermutations);
  // for (var i = 0; i < order.length; i++) {
  //   s += order[i];
  // }
  fill(255);
  text(nf(percent, 0, 2) + " % completed", 20, height / 2 - 50);
  text("Best Distance : " + nf(minDistance, 0, 2), 290, height / 2 - 50);
  nextOrder();
}

function calcDistance(points, order) {
  let sum = 0;
  for (var i = 0; i < order.length - 1; i++) {
    let cityAindex = order[i];
    let cityA = points[cityAindex];
    let cityBindex = order[i + 1];
    let cityB = points[cityBindex];
    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}

function nextOrder() {
  //console.log(order);
  count++;
  let largestI = -1;
  for (var i = 0; i < order.length - 1; i++) {
    if (order[i] < order[i + 1]) {
      largestI = i;
    }
  }
  if (largestI == -1) {
    noLoop();
    console.log("Finished");
  }

  let largestJ = -1;
  for (var j = 0; j < order.length; j++) {
    if (order[largestI] < order[j]) {
      largestJ = j;
    }
  }

  swap(order, largestI, largestJ);

  let endArr = order.splice(largestI + 1);
  endArr.reverse();
  order = order.concat(endArr);
}

function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function factorial(n) {
  if (n == 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
