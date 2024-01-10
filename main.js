let courseNumber = 0;

function createDiv() {
    courseNumber += 1;
    // Create a new div element
    const newDiv = document.createElement("div");

    // Set some attributes for the div (you can customize these)
    newDiv.className = "addedCourses";
    newDiv.innerHTML = `
    <p>Course ${courseNumber}</p>
    
    <label for="grade${courseNumber}">Select Grade:</label>
    <select id="grade${courseNumber}" onchange="updateGPA()">
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="F">F</option>
    </select>
    
    <label for="type${courseNumber}">Select Type:</label>
    <select id="type${courseNumber}" onchange="updateGPA()">
        <option value="Normal">Normal</option>
        <option value="Accelerated">Accelerated</option>
        <option value="Honors/AP">Honors/AP</option>
    </select>
    <hr>
    <center>
        <br>
        <label> GPA Value: </label>
        <br>
        <label id="gradeNum${courseNumber}">4.00</label>
        <br>
        <br>
        <button class="deleteButton" onclick="deleteCourse(${courseNumber})">x</button>
    </center>`;

    // Append the new div to the body
    document.getElementById('holder').appendChild(newDiv);

    // Update GPA immediately after adding a new course
    updateGPA();
}

function deleteCourse(courseNum) {
    // Remove the course div
    const courseDiv = document.getElementById(`gradeNum${courseNum}`).parentNode.parentNode;
    courseDiv.parentNode.removeChild(courseDiv);

    // Decrease courseNumber after deleting a course
    courseNumber -= 1;

    // Update GPA after deleting a course
    updateGPA();
}

function updateGPA() {
    const calculatedWeightedGPA = calculateWeightedGPA();
    const calculatedUnweightedGPA = calculateUnweightedGPA();

    // Update the overall GPA display
    document.getElementById('calculated').innerText = calculatedWeightedGPA;
    document.getElementById('calculated-unweighted').innerText = calculatedUnweightedGPA;

    // Update the GPA values for each course
    for (let i = 1; i <= courseNumber; i++) {
        const gradeNumLabel = document.getElementById(`gradeNum${i}`);
        const grade = document.getElementById(`grade${i}`).value;
        const type = document.getElementById(`type${i}`).value;

        let courseGPA = 0.0;

        if (type === 'Honors/AP') {
            courseGPA = (grade === 'A' ? 5.0 : (grade === 'B' ? 4.0 : (grade === 'C' ? 3.0 : (grade === 'D' ? 1.0 : 0.0))));
        } else if (type === 'Accelerated') {
            courseGPA = (grade === 'A' ? 4.5 : (grade === 'B' ? 3.5 : (grade === 'C' ? 2.5 : (grade === 'D' ? 1.0 : 0.0))));
        } else {
            courseGPA = (grade === 'A' ? 4.0 : (grade === 'B' ? 3.0 : (grade === 'C' ? 2.0 : (grade === 'D' ? 1.0 : 0.0))));
        }

        gradeNumLabel.innerText = courseGPA.toFixed(2);
    }
}


function calculateWeightedGPA() {
    let weightedGPA = 0.0;

    for (let i = 1; i <= courseNumber; i++) {
        const grade = document.getElementById(`grade${i}`).value;
        const type = document.getElementById(`type${i}`).value;

        if (type === 'Honors/AP') {
            weightedGPA += (grade === 'A' ? 5.0 : (grade === 'B' ? 4.0 : (grade === 'C' ? 3.0 : (grade === 'D' ? 1.0 : 0.0))));
        } else if (type === 'Accelerated') {
            weightedGPA += (grade === 'A' ? 4.5 : (grade === 'B' ? 3.5 : (grade === 'C' ? 2.5 : (grade === 'D' ? 1.0 : 0.0))));
        } else {
            weightedGPA += (grade === 'A' ? 4.0 : (grade === 'B' ? 3.0 : (grade === 'C' ? 2.0 : (grade === 'D' ? 1.0 : 0.0))));
        }
    }

    if (courseNumber > 0) {
        weightedGPA /= courseNumber;
    }

    return weightedGPA.toFixed(2);
}

function calculateUnweightedGPA() {
    let unweightedGPA = 0.0;

    for (let i = 1; i <= courseNumber; i++) {
        const grade = document.getElementById(`grade${i}`).value;

        unweightedGPA += (grade === 'A' ? 4.0 : (grade === 'B' ? 3.0 : (grade === 'C' ? 2.0 : (grade === 'D' ? 1.0 : 0.0))));
    }

    if (courseNumber > 0) {
        unweightedGPA /= courseNumber;
    }

    return unweightedGPA.toFixed(2);
}

// Initial GPA update
updateGPA();
