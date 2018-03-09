const WizardScene = require("telegraf/scenes/wizard");
const startStep = require("./startStep");
const firstNameStep = require("./firstNameStep");
const phoneNumberStep = require("./phoneNumberStep");
const deliveryStep = require("./deliveryStep");
const addressStep = require("./addressStep");
const confirmationStep = require("./confirmationStep");

const orderingWizard = new WizardScene("ordering-wizard",
    startStep,
    firstNameStep,
    phoneNumberStep,
    deliveryStep,
    addressStep,
    confirmationStep);

module.exports = orderingWizard;