 const Beneficiary = require('../models/beneficiary')
 const User = require('../models/user');

 exports.addBeneficiary = (req, res, next) => {
     
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

     let addedBeneficiary;

     const beneficiary = new Beneficiary({
            name: name,
            email: email,
            relationship: relationship,
            ssn: ssn,
            picture:'',
            address: {
                streetAddress1: streetAddress1,
                streetAddress2: streetAddress2,
                city: city,
                state: state,
                country: country,
            },
            phoneNumber: phoneNumber,
            careOf: {
                coName: coName,
                coEmail: coEmail,
                coRelationship: coRelationship,
                coSsn: coSsn,
                coAddress:{
                    coStreetAddress1: coStreetAddress1,
                    coStreetAddress2: coStreetAddress2,
                    coCity: coCity,
                    coState: coState,
                    coCountry: coCountry,
            },
                 coPhoneNumber: coPhoneNumber
            }
            
     })
     
      return beneficiary.save()
            .then(result =>{
                addedBeneficiary = result;
               
                User.updateOne(
                        {_id: req.userId},
                        { 
                            $addToSet:{  beneficiarys:  addedBeneficiary._id}
                        }
                    )
                    .then(result =>{
                        res.status(200).json({message: "Beneficiary Added"})
                    })
            }).catch(err => {
                console.log(">>>>>>>>>>>>>>>>>>>>>>>>",err)
                if(!err.statusCode){
                    err.statusCode = 500;
                }
                err.message="could not add beneficiary"
                next(err);
            })
 };

 exports.getBeneficiaryList =  (req, res, next) =>{

    const userId = req.userId;
    console.log("id of logged in user = " + userId);
    
    User.findById(userId)
        .populate('beneficiarys')
          .then(user =>{
                res.status('200').json({userData: user})
          })
          .catch(err =>{
              console.log(err)
            if(!err.statusCode){
                err.statusCode = 500;
            }
            err.message="Could not find User"
            next(err);
          })
 }

 exports.getBInfo = (req, res, next) => {

    const requestUser = req.params.bId
    
    if(!requestUser){
        throw new Error("User not provided")
    }

    Beneficiary.findById(requestUser)
                .then( user => {
                    res.status(200).json({message:" beneficiary info retrieved", beneficiary: user})
                })
                .catch(err => {
                    if(!err.statusCode){
                        err.statusCode = 500;
                    }
                    err.message="could not find beneficiary"
                    next(err);
                })
}

exports.uploadAvatar = (req, res, next) =>{
     if(!req.file){
         const error = new Error('No image provided');
         error.statusCode = 422;
         throw error;
     }
     const imageUrl = req.file.path
     const bid = req.body.bid;

     Beneficiary.updateOne
     (
         {_id: bid},
         { 
            $set:{  picture:  imageUrl}
          }
    )
    .then(result =>{
        Beneficiary
        .findById(bid)
        .then(b => {
            res.status(201).json({message: "picture uploaded", beneficiary: b})
        })
        .catch(err =>{
            const error = new Error("Could not find user");
            error.statusCode = 404;
            throw error;
        })
       
    })
    .catch(err =>{
        const error = new Error("Could not update");
        error.statusCode = 404;
        throw error;
    })
}

 