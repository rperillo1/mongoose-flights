const Flight = require('../models/Flight');

module.exports = {
    index,
    new: newFlight,
    create,
    show,
    delete: deleteFlight
};


function deleteFlight(req, res) {
    Flight.findByIdAndRemove(req.params.id, req.body, function (err, flight) {
        if (err) return res.redirect('/flights/show');
        res.redirect('/flights');
    });
};


function show(req, res) {
    Flight.findById(req.params.id, function (err, flight) {
        res.render(`flights/show`, {
            flight,
            title: 'Current Flight'
        });
    })
};


function create(req, res) {
    const flight = new Flight(req.body);
    flight.save(function (err) {
        if (err) return res.redirect('/flights/new')
        res.redirect('/flights')
    });
};


function newFlight(req, res) {
    let newFlight = new Flight()
    let dt = newFlight.departs;
    let destDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}-${dt.getDate()}T${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`;
    res.render('flights/new', {
        title: 'New Flight',
        destDate
    });
};


function index(req, res) {
    Flight.find({}, function (err, flights) {
        flights.sort((a, b) => {
            return new Date(a.departs) - new Date(b.departs)
        });
        res.render('flights/index', {
            flights,
            title: 'All Flights'
        });
    });
};



