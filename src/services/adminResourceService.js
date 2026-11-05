const Resource = require("../models/Resource");
const createResource = async (data) => {
    const resource = await Resource.create(data);
    return resource;
};
const getAllResources = async () => {
    const resources = await Resource.find();
    return resources;
};
const updateResource = async (id, data) => {
    const resource = await Resource.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );
    if (!resource) {
        throw new Error("Resource not found");
    }
    return resource;
};
const deleteResource = async (id) => {
    const resource = await Resource.findByIdAndDelete(id);
    if (!resource) {
        throw new Error("Resource not found");
    }
    return resource;
};

module.exports = {
    createResource,
    getAllResources,
    updateResource,
    deleteResource
};