const GUN = require('gun');
var gun = GUN({ peers: ['http://localhost:8765/gun', 'https://gun-manhattan.herokuapp.com/gun'] });


let total = 0;
let protein_count = 0;

gun.get('proteindb').get("1347342.BN863_5710").get("STRING").map().once(v => {
    gun.get("proteindb").get(v.id).once(p => {
        if (p) {
            total += p.size
            protein_count += 1
            console.log("total", total, "protein_count", protein_count, "average size", total / protein_count)
        }
    })
});
