const apiBase = "http://localhost:5145/api";

// Admin Validation

const role = localStorage.getItem("role");

if (role !== "admin") {

    alert("Access Denied! Admin Login Required.");

    window.location.href = "login.html";
}

// Load Events

async function loadEvents() {

    try {

        const response =
            await fetch(`${apiBase}/Event`);

        const events =
            await response.json();

        const container =
            document.getElementById("adminEventsContainer");

        container.innerHTML = "";

        events.forEach(event => {

            container.innerHTML += `

            <div class="card">

                <div class="card-body">

                    <h3>${event.eventName}</h3>

                    <p>🎤 ${event.artist}</p>

                    <p>📍 ${event.venue}</p>

                    <p>📅 ${new Date(event.date).toLocaleDateString()}</p>

                    <p>₹${event.price}</p>

                    <br>

                    <button onclick="editEvent(
                        ${event.eventId},
                        '${event.eventName}',
                        '${event.artist}',
                        '${event.date}',
                        '${event.venue}',
                        ${event.price}
                    )">
                        Edit
                    </button>

                    <button onclick="deleteEvent(${event.eventId})">
                        Delete
                    </button>

                </div>

            </div>

            `;
        });

    }
    catch (error) {

        console.error(error);
    }
}

// Add Event
async function addEvent() {

    const dateValue =
        document.getElementById("date").value;

    if (!dateValue) {

        alert("Please select Date and Time");

        return;
    }

    const eventData = {

        eventName:
            document.getElementById("eventName").value,

        artist:
            document.getElementById("artist").value,

        date: dateValue,

        venue:
            document.getElementById("venue").value,

        price:
            parseFloat(
                document.getElementById("price").value
            ),

        imageUrl:
"https://images.unsplash.com/photo-1501386761578-eac5c94b800a"
    };

    console.log("Sending:", eventData);

    try {

        const response =
            await fetch(
                `${apiBase}/Admin/event`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(eventData)
                });

        const result =
            await response.text();

        console.log("Status:",
            response.status);

        console.log("Response:",
            result);

        if (response.ok) {

            alert(
                "Event Added Successfully"
            );

            clearForm();

            loadEvents();

        } else {

            alert(result);
        }

    }
    catch (error) {

        console.error(error);
    }
}
// Edit Event

function editEvent(
    id,
    name,
    artist,
    date,
    venue,
    price
) {

    document.getElementById("eventId").value = id;

    document.getElementById("eventName").value = name;

    document.getElementById("artist").value = artist;

    document.getElementById("date").value =
        date.substring(0, 16);

    document.getElementById("venue").value = venue;

    document.getElementById("price").value = price;
}

// Update Event

async function updateEvent() {

    const id =
        document.getElementById("eventId").value;

   const eventData = {

    eventName:
        document.getElementById("eventName").value,

    artist:
        document.getElementById("artist").value,

    date:
        document.getElementById("date").value,

    venue:
        document.getElementById("venue").value,

    price:
        parseFloat(
            document.getElementById("price").value
        ),

    imageUrl:
"https://images.unsplash.com/photo-1501386761578-eac5c94b800a"
};
    try {

        const response =
            await fetch(
                `${apiBase}/Admin/event/${id}`,
                {

                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(eventData)

                });

        if (response.ok) {

            alert("Event Updated Successfully");

            clearForm();

            loadEvents();
        }

    }
    catch (error) {

        console.error(error);
    }
}

// Delete Event

async function deleteEvent(id) {

    const confirmDelete =
        confirm("Are you sure?");

    if (!confirmDelete)
        return;

    try {

        const response =
            await fetch(
                `${apiBase}/Admin/event/${id}`,
                {
                    method: "DELETE"
                });

        if (response.ok) {

            alert("Event Deleted Successfully");

            loadEvents();
        }

    }
    catch (error) {

        console.error(error);
    }
}

// Clear Form

function clearForm() {

    document.getElementById("eventId").value = "";

    document.getElementById("eventName").value = "";

    document.getElementById("artist").value = "";

    document.getElementById("date").value = "";

    document.getElementById("venue").value = "";

    document.getElementById("price").value = "";
}

// Initial Load

loadEvents();