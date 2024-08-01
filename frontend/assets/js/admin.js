document.addEventListener("DOMContentLoaded", function() {
    fetchFeedbacks(); // Carrega feedbacks ao inicializar a página

    document.getElementById("generate-report").addEventListener("click", function() {
        fetch("/admin/report")
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                a.download = "feedback_report.pdf";
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => console.error("Error generating report:", error));
    });

    // Adiciona evento para o filtro
    document.getElementById("rating-filter").addEventListener("change", function() {
        fetchFeedbacks(this.value); // Passa o valor do filtro para a função
    });
});

function fetchFeedbacks(rating = '') {
    const url = rating ? `/admin/feedbacks?rating=${rating}` : '/admin/feedbacks';
    fetch(url)
        .then(response => response.json())
        .then(feedbacks => {
            const feedbackList = document.getElementById("feedback-list");
            feedbackList.innerHTML = feedbacks.map(feedback => `
                <div class="feedback-item" data-id="${feedback.ID}">
                    <p><strong>${feedback.user || "Unknown User"}</strong> (Rating: ${feedback.rating || "No Rating"}): ${feedback.content || "No content"}</p>
                    <button onclick="deleteFeedback(${feedback.ID})">Delete</button>
                </div>
            `).join("");
        })
        .catch(error => console.error("Error fetching feedbacks:", error));
}

function deleteFeedback(id) {
    fetch(`/admin/feedbacks/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        fetchFeedbacks(); // Atualiza a lista de feedbacks após a exclusão
    })
    .catch(error => console.error("Error deleting feedback:", error));
}
