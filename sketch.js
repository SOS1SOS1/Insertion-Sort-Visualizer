
/*
*** Insertion Sort ***
-	Orders values by repetitively inserting a particular value into a
  sorted subset of the list
-	Consider 1st item to be a sorted sublist of length 1
-	Insert the 2nd item into the sublist, compare it with the 1st item,
  shift the 1st item if needed
-	Insert the 3rd item into the sublist, compare the 3rd item with the
  other items in the list, shift the other items if needed
-	Repeat until all values have been inserted into their proper positions
*/

let numbers = new Array(20);  // numbers to be sorted
let sortedListLength = 1;  // sorted sublist size
let compareIndex = 0;  // index being compared
let swapNeeded = false;  // false if no swap was needed on last comparison
let sorted = true;  // true initially and once list is sorted
let sortNumbers = false;  // true once sort button is pressed

// buttons for sorting and generating new numbers
let newNumbersButton;
let sortButton;

// width and height of the canvas
let w = window.innerWidth;
let h = 550;

// centers the bars that represent the numbers in the array
let start_x = w/2 - Math.floor((numbers.length-1) * 17 / 2);

function setup() {
  createCanvas(w, h);

  // sets up numbers array with random numbers (1-100)
  for (let i = 0; i < numbers.length; i++) {
    numbers[i] = Math.ceil(Math.random() * 100);
  }
  console.log("Initial Numbers: " + numbers);

  // sets the frame rate, used to control the speed of the animation
  frameRate(30);
}

function getRandomNumbers(newNumbersButton_id, sizeInput_id) {
  var newNumbersButton = document.getElementById(newNumbersButton_id);
  newNumbersButton.style.opacity =  "0.5";

  if (sorted) {
    var size = document.getElementById(sizeInput_id).value;
    if (numbers.length != size && size != '' && size > 0) {
      numbers = Array(int(size));
      start_x = w/2 - Math.floor((numbers.length-1) * 17 / 2);
    }

    // sets up numbers array with random numbers (1-100)
    for (let i = 0; i < numbers.length; i++) {
      numbers[i] = Math.ceil(Math.random() * 100);
    }
    console.log("Initial Numbers: " + numbers);
  }
}

function doSort(sortButton_id, speedInput_id) {
  var sortButton = document.getElementById(sortButton_id);
  sortButton.style.opacity =  "0.5";

  var speed = document.getElementById(speedInput_id).value;
  if (speed != '' && speed >= 1) {
    frameRate(int(speed));
  }

  if (sorted) {
    sorted = false;
    sortNumbers = true;
    sortedListLength = 1;
    compareIndex = 0;
  }
}

function changeOpacity(id) {
    var element = document.getElementById(id);
    element.style.opacity =  "1";
}

function draw() {// background of canvas
  background(255);
  // line width
  strokeWeight(12);
  // rounds ends of lines
  strokeCap(SQUARE);

  for (let i = 0; i < numbers.length; i++) {
    if (i == compareIndex || i == compareIndex-1) {
      if (!sorted && sortNumbers) {
        // sets stroke color to light gray for numbers being compared
        stroke(130, 130, 130);
      } else {
        stroke(78, 162, 163);
      }
    } else {
      // sets stroke color to teal for numbers not being compared
      stroke(78, 162, 163);
    }

    let x = i * 17 + start_x;
    let length = numbers[i] * 5;
    line(x, 0, x, length);
  }

  if (!sorted && sortNumbers) {
    insertionSort();
  }
}

function insertionSort() {
  // if it compared it with all the numbers in the sorted sublist or no swap was needed on the last comparison
  if (compareIndex == 0 || swapNeeded == false) {
    // it increases the sorted sublist size
    sortedListLength++;
    // and updates the compare index to be the newly added element
    compareIndex = sortedListLength - 1;
    // if it has reached the end of the list
    if (sortedListLength == numbers.length + 1) {
      // then all elements have been sorted
      sorted = true;
    }
  } else {
    // otherwise it decrements the compare index and resets the swapNeeded variable for the next comparison
    compareIndex--;
    swapNeeded = false;
  }

  // compares newly added number with sorted sublist
  if (numbers[compareIndex] < numbers[compareIndex-1]) {
    // if number on right is smaller than number on left it swaps them
    let temp = numbers[compareIndex];
    numbers[compareIndex] = numbers[compareIndex-1];
    numbers[compareIndex-1] = temp;
    swapNeeded = true;
  }
}
