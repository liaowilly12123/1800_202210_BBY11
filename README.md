## WatchParty

* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)

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
Top Level of project folder:
├───.firebaserc
├───.gitignore                  # Git ignore file
├───404.html                    # 404 HTML file
├───firebase.json
├───firestore.indexes.json
├───firestore.rules
├───index.html                  # landing HTML file
├───README.md
├───skeleton.html               # skeleton all sites are based on
├───storage.rules

├───components                        # folder for components
  /confirmation-modal.html            # confirmation modal component, displayed before performing an action
  /event-detail-modal.html            # event detail modal component, shows more details for an event
  /event-list-item.html               # event list item component, an event card that will go into a list
  /footer.html                        # footer component, shared across the app
  /header.html                        # header component, contains navigation for the app
  /joined-event-detail-modal.html     # joined event detail modal component, shows more details for an event that a user has joined is hosted
  /joined-event-list-item.html        # joined event list item modal component, an event card that will go into a list
  /modal-skeleton.html                # a skeleton that all modals refer back to

├───images                    # Folder for images
  /Biathlon.png
  /image.jpg
  /Opening Ceremonies.png
  /Snowboarding.png
  /Speed Skating.png

├───pages                 # Folder for main pages
  /display-code.html      # display code page, this is where the invite code is displayed
  /enter-code.html        # enter code page, this is where the invite code is entered to join a party
  /forms.html             # forms view, this is where the details for a watch party is inputted
  /login-page.html        # login page, this is where the user logs in
  /main.html              # main page, this is where the list of events are displayed and parties are created
  /my-events.html         # my events page, this is where the list of parties the user has joined or is hosting is displayed

├───scripts
  /authentication-logout.js             # contains the function to log out of firebase
  /authentication.js                    # JS for login-page.html
  /code-generator.js                    # generates a unique code, used in display-code.html
  /db-population-script.js              # script to generate test data
  /display-code.js                      # JS for display-code.html
  /enter-code.js                        # JS for enter-code.html
  /event-detail-modal.js                # JS for loading event-detail-modal component
  /firebaseAPI.js                       # firebase API stuff, shared across pages
  /joined-event-detail-modal.js         # JS for loading joined-event-detail-modal component
  /main.js                              # JS for main.html
  /modal-skeleton.js                    # JS for loading modal-skeleton.html
  /my-events.js                         # JS for my-events.html
  /skeleton.js                          # JS for loading basic components in several pages
  /util.js                              # contains small utility functions
  /WatchPartyCreated.js                 # JS to create a watch party, used in main.html

└───styles
  ├───style.css       # style for the app, shared across all pages
```

## Contact 
* Aryan Jand - ajand@my.bcit.ca 
* Willy Liao - tliao14@my.bcit.ca

## Acknowledgements 
* [Bootstrap 5](https://getbootstrap.com/)
* [Bootstrap Icons](https://icons.getbootstrap.com/)
* [Firebase and Firestore](https://firebase.google.com/)