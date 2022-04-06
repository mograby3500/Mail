# Mail
This is the 3rd project of the course CS50 Web programming with python and javascript.

Mail is Front-end for an email client that makes API calls to send and receive emails.

# Specification

## Send Mail
- When a user submits the email composition form, an email is sent via an API call.

## Mailbox
- When a user visits their Inbox, Sent mailbox, or Archive, a page is loaded with the appropriate mailbox.
- When a mailbox is visited, the application first query the API for the latest emails in that mailbox.
- Each email is then rendered in its own box (e.g. as a div with a border) that displays who the email is from, what the subject line is, 
  and the timestamp of the email.
- If the email is unread, it should appear with a white background. If the email has been read, it should appear with a gray background.

## View Email
- When a user clicks on an email, the user should be taken to a view where they see the content of that email.
- Once the email has been clicked on, the email is marked as read by an API call.

## Archive and Unarchive
- Users are allowed to archive and unarchive emails that they have received
- When viewing an Inbox email, the user should be presented with a button that lets them archive the email. 
- When viewing an Archive email, the user should be presented with a button that lets them unarchive the email. 
 
## Reply
- When viewing an email, the user should be presented with a “Reply” button that lets them reply to the email.
- When the user clicks the “Reply” button, they should be taken to the email composition form prefilled with the necessary information.
