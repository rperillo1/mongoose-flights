const Flight = require('../models/Flight');

module.exports = {
    create,
    delete: deleteDest
}

function create(req, res) {
    Flight.findById(req.params.id, function (err, flight) {
        flight.destinations.push(req.body)
        flight.destinations.sort((a, b) => {
            return a.arrival - b.arrival
        })
        flight.save(function (err) {
            if (err) return res.redirect('/flights')
            res.redirect(`/flights/${flight._id}`)
        });
    });
};

function deleteDest(req, res) {
    Flight.find({}, function (err, flights) {
        flights.forEach(flight => {
            let fIdx = flight.destinations.findIndex(d => d._id == req.params.id)
            if (fIdx !== -1) {
                flight.destinations.splice(fIdx, 1)
                flight.save(function (err) {
                    if (err) return res.redirect('/flights')
                    res.redirect(`/flights/${flight._id}`)
                });
            };
        });
    });
}
