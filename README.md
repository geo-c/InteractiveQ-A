## InteractiveQ-A
# First Steps:
To use the interactive guide you have to create a config file, which includes the information of the pages like a name and a path.

Pages which hold the information can be in .htm or .html format.


# Structure of the config file:
The config file displays a tres structure with variable depth. It can hold as many elements as necessary.

Each node has following attributes:
		question: text
		name: text
		answers: Array
		content: text

The entry node has no name attribute.

The question attribute holds question to be asked to the user.

The answer attribute is an array of nodes, which are the answering options to the question. Here the name attribute of this node is displayed to the user as an answer.

Under the content attribute a path is specified which is directed to the corresponding .html file. In this file is a definition of the data to be shown. Supported are HTML, CSS, jquery and Bootstrap.


# Structure of the Framework:
This project is divided into following files: index.js, Loader.js, Display.js, Search.js

Display.js is responsible for all visualizations.

Search.js includes the search functionality. It searches the term(min 2 letters) in the templates(contents).

Loader.js loads the needed templates into the site.
