#How to run it

Firstly, run the server script provided.
Then, just if you want to build and test:
```
npm install && bower install && gulp 
```
Then, inside the dir build you'll find your index.html. Fire it! ;)


#How I created it and why?

##About the code

I created the services for the games rest api (in this case just a get one), and league (matches) websocket one.
The last service is just a wrap of those above, which does parse and returns the data. It also has a callback (kinda event role).
I also created two simple extra Components, one is the table which owns the whole league data and the row. 
I wanted to be a bit OOP(prototyped).

##Let's be reactive

Because these are data that is changing every time and has to be parsed, modified...I decided to use ReactJS + Lazy.js.
React for the 
Lazy.js to wrap the callbacks and modify its data.

\*I also so that Football Radar uses RxJS. I figured out that Lazy.js is much more dynamic than RxJS.

##Using a part of a boilerplate

It gives you everything. Ok, let's clarify this. It creates a draft of a project, the configuration, an structure...etc It gives the chance to follow what some other people does. So, if you get in trouble with something, you will probably find the solution or some guide about that of some other user experience. Also gives the chance to use the last community tools, design patterns...and maybe non-grumpy cat tricks.

On the other hand, if someone wants to collaborate with it, this geek will have at least some clue about the whole project, structure, why it does...

Lastly, of course, if you want to use a boilerplate you have to know why it does that, is structured like, why config like...
If you don't know how to manage a lighter...

##Using Yeoman

Yeah, it's nice, heavy community n the guy looks awesome (it reminds me Batman's butler with moustache). It mainly uses Grunt, Bower and npm. Also has some auto-magical tasks like watch or build...or auto test.

I've also taken a look to other boilerplates, but as always I come back with this butler.

##TwBootstrap with sass

It's simply cool. As said, another kinda boilerplate full of structures n helpers.
