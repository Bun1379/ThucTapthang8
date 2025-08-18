const package = require("../model/package.model");
const packageFeature = require("../model/package.feature.model");

const createPackageService = async (data) => {
    try {
        const newPackage = new package(data);
        await newPackage.save();
        return newPackage;
    } catch (error) {
        throw new Error("Error creating package: " + error.message);
    }
};

const getAllPackageService = async () => {
    try {
        const packages = await package.find().populate("features.feature");
        return packages;
    } catch (error) {
        throw new Error("Error fetching packages: " + error.message);
    }
};

const updatePackageService = async (id, data) => {
    try {
        const updatedPackage = await package.findByIdAndUpdate(id, data, { new: true });
        return updatedPackage;
    } catch (error) {
        throw new Error("Error updating package: " + error.message);
    }
};

const deletePackageService = async (id) => {
    try {
        await package.findByIdAndDelete(id);
    } catch (error) {
        throw new Error("Error deleting update package");
    }
};

const getTablePackageService = async () => {
    try {
        const allFeatures = await packageFeature.find();
        const packages = await package.find();

        const packageList = packages.map(pkg => ({
            name: pkg.name,
            time: `${pkg.time || ""} ${pkg.time_unit || ""}`.trim(),
            price: `${pkg.price || 0} ${pkg.currency_unit || ""}`.trim()
        }));

        const table = allFeatures.map(f => {
            const row = { feature: f.name };

            packages.forEach(pkg => {
                const found = pkg.features.find(ft => ft.feature._id.equals(f._id));
                if (found) {
                    if (found.limit_type === "unlimited") {
                        row[pkg.name] = "Unlimited";
                    } else if (found.limit_type === "text") {
                        row[pkg.name] = found.text;
                    } else if (found.limit_type) {
                        row[pkg.name] = `${found.limit_value} ${found.limit_name || ""}`.trim();
                    } else {
                        row[pkg.name] = "yes";
                    }
                } else {
                    row[pkg.name] = "no";
                }
            });

            return row;
        });
        return {
            packageList: packageList,
            featureList: table
        };
    } catch (error) {
        throw new Error("Error fetching packages: " + error.message);
    }
};

module.exports = {
    createPackageService,
    getAllPackageService,
    updatePackageService,
    deletePackageService,
    getTablePackageService
};
