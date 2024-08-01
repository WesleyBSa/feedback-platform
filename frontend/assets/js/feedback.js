document.getElementById('feedback-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = document.getElementById('user').value;
    const content = document.getElementById('content').value;
    const rating = document.getElementById('rating').value; // Alterado para acessar o input numérico

    // Verifica se o rating está vazio ou não é um número válido
    if (!rating || isNaN(rating)) {
        alert('Please provide a valid rating');
        return;
    }

    const feedback = {
        user,
        content,
        rating: parseInt(rating, 10) // Garantir que o rating seja convertido para inteiro
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
