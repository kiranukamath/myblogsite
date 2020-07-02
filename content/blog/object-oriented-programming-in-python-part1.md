---
path: object oriented programming part1
date: 2020-07-02T05:32:41.127Z
title: Object-Oriented Programming in Python part1
description: learn oops to finally build a package and upload to PyPi
---
\# **Blog16**

We have all used Object-Oriented Programming knowingly or otherwise. If you are gathering skills to be a data scientist then OOP is also important topic to learn. 

Have you wondered how famous packages which we use like scikit-learn works???(how it is built)

What does it mean when we use import pandas as pd pd.read_csv()

You actually use concepts of OOPs So let's get started

Welcome!!!

Object-oriented programming is style of writing programs using classes and objects.

object-oriented programming allows you to create large, modular programs that can easily expand over time;

object-oriented programs hide the implementation from the end-user. When you train a machine learning algorithm with Scikit-learn, you don't have to know anything about how the algorithms work or how they were coded. You can focus directly on the modeling. If the implementation changes, you as a user of package might not ever find out.

Objects are defined by attributes and methods.

Think objects as things that exist in the real world.

For example, If we take Restaurant

Restaurant is itself object 

food dishes is object

waiter is also object



So if waiter is object what are its attribute(characteristics) and methods(actions)???

attributes are name,address,phone number, salary

methods are taking order and serving dishes.



So now we know about object, but object of two waiter may have different values which means there are two objects but the attributes and methods are same, which means both have common blue print.

So blueprint of object is called class. And using this blueprint we can create many objects. 

A function and a method look very similar. They both use the def keyword. They also have inputs and return outputs. The difference is that a method is inside of a class whereas a function is outside of a class.

**Code**

what is self 

It is used to pass values to attributes and differentiate between these two objects

Self tells Python where to look in the computer's memory for the a object. And then Python changes the value of the that object. When you call the perticular method, self is implicitly passed in.



class Shirt:

\    def \_\_init\_\_(self, shirt_color, shirt_size, shirt_style, shirt_price):

\    self.color = shirt_color

\    self.size = shirt_size

\    self.style = shirt_style

\    self.price = shirt_price

\    def change_price(self, new_price):        self.price = new_price

\    def discount(self, discount):        return self.price * (1 - discount)



shirt_one = Shirt('red','S','long-sleeve',25)
