// Check if there is a saved theme preference
const savedTheme = localStorage.getItem('theme');

// Apply the saved theme or use the default
document.body.className = savedTheme ? savedTheme : 'light-theme';

// Toggle the theme when the switch is clicked
const themeToggle = document.getElementById('theme-toggle');
themeToggle.checked = document.body.className === 'dark-theme';

themeToggle.addEventListener('change', function() {
    if (this.checked) {
        document.body.className = 'dark-theme';
        localStorage.setItem('theme', 'dark-theme');
    } else {
        document.body.className = 'light-theme';
        localStorage.setItem('theme', 'light-theme');
    }
});

// script.js
document.getElementById('generate-button').addEventListener('click', function() {
    const data = document.getElementById('data-input').value;
    const resolution = document.getElementById('resolution-input').value;

    if (!data || !resolution || isNaN(resolution)) {
        alert('Please enter valid data and resolution.');
        return;
    }

    const qrImage = document.getElementById('qr-image');
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=${resolution}x${resolution}&data=${data}`;

    document.getElementById('input-section').classList.add('hidden');
    document.getElementById('qr-section').classList.remove('hidden');
});

document.getElementById('generate-again-button').addEventListener('click', function() {
    document.getElementById('input-section').classList.remove('hidden');
    document.getElementById('qr-section').classList.add('hidden');
    document.getElementById('data-input').value = '';
    document.getElementById('resolution-input').value = '';
});

document.getElementById('download-button').addEventListener('click', function() {
    const qrImage = document.getElementById('qr-image');

    fetch(qrImage.src)
        .then(response => response.blob())
        .then(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'qr-code.png';
            link.click();
            URL.revokeObjectURL(link.href);
        })
        .catch(error => {
            console.error('Error downloading QR code:', error);
        });
});