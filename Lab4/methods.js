const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userScheme = new Schema({
name: String,
age: Number
});

const User = mongoose.model("User", userScheme);

async function main() {

    await mongoose.connect("mongodb://127.0.0.1:27017/usersdb");

    const user = new User({name: "Me", age: 41});
    await user.save();
    console.log(user);

    const user2 = await User.create({name: "You", age: 28})
    console.log(user2);

    const users = await User.find({});
    console.log(users);

    const users2 = await User.find({name: "Me"});
    console.log(users2);

    const id = "66705af33d36d4d4292692d2";
    const user9 = await User.findById(id);

    const user3 = await User.findOne({name: "You"});
    console.log(users3);

    const result = await User.deleteMany({age:41});
    console.log(result);

    const result2 = await User.deleteOne({name:"Me"})
    console.log(result2);

    const user4 = await User.findOneAndDelete({name:"You"})
    console.log(user4);

    const user5 = await User.findByIdAndDelete(id)
    console.log(user5);

    const result3 = await User.updateOne({name: "Dima"}, {name: "Dima Parfenenko"})
    console.log(result3);

    const user6 = await User.findByIdAndUpdate(id, {name: "Alex", age: 32});
    console.log("Оновлений об'єкт", user6);

    const user7 = await User.findByIdAndUpdate(id, {name: "None", age: 22}, {new: true});
    console.log("Оновлений об'єкт", user7);

    const user8 = await User.findOneAndUpdate({name: "Alex"}, {name: "Sasha", age:24}, {new: true});
    console.log("Оновлений об'єкт", user8);
}

main().catch(console.log).finally(async()=>await mongoose.disconnect());