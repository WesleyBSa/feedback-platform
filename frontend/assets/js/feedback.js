document.getElementById('feedback-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = document.getElementById('user').value;
    const content = document.getElementById('content').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;

    const feedback = {
        user,
        content,
        rating: parseInt(rating)
    };

    const response = await fetch('/feedbacks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedback)
    });

    if (response.ok) {
        alert('Feedback submitted successfully');
        document.getElementById('feedback-form').reset();
    } else {
        alert('Failed to submit feedback');
    }
});
