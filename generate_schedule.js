const fs = require('fs');
const { DateTime } = require('luxon');

// Define the schedule
const schedule = [
    { day: "Monday", start: "06:30", end: "07:30", event: "Morning Routine & Stretching" },
    { day: "Monday", start: "07:30", end: "09:30", event: "Side Gig Work" },
    { day: "Monday", start: "10:30", end: "14:30", event: "Main Job Work Block" },
    { day: "Monday", start: "15:30", end: "20:00", event: "Main Job & Calls" },
    { day: "Monday", start: "21:00", end: "23:00", event: "Project Cactus / Course" },

    { day: "Tuesday", start: "07:00", end: "09:30", event: "Gym Session" },
    { day: "Tuesday", start: "10:30", end: "14:30", event: "Main Job Work Block" },
    { day: "Tuesday", start: "15:30", end: "20:00", event: "Main Job & Calls" },
    { day: "Tuesday", start: "21:00", end: "23:00", event: "Project Cactus / Course" },

    { day: "Wednesday", start: "06:30", end: "07:30", event: "Morning Routine & Stretching" },
    { day: "Wednesday", start: "07:30", end: "09:30", event: "Side Gig Work" },
    { day: "Wednesday", start: "10:30", end: "16:00", event: "Main Job Work Block" },
    { day: "Wednesday", start: "16:30", end: "17:00", event: "Main Job & Calls" },
    { day: "Wednesday", start: "17:00", end: "20:00", event: "Church" },
    { day: "Wednesday", start: "21:00", end: "23:00", event: "Main Job Catch Up" },

    { day: "Thursday", start: "07:00", end: "09:30", event: "Gym Session" },
    { day: "Thursday", start: "10:30", end: "14:30", event: "Main Job Work Block" },
    { day: "Thursday", start: "15:30", end: "20:00", event: "Main Job & Calls" },
    { day: "Thursday", start: "21:00", end: "23:00", event: "Project Cactus / Course" },

    { day: "Friday", start: "06:30", end: "07:30", event: "Morning Routine & Stretching" },
    { day: "Friday", start: "07:30", end: "09:30", event: "Side Gig Work/Gym Session" },
    { day: "Friday", start: "10:30", end: "14:30", event: "Main Job Work Block" },
    { day: "Friday", start: "15:30", end: "20:00", event: "Main Job & Calls" },
    { day: "Friday", start: "21:00", end: "23:00", event: "Project Cactus / Course" },


    { day: "Saturday", start: "07:00", end: "10:00", event: "Gym Session" },
    { day: "Saturday", start: "10:30", end: "13:30", event: "Side Gig Work/Shopping" },
    { day: "Saturday", start: "14:30", end: "18:30", event: "Project Cactus" },

    { day: "Sunday", start: "08:00", end: "13:00", event: "Church Service" },
    { day: "Sunday", start: "14:00", end: "23:00", event: "Rest / Light Work on Cactus" },
];

// Start date reference (next Sunday)
const today = DateTime.now();
const startDate = today.startOf('week');

// Day offsets based on Sunday as the first day
const dayOffsets = {
    "Monday": 0, "Tuesday": 1, "Wednesday": 2,
    "Thursday": 3, "Friday": 4, "Saturday": 5, "Sunday": 6, 
};

// Generate .ics file content
let icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//My Schedule//EN\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\n`;

schedule.forEach(({ day, start, end, event }) => {
    let eventDate = startDate.plus({ days: dayOffsets[day] });

    let startDateTime = eventDate.set({
        hour: parseInt(start.split(":")[0]), 
        minute: parseInt(start.split(":")[1])
    }).toUTC();

    let endDateTime = eventDate.set({
        hour: parseInt(end.split(":")[0]), 
        minute: parseInt(end.split(":")[1])
    }).toUTC();

    icsContent += `BEGIN:VEVENT\n`;
    icsContent += `SUMMARY:${event}\n`;
    icsContent += `DTSTART:${startDateTime.toFormat("yyyyMMdd'T'HHmmss'Z'")}\n`;
    icsContent += `DTEND:${endDateTime.toFormat("yyyyMMdd'T'HHmmss'Z'")}\n`;
    icsContent += `RRULE:FREQ=WEEKLY\n`;
    icsContent += `DESCRIPTION:Scheduled task\n`;
    icsContent += `END:VEVENT\n`;
});

icsContent += `END:VCALENDAR`;

// Write to file
fs.writeFileSync('schedule.ics', icsContent, 'utf8');

console.log("ICS file generated: schedule.ics");
