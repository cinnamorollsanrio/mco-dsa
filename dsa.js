// Users
let users = [
    { username: "user1", password: "pass1" },
    { username: "user2", password: "pass2" }
];

// Bus Categories
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

// Reservations
let reservations = [];

// Login
function login() {
    let username = prompt("Enter username:");
    let password = prompt("Enter password:");
    for (let user of users) {
        if (user.username === username && user.password === password) {
            alert("Login successful!");
            return username;
        }
    }
    alert("Invalid credentials.");
    return null;
}

// Choose category
function chooseCategory() {
    let category = prompt("Choose category (luxury, aircon, minibus, uux):").toLowerCase();
    if (!buses[category]) {
        alert("Invalid category.");
        return null;
    }

    let list = "Available buses:\n";
    buses[category].forEach((bus, i) => {
        list += `${i + 1}. ${bus.busName} - ₱${bus.price} - Seats: ${bus.availableSeats}\n`;
    });
    alert(list);

    let busIndex = parseInt(prompt("Choose a bus number:")) - 1;
    if (busIndex < 0 || busIndex >= buses[category].length) {
        alert("Invalid bus selection.");
        return null;
    }

    return { category, busIndex };
}

// Reserve a seat
function reserveSeat(name, category, busIndex) {
    let seatNumber = prompt("Enter seat number to reserve:");
    let bus = buses[category][busIndex];

    for (let r of reservations) {
        if (r.passenger === name && r.busName === bus.busName && r.seatNumber === seatNumber) {
            alert("Seat already reserved by you.");
            return;
        }
    }

    if (bus.availableSeats <= 0) {
        alert("No seats left.");
        return;
    }

    reservations.push({
        passenger: name,
        category,
        busName: bus.busName,
        seatNumber,
        price: bus.price,
        paid: false,
        paymentPhoto: null
    });

    bus.availableSeats--;
    alert("Seat reserved successfully!");
}

// Cancel reservation
function cancelSeat(name) {
    let busName = prompt("Enter bus name to cancel:");
    let seatNumber = prompt("Enter seat number to cancel:");

    for (let i = 0; i < reservations.length; i++) {
        let r = reservations[i];
        if (r.passenger === name && r.busName === busName && r.seatNumber === seatNumber) {
            reservations.splice(i, 1);

            for (let cat in buses) {
                for (let j = 0; j < buses[cat].length; j++) {
                    if (buses[cat][j].busName === busName) {
                        buses[cat][j].availableSeats++;
                        alert("Reservation canceled.");
                        return;
                    }
                }
            }
        }
    }

    alert("Reservation not found.");
}

// Make payment
function makePayment(name) {
    let busName = prompt("Enter bus name for payment:");
    let seatNumber = prompt("Enter seat number for payment:");
    let photo = prompt("Enter payment photo filename or URL:");

    for (let r of reservations) {
        if (r.passenger === name && r.busName === busName && r.seatNumber === seatNumber) {
            r.paid = true;
            r.paymentPhoto = photo;
            alert("Payment completed.");
            return;
        }
    }

    alert("Reservation not found.");
}

// View reservations
function printReservations() {
    if (reservations.length === 0) {
        alert("No reservations yet.");
        return;
    }

    let result = "";
    reservations.forEach(r => {
        result += `Passenger: ${r.passenger}\nBus: ${r.busName} (${r.category})\nSeat: ${r.seatNumber}\nPrice: ₱${r.price}\nPaid: ${r.paid ? "Yes" : "No"}\nPhoto: ${r.paymentPhoto || "None"}\n-----\n`;
    });

    alert(result);
}

// MAIN MENU
function main() {
    let user = login();
    if (!user) return;

    while (true) {
        let choice = prompt(
            "Choose an option:\n1. Reserve Seat\n2. Cancel Seat\n3. Make Payment\n4. View Reservations\n5. Exit"
        );

        if (choice === "1") {
            let info = chooseCategory();
            if (info) reserveSeat(user, info.category, info.busIndex);
        } else if (choice === "2") {
            cancelSeat(user);
        } else if (choice === "3") {
            makePayment(user);
        } else if (choice === "4") {
            printReservations();
        } else if (choice === "5") {
            alert("Goodbye!");
            break;
        } else {
            alert("Invalid option.");
        }
    }
}

main();
