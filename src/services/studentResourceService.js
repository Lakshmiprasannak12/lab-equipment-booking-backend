const Resource = require("../models/Resource");
const getActiveResources = async () => {
    const resources = await Resource.find({
        isActive: true
    });
    return resources;
};
module.exports = {
    getActiveResources
};