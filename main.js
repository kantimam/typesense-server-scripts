/*
 These examples walk you through the bulk importing documents.
 See clientInitalization.js for quick instructions on starting the Typesense server.
*/
//require('@babel/register')

const { readFileSync, writeFileSync } = require('fs')
const Typesense = require('typesense')

// Create a client
const typesense = new Typesense.Client({
    nodes: [
        {
            host: 'localhost',
            port: '8108',
            protocol: 'http'
        } // ,
        // {
        //   'host': 'localhost',
        //   'port': '7108',
        //   'protocol': 'http'
        // },
        // {
        //   'host': 'localhost',
        //   'port': '9108',
        //   'protocol': 'http'
        // }
    ],
    apiKey: 'xyz',
    numRetries: 3, // A total of 4 tries (1 original try + 3 retries)
    connectionTimeoutSeconds: 120, // Set a longer timeout for large imports
    logLevel: 'debug'
})

let schema = {
    name: 'concerts',
    num_documents: 0,
    fields: [
        {
            name: "id",
            type: "string",

        },
        {
            name: 'datetime',
            type: 'int64',
            facet: true
        },
        {
            name: 'eventType',
            type: 'string',
            facet: true
        },
        {
            name: 'venue',
            type: 'string',
            facet: true
        },
        {
            name: 'mainArtist',
            type: 'string',
            facet: false
        },
        {
            name: 'secondaryArtist',
            type: 'string',
            facet: false
        },
        {
            name: 'title',
            type: 'string',
            facet: false
        },
        {
            name: 'shortDescription',
            type: 'string',
            facet: false
        },
        {
            name: 'isGuestEvent',
            type: 'bool',
            facet: true
        }
    ],
    default_sorting_field: 'datetime'
}

/* const sItem = {
    "id": 1,
    "datetime": "20.12.2021",
    "eventType": "Musikfest Berlin",
    "venue": "Großer Saal",
    "mainArtist": "Clarette Godlee",
    "secondaryArtist": "Valentino Bellin",
    "organizer": "Bremen"
}

const f = JSON.parse(readFileSync("./MOCK_DATA.json"));
console.log(f);
const ff = f.map(f => { return { ...f, id: String(f.id) } });
writeFileSync("./concerts.json", JSON.stringify(ff));

let documents = require("./concerts.json")
documents.forEach(d => {
    //console.log(d);
    if (d.datetime) {
        if (d.datetime instanceof Date) {
            d.datetime = d.datime.getTime()
        } else {
            d.datetime = new Date(d.datetime).getTime();
        }
    } else d.datetime = 0;
})
 */

let documents = require("./concerts.json")
documents.forEach(d => {
    if (d.datetime && !isNaN(d.datetime)) {
        d.datetime = Number(new Date(Number(d.datetime)).getTime());
    } else d.datetime = 0;

    const isGuest = Math.random() > 0.7;
    d.isGuestEvent = isGuest ? true : false;
    if (isGuest) {
        d.eventType = "Gastveranstaltung"
    } else if (d.eventType = "Gastveranstaltung") {
        d.eventType = "International"
    }

    if (!d.shortDescription) d.shortDescription = ""
})

async function importConcertDocuments() {
    try {
        // Delete if the collection already exists from a previous example run
        await typesense.collections('concerts').delete()
    } catch (error) {
        // do nothing
    }

    try {
        // create a collection
        await typesense.collections().create(schema)

        // Load documents from a JSON file, or API call, etc. into a variable
        // Here we already have documents in the `documents` variable.

        // Bulk import documents
        let results = await typesense.collections('concerts').documents().import(documents)

        // Or if you have documents in JSONL format, and want to save the overhead of parsing JSON,
        // you can also pass a JSONL string to the import method:
        // await typesense.collections('companies').documents().import(documentsInJSONLFormat)

        console.log(results)
        // Process results as needed for errors / success
        let failedItems = (results || []).filter((item) => item.success === false)
        console.log(failedItems[0])


    } catch (error) {
        console.log(error)
    }
}

importConcertDocuments()