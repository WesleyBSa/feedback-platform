document.addEventListener("DOMContentLoaded", function() {
    fetch("/admin/feedbacks")
        .then(response => response.json())
        .then(feedbacks => {
            console.log(feedbacks); 
            const feedbackList = document.getElementById("feedback-list");
            feedbackList.innerHTML = feedbacks.map(feedback => `
                <div class="feedback-item" data-id="${feedback.ID}">
                    <p><strong>${feedback.user || "Unknown User"}</strong>: ${feedback.content || "No content"}</p>
                    <button onclick="deleteFeedback(${feedback.ID})">Delete</button>
                </div>
            `).join("");
        })
        .catch(error => console.error("Error fetching feedbacks:", error));

    document.getElementById("generate-report").addEventListener("click", function() {
        fetch("/admin/report")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.blob();
            })
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
});

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
