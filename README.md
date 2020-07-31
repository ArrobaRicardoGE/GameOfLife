# GameOfLife
A HTML/JavaScript/CSS version of the Conway´s Game of Life, with a pattern saving system. 

>You can try it [here](https://arrobaricardoge.github.io/GameOfLife/)!

## Features

This project is a simulation of the [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life). It is built using HTML/JavaScript/CSS, with no additional libraries. Some of its main features are:

- A 75 x 140 visible universe.
- A generation counter.
- The ability to reset the current pattern, with no need of clearing and redrawing the pattern.
- You can decide to show or hide the gridlines
- The *pattern saving system*
- Support for multiple devices (however, using a computer is highly recommended)

## Pattern saving system
Lets say you discovered a cool pattern and you want to show it to your friends. How would you do that? You could take a screenshot and send it to your friends, but if your friends want to see the pattern in action, they would have to draw it. For this reason, this project implements a pattern saving system that generates a unique key depending on the current state of the universe, so when you upload the key you can see the pattern it belongs to.

The [key generation algorithm](https://github.com/ArrobaRicardoGE/GameOfLife/blob/master/keygenv2.js) generates a string composed of O's and I´s, where an I indicates that a cell is alive and an O that it is dead. Because this would generate a very long string (10500 characters), it then applies a string compression algorithm, that colapses sequences of equal adjacent characters and replaces them with the character of the sequence and the lenght of the sequence - 1, in base 16. This effectively reduces the lenght of most keys by thousands of characters.

Having this mechanism allows to build a library, which is a set of interesting patterns discovered during the 50+ years that the game has been around.
This library is also a great opportunity for you contibute with your patterns! See how [here](https://arrobaricardoge.github.io/GameOfLife/en.html).

## Final comments
This is one of my first web projects, any suggestions or improvements are greatly apprecieated.
