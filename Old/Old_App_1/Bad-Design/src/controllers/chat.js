const dashboard = (req,res)=>{
    res.render('dashboard')
}
const groupChat = (req,res)=>{
    res.render('group_chat')
}
const chat = (req,res)=>{
    res.render('chat')
}

export let dashboardController ={
    chat:chat,
    groupChat : groupChat,
    dashboard:dashboard
}