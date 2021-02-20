module.exports = {
   mainPage:(req,res)=>{
      let selectQuery = " SELECT * FROM `product` Order By productID asc ";
      db.query(selectQuery,(err,result)=>{
         if(err)
            return res.status(500).send(err);
         console.log(result);
         res.render("index.ejs",{
            title:"View Products",
            products: result
         });
      });
   }
};