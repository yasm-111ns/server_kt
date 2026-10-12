const express = require("express");
const mongoose = require("mongoose")
const Phone = require("./models/Phone")


const PORT = 7000;

app = express();

app.use(express.json())

mongoose.connect("mongodb://localhost:27017/phones").then(() => {
    console.log("успешное подключение к БД");
}).catch((error)=>{
    console.log("ошибка при подключении к БД: " + error);
});


/////////////////////////////////////////////////////////////
// app.get("/phone", async (req,res)=>{
//     try{
//         const phones = await Phone.find();
//         res.json(phones);
//         console.log(phones);
//     }catch(error){
//         console.log("ошибка при получении телефонов" + error);
//     }
// })

app.get("/phone/:id", async (req,res)=>{
    try{
        const {id} = req.params
        const phones = await Phone.findById(id);
        
        res.json(phones);
        console.log(id);
    }catch(error){
        console.log("ошибка при получении телефонов" + error);
    }
})





//////////////////////////////////////////////////////////
app.post("/addphone", async (req, res) => {
    const {title, description, price, model} = req.body

    const newPhone = await Phone.create({
        title, description, price, model
    })

    await newPhone.save();
    res.send("телефон успешно добавлен!")
})

app.patch('/phone/:id', async (req, res)=>{
    try{
       const {id} = req.params
   
       const {title, description, price, model} = req.body;
   
       const UpdatePhone = await Phone.findByIdAndUpdate(id, {
           title, 
           description, 
           price,
           model
       });

       if(!UpdatePhone){
        res.send("Такого товара не существует!")
       }

       res.send("данные успешно изменены!")
    }catch(error){
        console.log("Ошибка, не удалось выполнить команду!" + error);
    }
});


app.delete("/deletephone/:id" , async(req, res)=>{
    try{
        const { id } = req.params
        console.log(id);

        const phone = await Phone.findByIdAndDelete(id)
        res.send("продукт успешно удален")
    }catch (error) {
        console.log("ошибка при удалении продукта:" +error);
}

});

app.listen(PORT, () => {
    console.log("сервер успешно запущен на порту: " + PORT);
});