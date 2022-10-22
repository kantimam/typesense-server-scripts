

function getRandomArrayItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


const COUNT = 5000;

const items = [];

const ARTISTS = [
    {
        name: 'Iván Fischer',
        role: 'Dirigent'
    },
    {
        name: 'Wenzel Fuchs',
        role: 'Klarinette'
    },
    {
        name: 'Stefan Schweigert',
        role: 'Fagott'
    },
    {
        name: 'Iván Fischer',
        role: 'Dirigent'
    },
    {
        name: 'Wayne Marshall',
        role: 'Orgel'
    },
    {
        name: 'Wayne Marshall',
        role: 'Orgel'
    },

]
const TITLES = []
const TYPES = ["Gastveranstaltung", "Education", "Musikfest Berlin", "On Tour", "Lunchkonzert", "Berliner Philharmoniker"]
const LOCATIONS = ["Philharmonischer Salon", "Berliner Philharmoniker",]
const DESCRIPTIONS = []


for (let i = 0; i < COUNT; i++) {
    const item = {};

}