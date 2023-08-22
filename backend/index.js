const cors = require('cors');
const express = require('express');
const stripe = require('stripe')('sk_test_51NVcW6B203ZwmhDSrEWF9bGUKjGZ7Lilw4LjAZGuTA7ARyMZtY0bEpQDUtfnpEUmQLRuf9TGkPEpgp5xvNMdVmkE00f1sgXK4i');
const uuid = require('uuid');
const app = express();

//middleware
app.use(express.json());
app.use(cors());
//routes
app.get('/',(req,res) => res.send('app is listening'))
app.post('/payment',(req,res) => {
    const {product , token} =req.body;
    console.log('product' , product)
    console.log('price', product.price);
    
    return stripe.customers.create({
        email : token.email,
        source : token.id,
    }).then(customer => {
        stripe.charges.create({
            amount : product.price * 100,
            currency : 'pkr',
            customer : customer.id,
            receipt_email : token.email,
            description : product.name,
            shipping : {
                name : token.card.name,
                address : {
                    country :token.card.country,
                }
                


                
                

            }

        }
        ,)
    })
})



//listeners
app.listen(8282, () => console.log('app is listening 8282'))
