const Hotel = require('../models/hotel')

exports.homePage = (req, res) => {
    res.render('index', {title: 'Lets travel'})
};

exports.listAllHotels = async (req, res) => {
    try{
        const allHotels = await Hotel.find({ avalible: { $eq: true }});
        res.render('all_hotels', {title: 'All Hotels', allHotels });
        // res.json(allHotels)
    } catch(errors) {
        next(next);
    }
};

exports.listAllCountries = async (req, res, next) => {
    try{
        const allCountries = await Hotel.distinct('country');
        res.render('all_countries', {title: 'Browse by country', allCountries});
    } catch(error) {
        next(error)
    }
};

exports.signUp = (req, res, next) => {
    //Validate user info
    console.log('sign up')
    next()
};

exports.logIn = (req, res) => {
    //login
    console.log('log-in')
};

exports.adminPage = (req, res) => {
    res.render('admin', {title: 'Admin' });
};

exports.createHotelGet = (req, res) => {
    res.render('add_hotel', { title: 'Add new hotel' });
};

exports.createHotelPost = async (req, res, next) => {
    try {
        const hotel = new Hotel(req.body);
        await hotel.save();
        res.redirect(`/all/${hotel._id}`);
    } catch(error) {
        next(error)
    }
};
