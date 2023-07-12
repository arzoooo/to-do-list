
const TodoLists = require('../models/todo_list')
// function for redirecting to main home page
module.exports.home = function(req,res){
    // fetching using mongoose 
    TodoLists.find().then(todo => {
        return res.render('homePage',{
            title: "Home",
            todoList:todo
        })})
    }
// function for new Data
function DateValeu(dueDate){
    let months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'] // static value for implementing month value
    newdate = '';
    let monapp = '';
    // checking months 
    if(dueDate[1] == '01'){
        monapp=months[0];
    }
    else if(dueDate[1] == '02'){
        monapp=months[1];
    }else if(dueDate[1] == '03'){
        monapp=months[2];
    }else if(dueDate[1] == '04'){
        monapp=months[3];
    }else if(dueDate[1] == '04'){
        monapp=months[3];
    }else if(dueDate[1] == '05'){
        monapp=months[4];
    }else if(dueDate[1] == '06'){
        monapp=months[5];
    }else if(dueDate[1] == '07'){
        monapp=months[6];
    }else if(dueDate[1] == '08'){
        monapp=months[7];
    }else if(dueDate[1] == '09'){
        monapp=months[8];
    }else if(dueDate[1] == '10'){
        monapp=months[9];
    }else if(dueDate[1] == '11'){
        monapp=months[10];
    }else if(dueDate[1] == '12'){
        monapp=months[11];
    }
    newdate =dueDate[2]+' '+monapp+' '+dueDate[0] // displaying date format
    return newdate;
}

// function for creating toto list
module.exports.createTodo = async(req,res)=> {
    dueDate =req.body.dateValue.split('-'); // splitting date and taking montha value
    console.log(dueDate)
   let newdate='';
    newdate= DateValeu(dueDate);     
    await TodoLists.create({
        desc:req.body.desc,
        category:req.body.category,
        dueDate: newdate
    })
        return res.redirect('/')
    
}
// function for deleting todo list
module.exports.deleteTodo = async(req,res)=>{ 
    sp = req.query.id; // getting the id from ui
    console.log(sp)
    newsp = sp.split(','); 
    for(let i=0;i<newsp.length;i++){ // looping over newsp  to delete all the checked value
        await TodoLists.findByIdAndDelete(newsp[i])
    }
return res.redirect('/');
}
// function for fetching data for edit page
module.exports.EditPage = function(req,res){
    // fetching using mongoose 
    TodoLists.findById(req.query.id).then(todo => {
        return res.render('editPage',{
            title: "Edit Page",
            todoList:todo
        })})
    }
// function for updating todo after the todo is being edited
module.exports.editDetails =async(req,res)=>{
    dueDate =req.body.dueDate.split('-'); // splitting date and taking month value
    let newdate='';
    newdate= DateValeu(dueDate);     
    await TodoLists.updateOne({_id:req.query.id},{$set:{desc:req.body.desc,category:req.body.category,dueDate:newdate}})
        return res.redirect('/')

}
