const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

// post review
module.exports.createReview = async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview= new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    
    await newReview.save();
    await listing.save();
    req.flash("success","New review created");
  
    
    // console.log("new review saved");
    // res.send("new review saved");
    res.redirect(`/listings/${listing._id}`);
    }

    // delete review
    module.exports.destroyReview = async(req,res)=>{
        let{id, reviewId} =req.params;
        Listing.findByIdAndUpdate(id, { $pull: { reviews : reviewId }})
        await Review.findByIdAndDelete(reviewId)
        req.flash("success"," review deleted");

        res.redirect(`/listings/${id}`);
      }