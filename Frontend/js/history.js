async function loadHistory() {

    const userId =
        localStorage.getItem("userId");

    const role =
        localStorage.getItem("role");

    let apiUrl = "";

    if (
        role &&
        role.toLowerCase() === "admin"
    ) {

        apiUrl =
            "http://localhost:5145/api/Booking/all";

    } else {

        apiUrl =
            `http://localhost:5145/api/Booking/user/${userId}`;
    }

    const response =
        await fetch(apiUrl);

    const bookings =
        await response.json();

    const container =
        document.getElementById(
            "historyContainer"
        );

    container.innerHTML = "";

    let totalAmount = 0;

    bookings.forEach(booking => {

        totalAmount +=
            booking.totalAmount;
container.innerHTML += `
<div class="booking-card">

    <h2>${booking.eventName}</h2>

    ${role.toLowerCase() === "admin" ? `
        <p><strong>👤 ${booking.userName}</strong></p>
        <p>📧 ${booking.email}</p>
    ` : ""}

    <p>🎤 ${booking.artist}</p>

    <p>📍 ${booking.venue}</p>

    <p>🎟 Tickets : ${booking.ticketCount}</p>

    <p>
        📅
        ${new Date(
            booking.bookingDate
        ).toLocaleDateString()}
    </p>

    <div class="amount">
        ₹${booking.totalAmount}
    </div>

</div>
`;
    });

    document.getElementById(
        "totalBookings"
    ).innerText =
        bookings.length;

    document.getElementById(
        "totalAmount"
    ).innerText =
        "₹" + totalAmount;
}

loadHistory();