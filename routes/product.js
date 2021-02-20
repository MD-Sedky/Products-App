module.exports = {
   addProductPage:(req,res)=>{
      res.render("add_product.ejs",
      {
         message:"",
         title:"Add New Product"
      });
   },
   addProduct:(req,res)=>{
      if(!req.files)
      return res.status(400).send("No Product Image were Uploaded :( ");
      let message='',
          category = req.body.category,
          title = req.body.title,
          description = req.body.description,
          quantity = req.body.quantity,
          price = req.body.price,
          upLoadedFile = req.files.image;
      let insertQuery = "INSERT INTO `product`( `title`, `quantity`, `price`, `category`, `image`, `description`) VALUES ('"+title+"',"+quantity+","+price+",'"+category+"','"+upLoadedFile.name+"','"+description+"')";
      db.query(insertQuery,(err,result)=>{
         if(err)
            return res.status(500).send(err);
         else
            message = "Product " + result.insertId + " added Successfully";
            // Upload for Product Image
            let fileExtension = upLoadedFile.name.split('.')[1];
            let image_name = result.insertId + "." + fileExtension;
            if(upLoadedFile.mimetype == 'image/jpeg' || 
               upLoadedFile.mimetype == 'image/png'  || 
               upLoadedFile.mimetype == 'image/gif'    ){
               upLoadedFile.mv('public/assets/imgs/Products_Pics/'+image_name,(err)=>{
                  if(err)
                     return res.status(500).send(err);
               });
                  res.redirect("/"); // return us to home page
               }else{
                  message = "invalid image format. only 'png', 'jpeg', jpg and 'gif' images formats are allowed.";
                  res.render("add_product.ejs",
                  {
                     message:message,
                     title:"Add New Product |Products Management App"
                  });
            }
      });
   },
   editProductPage:(req,res)=>{
      let productId = req.params.id;
      let selectQuery = " SELECT * FROM `product` where productId = " + productId;
      db.query(selectQuery,(err,result)=>{
         if(err)
            return res.status(500).send(err);
         res.render("edit_product.ejs",{
            title:"Welcome to Products Management | Edit Products",
            product: result[0],
            message: ''

         });
      });
   },
   editProduct:(req,res)=>{
      let message      ='',
          category     = req.body.category,
          title        = req.body.title,
          description  = req.body.description,
          quantity     = req.body.quantity,
          price        = req.body.price,
          upLoadedFile = req.files.image,
          productId    = req.params.id;
      let updateQuery  = "UPDATE `product` SET `title`='"+title+"',`quantity`="+quantity+",`price`="+price+",`category`='"+category+"',`image`='"+upLoadedFile.name+"',`description`='"+description+"'  WHERE `productID`="+productId;
      db.query(updateQuery,(err,result)=>{
         if(err)
            return res.status(500).send(err);
         else
            message = "Product " + productId + " updated Successfully";
            let fileExtension = upLoadedFile.name.split('.')[1];
            let image_name = productId + "." + fileExtension;
            if(upLoadedFile.mimetype == 'image/jpeg' || 
               upLoadedFile.mimetype == 'image/png'  || 
               upLoadedFile.mimetype == 'image/gif'    ){
               upLoadedFile.mv('public/assets/imgs/Products_Pics/'+image_name,(err)=>{
                  if(err)
                     return res.status(500).send(err);
               });
                  res.redirect("/");
               }else{
                  message = "invalid image format. only 'png', 'jpeg', jpg and 'gif' images formats are allowed.";
                  res.render("add_product.ejs",
                  {
                     message:message,
                     title:"Edit Product |Products Management App"
                  });
            }
      });
   },
   deleteProduct:(req,res)=>{
      let productId = req.params.id;
      let deleteQuery = " DELETE FROM `product` where productId = " + productId;
      db.query(deleteQuery,(err,result)=>{
         if(err)
            return res.status(500).send(err);
         res.redirect("/");
      });
   }
};