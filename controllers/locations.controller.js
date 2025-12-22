const Location = require('../models/locations.model.js');
const Device = require('../models/devices.model.js');


//getting all live locations from the dataBase

const getAllLiveLocations = async (req, res) => {
    try{
        const locations = await Location.find({});
        res.status(200).json(locations);
    }
    catch(error){
        res.status(500).json({message: 'Server Error', error: error.message});
    }
}




//adding a live location to the dataBase;
const addLiveLocation = async (req, res) => {
    try{
        const { deviceId } = req.params;
        const device = await Device.findOne({deviceId});

        if(!device){
            return res.status(404).json({message: 'Device not found'});
        }

        const liveLocation = await Location.create(req.body);
        res.status(200).json(liveLocation);
    
    }
    catch(error){
        res.status(500).json({message: 'Server Error', error: error.message});
    }
}


module.exports = {
    getAllLiveLocations,
    addLiveLocation
}; 

