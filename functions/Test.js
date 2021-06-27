// // console.log("AAA")
// import request from request

const request = require('request')

request("https://mis.twse.com.tw/stock/data/all_etf.txt", function (error, response, body) {
    body = JSON.parse(body).a1
    ret = { venders: [] }
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
                }
                vender.stocks.push(stock)
                // console.log(vender)
            }
            ret.venders.push(vender)
        }
    }

    // console.log(ret);
})

// Data
// {
//     "a1": [
//         {
//             "msgArray": [
//                 {
//                     "a": "00748B",
//                     "b": "凱基中國債3-10",
//                     "c": "621500000",
//                     "d": "0",
//                     "e": "41.50",
//                     "f": "41.53",
//                     "g": "-0.07",
//                     "h": "41.55",
//                     "i": "20210625",
//                     "j": "16:59:44",
//                     "k": "2"
//                 }],
//             "refURL": "https://www.kgifund.com.tw/ETF/RWD/ETF_RealNAV.aspx",
//             "userDelay": "15000",
//             "rtMessage": "OK",
//             "rtCode": "0000"
//         }]
// }