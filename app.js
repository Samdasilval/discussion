"use strict";

const User = function (name) {
  this.name = name;
};

const anna = new User("Anna");

const Conversation = function () {
  this.users = [];
  this.messages = [];
}

const Message = function (from, message) {
  this.user = from;
  this.content = message;
  this.display(this.user, this.content);
}

let currentUser = null;

Conversation.prototype.addUser = function (userToAdd) {
  if (userToAdd instanceof User) {
    if (! this.users.includes(userToAdd)) {
      this.users.push(userToAdd);
      console.log(`${userToAdd.name} est ajouté`);
    } else {
      console.log("Utilisateur déjà présent dans la conversation");
    }
  } else if (typeof userToAdd === "object") {
    userToAdd.forEach((user) => {
      if (!this.users.includes(user)) {
        this.users.push(user);
        console.log(`${user.name} est ajouté`);
      } else {
        console.log("Utilisateurs déjà présent dans la conversation");
      }
    });
  } else {
    console.log("Ce n'est/sont pas un/des utilisateur/s");
  }
}

User.prototype.sendMessage = function (conversation, contenu) {
  if(conversation.users.includes(this)){
    conversation.messages.push(new Message(this, contenu));
  } else {
    console.log("L'utilisateur ne fait pas parti de la conversation");
  } 
}

const selectConversation = document.querySelector(".conversation");

Message.prototype.display = function (user, contenu) {
  let form = "";

  if (user === currentUser){
    form = "from-me";
  } else {
    form = "from-them";
  }
  const url = `<div>
  <span class="${form}">${user.name}</span>
  <p class="${form}">${contenu}</p>
</div>`;
selectConversation.insertAdjacentHTML("beforeend", url);
}