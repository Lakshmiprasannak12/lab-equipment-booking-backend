const {
    createResource,
    getAllResources,
    updateResource,
    deleteResource
} = require("../services/adminResourceService");


const getAdminResources = async (req, res, next) => {
    try {
        const resources = await getAllResources();

        res.status(200).json({
            success: true,
            resources
        });
    } catch (error) {
        next(error);
    }
};


const addResource = async (req, res, next) => {
    try {
        const resource = await createResource(req.body);

        res.status(201).json({
            success: true,
            message: "Resource created successfully",
            resource
        });
    } catch (error) {
        next(error);
    }
};


const editResource = async (req, res, next) => {
    try {
        const resource = await updateResource(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Resource updated successfully",
            resource
        });
    } catch (error) {
        next(error);
    }
};


const removeResource = async (req, res, next) => {
    try {
        const resource = await deleteResource(req.params.id);

        res.status(200).json({
            success: true,
            message: "Resource deleted successfully",
            resource
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAdminResources,
    addResource,
    editResource,
    removeResource
};