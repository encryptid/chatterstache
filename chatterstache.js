/**
 * Write a chat app that can send and receive messages.
 * 
 * Work in pairs; you can find your assigned partner in Slack.
 * 
 * Your goal is to create a working chat app that can be used to send and receive messages. Your application should 
 * display messages that other users have sent, and allow you to send a message yourself. Every user should specify a 
 * username, which should also be sent with each message.
 * 
 * You should use AJAX requests for both GET and POST requests. No refreshing should be necessary for your app to work. 
 * 
 * You also need to style your app on both mobile and desktop.
 * 
 * Teams
 * 
 * It is not ok to have your partner do everything. Its ok for one person to handle most of the CSS and one to handle 
 * most of the JS, but it is not ok to only do CSS or only do JS.
 * 
 * Key features
 * 
 * Allow users to send chats.
 * 
 * Either automatically update messages periodically (interval) or have a button that gets new messages.
 * Styled using a Foundation grid with a small mode (mobile) and large mode (desktop).
 * 
 * API
 * 
 * You'll need to use two different API calls to build your app.
 * 
 * GET http://api.queencityiron.com/chats can be used to get all messages.
 * 
 * POST http://api.queencityiron.com/chats can be used to submit a new message. Messages need to have a from and message 
 * property.
 * 
 * Hard mode
 * 
 * Add some keywords that have special meaning in the messages. For example, you could say that any message starting 
 * with !important gets a red background, or any name following an @, such as @luke would be highlighted in a different 
 * color if its the user's name. You get to pick the meaning as well as the keywords, and feel free to make multiple.
 */

// BEGIN MY NOTES:

// 1. Create a function that 'GETS' info from server upon load

// 2. Function loads all current messages from server and shows them in the "main" section of HTML

// 3. Once loaded, create an a eventListener for clicks that loads ONLY the new messages ('GET' w/ a for loop?)
//     maybe reviews all messages but excludes all but the new? Maybe based on ID?

// 4. Also, create a listener that takes the value of the message box and 'POST's it to the server, as well as
//         adding it as an <li> to the <ul> of the body

// 5. Bonus points for auto-load feature.


window.addEventListener('load', function () {
    console.log("Hi Mom!")

    //let ids = [];

    loadMessages();

    submitMessage();


    let getBtn = document.querySelector('#get');
    getBtn.addEventListener('click', getMessages);

});

function loadMessages() {
    console.log('loadMessages running!');
    let chatter = new XMLHttpRequest();
    chatter.open('GET', 'http://api.queencityiron.com/chats');
    chatter.addEventListener('load', function () {
        let response = JSON.parse(chatter.responseText);
        let chats = response.chats;
        console.log(chats);

        for (let i = 0; i < response.chats.length; i++) {
        console.log(chats[i]);
        showMessages(chats[i]);
        }
    });
    chatter.send();
}

function showMessages(messages) {
    console.log("showMessages running!")
    let child = document.createElement('ul');
    let parent = document.querySelector('#chatbox');
    console.log(child);
    console.log(parent);

    let template = document.querySelector('#message-template');
    child.innerHTML = Mustache.render(template.innerHTML, {
        from: messages.from,
        words: messages.message,
    });
    parent.appendChild(child);
}

function submitMessage() {
    console.log("submitMessage running!");
    let sendBtn = document.querySelector('#send');
    sendBtn.addEventListener('click', function () {
        console.log('send button works!');
        let push = new XMLHttpRequest();
        push.open('POST', 'http://api.queencityiron.com/chats');
        let body = JSON.stringify({
            from: document.querySelector('#user').value,
            message: document.querySelector('#msg').value,
        });
        document.querySelector('#msg').value = '';
        push.send(body);
    });
};

function getMessages() {
    console.log('getMessages is running!');
        let newMsg = new XMLHttpRequest();
        newMsg.open('GET', 'http://api.queencityiron.com/chats');
        newMsg.addEventListener('load', function() {
        let response = JSON.parse(newMsg.responseText);
        let chats = response.chats;
        console.log(chats);

        for (let i = 0; i < response.chats.length; i++) {
        console.log(chats[i]);
        showMessages(chats[i]);
        }
    });
    newMsg.send();
}