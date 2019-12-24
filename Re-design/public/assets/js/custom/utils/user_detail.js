class UserData {
    constructor() {
    }

    async doGetRequest(url) {
        const data = await fetch(url)
        const response = await data.json()
        return response
    }

    async doPostRequest(url, body) {
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const response = await data.json()
        return response
    }

    async getCurrentUser() {
        const response = await this.doGetRequest('http://localhost:3000/api/v1/user/')
        return response
    }

    async getUserContacts() {
        const response = await this.doGetRequest('http://localhost:3000/api/v1/user/contacts')
        return response
    }

    async createGroup(group_name, members) {
        const response = await this.doPostRequest('http://localhost:3000/api/v1/user/groups', {
            name: group_name,
            members: members
        })
        return response
    }

    async getUserGroups() {
        const response = await this.doGetRequest('http://localhost:3000/api/v1/user/groups')
        return response
    }

    async getConversationBetweenUsers(recipientId) {
        const response = await this.doGetRequest('http://localhost:3000/api/v1/user/chats/' + recipientId)
        return response
    }
    async updateIndividualConversation(recipientId,text){
        const response = await this.doPostRequest('http://localhost:3000/api/v1/user/chats/'+recipientId,{
            text:text
        })
        return response
    }
    async getGroupConversation(groupId) {
        const response = await this.doGetRequest('http://localhost:3000/api/v1/user/chats/group/' + groupId)
        return response
    }
    async updateGroupConversation(groupId,text){
        const response = await this.doPostRequest('http://localhost:3000/api/v1/user/chats/group/'+groupId,{
            text:text
        })
        return response
    }

    async getMembersOfGroup(groupId){
        console.log(groupId)
        const response = await this.doGetRequest('http://localhost:3000/api/v1/user/group/'+groupId)
        return response
    }
    async getAdminGroups(){
        const response = await this.doGetRequest('http://localhost:3000/api/v1/admin/groups')
        return response
    }
    
}