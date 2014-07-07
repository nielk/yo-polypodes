#Yo-polypodes

##What is Yo-polypodes?

Yo-polypodes is a Yeoman generator. It helps you to kickstart  new projects. We built this specific generator to pair with our existing workflow (Gulp, and BEM structure).


##Overview

```
- build/
    - ...
- src/
    - style.less
    - main.js
    - layouts/
        - default-partials/
            - ...
        - home/
            - home.less
            - home.js
            - home.jade
        - contact/
            - contact.less
            - contact.js
            - contact.jade
    - blocks/
        - search/
            - search.less
            - search.js
            - search.jade
        - footer/
            - footer.less
            - footer.js
            - footer.jade
        - menu/
            - menu.less
            - menu.js
            - menu.jade
        - list/
            - list.less
            - list.js
            - list.jade
    - common/
        - common.less
        - common.js
- test/
	- visual/
    	- configs/
        	config.yaml
        - javascript/
        	snap.js
    - unit/
```

##Getting Started

###Install Yeoman
`npm install -g yo`

###Install Yo-polypodes generator
`npm install -g generator-yo-polypodes`

###Init a project
Go to your project folder and run :
`yo yo-polypodes`

Voilà !

###Available commands
`yo yo-polypodes:modules moduleName`
creates a BEM like module :
```
myModule/
	myModule.js
    myModule.jade
    myModule.less
```

`yo yo-polypodes:regression ` launches css regression tool, you need to install wraith : https://github.com/BBC-News/wraith

