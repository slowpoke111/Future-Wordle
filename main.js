async function fetchWordleSolution(future = 1) {
    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setUTCDate(today.getUTCDate() + future);

    const year = targetDate.getUTCFullYear();
    const month = String(targetDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(targetDate.getUTCDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    const url = `https://www.nytimes.com/svc/wordle/v2/${dateStr}.json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.solution;
    } catch (error) {
        console.error('Error fetching the Wordle solution:', error);
        return null;
    }
}

async function main() {
    for (let i = 0; i < 32; i++) {
        const word = await fetchWordleSolution(i);
        console.log(`${i}: ${word}`);
    }
}

main();
