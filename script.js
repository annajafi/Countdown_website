function countWeekdays(startDate, endDate) {
    let count = 0;
    let current = new Date(startDate);

    while (current <= endDate) {
        let day = current.getDay();
        if (day !== 0 && day !== 6) {
            count++;
        }
        current.setDate(current.getDate() + 1);
    }

    return count;
}

const output = document.getElementById("output");

function startCountdown() {
    const targetDate = output.dataset.date;
    const targetTime = output.dataset.time;
    const countdownName = output.dataset.name;
    const weekdaysOnly = output.dataset.weekdays === "true";

    if (!targetDate || !targetTime) {
        output.textContent = "No countdown set";
        return;
    }

    const target = new Date(`${targetDate}T${targetTime}`);

    function updateCountdown() {
        const now = new Date();
        const diff = target - now;

        if (diff <= 0) {
            output.textContent = `${countdownName} has ended`;
            return;
        }

        if (weekdaysOnly) {
            const weekdays = countWeekdays(now, target);
            output.textContent = `${countdownName}: ${weekdays} weekday(s) remaining`;
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        output.textContent = `${countdownName}: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

startCountdown();

const fileInput = document.getElementById("bgFile");
const button = document.getElementById("bgButton");

let currentImageURL = null;

button.addEventListener("click", function () {
    fileInput.click();
});

fileInput.addEventListener("change", function () {
    const file = fileInput.files[0];
    if (!file) return;

    if (currentImageURL) {
        URL.revokeObjectURL(currentImageURL);
    }

    currentImageURL = URL.createObjectURL(file);

    document.body.style.backgroundImage = `url('${currentImageURL}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
});