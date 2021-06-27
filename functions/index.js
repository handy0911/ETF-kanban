// const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     functions.logger.info("Hello logs!", { structuredData: true });
//     response.send("Hello from Firebase!");
// });


// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();
exports.all_etf = functions.https.onRequest((req, res) => {
    const request = require('request')
    ret = { venders: [] }

    request("https://mis.twse.com.tw/stock/data/all_etf.txt", function (error, response, body) {
        body = JSON.parse(body).a1

        for (i = 0; i < body.length; i++) {
            if (JSON.stringify(body[i]) !== '{}') {
                var vender = { stocks: [], refURL: body[i].refURL }
                for (j = 0; j < body[i].msgArray.length; j++) {
                    body_stock = body[i].msgArray[j]
                    var stock = {
                        id: body_stock.a,
                        title: body_stock.b,
                        all_stock_amount: body_stock.c,
                        market_price: body_stock.e,
                        good_worth: body_stock.f,
                        discount: body_stock.g,
                        discount_last_day: body_stock.h,
                        update_date: body_stock.i,
                        update_time: body_stock.j
                    }
                    vender.stocks.push(stock)
                    // console.log(vender)
                }
                ret.venders.push(vender)
            }
        }
        console.log(ret);
        res.json(ret)
    })
});

// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore().collection('messages').add({ original: original });
    // Send back a message that we've successfully written the message
    res.json({ result: `Message with ID: ${writeResult.id} added.` });
});

// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
    .onCreate((snap, context) => {
        // Grab the current value of what was written to Firestore.
        const original = snap.data().original;

        // Access the parameter `{documentId}` with `context.params`
        functions.logger.log('Uppercasing', context.params.documentId, original);

        const uppercase = original.toUpperCase();

        // You must return a Promise when performing asynchronous tasks inside a Functions such as
        // writing to Firestore.
        // Setting an 'uppercase' field in Firestore document returns a Promise.
        return snap.ref.set({ uppercase }, { merge: true });
    });