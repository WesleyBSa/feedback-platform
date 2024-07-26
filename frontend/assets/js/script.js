document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const user = document.getElementById('user').value;
    const content = document.getElementById('content').value;
    const rating = document.getElementById('rating').value;

    fetch('/feedbacks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user, content, rating })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Feedback submitted:', data);
        alert('Thank you for your feedback!');
        document.getElementById('feedback-form').reset();
    })
    .catch(error => console.error('Error:', error));
});
