const generateGroupList = async () => {
    const response = await _user.getAdminGroups()
    let str = ""
    let groups = response.data.obj
    groups.forEach((e) => {
        str += '<option value=' + e._id + '>' + e.name + '</option>'
    })
    return str
}

const generateGroupMemberListTable = async (groupId) => {
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
                ' <td>@mdo</td>\n' +
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
}
(async () => {
    await populateGroupList()
})()

