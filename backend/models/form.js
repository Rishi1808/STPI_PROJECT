const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    dateOfVisit: Date,
    bankBranchAdd: String,
    bankName: String,
    AccountNo: String,
    boardOfDirectors: String,
    email: String,
    gst: String,
    pan: String,
    contactPerson: String,
    unitName: String,
    authLetterFile: Boolean,
    registeredAddress: String,
    status: String,
    sc_st: Boolean,
    women: Boolean,
    divyangjan: Boolean,
    involvement: String,
    phone: String,
    purposeOfVisit: String,
    from: String,
    to: String,
    incubation_space: String,
    power_backup: String,
    internet_requirement: String,
    fax: Boolean,
    photocopy: Boolean,
    phone_call: Boolean,
    conference: Boolean,
    lease_rent: String,
    electricity_charges: String,
    power_backup_charges: String,
    business_support_facilities: String,
    dd_no: String,
    dd_date: Date,
    deposit_amount: String,
    expected_occupancy_date: Date,
    months: String,
    uploadedFiles: [String]
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
