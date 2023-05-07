const express=require("express");
const {ProductModel}=require("../models/paytm.product");
const productRouter=express.Router();
productRouter.use(express.json())

//GET product
productRouter.get("/getproduct", async (req, res) => {
    let type=req.query.type
    try {
        const product = await ProductModel.find(req.query);
        res.send(product)
        console.log("Allproduct")
    } catch (error) {
        res.send("err:not able to get the data of all product");
        console.log(error);
    }
})

//POST product
productRouter.post("/add",async(req,res)=>{
    const payload=req.body;
    try {
        const newproduct=new ProductModel(payload);
        await newproduct.save();
        res.send("new product added to Database")
        console.log(newproduct)
    } catch (error) {
        res.send("err:not able to post the data of Product");
        console.log(error);
    }
})

//PATCH product

productRouter.patch("/update/:id",async(req,res)=>{
    const id=req.params.id;
    const payload=req.body;
    const product=await ProductModel.findOne({"_id":id});
    console.log(product)
    const userID_in_product=product.userID;
    const userID_making_req=req.body.userID
    try {
        if(userID_making_req!==userID_in_product){
            res.send({"msg":"You are not authorised"})
        }else{
        let data=await ProductModel.findByIdAndUpdate({_id:id},payload);
        res.send("Note updated successfully");
        console.log(data)
        console.log(`Note updated successfully with id:${id}`);
        }
    } catch (error) {
        res.send("err:Not able to update product.patch");
        console.log(error);
    }
})



//delete product
productRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    const product=await ProductModel.findOne({"_id":id});
    console.log(product)
    const userID_in_product=product.userID;
    const userID_making_req=req.body.userID
    try {
        if(userID_making_req!==userID_in_product){
            res.send({"msg":"You are not authorised"})
        }else{
        let data=await ProductModel.findByIdAndDelete({_id:id});
        res.send("product deleted successfully");
        console.log(`product deleted successfully with id:${id}`);
        }
    } catch (error) {
        res.send("err:Not able to update product.patch");
        console.log(error);
    }
})


module.exports={productRouter}

