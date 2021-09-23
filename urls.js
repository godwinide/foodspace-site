const path = require('path');

module.exports = app => {
    // CUSTOMERS
    app.use("/api/customers/auth", require("./routes/api/customers/auth/index"));
    app.use("/api/customers/auth/verify", require("./routes/api/customers/auth/verify"));
    app.use("/api/customers/passwords", require("./routes/api/customers/auth/passwords"));
    app.use("/api/customers/update", require("./routes/api/customers/auth/update"));
    app.use("/api/customers/foods", require("./routes/api/customers/foods/index"));
    app.use("/api/customers/foods/order", require("./routes/api/customers/orders/order"));
    app.use("/api/customers/foods/category", require("./routes/api/customers/foods/category"));
    app.use("/api/customers/notifications", require("./routes/api/customers/notification/index"));

    // VENDOR
    app.use("/api/vendors/auth", require("./routes/api/vendors/auth/index"));
    app.use("/api/vendors/auth/verify", require("./routes/api/vendors/auth/verify"));
    app.use("/api/vendors/passwords", require("./routes/api/vendors/auth/password"));
    app.use("/api/vendors/update", require("./routes/api/vendors/auth/update"));
    app.use("/api/vendors/orders", require("./routes/api/vendors/orders/order"));


    // ADMIN
    app.use("/api/admin/foods", require("./routes/api/admin/foods/index"));
    app.use("/api/admin/foods/create", require("./routes/api/admin/foods/create"));
    app.use("/api/admin/foods/edit", require("./routes/api/admin/foods/edit"));
    app.use("/api/admin/categories", require("./routes/api/admin/foods/category"));
    app.use("/api/admin/customers", require("./routes/api/admin/customers/index"));
    app.use("/api/admin/customers/orders", require("./routes/api/admin/orders/index"));
    app.use("/api/admin/restaurants", require("./routes/api/admin/restaurants/index"));
    app.use("/api/admin/riders", require("./routes/api/admin/riders/index"));
    app.use("/api/admin/auth", require("./routes/api/admin/auth/index"))
    app.use("/api/admin/notification", require("./routes/api/admin/notification/index"));

    // BUILD
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
    
}