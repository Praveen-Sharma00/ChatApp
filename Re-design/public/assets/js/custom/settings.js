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
        members.forEach((e,i)=>{
            str+='<tr>\n' +
                ' <th scope="row">'+(i+1)+'</th>\n' +
                ' <td>'+e.name+'</td>\n' +
                ' <td>'+e.email+'</td>\n' +
                ' <td>'+e.isAdmin+'</td>\n' +
                ' <td><div class="d-inline btn-group-sm btn-group-toggle" id="permissions" data-toggle="buttons">' +
                '  <label class="btn btn-primary " onclick="toggleAdmin()" data-toggle="tooltip" title="Make Admin">' +
                '<input type="checkbox" name="options" id="admin" autocomplete="off"><i class="fas fa-shield-alt" ></i>'+
                '  </label>' +
                '  <label class="btn btn-info" onclick="toggleUpload()"data-toggle="tooltip" title="Block Uploads">' +
                '    <input type="checkbox" name="options" id="uploads" autocomplete="off"><i class="fas fa-file-upload" ></i>' +
                '  </label>' +
                '  <label class="btn btn-light" onclick="toggleRead()" data-toggle="tooltip" title="Make Read-Only user">' +
                '    <input type="checkbox" name="options"  id="readOnly" autocomplete="off"><i class="far fa-eye" ></i>' +
                '  </label>' +
                '</div>'+
                '&nbsp;&nbsp;&nbsp;&nbsp;<button  id="'+e._id+'" class="d-inline btn-sm btn-outline-success waves-effect" data-toggle="tooltip"data-placement="top" title="Submit" onclick="setPermission(this.id)" ><i class="fa fa-check" aria-hidden="true"></i></button></td>'+
                '</tr>'
        })
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
        permissions.push("ReadOnly")
    }else{
        permissions.push("~ReadOnly")
    }

    if(c){
        permissions.push("NoImageUpload")
    }else{
        permissions.push("~NoImageUpload")
    }
    const response=await _user.updatePermissions(currentGroupId,userId,permissions)
    console.log(response)
    // console.log(permissions)
}
(async () => {
    await populateGroupList()
})()

