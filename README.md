# CrowdTales

CrowdTales is a web application that combines the art of storytelling and internet's unparalled ability to crowd source unique and original content. It allows users to find and contribute towards projects they enjoy. 

## About the Author

## Getting Started/Installation Notes/System Specifications

This application should work on all modern web browsers. A mobile application deployment for Android and iOS devices will follow in the future.

## How to Use the Application

To use the application, simply navigate to https://crowdtales.herokuapp.com/. 

## User Stories/Base functionality

1. With or without a login, a user can navigate to CrowdTales, and click on the browse tab. User is taken to a list of all projects. 
  * Projects can be filtered/sorted by various criteria, such as completion status (completed, in progress, in prompt), genre, type (ie: novel, short story, biography etc), name of the user that created the writing prompt, name of users who contributed to the project. 
  * User may read any project listed.

2. If user signs in, in addition to browsing current works, the user can "bookmark" a project so that it can be easily reviewed in the future, can sign up to contribute to a project, or create a writing prompt, which is the start of a new project. 

3. Bookmarked projects are added to the user's account. A list of bookmarked projects is contained in the user's account page.

4. When a user signs up to contribute to a particular, he or she is put into a queue of collaborators. He or she is also automatically bookmarked on the project. When a user reaches the top of the queue, the user's home page will show that it is the user's turn. The user can then click a button to contribute to the story. Contributions will be of a limited length, and the user will have seven days to create and post his or her contribution.

5. Stories have members, and membership in a story provides certain benefits. Each story contributor is given membership in the story. Members have the right to review and upvote/downvote story contributions. A voting round is started immediately after content is submitted. Members have 48 hours to review the addition, comment on it, and upvote or downvote. If the project gets 60% upvotes of all members voting, the content passes, and the next person in the queue starts work. If downvotes exceed 60%, the submitted content is deleted, and the next person in the queue gets to create content. If the vote result is in between the above margins, the author of the content gets to edit it and resubmit. 

6. When the project creator believes a project is nearing compltion, he or she can call an ending vote. The vote passes with a simple majority. If it passes, the creator gets to draft an ending to the story. The contribution queue is purged, and the button allowing joining to the queue is locked. If the vote fails, the next person in the queue gets to contribute as normal. 

7. Once the end vote passes, and the creator makes an ending, all members vote on the ending. It passes with a simple majority as well. If the vote passes, the project is complete. If the vote fails, the creator gets to edit the ending until the vote passes.  

8. Once the end vote passes, the story is automatically published into an online flipbook that may be read. 

## Stretch Features

1. Upon completion of a book, the creator can drag and drop photographs into the book to illustrate it. 

2. Email notifications regarding contribution queues, and changes to books that are bookmarked.

3. Ability to export a finished book to PDF.


