const generateGroupList = async () => {
    const response = await _user.getAdminGroups()
    let str = ""
    let groups = response.data.obj
    groups.forEach((e) => {
        str += '<option value=' + e._id + '>' + e.name + '</option>'
    })
    return str
}
const generateGroupMemberList = async (groupId) => {
    const response = await _user.getMembersOfGroup(groupId)
    console.log(response)
}
const populateGroupList = async () => {
    const list = document.getElementById('group_list')
    list.innerHTML += await generateGroupList()
}
const populateDataTable = async (groupId) => {
    await generateGroupMemberList(groupId)
}
(async () => {
    await populateGroupList()
})()

