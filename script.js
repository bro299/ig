document.addEventListener('DOMContentLoaded', () => {
    const videoUrlInput = document.getElementById('videoUrl');
    const pasteBtn = document.getElementById('pasteBtn');
    const submitBtn = document.getElementById('submitBtn');

    pasteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navigator.clipboard.readText()
            .then(text => {
                videoUrlInput.value = text.trim();
            })
            .catch(err => {
                console.error('Failed to read clipboard contents: ', err);
            });
    });

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const videoUrl = videoUrlInput.value.trim();

        fetch('/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: videoUrl })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                window.location.href = data.downloadUrl;
            } else {
                alert('Failed to download video. Please check the URL and try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to download video. Please try again later.');
        });
    });
});
