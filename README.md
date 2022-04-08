## WatchParty

* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)

## General Info
WatchParty is an application that people can use to send invites for viewing Olympic events together, creating opportunities for family and friends to enjoy the Olympics in person or through other viewing options.
	
## Technologies
Technologies used for this project:
* HTML, CSS
* JavaScript
* Bootstrap
* Firebase and Firestore 
	
## Content
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to url
├── login.html               # login HTML file, the log-in page
├── main.html                # main HTML file, the landing page after log-in or user set-up
└── README.md                # woah, you're reading this now!

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
        /icons
            /activity.svg
        /login.jpg
        
├── scripts                         # Folder for scripts
  
        /firebase_api.js            # firebase API stuff, shared across pages
        /login_firebase.js          # JS for login.html

├── styles                          # Folder for styles
        /index.css                  # style for index.html
        /login.css                  # style for login.html
        /main.css                   # style for main.htm

Firebase hosting files: 
├── .firebase
	/hosting..cache
├── .firebaserc
├── 404.html
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── storage.rules


```

## Contact 
* Aryan Jand - ajand@my.bcit.ca 
* Willy Liao - tliao14@my.bcit.ca

## Acknowledgements 
* [Bootstrap 5](https://getbootstrap.com/)
* [Bootstrap Icons](https://icons.getbootstrap.com/)
* [Firebase and Firestore](https://firebase.google.com/)