export async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// converts space (" ") in a word to underscore and vice versa
export function sanitizeBeatName(beatName, withUnderScore = true) {
    const targetIdx = beatName.indexOf(".wav") === -1 ? beatName.length : beatName.indexOf(".wav")
    const name = beatName.toLowerCase().substring(0, targetIdx)

    return withUnderScore ? name.replaceAll(" ", "_") : name.replaceAll("_", " ")
}

export const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
}
