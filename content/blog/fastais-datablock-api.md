---
path: datablock api
date: 2020-06-09T03:38:21.162Z
title: Make code Simple with DataBlock api part1
description: all details of datablock api
---
\# **Blog14**

## My idea

* about datablock api as wrapper class to do lot of work to write in PyTorch takes long lines of code

## Blogmue

How do we let the users of the fastai library build DataLoaders in a way that is simple enough that someone with minimal coding knowledge could get the hang of it, but be advanced enough to allow for exploration. Think of the DataBlock as a list of instructions to do when we're building batches and our DataLoaders. It doesn't need any items explicitly to be done, and instead is a blueprint of how to operate.

datablock api has bricks of these names 

\
blocks

get_items

get_x/get_y

getters

splitter

item_tfms

batch_tfms

Looking at dataset is very important and building dataloaders using datablock api is the strategy. 

first thing to look is how data is stored that is in which format or in which manner and compare to famous dataset, whether it is stored in that way and how to approach it.

For example, in image problem, we can use `get_image_files` function to go grab all the file locations of our images and we can look at the data( I will explain all code related details in part2 of blog).

blocks is used to define pre-defined problem domain. for example If it's an image problem I can tell the library to use Pillow without explicitly saying it. say if it is single label or multi label classification.

`get_image_files`will be used in get_items.

`get_y` is how do you extract labels.

`splitter` is how do you want to split our data. usually this is random split between training and validation dataset. 

the remaining two bricks of datablock api is item_tfms and batch_tfms which is augmentation.

item_tfms is item transform applied on individual item basis. This is done on CPU.

batch_tfms is batch transform applied on batches of data. This is done in GPU.

Using this bricks in datablock we can approach and build dataloaders ready for different type of problems like classification, object detection, segmentation and all other different type of problems.

## fastbook

Writing a DataBlock is just like writing a blueprint.

datablock api is high level api in fastai.

 The data block API is an expressive API for data loading. It is the first attempt we are aware.

of to systematically define all of the steps necessary to prepare data for a deep learning model, and give

users a mix and match recipe book for combining these pieces (which we refer to as data blocks). The steps

that are defined by the data block API are:

• Getting the source items,

• Splitting the items into the training set and one or more validation sets,

• Labelling the items,

• Processing the items (such as normalization), and

• Optionally collating the items into batches.

As we have seen, PyTorch and fastai have two main classes for representing and accessing a training set or validation set: Dataset:: A collection that returns a tuple of your independent and dependent variable for a single item DataLoader:: An iterator that provides a stream of mini-batches, where each mini-batch is a couple of a batch of independent variables and a batch of dependent variables On top of these, fastai provides two classes for bringing your training and validation sets together: Datasets:: An object that contains a training Dataset and a validation Dataset DataLoaders:: An object that contains a training DataLoader and a validation DataLoader Since a DataLoader builds on top of a Dataset and adds additional functionality to it (collating multiple items into a mini-batch), it’s often easiest to start by creating and testing Datasets, and then look at DataLoaders after that’s working.

The way we usually build the data block in one go is by answering a list of questions:

what is the types of your inputs/targets? Here images and categories

where is your data? Here in filenames in subfolders

does something need to be applied to inputs? Here no

does something need to be applied to the target? Here the label_func function

how to split the data? Here randomly

do we need to apply something on formed items? Here a resize

do we need to apply something on formed batches? Here no

data blocks API provides a good balance of conciseness and expressivity. In the data science domain the scikit-learn pipeline approach is widely used. This API provides a very high level of expressivity, but is not opinionated enough to ensure that a user completes all of the steps necessary to get their data ready for modelling

## Ending

write datablock api code and tell to wait to see this content in next blog with date and time.

Now that we have seen, what is datablock api lets wrap everything and build one.

For example lets write code(only datablock) for single label classification of Oxford IIIT pets dataset.

```
pets = DataBlock(blocks=(ImageBlock,  CategoryBlock),  
get_items=get_image_files,  
splitter=RandomSplitter(),  
get_y=Pipeline([attrgetter("name"),  
RegexLabeller(pat = r'^(.*)_\d+.jpg$')]),  
item_tfms=Resize(128),  
batch_tfms=aug_transforms())
```

What is this Code???

This is introduction part of blog, 

Curious to know what is in the code then read part 2 of blog on Sunday, 21 June, 2020 10:30 am IST [here](https://kirankamath.netlify.app/blog/make-code-simple-with-datablock-api-part2/).

Credits:

* fastai [docs](https://dev.fast.ai/) 
* Thanks to Zach Mueller, [blog](https://muellerzr.github.io/fastblog/datablock/2020/03/21/DataBlockAPI.html) on datablock api, please keep writing blog and making videos.
* fastai A layered api for deep learning [paper](https://arxiv.org/pdf/2002.04688.pdf)
