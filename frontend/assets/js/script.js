document.getElementById('feedback-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = document.getElementById('user').value;
    const content = document.getElementById('content').value;
    const ratingInput = document.querySelector('input[name="rating"]:checked');

    if (!ratingInput) {
        alert('Please select a rating');
        return;
    }

    const rating = parseInt(ratingInput.value);

    const feedback = { user, content, rating };

    try {
        const response = await fetch('/feedbacks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(feedback)
        });

        if (response.ok) {
            alert('Feedback submitted successfully');
            document.getElementById('feedback-form').reset();
        } else {
            alert('Failed to submit feedback');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting feedback.');
    }
});
