new Vue({
    el: "#app",
    data: {
        ws: null,
        newMsg: '',
        chatContent: '',
        email: '',
        username: '',
        joined: false

    },

    created: function () {
        var self = this;
        this.ws = new websocket('ws://'+ window.location.host + '/ws');
        this.ws.addEventListener('message', function (e) {
            var msg = JSON.parse(e.data);
            self.chatContent += '<div class="chip"'
                    + '<img src="' + self.gravaterURL(msg.email) +'">' // avater
                    + msg.username
                + '</div>'
                + emojione.toImage(msg.message) + '</br>'; // parse Emoji

            var element = document.getElementById('chat-messages');
            element.scrollTop = element.scrollHeight; // autoscroll to bottom
        });
    },

    method: {
        send: function () {
            if (this.message != '') {
                this.ws.send(
                    JSON.stringify({
                        email: this.email,
                        username: this.username,
                        message: $('<p>').html(this.newMsg).text()
                        }
                    )
                );
                this.newMsg = '';   // reset message
            }
        },
        join: function () {
            if(!this.email) {
                Materialize.toact('you mast enter an email', 2000);
                return
            }

            if(!this.username) {
                Materialize.toact('you mast enter a username', 2000);
                return
            }

            this.email = $('<p>').html(this.email).text();
            this.username = $('<p>').html(this.username).text();
            this.joined = true;
        },
        gravaterURL: function (email) {
            return 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(email);
        }
    }
})