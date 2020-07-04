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

Let's get started. Welcome:)

We actually use concepts of OOPs 

so what is OOP??

## Object-oriented programming

Object-oriented programming is a style of writing programs using classes and objects.

object-oriented programming allows you to create large, modular programs that can easily expand over time.

object-oriented programs hide the implementation from the end-user. When you train a machine learning algorithm with Scikit-learn, you don't have to know anything about how the algorithms work or how they were coded. You can focus directly on the modeling. If the implementation changes, you as a user of the package might not ever find out.

A Python package does not need to use object-oriented programming. You could simply have a Python module with a set of functions. However, most if not all of the popular Python packages take advantage of object-oriented programming because:

1. Object-oriented programs are relatively easy to expand especially because of inheritance
2. Object-oriented programs obscure functionality from the user. 

Objects are defined by attributes and methods.

Think objects as things that exist in the real world.\
For example, If we take Restaurant

* Restaurant is itself object 
* food dishes is object
* waiter is also object

So if the waiter is a object what are its attribute(characteristics) and methods(actions)???

Attributes of waiter are name, address, phone number, salary

Methods of waiter are taking order, hike in salary, and serving dishes.

So now we know about objects, but object of two waiter may have different values which mean there are two objects but the attributes and methods are the same, which means both have common attribute type but with different values which means two objects has a common blueprint.

So the blueprint of an object is called class. And using this blueprint we can create many objects. 

So let's see the code of the class.

```
class Waiter:
    """The waiter class represents an type of person who takes order and serve dishes in a restaurant
    """

    def __init__(self, name, address, height, salary):
        """Method for initializing a Pants object

        Args: 
            name (str)
            address (str)
            height (int)
            salary (float)

        Attributes:
            name (str): name of waiter object
            address (str): address of a waiter object
            height (int): height of a waiter object
            salary (float): salary of a waiter object
        """

        self.name = name
        self.address = address
        self.height = height
        self.salary = salary

    def hike_salary(self, hike_percent):
        """The hike_salary method changes the salary attribute of a waiter object

        Args: 
            hike_percent (float): the new salary of the waiter object

        Returns: None

        """
        sal = self.salary + (hike_percent*self_salary)
        self.salary = sal
```

what is self?? I have used self many times in code.

It is used to pass values to attributes and differentiates between these two objects.

Self tells Python where to look in the computer's memory for the a object. And then Python changes the value of that object. When you call the particular method, self is implicitly passed in.

Did you notice methods that look similar to functions?? A function and a method look very similar. They both use the def keyword. They also have inputs and return outputs. The difference is that a method is inside of a class whereas a function is outside of a class.

This code tells about OOPs and also the use of docstrings. 

## Dunder methods

Dunder or magic methods in Python are the methods having two prefix and suffix underscores in the method name. Dunder here means “Double Under (Underscores)”. These are commonly used for operator overloading.  wait!! did you see those in the above code?? yeah true, \_\_init\_\_ is dunder method, it is to override the default behavior.

Now let's look into Gaussian distribution class and understand how to use dunder.

```
class Gaussian():
    """ Gaussian distribution class for calculating and 
    visualizing a Gaussian distribution.
    """
    def __init__(self, mu = 0, sigma = 1):
        
        self.mean = mu
        self.stdev = sigma
        self.data = []
    
    def calculate_mean(self):
        self.mean = 1.0 * sum(self.data) /len(self.data)
        return self.mean

    def calculate_stdev(self, sample=True):
        if sample:
            n = len(self.data) - 1
        else:
            n = len(self.data)
        mean = self.mean
        sigma = 0
        for d in self.data:
            sigma += (d - mean) ** 2
        sigma = math.sqrt(sigma / n)
        self.stdev = sigma        
        return self.stdev
```

```
gaussian_one = Gaussian(25, 3)
```

So how to add two gaussian distribution, if you see mathametical explanation it seems easy but how to do it in code if you try below you get error.

```
gaus_a + gaus_b = Yes we get error!!!
```

 Now comes dunder methods.

There is a dunder called \_\_add\_\_  method of a Python class which will help to add two instances of a custom object. This means that we can control the result of a sum of two objects by modifying or defying the \_\_add\_\_ method.

If you add this code inside the above Gaussian class then some magic happens.

```
def __add__(self, other):
   result = Gaussian()
   result.mean = self.mean + other.mean
   result.stdev = math.sqrt(self.stdev**2 + other.stdev**2)
        
   return result
```

Now the code which gave you error before would work fine :)

This way we can rewrite code and change all the default behavior isn't this useful???

## **Inheritance**

In the restaurant example, we saw that food dish is an object which means that all other food dishes will have separate classes but why to take the trouble to build separate classes for everything, could there be a better way??? 

so the concept of inheritance helps here.

we could have a general class called food dish and have all attributes that are common to all food items and inherit that class for the different food dishes. Now, what if you want to add the attribute to all food dishes called seasonal, instead of adding it to all we can add it to the main root class and all other classes will inherit from it. This saves a lot of time and effort. 

To inherit a class we need to write a general main class and use that class name inside the parenthesis in the child class.

```
class Gaussian(Distribution):
```

Distribution is main class and Gaussian(child) uses the Distribution class.

In this blog, we have seen all basics of OOP. Remember at the start of blog I said famous packages will use OOP concepts to build packages, so learning of OOP is incomplete unless you apply your knowledge on how to use OOP. 

So in the next blog, we will see how to create a package with python using OOP concepts and upload it to PyPI, after which you can use the package you created using pip install.

**Credit:** Udacity course.

Part 2 of this blog will be published on July 11, 2020, [here](https://kirankamath.netlify.app/blog/oop-in-python-part2-make-a-python-package).

Thank you for reading this blog:)
