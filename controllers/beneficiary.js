 const Beneficiary = require('../models/beneficiary')
 
 exports.addBeneficiary = (req, res, next) => {
     console.log(req.userId)
     const name =  req.body.name;
     const email =  req.body.email;
     const relationship =  req.body.relationship;
     const ssn =  req.body.ssn;
     const streetAddress1 =  req.body.streetAddress1;
     const streetAddress2 =  req.body.streetAddress2;
     const city =  req.body.city;
     const state =  req.body.state;
     const country =  req.body.country;
     const phoneNumber =  req.body.phoneNumber;

     const coName =  req.body.coName;
     const coEmail =  req.body.coEmail;
     const coRelationship =  req.body.coRelationship;
     const coSsn =  req.body.coSsn;
     const coStreetAddress1 =  req.body.coStreetAddress1;
     const coStreetAddress2 =  req.body.coStreetAddress2;
     const coCity =  req.body.coCity;
     const coState =  req.body.coState;
     const coCountry =  req.body.coCountry;
     const coPhoneNumber =  req.body.coPhoneNumber;

     const beneficiary = new Beneficiary({
            name: name,
            email: email,
            relationship: relationship,
            ssn: ssn,
            streetAddress1: streetAddress1,
            streetAddress2: streetAddress2,
            city: city,
            state: state,
            country: country,
            phoneNumber: phoneNumber,

            coName: coName,
            coEmail: coEmail,
            coRelationship: coRelationship,
            coSsn: coSsn,
            coStreetAddress1: coStreetAddress1,
            coStreetAddress2: coStreetAddress2,
            coCity: coCity,
            coState: coState,
            coCountry: coCountry,
            coPhoneNumber: coPhoneNumber
     })
    //   return beneficiary.save()
    //         .then(result =>{

    //     })
 }