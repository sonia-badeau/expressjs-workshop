var Sequelize = require('sequelize');


var reddit = new Sequelize('reddit', 'somaba','', {
    dialect: 'mysql'
})

// we tell Sequelize what are our tables and what's on
//define Method ==> Sequelize add the attributes createdAt and updatedAt

var Users = reddit.define('users', {
    email: Sequelize.STRING,
    screen_name: Sequelize.STRING,
    password: Sequelize.STRING
})

var Posts = reddit.define('posts', {
    url: Sequelize.STRING,
    title: Sequelize.STRING
});

var Votes = reddit.define('votes', {
    upVotes: Sequelize.BOOLEAN
});

//Associations
Users.hasMany(Posts);
Posts.belongsTo(Users);
Users.belongsToMany(Posts, {through: Votes, as: 'Upvotes'})
Posts.belongsToMany(Users, {through: Votes});



function createNewUser (screen_name, password, callback){
    return Users.create({
        screen_name: screen_name,
        password: password
    }).then(function(user){
        if (typeof callback === 'function') {
            callback(user);
        }
    });
}
//createNewUser('anonymous', '', function(newguy){console.log(JSON.stringify(newguy, 0 , 2))});


function createNewContent (userID, url, title, callback){
    Users.findById(1).then(function(user){
        user.createPost({
        url: url,
        title: title
        }).then(function(user){
            callback(user);
        })
    });
    
}
//createNewContent(1, 'http://www.cach.fr', 'Libération', function(user){console.log(JSON.stringify(user, 0 , 2))});

function findLatestPost () { 
    return Posts.findAll({
    order: [
    ['createdAt', 'DESC', ]
    ],
    limit: 5,
    include: [Users]
})

}


//reddit.sync();



module.exports = {findLatestPost: findLatestPost, createNewUser: createNewUser, createNewContent: createNewContent}
