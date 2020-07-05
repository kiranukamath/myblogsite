---
path: datablock api part2
date: 2020-06-13T14:39:56.458Z
title: Make code Simple with DataBlock api part2
description: 'See datablock api code, how to build from scratch'
---
\# **Blog15**

This is part two of my series Make code Simple with DataBlock API. If you have not read part one, see [here](https://kirankamath.netlify.app/blog/fastais-datablock-api/). In it, we have seen what DataBlock as a whole means, what are the bricks that are put together to make datablock. In last blog, I had stopped showing code so, in this blog, we'll be diving into code.

Welcome!!!

## Let

```
!pip install -q fastai2
```

Depending on type of problem, blocks in datablock changes and rest are same. Lets see example first,

```
from fastai2.vision.all import *
```

## Example 1

```
path = untar_data(URLs.CAMVID_TINY)
```

```python
camvid = DataBlock(blocks=(ImageBlock, MaskBlock(codes = np.loadtxt(path/'codes.txt', dtype=str))),
    get_items=get_image_files,
    splitter=RandomSplitter(),
    get_y=lambda o: path/'labels'/f'{o.stem}_P{o.suffix}',
    item_tfms = Resize(224),
    batch_tfms=aug_transforms())
```

```
dls = camvid.dataloaders(path/"images")
dls.show_batch()
```

![png](/assets/blog15img1.png)

what did do different from above example which is different from part1 blog, 
just the `MaskBlock` in blocks, so thats how simple creating datablock is.

Depending on tasks blocks = () change. Block's are used to help nest transforms inside of pre-defined problem domain.

So there are different types of blocks.

* ImageBlock is used if the dataset is of images
* CategoryBlock is for single-label categorical targets
* MultiCategoryBlock is for multi-label categorical targets
* RegressionBlock is for float targets
* MaskBlock for segmentation masks, potentially with codes
* PointBlock is for points in an image
* BBoxBlock is for bounding boxes in an image
* BBoxLblBlock is for labeled bounding boxes, potentially with vocab

So depending on type of domain these blocks can be used.

So coming to our example The MaskBlock is generated with the codes that give the correpondence between pixel value of the masks and the object they correspond to.

## Example 2

Now lets take multi label classification problem

```
path2 = untar_data(URLs.PASCAL_2007)
```

```
df = pd.read_csv(path2/'train.csv')
df.head()
```

![](/assets/blog15img2.png)



```python
pascal = DataBlock(blocks=(ImageBlock, MultiCategoryBlock),
                   splitter=ColSplitter('is_valid'),
                   get_x=ColReader('fname', pref=str(path2/'train') + os.path.sep),
                   get_y=ColReader('labels', label_delim=' '),
                   item_tfms = [FlipItem(p=0.5),Resize(224,method='pad')],
                   batch_tfms=[*aug_transforms(do_flip=True, flip_vert=True, max_rotate=180.0, max_lighting=0.6,max_warp=0.1, p_affine=0.75, p_lighting=0.75,xtra_tfms=[RandomErasing(p=1.0,sh=0.1, min_aspect=0.2,max_count=2)]),Normalize])
```

```
dls2 = pascal.dataloaders(df)
```

```
dls2.show_batch()
```

![png](/assets/blog15img3.png)

Basic principles remain same, depending on domain blocks are used.

Now if we see splitters in example 1 we used RandomSplitter because we did not had any rule how to split the data, but that is not the case in example 2, we have column called is_valid in df so depending on that we need to split, so used ColSplitter('is_valid') 

so I assume, you understood how splitter works???

**Think of example where you had column of folds and depending on that you need to split for k fold cross validation, then how would you split the dataset**???

This is shown with code in my [Kaggle kernel](https://www.kaggle.com/kirankamat/fastai-multilabel-classification-using-kfold-cv)

get_x and get_y are easy and in my above kernel it is also explained, 

Now I'll move to item_tfms and batch_tfms

Observe item_tfms and batch_tfms in example2

I should not have applied those many like flip_vert because in this case it makes no sense but it is applied to show you there are lot of transforms and we can use it.

even if you dont write fastai default applied few transforms and that is beauty of fastai

```
item_tfms = [FlipItem(p=0.5),Resize(224,method='pad')]
```

what does this mean, as we have seen in blog [part1](https://kirankamath.netlify.app/blog/fastais-datablock-api/) that item transforms are applied on cpu, so speed is normal so we dont apply lot of transforms here, only the basic transforms are used. flip with probability of 0.5 is applied, then resizing is applied where images are converted to 224x224 and that is done with method of padding.

```python
batch_tfms=[*aug_transforms(do_flip=True, flip_vert=True, max_rotate=180.0, max_lighting=0.6,max_warp=0.1, p_affine=0.75, p_lighting=0.75,xtra_tfms=[RandomErasing(p=1.0,sh=0.1, min_aspect=0.2,max_count=2)]),Normalize])
```

batch transforms are applied on GPU so this is faster.
I have used many here, just to show how it works.

In example2 show_batch you see lot of erased boxes that is because of RandomErasing, you can vary propability and this increase accuracy, there is callback cutmix which uses similar but complicated techniques.

Normalize is used without imagenet stats, now normalize is done based on mean and sd of that batch.

`aug_transforms` is utility func to easily create a list of flip, rotate, zoom, warp, lighting transforms.

Random flip with p=0.5 is added when do_flip=True. With p_affine we apply a random rotation of max_rotate degrees, a random zoom between min_zoom and max_zoom and a perspective warping of max_warp. With p_lighting we apply a change in brightness and contrast of max_lighting. Custon xtra_tfms can be added.

So this is it:)

I assume you have understood introductory knowledge about datablock.

It is actually easy but needs practise and getting used to it, you can create dataloaders using datablock api very quickly.

You can practise in google colab [here](https://github.com/kirankamatmgm/Fastai-Data-Block-API/blob/master/Datablock.ipynb)

Thank you for giving your time:)
