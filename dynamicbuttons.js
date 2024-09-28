document.getElementById('proceedButton').addEventListener('click', function() {
    // Clear the body content
    document.body.innerHTML = '';

    // Create the main row div
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    
    // Create the play button
    const playButton = document.createElement('button');
    playButton.id = 'btnPlay';
    playButton.classList.add('btn', 'waves-effect', 'waves-light');

    // Create the play icon inside the play button
    const playIcon = document.createElement('i');
    playIcon.id = 'playPauseIcon';
    playIcon.classList.add('material-symbols-outlined');
    playIcon.textContent = 'play_arrow';  // Set the icon text

    // Append the icon to the play button
    playButton.appendChild(playIcon);

    // Create the stop button
    const stopButton = document.createElement('button');
    stopButton.id = 'btnStop';
    stopButton.classList.add('btn', 'waves-effect', 'waves-light');

    // Create the stop icon inside the stop button
    const stopIcon = document.createElement('i');
    stopIcon.classList.add('material-symbols-outlined');
    stopIcon.textContent = 'stop';  // Set the icon text

    // Append the icon to the stop button
    stopButton.appendChild(stopIcon);

    // Append play and stop buttons to the row div
    rowDiv.appendChild(playButton);
    rowDiv.appendChild(stopButton);

    // Append the row div to the body
    document.body.appendChild(rowDiv);

    // Create the floating action button container
    const fabDiv = document.createElement('div');
    fabDiv.classList.add('fixed-action-btn');

    // Create the floating play button
    const floatingPlayButton = document.createElement('a');
    floatingPlayButton.id = 'floatingPlay';
    floatingPlayButton.classList.add('btn-floating', 'btn-large', 'waves-effect', 'waves-light', 'red');

    // Create the icon for the floating play button
    const floatingPlayIcon = document.createElement('i');
    floatingPlayIcon.id = 'floatingPlayIcon';
    floatingPlayIcon.classList.add('large', 'material-symbols-outlined');
    floatingPlayIcon.textContent = 'play_arrow';

    // Append the floating play icon to the floating button
    floatingPlayButton.appendChild(floatingPlayIcon);

    // Append the floating button to the fab container
    fabDiv.appendChild(floatingPlayButton);

    // Append the fab container to the body
    document.body.appendChild(fabDiv);

    // Create the "Download HTML" button
    const downloadButton = document.createElement('button');
    downloadButton.id = 'btnDownload';
    downloadButton.classList.add('btn', 'waves-effect', 'waves-light', 'blue');
    downloadButton.textContent = 'Download HTML';

    // Append the download button to the body
    document.body.appendChild(downloadButton);

    // Reinitialize Materialize components
    M.AutoInit();

    // Get the play/pause icons
    let isPlaying = false;

    // Function to toggle between play and pause icons
    function togglePlayPause() {
        playIcon.textContent = isPlaying ? 'play_arrow' : 'pause';
        floatingPlayIcon.textContent = isPlaying ? 'play_arrow' : 'pause';
        isPlaying = !isPlaying;

        // If starting to play
        if (isPlaying) {
            playToneSequence();
        }
    }

    // Function to reset both icons to play_arrow
    function resetToPlay() {
        isPlaying = false;
        playIcon.textContent = 'play_arrow';
        floatingPlayIcon.textContent = 'play_arrow';
        // Stop the sound
        Tone.Transport.stop();
    }

    // Add event listeners for play and stop buttons
    playButton.addEventListener('click', togglePlayPause);
    floatingPlayButton.addEventListener('click', togglePlayPause);
    stopButton.addEventListener('click', resetToPlay);

    // Load Material Icons dynamically
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Add event listener to download HTML
    downloadButton.addEventListener('click', downloadHTML);

});

// Function to play a sequence of notes using Tone.js
function playToneSequence() {
    // Create a synth and connect it to the master output (speakers)
    const synth = new Tone.Synth().toDestination();

    // Define a sequence of notes
    const notes = ["C4", "E4", "G4", "C5"];

    // Play the notes at regular intervals
    let index = 0;
    Tone.Transport.scheduleRepeat((time) => {
        synth.triggerAttackRelease(notes[index % notes.length], "8n", time);
        index++;
    }, "4n");

    // Start the Tone.js Transport
    Tone.Transport.start();
}

// Function to download the displayed HTML content
function downloadHTML() {
    // Full HTML content with external references
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Play Music with Tone.js</title>
    <style>
        body, html {
            height: 100%;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
    </style>
    <!-- Materialize CSS -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" rel="stylesheet">
    <!-- Tone.js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.39/Tone.min.js"></scr` + `ipt>
    <!-- JS from CDN (replace this with actual CDN link if needed) -->
    <script src="https://cdn.example.com/path/to/your/js/app.js"></scr` + `ipt>
</head>
<body>
${document.body.innerHTML}
<!-- Materialize JS & jQuery -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></scr` + `ipt>
</body>
</html>
`;

    // Create a blob with the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' });

    // Create a temporary link element
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'page.html'; // Set the file name

    // Programmatically click the link to trigger the download
    a.click();

    // Cleanup: remove the link element
    URL.revokeObjectURL(a.href);
}
