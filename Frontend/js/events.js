const apiUrl = "http://localhost:5145/api/Event";

fetch(apiUrl)
    .then(response => response.json())
    .then(events => {

        const container =
            document.getElementById("eventsContainer");

        container.innerHTML = "";

        events.forEach(event => {

            const imageUrl =
                event.imageUrl &&
                event.imageUrl.trim() !== ""
                ? event.imageUrl
                : "https://images.unsplash.com/photo-1501386761578-eac5c94b800a";

            container.innerHTML += `

            <div class="card">

                <img
                    src="${imageUrl}"
                    alt="${event.eventName}"
                    class="event-image">

                <div class="card-body">

                    <h3>${event.eventName}</h3>

                    <p>🎤 ${event.artist}</p>

                    <p>📍 ${event.venue}</p>

                    <p>
                        📅
                        ${new Date(event.date)
                            .toLocaleDateString()}
                    </p>

                    <div class="price">
                        ₹${event.price}
                    </div>

                    <button
                        class="book-btn"
                        onclick="bookEvent(${event.eventId})">

                        Book Now

                    </button>

                </div>

            </div>

            `;
        });

    })
    .catch(error =>
        console.error(error)
    );

const searchBox =
    document.getElementById("searchBox");

searchBox.addEventListener(
    "keyup",
    function () {

        const searchValue =
            searchBox.value.toLowerCase();

        const cards =
            document.querySelectorAll(".card");

        cards.forEach(card => {

            const text =
                card.innerText.toLowerCase();

            card.style.display =
                text.includes(searchValue)
                    ? "block"
                    : "none";
        });
    }
);