/**
 * Function to play sound based on keyboard event.
 *
 * @param {Object} event - The keyboard event object.
 * @param {number} event.keyCode - The key code of the pressed key.
 * @param {boolean} event.altKey - Indicates whether the alt key was pressed.
 * @param {boolean} event.shiftKey - Indicates whether the shift key was pressed.
 *
 * @returns {void}
 */
function playSound ({ keyCode, altKey, shiftKey }) {
  // Get the audio element associated with the pressed key
  // The 'data-key' attribute of the audio element should match the keyCode
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`)

  // If no audio element is found, return early from the function
  if (!audio) return

  // Get the corresponding key element
  const key = document.querySelector(`div[data-key="${keyCode}"]`)

  // If the key element is already playing, return early from the function
  if (key.classList.contains('playing')) return

  // Change transition duration
  key.style.transition = 'all 0.07s ease'

  // Add the 'playing' class to the key element
  key.classList.add('playing')

  // Determine the starting point of the audio playback based on the keyboard modifiers
  // If the shift key is pressed, start from the beginning of the audio
  // If the alt key is pressed, start from 85% of the audio duration
  // If neither the shift key nor the alt key is pressed, start from 95% of the audio duration
  audio.currentTime = shiftKey
    ? 0
    : altKey
      ? audio.duration - (audio.duration * 0.85)
      : audio.duration - (audio.duration * 0.95)

  // Play the audio element
  audio.play()
}

/**
 * Function to stop the sound associated with a keyboard event.
 *
 * @param {Object} event - The keyboard event object.
 * @param {number} event.keyCode - The key code of the pressed key.
 *
 * @returns {void}
 */
function stopSound ({ keyCode }) {
  // Get the audio element associated with the pressed key
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`)

  // Get the corresponding key element
  const key = document.querySelector(`div[data-key="${keyCode}"]`)

  // If no audio element is found, return early from the function
  if (!audio) return

  // The duration of the transition is set to the remaining time of the audio playback
  key.style.transition = `all ${audio.duration - audio.currentTime}s ease`

  // Remove the 'playing' class from the key element
  key.classList.remove('playing')
}

// Add event listeners to the keyboard keys to trigger the playSound and stopSound functions
window.addEventListener('keydown', playSound)
window.addEventListener('keyup', stopSound)

// ---------------------------- DEMO BUTTON ---------------------------- //
