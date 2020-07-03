import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import firebase from 'firebase/app';
import 'firebase/auth';

export default function TextField() {

    useEffect(() => {
        loadMessages();
    })

    const textComponent = () => {
        return (
            <React.Fragment >
                <CssBaseline />
                <Container fixed>
                    <Typography component="div" style={{ position: 'relative', backgroundColor: '#ffffff', height: '80vh', marginTop: '50px', boxShadow: '2px 2px 4px gray'}} >
                        <div id='messages' style={{overflow: 'scroll', height: '90%'}}></div>
                        <form  onSubmit={e => handleMessage(e)}style={{ position: 'absolute', bottom: '10px', width: '100%'}}>
                            <input id='nameInput' placeholder='name...' style={{width: '10%'}}></input>
                            <input id='messageInput' placeholder='messages...' style={{width: '60%'}}></input>
                            <button type='submit' id='msgSubmitBtn'>Send</button>
                        </form>
                    </Typography>
                </Container>
          </React.Fragment>
        );
    };

    const handleMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const messageInput = document.getElementById('messageInput') as HTMLInputElement;
        const nameInput = document.getElementById('nameInput') as HTMLInputElement;
        const user = firebase.auth().currentUser? firebase.auth().currentUser: {
            displayName: nameInput.value? nameInput.value: "匿名ユーザー",
            photoURL: 'https://img.icons8.com/ios/50/000000/saitama.png',
        };
        saveMessages(messageInput, user);
        loadMessages();  
        messageInput.value = "";
    }
    type user = firebase.User | {
                    displayName: string;
                    photoURL: string;
                }| null;

    const saveMessages = (msgInp: HTMLInputElement, user: user ) => {
        if(msgInp.value !== '') {
            if(user !== null){
                firebase.firestore().collection('messages').doc().set({
                    name: user.displayName,
                    message: msgInp.value,
                    photoURL: user.photoURL,
                    timestamp: new Date()
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });  
            } 
        }else{
            alert("メッセージを入力してください！！");
        } 
    }

    const deleteMessage = (id: string) => {
        console.log("delete");
        firebase.firestore().collection('messages').doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
            window.location.reload(true);
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

    const loadMessages = () => {
        firebase.firestore().collection('messages').orderBy('timestamp')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                displayMessage( doc.id ,doc.data().name, doc.data().translated, doc.data().photoURL)
            });
          })
    }

    const displayMessage = ( id: string, name: string, transMsg: {ja: string, zh: string, en: string}, url: string) => {
        const template =
            '<div style="display: flex; flex-direction: row; border-bottom: solid 1px #acacac">' +
                '<div>'+
                    '<img class="pic" style=" width: 30px; border-radius: 50%; margin-right: 10px;"/>'+
                '</div>' +
                '<div>'+
                    '<div class="name" style=" font-size: 16px;text-align: start; line-height: 30px;"></div>'+
                    '<div class="message" style="font-size: 24px; font-weight: bold; "></div>' +
                    '<button style="background-color: white;" class="deleteButton">Delete</button>'+
                '</div>' +
            '</div>';
        let div = document.getElementById(id) as HTMLDivElement;

        if (!div) {
            let container = document.createElement('div');
            container.innerHTML = template;
            div = container.firstChild as HTMLDivElement;
            div.setAttribute('id', id);
            const MsgDiv = document.getElementById('messages')!;
            MsgDiv.appendChild(div);
        }

        if (url) {
            const PicDiv = div.querySelector('.pic')!;
            PicDiv.setAttribute('src',`${url}`);
        }
        const NameDiv = div.querySelector('.name')!;
        NameDiv.textContent = name;
        let messageElement = div.querySelector('.message')!;

        if (transMsg) {
            messageElement.textContent = `Jp: ${transMsg.ja}
                                          En:  ${transMsg.en}
                                          Ch:  ${transMsg.zh}`;
            messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
        }
        const detBtn = div.querySelector('.deleteButton') as HTMLButtonElement;
        detBtn.onclick = function() {deleteMessage(id)};
        let element = document.getElementById('messages')!;
        let bottom = element.scrollHeight - element.clientHeight;
        element.scroll(0, bottom);
       
    }

    const observeMessages = () => {
        firebase.firestore().collection("messages").orderBy('timestamp')
        .onSnapshot(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                displayMessage(doc.id ,doc.data().name, doc.data().translated, doc.data().photoURL);
            });
        },function(error) {
            console.log(error);
        });
    }

    observeMessages();

    return (
        <div>
        { textComponent() }  
      </div>
    );
};