class UserData {
    constructor() {
    }

    async getUserContacts() {
        const data = await fetch('http://localhost:3000/api/v1/user/contacts')
        const response = await data.json()
        return response
    }

    async createGroup(group_name, members) {
        const data = await fetch('http://localhost:3000/api/v1/user/groups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: group_name,
                members: members
            })
        })
        const response = await data.json()
        return response
    }

    async getUserGroups() {
        const data = await fetch('http://localhost:3000/api/v1/user/groups')
        const response = await data.json()
        return response
    }
}