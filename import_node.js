const GUN = require('gun');
//const gun = require('gun')(['http://localhost:8765/gun', 'https://gun-manhattan.herokuapp.com/gun']);
const fs = require('fs');
// const csv = require('csv-parser');
const Papa = require('papaparse');

var gun = GUN({ peers: ['http://localhost:8765/gun', 'https://gun-manhattan.herokuapp.com/gun'] });
//var gun = GUN(['https://stark-tor-08323.herokuapp.com/gun']);
//var gun = GUN();


function import_item(item) {

    return new Promise((resolve) => {

        gun.get("proteindb").get(item["#string_protein_id"])
            .put({ "id": item["#string_protein_id"], "size": item["protein_size"] },
                function (ack) {
                    if (ack.ok) {
                        console.log("node", item["#string_protein_id"]);
                        resolve(item["#string_protein_id"])
                    }
                });


    });
}


const file_node = fs.createReadStream('1347342.protein.info.v11.5.txt');
Papa.parse(file_node, {
    header: true,
    dynamicTyping: true,
    complete: function (results_node) {
        const promises = [];

        for (let i = 0; i < results_node.data.length; ++i) {
            promises.push(import_item(results_node.data[i]));
        }

        Promise.all(promises)
            .then((results) => {
                console.log("All done", results);
            })
    }
});







//const db = require('gun')(['http://localhost:8765/gun', 'https://gun-manhattan.herokuapp.com/gun']);
//db.get("root").get("1347342.BN863_10").once(v => console.log(v.id))
//db.get("root").get("1347342.BN863_10").get("STRING").map().once(v => console.log(v.id))

//db.get("root").get("1347342.BN863_10").get("STRING").map().once(v =>console.log(v.id))