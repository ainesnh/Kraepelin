document.addEventListener('DOMContentLoaded', function() {
    var timerDisplay = document.getElementById('timer');
    var timerInterval;
    var seconds = 0;
    var minutes = 0;
    var quizNumber = 1; // Track quiz number
    var correctCount = 0;
    var falseCount = 0;

    startButton.addEventListener('click', function() {
		console.log("Button clicked");
		startQuiz();
	});


    function startQuiz() {
        clearInterval(timerInterval);
        seconds = 0;
        minutes = 0;
        correctCount = 0;
        falseCount = 0;
        //updateResult(); // Update result display before resetting
        timerDisplay.textContent = formatTime(minutes) + ':' + formatTime(seconds);
        timerInterval = setInterval(updateTimer, 1000); // Update timer every second

        // Start the quiz logic
        startQuizLogic();
    }

    function updateResult() {
        // Update the HTML with the last quiz result
        var resultDiv = document.getElementById('result');
        resultDiv.innerHTML += "Result of Quiz " + (quizNumber) + ": Correct - " + correctCount + ", Incorrect - " + falseCount + "<br>";
    }

    function updateTimer() {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }
        timerDisplay.textContent = formatTime(minutes) + ':' + formatTime(seconds);

        // Check if 30 seconds have passed
        if (seconds % 30 === 0) {
            updateResult(); // Update result display before resetting
            quizNumber++; // Move to the next quiz
            correctCount = 0; // Reset correct count
            falseCount = 0; // Reset false count
            startQuizLogic(); // Restart the quiz
        }
    }

    function formatTime(time) {
        return time < 10 ? '0' + time : time;
    }

    // Quiz logic
    var numbers = [];
    var currentIndex = 0;
    var output = document.getElementById('output');

    function startQuizLogic() {
        // Generate an array of random numbers from 0 to 9
        numbers = [];
        for (var i = 0; i < 60; i++) {
            numbers.push(Math.floor(Math.random() * 10));
        }
        currentIndex = 0;
        updateBold();
        document.getElementById('sumInput').focus();
    }

    function checkSum() {
        var sumInput = document.getElementById('sumInput').value;

        if (sumInput === '') {
            return; // If input is empty, do nothing
        }

        // Get the expected sum (consider only the last digit if it's a two-digit number)
        var expectedSum = (numbers[currentIndex] + numbers[currentIndex + 1]) % 10;

        // Update counts
        if (parseInt(sumInput) === expectedSum) {
            correctCount++;
        } else {
            falseCount++;
        }

        document.getElementById('correctCount').textContent = correctCount;
        document.getElementById('falseCount').textContent = falseCount;

        // Clear input field
        document.getElementById('sumInput').value = '';

        // Slide the numbers
        currentIndex++;
        if (currentIndex + 1 < numbers.length) {
            updateBold();
        }

        // Focus on the sum input
        document.getElementById('sumInput').focus();
    }

    // Update bold styling
    function updateBold() {
        output.innerHTML = ''; // Clear previous content

        if (currentIndex > 0) {
            output.innerHTML += '<span class="blur">' + numbers[currentIndex - 1] + '</span>';
            output.innerHTML += ' <span class="blur">+</span> ';
        }

        // Display the first number without blur
        output.innerHTML += '<span class="highlight">' + numbers[currentIndex] + '</span>';
        output.innerHTML += '<span class="blur">+</span> ';
        output.innerHTML += '<span class="highlight">' + numbers[currentIndex + 1] + '</span>';

        if (currentIndex + 2 < numbers.length) {
            output.innerHTML += ' <span class="blur">+</span> ';
            output.innerHTML += '<span class="blur">' + numbers[currentIndex + 2] + '</span>';
        }
    }

    // Listen for the Enter key press to check the sum
    document.getElementById('sumInput').addEventListener('keyup', function(event) {
        if (event.keyCode === 13) { // Enter key code
            checkSum();
        }
    });
});
