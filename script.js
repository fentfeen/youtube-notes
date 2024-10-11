document.addEventListener("DOMContentLoaded", async () => {
    const accessCodeUrl = 'https://raw.githubusercontent.com/fentfeen/loollo/refs/heads/main/lloll'; // Update with your GitHub raw link
    let fetchedAccessCode = '';

    // Fetch the access code from GitHub
    try {
        const response = await fetch(accessCodeUrl);
        fetchedAccessCode = await response.text().trim(); // Fetches the latest access code
    } catch (error) {
        console.error("Error fetching access code:", error);
    }

    document.getElementById("access-btn").addEventListener("click", () => {
        const userAccessCode = document.getElementById("access-code").value.trim();
        
        if (userAccessCode === fetchedAccessCode) {
            // Hide access container and show main content
            document.getElementById("access-container").style.display = 'none';
            document.getElementById("main-container").style.display = 'block';
            logAccessData(); // Call function to log access data
        } else {
            document.getElementById("access-message").innerText = "Invalid access code. Please try again.";
        }
    });

    async function logAccessData() {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const ip = data.ip;

        // Fetch additional location data using ipinfo.io (or similar API)
        const locationResponse = await fetch(`https://ipinfo.io/${ip}/json?token=YOUR_IPINFO_TOKEN`);
        const locationData = await locationResponse.json();
        const { city, region, country } = locationData;

        // Log the information to Discord
        const webhookURL = 'YOUR_DISCORD_WEBHOOK_URL';
        const timeAccessed = new Date().toISOString();

        const embedData = {
            content: null,
            embeds: [{
                title: "New Access Log",
                fields: [
                    { name: "IP Address", value: ip },
                    { name: "Location", value: `${city}, ${region}, ${country}` },
                    { name: "Time Accessed", value: timeAccessed }
                ],
                color: 5814783
            }]
        };

        await fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(embedData)
        });
    }

    // Button functionality to convert YouTube video to notes
    document.getElementById("convert-btn").addEventListener("click", () => {
        const videoUrl = document.getElementById("video-url").value;
        // Call backend for notes conversion
    });
});
