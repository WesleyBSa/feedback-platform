document.getElementById('feedback-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = document.getElementById('user').value;
    const content = document.getElementById('content').value;
    const rating = document.querySelector('input[name="rating"]:checked')?.value; // Adicionado o operador de encadeamento opcional

    if (!rating) { // Verifique se o rating está selecionado
        alert('Please select a rating.');
        return;
    }

    const feedback = {
        user,
        content,
        rating: parseInt(rating)
    };

    try {
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
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting feedback.');
    }
});
