document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  document.querySelector('#compose-form').onsubmit= send_email;

  // By default, load the inbox
  load_mailbox('inbox');
});

function  send_email(){
  const recipients= document.querySelector('#compose-recipients').value;
  const subject= document.querySelector('#compose-subject').value;
  const body=  document.querySelector('#compose-body').value;

  fetch('/emails', {
    method: 'POST',
    body: 
    JSON.stringify({
      recipients: recipients,
      subject: subject,
      body: body
    }),
  })
  
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error();
  })
  
  .then(result => {
    load_mailbox('sent');
  })
  
  .catch(error => {
    alert(error);
  })

  return false;
}
function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#email-view').style.display = 'none';



  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function view_email(id, show_reply){
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'block';

  fetch(`/emails/${id}`)
  .then(response => {
    return response.json();
  })
  .then(email => {
    //do what you want with the email in here.

    //sender div
    document.querySelector('#email-sender').innerHTML= email.sender;
  
    //recipients div
    document.querySelector('#email-recipients').innerHTML= email.recipients;

    //subject div
    document.querySelector('#email-subject').innerHTML= email.subject;

    //timestamp div
    document.querySelector('#email-timestamp').innerHTML= email.timestamp;
  
    //email body
    document.querySelector('#email-body').innerHTML= email.body;
    
    if(show_reply){
      document.querySelector('#reply-button').style.display= 'block';
    }else{
      document.querySelector('#reply-button').style.display= 'none';
    }

    fetch(`/emails/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
          read: true
      })
    })
  })
}


function load_mailbox(mailbox) {
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'none';

  fetch(`/emails/${mailbox}`)
  .then(response => {
    return response.json();
  })
  .then (emails => {
    const list= document.querySelector('#mail-box');
    
    //clear the list first
    list.innerHTML = '';

    for(let i = 0; i < emails.length; i++){
      const email= emails[i];
      const li = document.createElement('li');

      if(email.read){
        li.style.background='white';
      }else{
        li.style.background='#D3D3D3';
      }

      const span1 = document.createElement('span');
      span1.id= 'row-email-left';
      span1.innerHTML= email.sender;
      
      const span2 = document.createElement('span');
      span2.innerHTML= email.subject;
      span2.id= 'row-email-mid';

      const span3 = document.createElement('span');
      span3.innerHTML= email.timestamp;
      span3.id= 'row-email-right';

      li.appendChild(span1);
      li.appendChild(span2);
      li.appendChild(span3);
      
      li.id= 'row-email';
      li.onclick= () => view_email(email.id, mailbox === 'inbox');
      list.append(li);
    }
  })

  // Show the mailbox name
  // document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}