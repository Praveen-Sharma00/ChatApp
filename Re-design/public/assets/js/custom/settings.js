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
var currentState = []
var modifiedState = []
const generateGroupMemberListTable = async (groupId) => {
    currentGroupId = groupId
    const response = await _user.getMembersOfGroup(groupId)
    const members = response.data.members
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
            str += '<tr>\n' +
                ' <th scope="row">' + (i + 1) + '</th>\n' +
                ' <td>' + members[i].name + '</td>\n' +
                ' <td>' + members[i].email + '</td>\n' +
                ' <td>' + members[i].isAdmin + '</td>\n' +
                ' <td><div class="d-inline btn-group-sm btn-group-toggle" id="permissions" data-toggle="buttons">' +
                '  <label class="btn btn-' + aColor + '"  name="' + i + '" onclick="toggleAdmin(this)" data-toggle="tooltip" title="' + aTitle + '">' +
                '<input type="checkbox" name="options" id="admin" autocomplete="off"><i class="fas fa-shield-alt" ></i>' +
                '  </label>' +
                '  <label class="btn btn-' + bColor + '"  name="' + i + '" onclick="toggleUpload(this)" data-toggle="tooltip" title="' + bTitle + '">' +
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
    console.log(i)
    modifiedState[index].IsAdmin = !modifiedState[index].IsAdmin
    console.log(modifiedState[index])
}
const toggleRead = (i) => {
    console.log(i)
    const index = parseInt(i.getAttribute("name"))
    modifiedState[index].IsReadOnly = !modifiedState[index].IsReadOnly
    // console.log(modifiedState[index].IsReadOnly)
    console.log(modifiedState[index])
}
const toggleUpload = (i) => {
    console.log(i)
    const index = parseInt(i.getAttribute("name"))
    modifiedState[index].IsUploadBlocked = !modifiedState[index].IsUploadBlocked
    // console.log(modifiedState[index].IsUploadBlocked)
    console.log(modifiedState[index])
}

const setPermission = async (userId, i) => {
    const index = parseInt(i)
    let permissions = []
    // console.log("Init data "+ currentState[index]["IsAdmin"],  currentState[index]["IsUploadBlocked"],currentState[index]["IsReadOnly"]
    // )
    // console.log("Init state "+
    //     modifiedState[index]["IsAdmin"],
    //     modifiedState[index]["IsUploadBlocked"],
    //     modifiedState[index]["IsReadOnly"]
    // )
    console.log(modifiedState[i].IsAdmin, modifiedState[i].IsReadOnly, modifiedState[i].IsUploadBlocked)
    if (modifiedState[index].IsAdmin) {
        currentState[index].IsAdmin = !currentState[index].IsAdmin
        console.log(currentState[index].IsAdmin)
    }
    if (modifiedState[index].IsReadOnly) {
        currentState[index].IsReadOnly = !currentState[index].IsReadOnly
        console.log(currentState[index].IsReadOnly)
    }
    if (modifiedState[index].IsUploadBlocked) {
        currentState[index].IsUploadBlocked = !currentState[index].IsUploadBlocked
        console.log(currentState[index].IsUploadBlocked)
    }
    // console.log("After data "+
    //     currentState[index]["IsAdmin"],
    //     currentState[index]["IsUploadBlocked"],
    //     currentState[index]["IsReadOnly"]
    //
    // )
    // console.log("After state "+
    //     modifiedState[index]["IsAdmin"],
    //     modifiedState[index]["IsUploadBlocked"],
    //    modifiedState[index]["IsReadOnly"]
    //
    // )
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
    // currentState[index]["IsAdmin"] ? permissions.push("Admin") : permissions.push("~Admin")
    // currentState[index]["IsReadOnly"] ? permissions.push("ReadOnly") : permissions.push("~ReadOnly")
    // currentState[index]["IsUploadBlocked"] ? permissions.push("BlockUploads") : permissions.push("~BlockUploads")
    console.log(permissions)

    const response = await _user.updatePermissions(currentGroupId, userId, permissions)
    permissions = null
    console.log(response)
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

