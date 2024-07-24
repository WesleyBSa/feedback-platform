document.addEventListener("DOMContentLoaded", function() {
    fetch("/admin/feedbacks")
        .then(response => response.json())
        .then(feedbacks => {
            console.log(feedbacks);  // Adicione este log para verificar a estrutura dos dados
            const feedbackList = document.getElementById("feedback-list");
            feedbackList.innerHTML = feedbacks.map(feedback => `
                <div class="feedback-item" data-id="${feedback.ID}">
                    <p><strong>${feedback.User || "Unknown User"}</strong>: ${feedback.Content || "No content"}</p>
                    <button onclick="editFeedback(${feedback.ID})">Edit</button>
                    <button class="delete" onclick="deleteFeedback(${feedback.ID})">Delete</button>
                </div>
            `).join("");
        })
        .catch(error => console.error("Error fetching feedbacks:", error));
});

function editFeedback(id) {
    const content = prompt("Enter new content:");
    if (content) {
        fetch(`/admin/feedbacks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ content })
        })
        .then(response => response.json())
        .then(updatedFeedback => {
            const feedbackItem = document.querySelector(`.feedback-item[data-id="${id}"] p`);
            feedbackItem.innerHTML = `<strong>${updatedFeedback.User || "Unknown User"}</strong>: ${updatedFeedback.Content || "No content"}`;
        })
        .catch(error => console.error("Error editing feedback:", error));
    }
}

function deleteFeedback(id) {
    fetch(`/admin/feedbacks/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        const feedbackItem = document.querySelector(`.feedback-item[data-id="${id}"]`);
        feedbackItem.remove();
    })
    .catch(error => console.error("Error deleting feedback:", error));
}
