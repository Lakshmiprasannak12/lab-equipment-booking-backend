const {
    getActiveResources
} = require("../services/studentResourceService");


const getStudentResources = async (req, res, next) => {
    try {
        const resources = await getActiveResources();

        res.status(200).json({
            success: true,
            resources
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getStudentResources
};