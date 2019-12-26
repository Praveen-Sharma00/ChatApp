var a=false,b=false,c=false;
const generateGroupList = async () => {
    const response = await _user.getAdminGroups()
    let str = ""
    let groups = response.data.obj
    groups.forEach((e) => {
        str += '<option value=' + e._id + '>' + e.name + '</option>'
    })
    return str
}
var currentGroupId;
const generateGroupMemberListTable = async (groupId) => {
    currentGroupId=groupId
    const response = await _user.getMembersOfGroup(groupId)
    const members = response.data.members
    let str=""
    if(response.success){

        for (let i=0;i< members.length;i++){
            let aColor,bColor,cColor;
            let aTitle,bTitle,cTitle;
            if(members[i].isAdmin){
                aColor = "danger"
                aTitle="Remove Admin Privilege"
            }else{
                aColor = "primary"
                aTitle="Make Admin"
            }
            if(members[i].permissions.includes("NoImageUpload")){
                bColor = "warning"
                bTitle="Allow file uploads"
            }else{
                bColor = "info"
                bTitle="Block Uploads"
            }

            if(members[i].permissions.includes("ReadOnly")){
                cColor = "warning"
                cTitle="Allow Read/write permission"
            }else{
                cColor = "info"
                cTitle="Make Read-Only user"
            }
            str+='<tr>\n' +
                ' <th scope="row">'+(i+1)+'</th>\n' +
                ' <td>'+members[i].name+'</td>\n' +
                ' <td>'+members[i].email+'</td>\n' +
                ' <td>'+members[i].isAdmin+'</td>\n' +
                ' <td><div class="d-inline btn-group-sm btn-group-toggle" id="permissions" data-toggle="buttons">' +
                '  <label class="btn btn-'+aColor+'" onclick="toggleAdmin()" data-toggle="tooltip" title="'+aTitle+'">' +
                '<input type="checkbox" name="options" id="admin" autocomplete="off"><i class="fas fa-shield-alt" ></i>'+
                '  </label>' +
                '  <label class="btn btn-'+bColor+'" onclick="toggleUpload()" data-toggle="tooltip" title="'+bTitle+'">' +
                '    <input type="checkbox" name="options" id="uploads" autocomplete="off"><i class="fas fa-file-upload" ></i>' +
                '  </label>' +
                '  <label class="btn btn-'+cColor+'" onclick="toggleRead()" data-toggle="tooltip" title="'+cTitle+'">' +
                '    <input type="checkbox" name="options"  id="readOnly" autocomplete="off"><i class="far fa-eye" ></i>' +
                '  </label>' +
                '</div>'+
                '&nbsp;&nbsp;&nbsp;&nbsp;<button  id="'+members[i]._id+'" class="d-inline btn-sm btn-outline-success waves-effect" data-toggle="tooltip"data-placement="top" title="Submit" onclick="setPermission(this.id)" ><i class="fa fa-check" aria-hidden="true"></i></button></td>'+
                '</tr>'
        }

    }
    return str
}
const populateGroupList = async () => {
    const list = document.getElementById('group_list')
    list.innerHTML += await generateGroupList()
}
const populateDataTable = async (groupId) => {
    let listTableBody = document.getElementById("member-list")
    listTableBody.innerHTML=""
    listTableBody.innerHTML+=await generateGroupMemberListTable(groupId)
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
}
var a=false,b=false,c=false
const toggleAdmin = async ()=>{
    a=!a
    console.log(a)
}
const toggleUpload = ()=>{
    b=!b
}
const toggleRead = ()=>{
    c=!c
}
const setPermission=async(userId)=>{
    let permissions=[]
    if(a){
        permissions.push("Admin")
    }else{
        permissions.push("~Admin")
    }

    if(b){
        permissions.push("NoImageUpload")
    }else{
        permissions.push("~NoImageUpload")
    }

    if(c){
        permissions.push("ReadOnly")
    }else{
        permissions.push("~ReadOnly")
    }

    console.log(permissions)
    const response=await _user.updatePermissions(currentGroupId,userId,permissions)
    console.log(response)
    if(response.success){
        await populateDataTable(currentGroupId)
    }else{
        alert('Some error occurred')
    }
}

(async () => {
    await populateGroupList()
})()

