document.getElementById('contact-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(this); // Collect form data
    const data = Object.fromEntries(formData); // Convert FormData to a regular object

    try {
        // Send the data to the API endpoint
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Specify content type as JSON
            },
            body: JSON.stringify(data) // Convert the data object to JSON
        });

        // Handle the response
        if (!response.ok) {
            // If response is not ok, throw an error
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || 'Failed to send email.');
        }

        // Parse the JSON result
        const result = await response.json();
        // Display the success message
        document.getElementById('response').textContent = result.success || 'Email sent successfully!';
    } catch (error) {
        // Display any errors that occur
        document.getElementById('response').textContent = error.message || 'An error occurred. Please try again later.';
    }
});
