const express=require('express');
const app=express();
const Razorpay=require('razorpay');
const cors=require('cors');
const bodyparser=require('body-parser');

app.use(express.json());
app.use(cors());

const db=require('./database');
const bcrypt=require('bcrypt');
const saltrounds=10;







  app.post('/checkout', async(req,res,next)=>{
   
var instance = new Razorpay({ key_id: 'rzp_test_gYZQDvqJ3jYKea', key_secret: 'cTiHwnXgDJz1UcSTevn35nnx' })

var options = {
  amount: Number(500),  // amount in the smallest currency unit
  currency: "INR",
  receipt: "order_rcptid_11"
};
instance.orders.create(options, function(err, order) {
  console.log(order);

});
res.status(200).json({
    success:true
})
  })
  app.get('/getkey',(req,res)=>{
    res.status(200).json({
        key:"rzp_test_gYZQDvqJ3jYKea"
    })
  })

app.use(bodyparser.urlencoded());
app.get('/',(req,res)=>{
    res.send("great");
})

app.post('/register',(req,res)=>{
    const d=req.body;
    let hash=bcrypt.hashSync(d.password,saltrounds);

    db.query('insert into signup (name,email,password)values(?,?,?)',[d.name,d.email,hash],(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            console.log(result);
        }
    })

})


app.post('/login',(req,res)=>{
    const d=req.body;
   const  pass=d.password;

    db.query('select * from  signup where email=?',[d.email],(err,result)=>{
        if(err)
        {
            res.send({msg:err});
        }
        if(result.length>0)
        {
            console.log(result[0].password);
           if(bcrypt.compareSync(pass,result[0].password))
            res.send(result);
            else{
                res.send({msg:"wrong password"});
            }


        }
        else{
            res.send({msg:"wrong username/password"});
        }
    })

})

app.post('/add',(req,res)=>{

    const d=req.body;
   db.query('insert into storeitem (amount,item,description)values(?,?,?)',[d.amount,d.item,d.desc],(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            console.log(result);
        }
    })

})

app.get('/getdata',(req,res)=>{
    db.query('select * from storeitem',(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            console.log(result);
            res.send(result);
        }

    })
})





app.listen(3001,()=>{
    console.log("connected");
});


