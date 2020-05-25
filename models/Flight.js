const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const destinationSchema = new Schema( 
    {
        airport: {
            type: String,
            enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
        },
        arrival: {
            type: Date
        }
});

const flightsSchema = new Schema(
    {
        airline: {
            type: String,
            enum: ['American', 'Southwest', 'United']
        },
        airport: {
            type: String,
            enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
            default: 'DEN'
        },
        flightNo: {
            type: Number,
            min: 10,
            max: 9999,
            required: true
        },
        departs: {
            type: Date,
            default: function () {
                let defaultDate = new Date();
                defaultDate.setFullYear(defaultDate.getFullYear() + 1)
                return defaultDate;
            }
        },
        destinations: [destinationSchema]
    });



module.exports = mongoose.model('Flight', flightsSchema);