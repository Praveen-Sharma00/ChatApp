class UserData {
    constructor() {
    }

    baseUrl = 'http://localhost:3000'

    async doGetRequest(url) {

        const data = await fetch(this.baseUrl + url)
        const response = await data.json()
        return response
    }

    async doPostRequest(url, body) {
        const data = await fetch(this.baseUrl + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const response = await data.json()
        return response
    }

    async doUploadPostRequest(formData) {
        const data = await fetch('/upload/', {method: "POST", body: formData});
        const response = await data.json()
        return response
    }

    async getCurrentUser() {
        const response = await this.doGetRequest('/api/v1/user/')
        return response
    }

    async getUserContacts() {
        const response = await this.doGetRequest('/api/v1/user/contacts')
        return response
    }

    async createGroup(group_name, members) {
        const response = await this.doPostRequest('/api/v1/user/groups', {
            name: group_name,
            members: members
        })
        return response
    }

    async getUserGroups() {
        const response = await this.doGetRequest('/api/v1/user/groups')
        return response
    }

    async getConversationBetweenUsers(recipientId) {
        const response = await this.doGetRequest('/api/v1/user/chats/' + recipientId)
        return response
    }

    async updateIndividualConversation(recipientId, text) {
        const response = await this.doPostRequest('/api/v1/user/chats/' + recipientId, {
            text: text
        })
        return response
    }

    async getGroupConversation(groupId) {
        const response = await this.doGetRequest('/api/v1/user/chats/group/' + groupId)
        return response
    }

    async updateGroupConversation(groupId, text) {
        const response = await this.doPostRequest('/api/v1/user/chats/group/' + groupId, {
            text: text
        })
        return response
    }

    async getMembersOfGroup(groupId) {
        const response = await this.doGetRequest('/api/v1/user/group/' + groupId)
        return response
    }

    async getAdminGroups() {
        const response = await this.doGetRequest('/api/v1/admin/groups')
        return response
    }

    async getGroupAdmins(groupId) {
        const response = await this.doGetRequest('/api/v1/group/' + groupId + '/admins')
        return response
    }

    async updatePermissions(groupId, userId, permissions) {
        const response = await this.doPostRequest('/api/v1/user/group/' + groupId, {
            permissions,
            userId
        })
        return response
    }

    async getUserPermissions(groupId) {
        const response = await this.doGetRequest('/api/v1/user/group/' + groupId + '/permissions')
        return response
    }

    async uploadFile(data) {
        console.log(data)
        const response = await this.doUploadPostRequest(data)
        return response
    }

    async getPendingGroupUploads(groupId) {
        const response = await this.doGetRequest('/api/v1/admin/group/' + groupId + '/notifications/')
        return response
    }

    async updateMembersOfGroup(groupId, newMembers) {
        const response = await this.doPostRequest('/api/v1/admin/group/' + groupId, {
            newMembers
        })
        return response
    }

    async updatePendingGroupUploadStatus(groupId, msgId) {
        const response = await this.doPostRequest('/api/v1/admin/group/' + groupId + '/notifications/', {
            msgId
        })
        return response
    }
}