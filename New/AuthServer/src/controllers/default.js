const home = (req, res) => {
    res.render('index')
}

export let defaultController = {
    home: home
}