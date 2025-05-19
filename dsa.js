// login
let users = [
    { username: "user1", password: "pass1" },
    { username: "user2", password: "pass2" }
];

function login(username, password) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            return { status: "success", message: "Login successful", user: users[i] };
        }
    }
    return { status: "failed", message: "Invalid credentials" };
}

// bus cat n details
let buses = {
    luxury: [
        { busName: "Luxury-21", price: 500, availableSeats: 30 },
        { busName: "Luxury-22", price: 500, availableSeats: 30 },
        { busName: "Luxury-23", price: 500, availableSeats: 30 },
        { busName: "Luxury-24", price: 500, availableSeats: 30 }
    ],
    aircon: [
        { busName: "Aircon-31", price: 400, availableSeats: 30 },
        { busName: "Aircon-32", price: 400, availableSeats: 30 },
        { busName: "Aircon-33", price: 400, availableSeats: 30 },
        { busName: "Aircon-34", price: 400, availableSeats: 30 }
    ],
    minibus: [
        { busName: "Mini-41", price: 300, availableSeats: 20 },
        { busName: "Mini-42", price: 300, availableSeats: 20 },
        { busName: "Mini-43", price: 300, availableSeats: 20 },
        { busName: "Mini-44", price: 300, availableSeats: 20 }
    ],
    uux: [
        { busName: "UUX-51", price: 600, availableSeats: 25 },
        { busName: "UUX-52", price: 600, availableSeats: 25 },
        { busName: "UUX-53", price: 600, availableSeats: 25 },
        { busName: "UUX-54", price: 600, availableSeats: 25 }
    ]
};

// reservations
let reservations = [];

// reserve seat
function reserveSeat(category, busIndex, seatNumber, name) {
    let bus = buses[category][busIndex];

    for (let i = 0; i < reservations.length; i++) {
        if (
            reservations[i].passenger === name &&
            reservations[i].busName === bus.busName &&
            reservations[i].seatNumber === seatNumber
        ) {
            return "This seat is already reserved by you.";
        }
    }

    if (bus.availableSeats <= 0) {
        return "No available seats.";
    }

    reservations.push({
        passenger: name,
        category: category,
        busName: bus.busName,
        seatNumber: seatNumber,
        price: bus.price,
        paid: false,
        paymentPhoto: null // to store payment proof photo
    });

    bus.availableSeats--;
    return "Seat reserved successfully!";
}

// cancel seat
function cancelSeat(name, busName, seatNumber) {
    for (let i = 0; i < reservations.length; i++) {
        if (
            reservations[i].passenger === name &&
            reservations[i].busName === busName &&
            reservations[i].seatNumber === seatNumber
        ) {
            reservations.splice(i, 1);

            for (let cat in buses) {
                for (let j = 0; j < buses[cat].length; j++) {
                    if (buses[cat][j].busName === busName) {
                        buses[cat][j].availableSeats++;
                        break;
                    }
                }
            }
            return "Reservation canceled!";
        }
    }
    return "Reservation not found.";
}

// photo payment n upload
function makePayment(name, busName, seatNumber, paymentPhoto) {
    for (let i = 0; i < reservations.length; i++) {
        if (
            reservations[i].passenger === name &&
            reservations[i].busName === busName &&
            reservations[i].seatNumber === seatNumber
        ) {
            reservations[i].paid = true;
            reservations[i].paymentPhoto = paymentPhoto; // store photo filename or URL
            return "Payment completed and photo uploaded!";
        }
    }
    return "Reservation not found for payment.";
}

// print reservation
function printReservations() {
    if (reservations.length === 0) {
        console.log("No reservations yet.");
        return;
    }
    for (let i = 0; i < reservations.length; i++) {
        let r = reservations[i];
        console.log(`Passenger: ${r.passenger}`);
        console.log(`Bus: ${r.busName} (${r.category})`);
        console.log(`Seat Number: ${r.seatNumber}`);
        console.log(`Price: ₱${r.price}`);
        console.log(`Paid: ${r.paid ? "Yes" : "No"}`);
        console.log(`Payment Photo: ${r.paymentPhoto ? r.paymentPhoto : "None"}`);
        console.log("-----");
    }
}
