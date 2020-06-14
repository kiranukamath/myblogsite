---
path: datablock api
date: 2020-06-14T03:38:21.162Z
title: Make code Simple with DataBlock api part1
description: Introduction of datablock api.
---
\# **Blog14**

![Image by Esi Grünhagen from Pixabay ](/assets/blog14img0.jpg "Image by Esi Grünhagen from Pixabay ")



Welcome!!!

This blog written with purpose of introducing you to fastai's awesome datablock api. This is first part of blog and the part 2 will be code approach.

Even though fastai follows top down approach, I am writing this first part of blog with no code, and theoretical explanation which sets motive to learn datablock with code in part2.(in course Jeremy gives motive and awesome explanation to why use it, before code, So I find that important before writing code.)

So lets start!!!

If you have used any deep learning framework( I use PyTorch so speak w.r.t. it) to build a model to solve a deep learning problem, you go through steps of collecting the data, what type of problem is it(like image classification, segmentation ), see what are dependent and independent variables, how to split the data into training and validation set, apply transforms to improve accuracy. 

And in that process you may also have written lengthy code to all these task, but what if I tell you, you can do it in one single block then it would awesome(You can also do all that in normal way and refactor it but this datablock approach looks good to me, since I do less error while following this)

So What is **Data Block** api???

Data block api is high level api in fastai. The data block API is an expressive API for data loading. It is way to systematically define all of the steps necessary to prepare data for a deep learning model, and give users a mix and match recipe book for combining these pieces (which we refer to as data blocks)

Think of the DataBlock as a list of instructions to do when we're building batches and our DataLoaders. It doesn't need any items explicitly to be done, and instead is a blueprint of how to operate. Writing a DataBlock is just like writing a blueprint.

We just now saw a word DataLoaders. Lets see about that. PyTorch and fastai have two main classes for representing and accessing a training set or validation set:\
`Dataset`:: A collection that returns a tuple of your independent and dependent variable for a single item\
`DataLoader`:: An iterator that provides a stream of mini-batches, where each mini-batch is a couple of a batch of independent variables and a batch of dependent variables 

Interesting is that fastai provides two classes for bringing your training and validation sets together:\
`Datasets`:: An object that contains a training Dataset and a validation Dataset\
`DataLoaders`:: An object that contains a training DataLoader and a validation DataLoader.

fastai library has a easy way of building DataLoaders such that it is simple enough for someone with minimal coding knowledge to get it, and also advanced enough to allow for exploration.

There are steps for creating datablock lets see that.\
The steps are defined by the data block API that can be asked as questions while seeing data:

* what is the types of your inputs/targets? (`Blocks`)
* where is your data? (`get_items`)
* does something need to be applied to inputs? (`get_x`)
* does something need to be applied to the target? (`get_y`)
* how to split the data? (`splitter`)
* do we need to apply something on formed items? (`item_tfms`)
* do we need to apply something on formed batches? (`batch_tfms`)

This is it!!

while you answer these question you write a datablock.

You can treat each question or steps as brick that build fastai datablock.

* Blocks
* get_items
* get_x/get_y
* splitter
* item_tfms
* batch_tfms

Looking at dataset is very important while building dataloaders. And using datablock api is the strategy to solve problem or way of approach. First thing to look is how data is stored, that is in which format or in which manner and compare to famous dataset, whether it is stored in that way and how to approach it.

**Blocks** here is used to define pre-defined problem domain. For example if it's an image problem I can tell the library to use Pillow without explicitly saying it. And say if it is single label or multi label classification. There are many like ImageBlock, CategoryBlock, MultiCategoryBlock, MaskBlock, PointBlock, BBoxBlock, BBoxLblBlock, TextBlock and so on. ( I will explain all code related details in part2 of blog)

**get_items** is to answer where is the data? 

For example, in image problem, we can use `get_image_files` function to go grab all the file locations of our images and we can look at the data( I will explain all code related details in part2 of blog).

**get_x** is to answer does something need to be applied to inputs?

**get_y** is how do you extract labels.

**splitter** is how do you want to split our data. Usually this is random split between training and validation dataset. 

The remaining two bricks of datablock api is item_tfms and batch_tfms which is augmentation.

**item_tfms** is item transform applied on individual item basis. This is done on CPU.

**batch_tfms** is batch transform applied on batches of data. This is done in GPU.

Using these bricks in datablock we can approach and build dataloaders ready for different type of problems like classification, object detection, segmentation and all other different type of problems.

Data blocks API provides a good balance of conciseness and expressiveness. In the data science domain the scikit-learn pipeline approach is widely used. This API provides a very high level of expressivity, but is not opinionated enough to ensure that a user completes all of the steps necessary to get their data ready for modelling, but that is done in fastai data block api. 

Now that we have seen, what is datablock api lets wrap everything and build one.

Its time!! lets see code(only datablock) for single label classification of Oxford IIIT pets dataset.

```
pets = DataBlock(blocks=(ImageBlock,  CategoryBlock),  
get_items=get_image_files,  
splitter=RandomSplitter(),  
get_y=Pipeline([attrgetter("name"),RegexLabeller(pat = r'^(.*)_\d+.jpg$')]),  
item_tfms=Resize(128),  
batch_tfms=aug_transforms())
```

What is this Code???

Reminder: This is introduction part of blog, 

Curious to know what is in the code, and how to write the code, then read part 2 of blog which will be published on Sunday, 21 June, 2020 10:30 am IST [here](https://kirankamath.netlify.app/blog/make-code-simple-with-datablock-api-part2/).

Credits:

* fastai [docs](https://dev.fast.ai/) 
* Thanks to Zach Mueller, [blog](https://muellerzr.github.io/fastblog/datablock/2020/03/21/DataBlockAPI.html) on datablock api, please keep writing blog and making videos.
* fastai A layered api for deep learning [paper](https://arxiv.org/pdf/2002.04688.pdf)
