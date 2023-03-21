class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function inbounds(canvasShape, p) {
  return p.x >= 0 && p.x < canvasShape[0] && p.y >= 0 && p.y < canvasShape[1];
}

function findNeighbors(canvas, p, oldVal, newVal) {
  // north, south, east, west neighbors
  possibleNeighbors = [
    new Point(p.x, p.y + 1),
    new Point(p.x + 1, p.y),
    new Point(p.x - 1, p.y),
    new Point(p.x, p.y - 1),
  ];

  // exclude the neighbors that go out of bounds and should not be colored
  return possibleNeighbors.filter(
    (possibleNeighbor) =>
      inbounds(possibleNeighbor) &&
      canvas[possibleNeighbor.x][possibleNeighbor.y] == oldVal
  );
}

function stackFill(canvas, p, oldVal, newVal) {
  if (oldVal == newVal) {
    return;
  }
  stack = [p];

  while (stack.length) {
    curLoc = stack.pop();
    canvas[curLoc.x][curLoc.y] = newVal;
    stack += findNeighbors(canvas, curLoc, oldVal, newVal);
  }
}

function queueFill(canvas, p, oldVal, newVal) {
  if (oldVal == newVal) return;

  let queue = [p];

  canvas[p.x][p.y] = newVal;

  while (!q.empty()) {
    curLoc = q.shift();
    neighbors = findNeighbors(canvas, curLoc, oldVal, newVal);
    for (neighbor in neighbors) {
      canvas[neighbor.x][neighbor.y] = newVal;
      q.push(neighbor);
    }
  }
}

function recursiveFill(canvas, p, oldVal, newVal) {
  if (oldVal == newVal) return;

  canvas[p.x][p.y] = newVal;

  neighbors = findNeighbors(canvas, p, oldVal, newVal);
  for (neighbor in neighbors) recursiveFill(canvas, neighbor, oldVal, newVal);
}

const grid = [
  [0,0,0,0,0],
  [0,0,0,0,0],
  [1,1,1,1,1],
  [0,0,0,0,0],
  [0,0,0,0,0],
]

const answer= [
  [1,1,1,1,1],
  [1,1,1,1,1],
  [1,1,1,1,1],
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
]

let c0 = grid.copy()
let c1 = grid.copy()
let c2 = grid.copy()

const startLocation = new Point(0, 0);

recursiveFill(c0, startLocation, 0, 1);
queueFill(c1, startLocation, 0, 1);
stackFill(c2, startLocation, 0, 1);

assert(c0 == answer).all();
assert(c1 == answer).all();
assert(c2 == answer).all();

console.log("Tests Passed");
