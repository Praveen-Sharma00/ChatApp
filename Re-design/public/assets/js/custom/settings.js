var currentGroupId;
var currentState = []
var modifiedState = []
var currentAdminLevel;

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
    currentGroupId = groupId
    const currentUser = await _user.getCurrentUser()
    const response = await _user.getMembersOfGroup(groupId)
    const members = response.data.members
    const _r = response.data.members.find(e => e._id == currentUser._id).adminLevel
    currentAdminLevel = _r
    let str = ""
    if (response.success) {
        for (let i = 0; i < members.length; i++) {
            currentState.push({
                IsAdmin: members[i].isAdmin,
                IsReadOnly: members[i].permissions.includes("ReadOnly"),
                IsUploadBlocked: members[i].permissions.includes("BlockUploads")
            })
            modifiedState.push({
                IsAdmin: false,
                IsReadOnly: false,
                IsUploadBlocked: false
            })

            let aColor, bColor, cColor;
            let aTitle, bTitle, cTitle;
            if (members[i].isAdmin) {
                aColor = "danger"
                aTitle = "Click to Remove Admin Privilege"
            } else {
                aColor = "primary"
                aTitle = "Click to  Make Admin"
            }
            if (members[i].permissions.includes("BlockUploads")) {
                bColor = "danger"
                bTitle = "Click to Allow file uploads"
            } else {
                bColor = "primary"
                bTitle = "Click to Block Uploads"
            }

            if (members[i].permissions.includes("ReadOnly")) {
                cColor = "danger"
                cTitle = "Click to Allow Read/write permission"
            } else {
                cColor = "primary"
                cTitle = "Click to Make Read-Only user"
            }
            if (currentUser._id == members[i]._id || (currentAdminLevel > members[i].adminLevel)) {
                continue;
            } else {
                str += '<tr>\n' +

                    ' <td>' + members[i].name + '</td>\n' +
                    ' <td>' + members[i].email + '</td>\n' +
                    ' <td>' + members[i].isAdmin + '</td>\n' +
                    ' <td><div class="d-inline btn-group-sm btn-group-toggle" id="permissions" data-toggle="buttons">'
                if ((currentAdminLevel <= members[i].adminLevel)) {
                    str += '  <label class="btn btn-' + aColor + '"  name="' + i + '" onclick="toggleAdmin(this)" data-toggle="tooltip" title="' + aTitle + '">' +
                        '<input type="checkbox" name="options" id="admin" autocomplete="off"><i class="fas fa-shield-alt" ></i>' +
                        '  </label>'
                }
                // } else if(currentAdminLevel > members[i].adminLevel && currentAdminLevel===2) {
                //     str += '<label class="btn btn-light" disabled><input type="checkbox" ><i class="fa fa-ban" aria-hidden="true"></i></label>'
                // }
                str += '  <label class="btn btn-' + bColor + '"  name="' + i + '" onclick="toggleUpload(this)" data-toggle="tooltip" title="' + bTitle + '">' +
                    '    <input type="checkbox" name="options" id="uploads" autocomplete="off"><i class="fas fa-file-upload" ></i>' +
                    '  </label>' +
                    '  <label class="btn btn-' + cColor + '"  name="' + i + '" onclick="toggleRead(this)" data-toggle="tooltip" title="' + cTitle + '">' +
                    '    <input type="checkbox" name="options"  id="readOnly" autocomplete="off"><i class="far fa-eye" ></i>' +
                    '  </label>' +
                    '</div>' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;<button name=' + i + ' id="' + members[i]._id + '" class="d-inline btn-sm btn-outline-success waves-effect" data-toggle="tooltip"data-placement="top" title="Submit" onclick="setPermission(this.id,this.name)" ><i class="fa fa-check" aria-hidden="true"></i></button></td>' +
                    '</tr>'
            }
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
    listTableBody.innerHTML = ""
    listTableBody.innerHTML += await generateGroupMemberListTable(groupId)
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
}
const toggleAdmin = (i) => {
    const index = parseInt(i.getAttribute("name"))
    modifiedState[index].IsAdmin = !modifiedState[index].IsAdmin
}
const toggleRead = (i) => {
    const index = parseInt(i.getAttribute("name"))
    modifiedState[index].IsReadOnly = !modifiedState[index].IsReadOnly
}
const toggleUpload = (i) => {
    const index = parseInt(i.getAttribute("name"))
    modifiedState[index].IsUploadBlocked = !modifiedState[index].IsUploadBlocked
}
const setPermission = async (userId, i) => {
    const index = parseInt(i)
    let permissions = []

    if (modifiedState[index].IsAdmin) {
        currentState[index].IsAdmin = !currentState[index].IsAdmin
    }
    if (modifiedState[index].IsReadOnly) {
        currentState[index].IsReadOnly = !currentState[index].IsReadOnly
    }
    if (modifiedState[index].IsUploadBlocked) {
        currentState[index].IsUploadBlocked = !currentState[index].IsUploadBlocked
    }
    if (currentState[index].IsAdmin) {
        permissions.push("Admin")
    } else {
        permissions.push("~Admin")
    }

    if (currentState[index].IsReadOnly) {
        permissions.push("ReadOnly")
    } else {
        permissions.push("~ReadOnly")
    }
    if (currentState[index].IsUploadBlocked) {
        permissions.push("BlockUploads")
    } else {
        permissions.push("~BlockUploads")
    }
    const response = await _user.updatePermissions(currentGroupId, userId, permissions)
    permissions = null
    if (response.success) {
        await populateDataTable(currentGroupId)
        modifiedState[index].IsAdmin = false
        modifiedState[index].IsReadOnly = false
        modifiedState[index].IsUploadBlocked = false
    } else {
        alert('Some error occurred')
    }
}

(async () => {
    await populateGroupList()
})()

