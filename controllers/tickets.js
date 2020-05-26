const Flight = require('../models/Flight');
const Ticket = require('../models/Ticket');

module.exports = {
    new: newTicket,
    create: createTicket
};

function createTicket(req, res) {
    Flight.findById(req.params.id, function(err, flight){
        req.body.flight = flight._id
        console.log(req.body.flight)
        console.log(req.body.flight._id)
        Ticket.create(req.body, function (err, ticket) {
            res.redirect(`/flights/${flight._id}`)
        });
    })
}

function newTicket(req, res) {
    Flight.findById(req.params.id, function (err, flight) {
        res.render('tickets/new', {
            title: 'New Ticket',
            flight
        });
    })
}