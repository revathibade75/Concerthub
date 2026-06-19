async function bookEvent(eventId) {

    const userId =
        localStorage.getItem("userId");

    if (!userId) {

        alert("Please Login First");

        window.location.href = "login.html";

        return;
    }

    const bookingData = {

        userId: parseInt(userId),

        eventId: eventId,

        ticketCount: 1
    };

    try {

        const response = await fetch(
            "http://localhost:5145/api/Booking",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(bookingData)
            }
        );

        if (response.ok) {

            alert(
                "Ticket Booked Successfully!"
            );

        } else {

            alert("Booking Failed!");
        }

    } catch (error) {

        console.error(error);

        alert("Error while booking");
    }
}