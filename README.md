# Simple Style Guide for SharePoint and Office 365 Development
![alt text][logo]

This project aims to create a consisten Style Guide for SharePoint and Office 365 Development. It should sever as a documentation and development platform for every new SharePoint branding project.
In future this aims to provide a Style Guide for the new SharePoint Framework too.

## History

*Current Version:*   0.1

## Installation
To create a new project simply clone this repository.

```git clone https://github.com/StfBauer/SimpleStyle.git```

After cloning of this project have succeeded execute the following command

```
cd SimpleStyle
npm install && bower install
```
This will install all node packages and bower components. After that you are ready to use it. To start the web server simply run .
```gulp serve```

![Screenshot 1][screenshot]

## Usage
The following section should give you a brief overview how to use this style guide.

### Add and maintain patterns
To store new pattern to the style guide simply add them in the folder

```
app/_pattern
```

This style guide follows the atomic design pattern and all pattern are organized in folders:

```app/atoms
app/molecules
app/organism
app/templates  
app/pages
```

To add new pattern simply add a new HTML File with the file extension ".hbs" there. You can make full use of Handlebars in the template files.
When the web server is running the files will be picked up by a gulp task and automatically added to the configuration.

The pattern configuration is stored in the path: 

```
app/_config/pattern.conf.json
```

All patterns are stored in the following format:

```
{
    "patterns": [
        {
            "title": "Headings",
            "description": "Default Headlines",
            "filename": "00-headings",
            "filepath": "atoms/00-headings.hbs"
        },
```

In ever pattern the title and description property can be change manually to a proper name.
Filename and file path will be used to find the pattern corresponding with the file.

### Adding custom CSS

All custom CSS use SASS as a preprocessor. The main file of the style guide is stored in the folder ```styles```.
Other files of interest:

* ```_corev15.scss - combined SharePoint Styles```
* ```sp-design.scss - prefixed SASS file```

All changes of files will precompiled and browser will refresh automatically.


## Credits
Inspiration for this project came from [PatternLab.io](http://patternlab.io) and [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) by Brad Frost.

## License

The MIT License (MIT)
Copyright (c) 2016 Stefan Bauer - N8D

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.






[logo]: https://github.com/StfBauer/SimpleStyle/blob/dev/docs/assets/simple-style.png?raw=true "Simple Style"
[screenshot]: https://github.com/StfBauer/SimpleStyle/blob/dev/docs/assets/screenshot-simple-style.png?raw=true "Screen Shot"
