const playlist = document.getElementById('playlist'); // Reference to the playlist element
const songAudioElements = {}; // Object to store song audio elements and their playing state

function playPauseSong(songId, playButtonId) {
  const songAudioElement = document.getElementById(songId); // Get the audio element for the song
  const playButton = document.getElementById(playButtonId); // Get the play/pause button for the song

  if (songAudioElement.paused) { // If the song is currently paused
    playButton.classList.remove('fa-play'); // Remove the play icon
    playButton.classList.add('fa-pause'); // Add the pause icon
    songAudioElement.play(); // Play the song
    songAudioElements[songId] = true; // Mark the song as playing in the songAudioElements object
  } else { // If the song is currently playing
    playButton.classList.remove('fa-pause'); // Remove the pause icon
    playButton.classList.add('fa-play'); // Add the play icon
    songAudioElement.pause(); // Pause the song
    songAudioElements[songId] = false; // Mark the song as paused in the songAudioElements object
  }

  // Pause any other playing songs (optional for exclusive playback)
  for (const [otherSongId, isPlaying] of Object.entries(songAudioElements)) {
    if (otherSongId !== songId && isPlaying) {
      const otherSongAudioElement = document.getElementById(otherSongId);
      const otherPlayButton = document.querySelector([onclick*="${otherSongId}"]); // Select the play button associated with the other song using attribute selector
      otherSongAudioElement.pause();
      songAudioElements[otherSongId] = false;
      otherPlayButton.classList.remove('fa-pause');
      otherPlayButton.classList.add('fa-play');
    }
  }
}

// Add event listeners to all song play/pause buttons
const playButtons = document.querySelectorAll('.play-btn i'); // Select all play/pause buttons
playButtons.forEach(button => button.addEventListener('click', () => {
  const songId = button.parentElement.parentElement.id; // Get song ID from the parent element's ID
  const playButtonId = button.id; // Get the button's ID
  playPauseSong(songId, playButtonId);
}));

// Handle potential errors during audio playback (e.g., missing audio files)
window.addEventListener('error', (event) => {
  if (event.target.tagName.toLowerCase() === 'audio') {
    console.error('Error loading audio:', event.target.src);
    // Optionally display an error message to the user
  }
});