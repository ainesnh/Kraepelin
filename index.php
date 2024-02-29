<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Game</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <div id="timer">00:00</div>
        <button id="startButton">Mulai</button>
    </header>
    <div class="container">
        <div class="square">
            <div id="output"></div>
            <input type="text" id="sumInput" placeholder="Jawaban . . ">
            <div id="message"></div>
            <div>Benar : <span id="correctCount">0</span></div>
            <div>Salah : <span id="falseCount">0</span></div>
            <div id="result"></div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
