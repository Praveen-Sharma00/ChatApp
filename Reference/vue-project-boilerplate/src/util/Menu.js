const Menu = [ 
    {
        title: "Home",
        icon: "house",
        name: "home",
        visibility : true
    },
    {
        title: "RFQ",
        name: 'RFQ',
        icon: "list-check",
        visibility : true,
        items: [{
            title: "New RFQ",
            name: "addrfq",
            icon: "plus",
            visibility : true
          },
          {
            title: "Respond RFQ",
            name: "respondrfq",
            icon: "reply",
            visibility : true
          }    
        ]
    },
    {
      title: "Chat",
      icon: "chat",
      name: "chat",
      visibility : true
  },
]

Menu.forEach(item => {
    if (item.items) {
      item.items.sort((x, y) => {
        let textA = x.title.toUpperCase()
        let textB = y.title.toUpperCase()
        return textA < textB ? -1 : textA > textB ? 1 : 0
      })
    }
  })
  
  export default Menu