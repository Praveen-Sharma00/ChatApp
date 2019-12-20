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
}