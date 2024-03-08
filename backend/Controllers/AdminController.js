// get all login user
const getAllUser = async(req,res)=>{
try {
    res.status(200).json({message : "hii user"})
} catch (error) {
    console.log("error catching user data" ,error )
}
}

module.exports = {getAllUser}