---
path: regular expression
date: 2020-06-02T05:18:17.853Z
title: Regular Expression - A very important tool for data science
description: everything about regular expression to use in deeplearning to filter filename
---
\# **Blog 13**

Credits: fastai ( Jeremy says regular expression is important tool to consider learning, after completing the first part of course, I felt it necessary to write a blog on this. I should have written this blog earlier, but remembered about this topic, when I was going through fastai v2)  

check [fastai v2 ](https://dev.fast.ai/) 

## Medium post

Lets discuss problem that can be solved using regular expression. (example is from fastai course)

Usually label is stored in file name, so it you can extract it and use as label. 

Example for file name

`data/oxford-iiit-pet/images/american_bulldog_146.jpg  
data/oxford-iiit-pet/images/german_shorthaired_137.jpg`

But how to extract it???

here regular comes into play, 

 Writing regular expression is similar the way we approach the problem. seeing the example above we can tell that label is found after last forward slash(/) and after label we have number and ending with `.jpg`

Regular expression is **/(\[^/]+)_\d+.jpg$**

I'll explain step by step.

$ means end of text we are interpreting

.**jpg** is make sure that just before end of text we have jpg that is of right format.

\d means numeric digits and + means many digits.

_ is underscore appearing before numbers

(\[^/]+) is for looking a group of characters that do not contain forward slash, and \[ ] means character we are interested. '^' is negation.

forward slash at the beginning is to tell our search ends when we hit forward slash.

**/(\[^/]+)_\d+.jpg$** gives us label we want i.e \*\*\*\*`american_bulldog`in our example.

python code

```
string = 'data/oxford-iiit-pet/images/american_bulldog_146.jpg'  
pat = r'([^/]+)_\d+.jpg$'  
pat = re.compile(pat)  
print(pat.search(string).group(1))  

>american_bulldog
```

Regular expression

```
^ Start of string

$ End of string

\b Word boundary

\* 0 or more

+ 1 or more

? 0 or 1

\s White space

\S Not white space

\d Digit

\D Not digit

\w Word

\W Not word

\ Escape following character

\n New line

\t Tab

. Any character except new line (\n)

\[a-q] Lower case letter from a to q

\[A-Q] Upper case letter from A to Q

(a|b) a or b

\[abc] Range (a or b or c)

\[^abc] Not (a or b or c)

\[0-7] Digit from 0 to 7
```

kk
kk
