const {
    DELIVERY_PROPERTY,
    FIRSTNAME_PROPERY,
    PHONE_PROPERTY,
    ADDRESS_PROPERTY,
} = require("./constants");

const { setProperty } = require("./manager");

exports.setDelivery = setProperty.bind(null, DELIVERY_PROPERTY);
exports.setFirstName = setProperty.bind(null, FIRSTNAME_PROPERY);
exports.setPhone = setProperty.bind(null, PHONE_PROPERTY);
exports.setAddress = setProperty.bind(null, ADDRESS_PROPERTY);