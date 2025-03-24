module.exports.calculateFine = (duedate)=>{
    const finePerHour = 0.1 //10 cent
    const today = new Date()
    if(today > duedate){
        const lateHours = Math.ceil((today - duedate)/1000*60*60);
        const fine = lateHours*finePerHour
        return fine
    }
    else{
        return 0
    }
}