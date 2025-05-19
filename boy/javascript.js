// Timer functionality for boyPage.html
document.addEventListener('DOMContentLoaded', function() {
    const timerInput = document.getElementById('timerInput');
    const timerButton = document.querySelector('.btn');
    const timerDisplay = document.getElementById('timer');
    const videoContainer = document.querySelector('.video-container');
    const timerContainer = document.querySelector('.timerContainer');
    const overlay = document.querySelector('.overlay');
    let countdown;
    
    // Format display time function - converts seconds to HH:MM:SS
    function formatTime(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Parse input time (accepts formats like "01:30:00" or "90:00" or "5400")
    function parseTimeInput(input) {
        // Check if input is just a number (assuming seconds)
        if (/^\d+$/.test(input.trim())) {//\d means a digit (0–9), + means one or more digits
            return parseInt(input.trim());
        }
        
        // Handle time format like HH:MM:SS or MM:SS
        const timeParts = input.trim().split(':').map(part => parseInt(part));
        
        if (timeParts.length === 3) {
            // HH:MM:SS format
            return timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];
        } else if (timeParts.length === 2) {
            // MM:SS format
            return timeParts[0] * 60 + timeParts[1];
        }
        
        return 0; // Default if no valid format detected
    }
    
    // Function to activate countdown mode UI
    function activateCountdownMode() {
        // Make video greyish and transparent
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.zIndex = '1';
        
        // Hide the input container
        timerContainer.style.opacity = '0';
        timerContainer.style.transition = 'opacity 0.5s ease';
        timerContainer.style.pointerEvents = 'none'; // Disable input interaction during countdown
        
        // Style the timer display to be big and centered
        timerDisplay.style.position = 'absolute';
        timerDisplay.style.top = '50%';
        timerDisplay.style.left = '50%';
        timerDisplay.style.transform = 'translate(-50%, -50%)';
        timerDisplay.style.fontSize = '120px';
        timerDisplay.style.color = 'white';
        timerDisplay.style.fontFamily = '"Playfair Display", serif';
        timerDisplay.style.fontWeight = 'bold';
        timerDisplay.style.textAlign = 'center';
        timerDisplay.style.zIndex = '2';
        timerDisplay.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)';
    }
    
    // Function to deactivate countdown mode UI
    function deactivateCountdownMode() {
        // Remove overlay
        overlay.style.backgroundColor = '';
        overlay.style.position = '';
        overlay.style.top = '';
        overlay.style.left = '';
        overlay.style.width = '';
        overlay.style.height = '';
        overlay.style.zIndex = '';
        
        // Show the input container again
        timerContainer.style.opacity = '';
        timerContainer.style.pointerEvents = '';
        timerContainer.styel.transition = ''; // Re-enable input interaction
        
        // Reset timer display
        timerDisplay.style.position = '';
        timerDisplay.style.top = '';
        timerDisplay.style.left = '';
        timerDisplay.style.transform = '';
        timerDisplay.style.fontSize = '';
        timerDisplay.style.color = '';
        timerDisplay.style.fontFamily = '';
        timerDisplay.style.fontWeight = '';
        timerDisplay.style.textAlign = '';
        timerDisplay.style.zIndex = '';
        timerDisplay.style.textShadow = '';
        
        // Clear the input field for a new entry
        timerInput.value = '';
        timerInput.focus();
    }
    
    // Start countdown function
    function startCountdown(totalSeconds) {
        // Clear any existing countdown
        if (countdown) {
            clearInterval(countdown);
        }
        
        let secondsRemaining = totalSeconds;
        
        // Activate the countdown UI mode
        activateCountdownMode();
        
        // Update display immediately before starting interval
        timerDisplay.textContent = formatTime(secondsRemaining);
        
        // Set up interval to update every second
        countdown = setInterval(() => {
            secondsRemaining--;
            
            // Update display
            timerDisplay.textContent = formatTime(secondsRemaining);
            
            // Check if we've reached zero
            if (secondsRemaining <= 0) {
                clearInterval(countdown);
                timerDisplay.textContent = 'FINISHED';
                setTimeout(() => {
                    // Reset the timer display after a short delay
                    timerDisplay.textContent = '';
                    deactivateCountdownMode();
                }, 1000);
            }
        }, 1000);
    }
    
    // Event listener for the Enter button
    timerButton.addEventListener('click', function() {
        const inputValue = timerInput.value;
        if (!inputValue) return;
        
        const totalSeconds = parseTimeInput(inputValue);
        if (totalSeconds > 0) {
            startCountdown(totalSeconds);
        } else {
            alert('Please enter a valid time format (HH:MM:SS, MM:SS, or seconds)');
        }
    });
    
    // Allow pressing Enter key in the input field to start the timer
    timerInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            timerButton.click();
        }
    });
});