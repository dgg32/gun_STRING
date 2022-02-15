const GUN = require('gun');
//const db = require('gun')(['http://localhost:8765/gun', 'https://gun-manhattan.herokuapp.com/gun']);
const fs = require('fs');
// const csv = require('csv-parser');
const Papa = require('papaparse');

//var gun = GUN({peers: ['https://ec2-44-199-244-230.compute-1.amazonaws.com:8765/gun']})

var gun = GUN({ peers: ['http://localhost:8765/gun', 'https://gun-manhattan.herokuapp.com/gun'] });
//var gun = GUN();


function import_item(item) {

    return new Promise((resolve) => {

        if (parseInt(item["combined_score"]) >= 800) {
            gun.get("proteindb").get(item["protein1"]).get("STRING").set({ "id": item["protein2"], "score": item["combined_score"] }, function (ack) {
                if (ack.ok) {
                    console.log("edge", item["protein1"], item["protein2"]);
                    resolve(item["protein1"])
                }

            })
        }

    });
}


const file_edge = fs.createReadStream('1347342.protein.links.v11.5.txt');
Papa.parse(file_edge, {
    delimiter: " ",
    header: true,
    dynamicTyping: true,
    complete: function (results_edge) {

        console.log(results_edge.data.length);
        const promises = [];



        for (let i = 0; i < results_edge.data.length; ++i) {
            promises.push(import_item(results_edge.data[i]));
        }

        Promise.all(promises)
            .then((results) => {
                console.log("All done", results);
            })
            .catch((e) => {
                // Handle errors here
            });
    }
});


//db.get("root").get("1347342.BN863_10390").get("STRING").map(connection => connection.score >= 900 ? connection : undefined).once(v => console.log(v.id, v.score))