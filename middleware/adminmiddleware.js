const adminonly = (req, res, next) => {
    if (req.user.role !== "admin" || req.admin.role !=="admin") {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
};

module.exports = adminonly