const WizardScene = require("telegraf/scenes/wizard");
const startStep = require("./startStep");
const firstNameStep = require("./firstNameStep");
const deliveryStep = require("./deliveryStep");
const confirmationStep = require("./confirmationStep");

const orderingWizard = new WizardScene("ordering-wizard",
    startStep,
    firstNameStep,
    deliveryStep,
    confirmationStep);

module.exports = orderingWizard;