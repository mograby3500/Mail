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



  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function view_email(id){
  alert("we are goint to implement that function in the near future!" +  id);
}
function load_mailbox(mailbox) {
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';


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
      console.log(email);
      const li = document.createElement('li');

      if(email.read){
        li.style.background='white';
      }else{
        li.style.background='#D3D3D3';
      }

      let content= email.sender + ": " + email.subject +",  " + email.timestamp;
      li.onclick= () => view_email(email.id);
      li.innerHTML= content;
      list.append(li);
    }
  })

  // Show the mailbox name
  // document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}