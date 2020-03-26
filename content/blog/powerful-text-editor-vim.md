---
path: vimeditor
date: 2020-03-26T04:10:34.258Z
title: 'Powerful text editor: Vim'
description: basics of vim to make it use comfortably
---
![vim](/assets/text-editor-27620_640.png "vim editor")

- - -

Let me tell you how I got into using vim, which I consider a powerful text editor.

I was looking for a text editor that I could use in all my projects. I started using vs code, atom and many more, during which I didn't even consider vim. Out of many editors I like vs code which is awesome when considering all the others I used. I was working on something which used lot of RAM of my laptop, so I was unable to use vs code( it uses lot of memory) and I started looking for editors that used less memory and is powerful. From many articles, I was inspired of using vim. Now that I use vim(I also have vs code in the laptop, but use vim a lot) I consider it a powerful editor. 

Let us see some basics of vim to get started and see how to be good with it.

Vim has a rich history, it originated from the Vi editor (1976), and it's still being developed today. Vim has some really neat ideas behind it, and for this reason, lots of tools support a Vim emulation mode. Vim is probably worth learning even if you finally end up switching to some other text editor. 

# Modes in Vim

What I love about vim is its different modes, even though it feels annoying at the beginning it will be helpful and efficient way later on. When programming, you spend most of your time reading/editing, not writing. For this reason, Vim is a modal editor: it has different modes for inserting text vs manipulating text.

**Normal**: for moving around a file and making edits, mainly for reading.

**Insert**: for inserting text

**Replace**: for replacing text

**Visual** (plain, line, or block) mode: for selecting blocks of text

**Command-line**: for running a command

You change modes by pressing  (the escape key) to switch from any mode back to normal mode. From normal mode, enter insert mode with i, replace mode with R, visual mode with v.

## Command line mode

Command mode can be entered by typing **:** 

* **:q** quit (close window)
* **:qa** quit all open windows
* **:q!** quit without saving
* **:w** save ("write")
* **:wq** save and quit
* **:e** {name of file} open file for editing
* **:ls** show open buffers
* **:help** {topic} open help

## **Movements**

You should spend most of your time in normal mode, using movement commands to navigate the buffer.

* Basic movement: hjkl (left, down, up, right)
* Words: w (next word), b (beginning of word), e (end of word)
* Scroll: Ctrl-u (up), Ctrl-d (down)
* Find: f{character},find

## Editing

* **i** enter insert mode but for manipulating/deleting text, want to use something more than backspace
* **o** / O insert line below / above
* **d**{motion} delete {motion} e.g. dw is delete word, d$ is delete to end of line, d0 is delete to beginning of line
* **x** delete character (equal do dl)
* **u** to undo, <C-r> to redo
* visual mode + manipulation select text, d to delete it or c to change it copying block also works
* **/** will search a word example /find will find a word 'find'
* **.** repeats the last editing word that was used.
* :sp and :vsp for split window of same file
* <ctrl w> to move between split windows

You can combine commands with a count, which will perform a given action a number of times. 4k will move (4 time k) that is move right 4 times.

ci[ change the contents inside the current pair of square brackets You can use modifiers to change the meaning.

With these basics, you could easily get into using vim and after few days of using vim, you may also feel it as a powerful editor.

You can learn Vim by playing game like environment. [Here](https://vim-adventures.com/)

Credits:

* Wonderful website that is main inspiration for this blog. This is missing semester. Thank you Anish, Jose, and Jon for creating this. click [here](https://missing.csail.mit.edu/2020/editors/) . 
* Thanks to all the other text editors which helped me to make vim as my default editor. haha!!
