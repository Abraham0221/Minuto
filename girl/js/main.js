document.addEventListener('DOMContentLoaded', function() {
    const timerInput = document.getElementById('timerInput')
    const overlay = document.querySelector('.overlay')
    const timerButton = document.querySelector('.btn')
    const timerContainer = document.querySelector('.timerContainer')
    const timerDisplay = document.getElementById('timer')
    let countdown; 

    // Format display time function - converts seconds to HH:MM:SS
    function formatTime(totalSeconds){
        const hours = Math.floor(totalSeconds / 3600)
        const minutes = Math.floor((totalSeconds % 3600) / 60)
        const seconds = totalSeconds % 60

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    // Parse input time (accepts formats like "01:30:00" or "90:00" or "5400")
    function parseTimeInput(input) {
        // Check if input is just a number (assuming seconds)
        if (/^\d+$/.test(input.trim())) {
            return parseInt(input.trim())
        }

        // Handle time format like HH:MM:SS or MM:SS
        const timeParts = input.trim().split(':').map(part => parseInt(part))

        if(timeParts === 3){
            // HH:MM:SS format
            return timeParts[0] * 3600 + timePdarts[1] * 60 + timeParts[2]
        }else if(timeParts === 2){
            // MM:SS format
            return timeParts[0] * 60 + timeParts[1]
        }
        return 0 // Default if no valid format detected
    }
    // Function to activate countdown mode UI
    function activateCountdownMode() {
        // Make video greyish and transparent
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
        overlay.style.position = 'absolute'
        overlay.style.top = '0'
        overlay.style.left = '0'
        overlay.style.width = '100%'
        overlay.style.height = '100%'
        overlay.style.zIndex = '1'

        // Hide the input container
        timerContainer.style.opacity = '0'
        timerContainer.style.transition = 'opacity 0.5s ease'
        timerContainer.style.pointerEvents = 'none' // Disable input interaction during countdown

        // Style the timer display to be big and centered
        timerDisplay.style.position = 'absolute'
        timerDisplay.style.top = '50%'
        timerDisplay.style.left = '50%'
        timerDisplay.style.transform = 'translate(-50%, -50%)'
    }

    // Function to deactiviate countdown mode UI
    function deactivateCountdownMode(){
        overlay.style.backgroundColor = ''
        overlay.style.position = ''
        overlay.style.top = ''
        overlay.style.left = ''
        overlay.style.width = ''
        overlay.style.height = ''
        overlay.style.zIndex = ''

        // Hide the input container
        timerContainer.style.opacity = ''
        timerContainer.style.transition = ''
        timerContainer.style.pointerEvents = '' // Disable input interaction during countdown

        // Style the timer display to be big and centered
        timerDisplay.style.position = ''
        timerDisplay.style.top = ''
        timerDisplay.style.left = ''
        timerDisplay.style.transform = ''

        timerInput.value = '';
        timerInput.focus();
    }
    // Function to start countdown
    function startCountdown(totalSeconds){

        if(countdown){
            clearInterval(countdown)
        }
        let secondsRemaining = totalSeconds

        activateCountdownMode()
        timerDisplay.textContent = formatTime(secondsRemaining)

        countdown = setInterval(() => {
            secondsRemaining -= 1
            timerDisplay.textContent = formatTime(secondsRemaining)

            if(secondsRemaining <= 0){
                clearInterval(countdown)
                deactivateCountdownMode()
                alert('Time is up!')
            }
        }, 1000)
    }

    timerButton.addEventListener('click', function(){
        const input = timerInput.value
        const totalSeconds = parseTimeInput(inputValue)
        if(!inputValue) return;

        if(totalSeconds > 0){
            startCountdown(totalSeconds)
        }else{
            alert('Please enter a valid time format (HH:MM:SS, MM:SS, or seconds)')
        }
    })
    timerInput.addEventListener('keydown', function(event){
        if(event.key === 'Enter'){
            timerButton.click()
        }
    })
})

