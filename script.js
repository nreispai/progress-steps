// Get references to all buttons with class 'btn'
const btns = document.querySelectorAll(".btn");

// Get a reference to the container holding the progress steps
const progressContainer = document.querySelector(".progress-container");

// Get a collection of the children of the progress container (the individual steps)
const progressContainerChildren = progressContainer.children;

// Initialize a counter to keep track of the current step
let stepsCounter = 1;

// Get the total number of steps
const steps = Array.from(progressContainerChildren).length - 1;

// Get a reference to the progress bar
const progressBar = document.querySelector("#progress");

// Function to move the progress line
function moveProgressLine(e) {
  // If the 'next' button is clicked
  if (e.target.id === "next") {
    let madeActive = false;

    // Disable 'next' button if we're at the last step
    if (stepsCounter + 1 === steps) {
      e.target.disabled = true;
    }

    // Enable 'prev' button if we're beyond the first step
    if (stepsCounter > 0) {
      e.target.previousElementSibling.disabled = false;
    }

    // Iterate over each child (step) in the progress container
    for (let child of Array.from(progressContainerChildren)) {
      // If the child is a circle (a step)
      if (child.classList.contains("circle")) {
        // If the next step is not active, make it active
        if (
          !madeActive &&
          child.nextElementSibling &&
          !child.nextElementSibling.classList.contains("active")
        ) {
          child.nextElementSibling.classList.add("active");
          madeActive = true;
          let progressBarWidth = stepsCounter * 25;
          progressBar.style.width = `${progressBarWidth}%`;
        }
      }
    }
    // Increase the counter for the next step
    stepsCounter++;
  }

  // If the 'prev' button is clicked
  if (e.target.id === "prev") {
    // If we're at the second step, disable the 'prev' button
    if (stepsCounter <= 2) {
      e.target.disabled = true;
    }

    // If we're beyond the first step, enable the 'next' button
    if (stepsCounter > 1) {
      e.target.nextElementSibling.disabled = false;
    }

    const child = Array.from(progressContainerChildren)[stepsCounter - 1];
    if (child.classList.contains("circle")) {
      if (child.classList.contains("active")) {
        // If the step is active, remove 'active' from the next step
        child.nextElementSibling.classList.remove("active");
        let progressBarWidth = (stepsCounter - 2) * 25;
        progressBar.style.width = `${progressBarWidth}%`;
      }
    }

    // Decrease the counter for the previous step
    stepsCounter--;
  }
}

// Add event listeners to all the buttons, to call moveProgressLine() when clicked
btns.forEach((btn) => {
  btn.addEventListener("click", moveProgressLine);
});
