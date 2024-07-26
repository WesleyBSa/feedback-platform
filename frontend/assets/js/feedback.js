document.getElementById("feedback-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {
        user: formData.get("user"),
        content: formData.get("content"),
        rating: parseInt(formData.get("rating"), 10)
    };

    fetch("/feedbacks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log("Feedback submitted:", result);
        // Optional: clear form
        this.reset();
        // Optional: reload admin feedbacks if admin page is open
        if (window.location.pathname === "/admin") {
            fetchFeedbacks();
        }
    })
    .catch(error => console.error("Error submitting feedback:", error));
});
