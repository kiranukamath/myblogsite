---
path: object oriented programming part1
date: 2020-07-02T05:32:41.127Z
title: Object-Oriented Programming in Python part1
description: learn oops to finally build a package and upload to PyPi
---
\# **Blog16**

We have all used Object-Oriented Programming knowingly or otherwise. If you are gathering skills to be a data scientist then OOP is also an important topic to learn. 

Have you wondered how famous packages which we use like scikit-learn works(how it is built)???

What does it mean when we use 

```
import pandas as pd 
pd.read_csv()
```

What is pandas and where did this read_csv() come from and can it be used without creating such function ourselves???

Then this blog is for you. 

Lets get started. Welcome:)

We actually use concepts of OOPs 

so what is OOP??

## Object-oriented programming

Object-oriented programming is a style of writing programs using classes and objects.

object-oriented programming allows you to create large, modular programs that can easily expand over time.

object-oriented programs hide the implementation from the end-user. When you train a machine learning algorithm with Scikit-learn, you don't have to know anything about how the algorithms work or how they were coded. You can focus directly on the modeling. If the implementation changes, you as a user of package might not ever find out.

Objects are defined by attributes and methods.

Think objects as things that exist in the real world.

For example, If we take Restaurant

Restaurant is itself object 

food dishes is object

waiter is also object

So if the waiter is object what are its attribute(characteristics) and methods(actions)???

attributes are name, address, phone number, salary

methods are taking order and serving dishes.

So now we know about object, but object of two waiter may have different values which mean there are two objects but the attributes and methods are the same, which means both have common blueprint.

So blueprint of object is called class. And using this blueprint we can create many objects. 

A function and a method look very similar. They both use the def keyword. They also have inputs and return outputs. The difference is that a method is inside of a class whereas a function is outside of a class.

**Code**

what is self 

It is used to pass values to attributes and differentiate between these two objects

Self tells Python where to look in the computer's memory for the a object. And then Python changes the value of the that object. When you call the particular method, self is implicitly passed in.

```
class Pants:
    """The Pants class represents an article of clothing sold in a store
    """

    def __init__(self, color, waist_size, length, price):
        """Method for initializing a Pants object

        Args: 
            color (str)
            waist_size (int)
            length (int)
            price (float)

        Attributes:
            color (str): color of a pants object
            waist_size (str): waist size of a pants object
            length (str): length of a pants object
            price (float): price of a pants object
        """

        self.color = color
        self.waist_size = waist_size
        self.length = length
        self.price = price

    def change_price(self, new_price):
        """The change_price method changes the price attribute of a pants object

        Args: 
            new_price (float): the new price of the pants object

        Returns: None

        """
        self.price = new_price
```

this code tells about OOPs and also use of docstrings

See gausian distribution code...

## Dunder methods

Dunder or magic methods in Python are the methods having two prefix and suffix underscores in the method name. Dunder here means “Double Under (Underscores)”. These are commonly used for operator overloading.  wait!! did you see those in above code?? yeah true, \_\_init\_\_ is dunder method, it is to override the default behavior.

**Note** that we have seen gaussian distribution earlier, so what if we try to add two gaussian distribution for example guess this

gaus_a + gaus_b = Yes we get error!!!

So how to add these, here comes dunder methods

There is dunder called \_\_add\_\_  method of a Python class which will help to add two instances of a custom object. This means that we can control the result of a sum of two objects by modifying or defying the \_\_add\_\_ method.

**CODE**

This way we can rewrite code all the default behavior isn't this useful???

**Inheritance**

In the restaurant example we saw that food dish, for example, is object but all other food dishes will have separate classes but why to take the trouble to build separate classes for everything, could there be a better way??? so inheritance helps here.

we could have class called food dish and have all attributes that are common to all food item and inherit that class for different food dish. Now what if you want to add attribute to all food dishes called seasonal, instead of adding it to all we can add it to main root class and all other classes will inherit from it. This saves a lot of time and effort.

**Credit:** udacity
