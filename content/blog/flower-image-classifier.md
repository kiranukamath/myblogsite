---
path: FlowerImageClassifier
date: 2020-04-23T17:45:24.577Z
title: Flower Image Classifier
description: Model differentiates between 102 different flower catagories
---
Hello Welcome

<a href="https://colab.research.google.com/github/kirankamatmgm/FlowerImageClassifier/blob/master/FlowerspeciesClassifier.ipynb" target="_parent"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>

We are going to use the [Oxford 102 Flower Dataset](http://www.robots.ox.ac.uk/~vgg/data/flowers/102/) by [Nilsback,M-E and Zisserman, A., 2008](http://www.robots.ox.ac.uk/~vgg/publications/papers/nilsback08.pdf). A 102 category dataset consisting of 102 flower categories, commonly occuring in the United Kingdom. Each class consists of 40 to 258 images. The images have large scale, pose and light variations.

Credits: fastai(for inspiring to do this project and ofcourse Im using fastai library)

To understand details about all basic code see my [1st Project](https://kirankamath.netlify.app/blog/image-classification-fast-ai/)

```
!curl -s https://course.fast.ai/setup/colab | bash
```

```
Updating fastai...
Done.
```

```
%reload_ext autoreload
%autoreload 2
%matplotlib inline
```

```
from fastai import *
from fastai.basics import *
from fastai.vision import *
from fastai.metrics import *
```

```
from fastai.callbacks.hooks import *
from fastai.utils.mem import *
```

```
path=untar_data(URLs.FLOWERS)
```

```
Downloading https://s3.amazonaws.com/fast-ai-imageclas/oxford-102-flowers
```

```
path.ls()
```

```
[PosixPath('/root/.fastai/data/oxford-102-flowers/test.txt'),
 PosixPath('/root/.fastai/data/oxford-102-flowers/valid.txt'),
 PosixPath('/root/.fastai/data/oxford-102-flowers/train.txt'),
 PosixPath('/root/.fastai/data/oxford-102-flowers/jpg')]
```

```
path_img=path/'jpg'
```

This dataset is has train test and validation data in text file and images in jpg file. So using pandas dataframe looks good here

```
trn=pd.read_csv(path/'train.txt',sep=" ",header=None)
val=pd.read_csv(path/'valid.txt',sep=" ",header=None)
tst=pd.read_csv(path/'test.txt',sep=" ",header=None)
df = trn.append(val,ignore_index=True).append(tst,ignore_index=True)
df.columns=['Img','Class']
df.index=df.Img
df.head()
```



<table border="1" class="dataframe">

<thead>

\    <tr style="text-align: right;">

\    <th></th>

\    <th>Img</th>

\    <th>Class</th>

\    </tr>

\    <tr>

\    <th>Img</th>

\    <th></th>

\    <th></th>

\    </tr>

  </thead>

  <tbody>

\    <tr>

\    <th>jpg/image_03860.jpg</th>

\    <td>jpg/image_03860.jpg</td>

\    <td>16</td>

\    </tr>

\    <tr>

\    <th>jpg/image_06092.jpg</th>

\    <td>jpg/image_06092.jpg</td>

\    <td>13</td>

\    </tr>

\    <tr>

\    <th>jpg/image_02400.jpg</th>

\    <td>jpg/image_02400.jpg</td>

\    <td>42</td>

\    </tr>

\    <tr>

\    <th>jpg/image_02852.jpg</th>

\    <td>jpg/image_02852.jpg</td>

\    <td>55</td>

\    </tr>

\    <tr>

\    <th>jpg/image_07710.jpg</th>

\    <td>jpg/image_07710.jpg</td>

\    <td>96</td>

\    </tr>

  </tbody>

</table>



```
len(trn), len(val), len(tst)
```

```
(1020, 1020, 6149)
```

We have images with format jpg/{some name}.jpg and class label. But we dont know the name of flower. So to know name of flower, we have 2 steps.

1. create a dictionary and add it manually seeing dataset website, or use content.json available with label and flower name
2. Use web scrapping to extract images name. 

2nd option looks good, since it opportunity to learn web scrapping. 
I am using BeautifulSoup

```
from bs4 import BeautifulSoup
import re
```

```
url = 'http://www.robots.ox.ac.uk/~vgg/data/flowers/102/categories.html'
r= requests.get(url)

soup=BeautifulSoup(r.content, "lxml")
ims=soup.findAll('img')
print(ims)
```

```
[<img alt="alpine sea holly" border="0" height="75" src="thumbs/thumbim_06974.jpg" width="78"/>, <img alt="buttercup" border="0" height="76" src="thumbs/thumbim_04657.jpg" width="75"/>, <img alt="fire lily" border="0" height="75" src="thumbs/thumbim_06779.jpg" width="75"/>, <img alt="anthurium" border="0" height="75" src="thumbs/thumbim_02011.jpg" width="76"/>, <img alt="californian poppy" border="0" height="75" src="thumbs/thumbim_03206.jpg" width="76"/>, <img alt="foxglove" border="0" height="75" src="thumbs/thumbim_07419.jpg" width="80"/>, <img alt="artichoke" border="0" height="75" src="thumbs/thumbim_04093.jpg" width="80"/>, <img alt="camellia" border="0" height="75" src="thumbs/thumbim_07652.jpg" width="75"/>, <img alt="frangipani" border="0" height="76" src="thumbs/thumbim_00784.jpg" width="75"/>, <img alt="azalea" border="0" height="75" src="thumbs/thumbim_03581.jpg" width="75"/>, <img alt="canna lily" border="0" height="75" src="thumbs/thumbim_04479.jpg" width="75"/>, <img alt="fritillary" border="0" height="75" src="thumbs/thumbim_03379.jpg" width="75"/>, <img alt="ball moss" border="0" height="75" src="thumbs/thumbim_06024.jpg" width="75"/>, <img alt="canterbury bells" border="0" height="77" src="thumbs/thumbim_06618.jpg" width="75"/>, <img alt="garden phlox" border="0" height="75" src="thumbs/thumbim_05594.jpg" width="75"/>, <img alt="balloon flower" border="0" height="76" src="thumbs/thumbim_06156.jpg" width="75"/>, <img alt="cape flower" border="0" height="76" src="thumbs/thumbim_03806.jpg" width="75"/>, <img alt="gaura" border="0" height="75" src="thumbs/thumbim_08149.jpg" width="78"/>, <img alt="barbeton daisy" border="0" height="75" src="thumbs/thumbim_02211.jpg" width="75"/>, <img alt="carnation" border="0" height="75" src="thumbs/thumbim_06923.jpg" width="75"/>, <img alt="gazania" border="0" height="75" src="thumbs/thumbim_04481.jpg" width="75"/>, <img alt="bearded iris" border="0" height="75" src="thumbs/thumbim_05933.jpg" width="75"/>, <img alt="cautleya spicata" border="0" height="75" src="thumbs/thumbim_06249.jpg" width="75"/>, <img alt="geranium" border="0" height="76" src="thumbs/thumbim_02747.jpg" width="75"/>, <img alt="bee balm" border="0" height="76" src="thumbs/thumbim_03070.jpg" width="75"/>, <img alt="clematis" border="0" height="75" src="thumbs/thumbim_01668.jpg" width="75"/>, <img alt="giant white arum lily" border="0" height="76" src="thumbs/thumbim_04902.jpg" width="76"/>, <img alt="bird of paradise" border="0" height="75" src="thumbs/thumbim_03291.jpg" width="75"/>, <img alt="colt's foot" border="0" height="75" src="thumbs/thumbim_04019.jpg" width="81"/>, <img alt="globe thistle" border="0" height="78" src="thumbs/thumbim_07115.jpg" width="75"/>, <img alt="bishop of llandaff" border="0" height="75" src="thumbs/thumbim_02779.jpg" width="76"/>, <img alt="columbine" border="0" height="75" src="thumbs/thumbim_02577.jpg" width="75"/>, <img alt="globe-flower" border="0" height="75" src="thumbs/thumbim_06677.jpg" width="75"/>, <img alt="black-eyed susan" border="0" height="75" src="thumbs/thumbim_05890.jpg" width="75"/>, <img alt="common dandelion" border="0" height="76" src="thumbs/thumbim_06317.jpg" width="75"/>, <img alt="grape hyacinth" border="0" height="75" src="thumbs/thumbim_06601.jpg" width="75"/>, <img alt="blackberry lily" border="0" height="75" src="thumbs/thumbim_08035.jpg" width="75"/>, <img alt="corn poppy" border="0" height="77" src="thumbs/thumbim_06492.jpg" width="75"/>, <img alt="great masterwort" border="0" height="77" src="thumbs/thumbim_05819.jpg" width="75"/>, <img alt="blanket flower" border="0" height="75" src="thumbs/thumbim_07899.jpg" width="75"/>, <img alt="cyclamen " border="0" height="75" src="thumbs/thumbim_00590.jpg" width="77"/>, <img alt="hard-leaved pocket orchid" border="0" height="75" src="thumbs/thumbim_05101.jpg" width="75"/>, <img alt="bolero deep blue" border="0" height="75" src="thumbs/thumbim_07131.jpg" width="75"/>, <img alt="daffodil" border="0" height="75" src="thumbs/thumbim_05707.jpg" width="75"/>, <img alt="hibiscus" border="0" height="76" src="thumbs/thumbim_01761.jpg" width="75"/>, <img alt="bougainvillea" border="0" height="75" src="thumbs/thumbim_07483.jpg" width="75"/>, <img alt="desert-rose" border="0" height="75" src="thumbs/thumbim_04815.jpg" width="75"/>, <img alt="hippeastrum " border="0" height="75" src="thumbs/thumbim_04868.jpg" width="75"/>, <img alt="bromelia" border="0" height="75" src="thumbs/thumbim_07858.jpg" width="75"/>, <img alt="english marigold" border="0" height="75" src="thumbs/thumbim_05147.jpg" width="75"/>, <img alt="japanese anemone" border="0" height="75" src="thumbs/thumbim_08157.jpg" width="75"/>, <img alt="king protea" border="0" height="75" src="thumbs/thumbim_05744.jpg" width="75"/>, <img alt="peruvian lily" border="0" height="75" src="thumbs/thumbim_04270.jpg" width="75"/>, <img alt="stemless gentian" border="0" height="75" src="thumbs/thumbim_05236.jpg" width="79"/>, <img alt="lenten rose" border="0" height="75" src="thumbs/thumbim_04564.jpg" width="77"/>, <img alt="petunia" border="0" height="75" src="thumbs/thumbim_01456.jpg" width="75"/>, <img alt="sunflower" border="0" height="75" src="thumbs/thumbim_05414.jpg" width="81"/>, <img alt="lotus" border="0" height="75" src="thumbs/thumbim_01863.jpg" width="75"/>, <img alt="pincushion flower" border="0" height="75" src="thumbs/thumbim_05360.jpg" width="75"/>, <img alt="sweet pea" border="0" height="75" src="thumbs/thumbim_05684.jpg" width="76"/>, <img alt="love in the mist" border="0" height="75" src="thumbs/thumbim_06444.jpg" width="82"/>, <img alt="pink primrose" border="0" height="75" src="thumbs/thumbim_06757.jpg" width="76"/>, <img alt="sweet william" border="0" height="77" src="thumbs/thumbim_03495.jpg" width="75"/>, <img alt="magnolia" border="0" height="75" src="thumbs/thumbim_05520.jpg" width="82"/>, <img alt="pink-yellow dahlia?" border="0" height="75" src="thumbs/thumbim_02947.jpg" width="76"/>, <img alt="sword lily" border="0" height="76" src="thumbs/thumbim_02392.jpg" width="75"/>, <img alt="mallow" border="0" height="75" src="thumbs/thumbim_07737.jpg" width="76"/>, <img alt="poinsettia" border="0" height="76" src="thumbs/thumbim_01511.jpg" width="76"/>, <img alt="thorn apple" border="0" height="76" src="thumbs/thumbim_02144.jpg" width="75"/>, <img alt="marigold" border="0" height="78" src="thumbs/thumbim_05010.jpg" width="75"/>, <img alt="primula" border="0" height="76" src="thumbs/thumbim_03679.jpg" width="75"/>, <img alt="tiger lily" border="0" height="77" src="thumbs/thumbim_07167.jpg" width="75"/>, <img alt="mexican aster" border="0" height="78" src="thumbs/thumbim_06945.jpg" width="75"/>, <img alt="prince of wales feathers" border="0" height="75" src="thumbs/thumbim_06884.jpg" width="78"/>, <img alt="toad lily" border="0" height="75" src="thumbs/thumbim_06694.jpg" width="77"/>, <img alt="mexican petunia" border="0" height="79" src="thumbs/thumbim_07779.jpg" width="75"/>, <img alt="purple coneflower" border="0" height="75" src="thumbs/thumbim_03886.jpg" width="77"/>, <img alt="tree mallow" border="0" height="75" src="thumbs/thumbim_02910.jpg" width="76"/>, <img alt="monkshood" border="0" height="94" src="thumbs/thumbim_06415.jpg" width="75"/>, <img alt="red ginger" border="0" height="76" src="thumbs/thumbim_06830.jpg" width="75"/>, <img alt="tree poppy" border="0" height="76" src="thumbs/thumbim_05323.jpg" width="75"/>, <img alt="moon orchid" border="0" height="75" src="thumbs/thumbim_07215.jpg" width="76"/>, <img alt="rose" border="0" height="77" src="thumbs/thumbim_01270.jpg" width="75"/>, <img alt="trumpet creeper" border="0" height="75" src="thumbs/thumbim_07949.jpg" width="76"/>, <img alt="morning glory" border="0" height="75" src="thumbs/thumbim_02451.jpg" width="78"/>, <img alt="ruby-lipped cattleya" border="0" height="75" src="thumbs/thumbim_04333.jpg" width="75"/>, <img alt="wallflower" border="0" height="75" src="thumbs/thumbim_00954.jpg" width="76"/>, <img alt="orange dahlia" border="0" height="94" src="thumbs/thumbim_05061.jpg" width="75"/>, <img alt="siam tulip" border="0" height="75" src="thumbs/thumbim_07011.jpg" width="77"/>, <img alt="water lily" border="0" height="75" src="thumbs/thumbim_00323.jpg" width="76"/>, <img alt="osteospermum" border="0" height="77" src="thumbs/thumbim_05571.jpg" width="75"/>, <img alt="silverbush" border="0" height="76" src="thumbs/thumbim_06126.jpg" width="75"/>, <img alt="watercress" border="0" height="76" src="thumbs/thumbim_00634.jpg" width="75"/>, <img alt="oxeye daisy" border="0" height="76" src="thumbs/thumbim_06224.jpg" width="75"/>, <img alt="snapdragon" border="0" height="75" src="thumbs/thumbim_03117.jpg" width="75"/>, <img alt="wild pansy" border="0" height="75" src="thumbs/thumbim_04194.jpg" width="76"/>, <img alt="passion flower" border="0" height="75" src="thumbs/thumbim_00005.jpg" width="75"/>, <img alt="spear thistle" border="0" height="75" src="thumbs/thumbim_06055.jpg" width="75"/>, <img alt="windflower" border="0" height="75" src="thumbs/thumbim_05982.jpg" width="76"/>, <img alt="pelargonium" border="0" height="75" src="thumbs/thumbim_04696.jpg" width="76"/>, <img alt="spring crocus" border="0" height="76" src="thumbs/thumbim_07052.jpg" width="75"/>, <img alt="yellow iris" border="0" height="75" src="thumbs/thumbim_06353.jpg" width="77"/>]
```

Observe the content of ims carefully. It has img tag, in which we are interested in src and alt tag.
alt tag content label names, and src content details which we have in dataframe Img part.
so using this we can change df such that jpg/{something}.jpg is equal to label names

```
sample = {}
for im in ims[0:]:
    sample[f"jpg/image_{im['src'].split('_')[-1]}"] = im['alt']
len(sample.keys()), {k: sample[k] for k in list(sample)[:5]}
```

```
(102,
 {'jpg/image_02011.jpg': 'anthurium',
  'jpg/image_03206.jpg': 'californian poppy',
  'jpg/image_04657.jpg': 'buttercup',
  'jpg/image_06779.jpg': 'fire lily',
  'jpg/image_06974.jpg': 'alpine sea holly'})
```

We can see that its showing 102 keys means that we have scraped 102 image lables. There are 102 labels.

But actually we want dictionary that contains class label number to name mapping, so lets do that

```
names = {}
for im in sample.keys():
  names[df.loc[im]['Class']]=sample[im]

{k: names[k] for k in list(names)[:5]}
```

```
{20: 'fire lily',
 34: 'alpine sea holly',
 47: 'buttercup',
 64: 'californian poppy',
 79: 'anthurium'}
```

Go through the labels once

```
{k: names[k] for k in list(names)}
```

```
{0: 'pink primrose',
 1: 'hard-leaved pocket orchid',
 2: 'canterbury bells',
 3: 'sweet pea',
 4: 'english marigold',
 5: 'tiger lily',
 6: 'moon orchid',
 7: 'bird of paradise',
 8: 'monkshood',
 9: 'globe thistle',
 10: 'snapdragon',
 11: "colt's foot",
 12: 'king protea',
 13: 'spear thistle',
 14: 'yellow iris',
 15: 'globe-flower',
 16: 'purple coneflower',
 17: 'peruvian lily',
 18: 'balloon flower',
 19: 'giant white arum lily',
 20: 'fire lily',
 21: 'pincushion flower',
 22: 'fritillary',
 23: 'red ginger',
 24: 'grape hyacinth',
 25: 'corn poppy',
 26: 'prince of wales feathers',
 27: 'stemless gentian',
 28: 'artichoke',
 29: 'sweet william',
 30: 'carnation',
 31: 'garden phlox',
 32: 'love in the mist',
 33: 'mexican aster',
 34: 'alpine sea holly',
 35: 'ruby-lipped cattleya',
 36: 'cape flower',
 37: 'great masterwort',
 38: 'siam tulip',
 39: 'lenten rose',
 40: 'barbeton daisy',
 41: 'daffodil',
 42: 'sword lily',
 43: 'poinsettia',
 44: 'bolero deep blue',
 45: 'wallflower',
 46: 'marigold',
 47: 'buttercup',
 48: 'oxeye daisy',
 49: 'common dandelion',
 50: 'petunia',
 51: 'wild pansy',
 52: 'primula',
 53: 'sunflower',
 54: 'pelargonium',
 55: 'bishop of llandaff',
 56: 'gaura',
 57: 'geranium',
 58: 'orange dahlia',
 59: 'pink-yellow dahlia?',
 60: 'cautleya spicata',
 61: 'japanese anemone',
 62: 'black-eyed susan',
 63: 'silverbush',
 64: 'californian poppy',
 65: 'osteospermum',
 66: 'spring crocus',
 67: 'bearded iris',
 68: 'windflower',
 69: 'tree poppy',
 70: 'gazania',
 71: 'azalea',
 72: 'water lily',
 73: 'rose',
 74: 'thorn apple',
 75: 'morning glory',
 76: 'passion flower',
 77: 'lotus',
 78: 'toad lily',
 79: 'anthurium',
 80: 'frangipani',
 81: 'clematis',
 82: 'hibiscus',
 83: 'columbine',
 84: 'desert-rose',
 85: 'tree mallow',
 86: 'magnolia',
 87: 'cyclamen ',
 88: 'watercress',
 89: 'canna lily',
 90: 'hippeastrum ',
 91: 'bee balm',
 92: 'ball moss',
 93: 'foxglove',
 94: 'bougainvillea',
 95: 'camellia',
 96: 'mallow',
 97: 'mexican petunia',
 98: 'bromelia',
 99: 'blanket flower',
 100: 'trumpet creeper',
 101: 'blackberry lily'}
```

```
codes = np.array([names[i] for i in range(len(names))]); codes
```

```
array(['pink primrose', 'hard-leaved pocket orchid', 'canterbury bells', 'sweet pea', ..., 'bromelia',
       'blanket flower', 'trumpet creeper', 'blackberry lily'], dtype='<U25')
```

Here many labels contain space in between so lets remove that

```
trn[trn.columns[-1]] = trn[trn.columns[-1]].apply(lambda x: codes[x].replace(' ','_'))
val[val.columns[-1]] = val[val.columns[-1]].apply(lambda x: codes[x].replace(' ','_'))
tst[tst.columns[-1]] = tst[tst.columns[-1]].apply(lambda x: codes[x].replace(' ','_'))
```

```
trn[:5]
```

Once confirmed all labels doesnot contain space move forward

```
fnames= get_image_files(path_img)
fnames[:3]
```

```
[PosixPath('/root/.fastai/data/oxford-102-flowers/jpg/image_00529.jpg'),
 PosixPath('/root/.fastai/data/oxford-102-flowers/jpg/image_00328.jpg'),
 PosixPath('/root/.fastai/data/oxford-102-flowers/jpg/image_07095.jpg')]
```

```
img_f = fnames[0]
img=open_image(img_f)
img.show(figsize=(5,5))
```

![png](/assets/output_56_0.png)

```
src_size = min(img.size)
```

```
size=src_size//2
bs=4
```

```
trnList = ImageList.from_df(df=trn, path=path)
valList = ImageList.from_df(df=val, path=path)
tstList = ImageList.from_df(df=tst, path=path)
```

```
src = (ImageList.from_folder(path).split_by_list(trnList,valList).label_from_df())
```

To know more about the above steps see [this](https://docs.fast.ai/data_block.html#ItemList.label_from_df) because it would take lot to explain everything so linking to docs of fastai

```
data = (src.transform(get_transforms(),size=size).databunch(bs=bs).normalize(imagenet_stats))
```

```
data.show_batch(4, figsize=(10,7))
```

![png](/assets/output_37_0.png)

```
data.show_batch(4,figsize=(10,7),ds_type=DatasetType.Valid)
```

![png](/assets/output_38_0.png)

```
metrics=accuracy
```

```
learn=cnn_learner(data,models.resnet34,metrics=metrics)
```

```
Downloading: "https://download.pytorch.org/models/resnet34-333f7ec4.pth" to /root/.cache/torch/checkpoints/resnet34-333f7ec4.pth
```

Downloaded pretrained weights and using resnet34 which is trained on imagenet. You can try vgg, resnet50 also. Resnet 50 is best and can get better accuracy, I am not doing it, because of my space and time limitation

```
lr_find(learn)
learn.recorder.plot()
```

```
LR Finder is complete, type {learner_name}.recorder.plot() to see the graph.
```

![png](/assets/output_42_2.png)

```
lr=3e-3
```

```
learn.fit_one_cycle(10, slice(lr), pct_start=0.9)
```

```
learn.save('stage-1')
```

This is very important step since if wanting to experiment with different learning rate and other hyperparametes, its important to save so that we can load when needed

```
learn.load('stage-1')
```

```
Learner(data=ImageDataBunch;

Train: LabelList (1020 items)
x: ImageList
Image (3, 250, 250),Image (3, 250, 250),Image (3, 250, 250),Image (3, 250, 250),Image (3, 250, 250)
y: CategoryList
purple_coneflower,spear_thistle,sword_lily,bishop_of_llandaff,mallow
Path: /root/.fastai/data/oxford-102-flowers;

Valid: LabelList (1020 items)
x: ImageList
Image (3, 250, 250),Image (3, 250, 250),Image (3, 250, 250),Image (3, 250, 250),Image (3, 250, 250)
y: CategoryList
canna_lily,bolero_deep_blue,english_marigold,alpine_sea_holly,anthurium
Path: /root/.fastai/data/oxford-102-flowers;

Test: None, model=Sequential(
  (0): Sequential(
    (0): Conv2d(3, 64, kernel_size=(7, 7), stride=(2, 2), padding=(3, 3), bias=False)
    (1): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
    (2): ReLU(inplace=True)
    (3): MaxPool2d(kernel_size=3, stride=2, padding=1, dilation=1, ceil_mode=False)
    (4): Sequential(
      (0): BasicBlock(
        (conv1): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (1): BasicBlock(
        (conv1): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (2): BasicBlock(
        (conv1): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
    )
    (5): Sequential(
      (0): BasicBlock(
        (conv1): Conv2d(64, 128, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (downsample): Sequential(
          (0): Conv2d(64, 128, kernel_size=(1, 1), stride=(2, 2), bias=False)
          (1): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        )
      )
      (1): BasicBlock(
        (conv1): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (2): BasicBlock(
        (conv1): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (3): BasicBlock(
        (conv1): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
    )
    (6): Sequential(
      (0): BasicBlock(
        (conv1): Conv2d(128, 256, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (downsample): Sequential(
          (0): Conv2d(128, 256, kernel_size=(1, 1), stride=(2, 2), bias=False)
          (1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        )
      )
      (1): BasicBlock(
        (conv1): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (2): BasicBlock(
        (conv1): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (3): BasicBlock(
        (conv1): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (4): BasicBlock(
        (conv1): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (5): BasicBlock(
        (conv1): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
    )
    (7): Sequential(
      (0): BasicBlock(
        (conv1): Conv2d(256, 512, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (downsample): Sequential(
          (0): Conv2d(256, 512, kernel_size=(1, 1), stride=(2, 2), bias=False)
          (1): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        )
      )
      (1): BasicBlock(
        (conv1): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (2): BasicBlock(
        (conv1): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
    )
  )
  (1): Sequential(
    (0): AdaptiveConcatPool2d(
      (ap): AdaptiveAvgPool2d(output_size=1)
      (mp): AdaptiveMaxPool2d(output_size=1)
    )
    (1): Flatten()
    (2): BatchNorm1d(1024, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
    (3): Dropout(p=0.25, inplace=False)
    (4): Linear(in_features=1024, out_features=512, bias=True)
    (5): ReLU(inplace=True)
    (6): BatchNorm1d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
    (7): Dropout(p=0.5, inplace=False)
    (8): Linear(in_features=512, out_features=102, bias=True)
  )
), opt_func=functools.partial(<class 'torch.optim.adam.Adam'>, betas=(0.9, 0.99)), loss_func=FlattenedLoss of CrossEntropyLoss(), metrics=[<function accuracy at 0x7fcf35abed90>], true_wd=True, bn_wd=True, wd=0.01, train_bn=True, path=PosixPath('/root/.fastai/data/oxford-102-flowers'), model_dir='models', callback_fns=[functools.partial(<class 'fastai.basic_train.Recorder'>, add_time=True, silent=False)], callbacks=[], layer_groups=[Sequential(
  (0): Conv2d(3, 64, kernel_size=(7, 7), stride=(2, 2), padding=(3, 3), bias=False)
  (1): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (2): ReLU(inplace=True)
  (3): MaxPool2d(kernel_size=3, stride=2, padding=1, dilation=1, ceil_mode=False)
  (4): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (5): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (6): ReLU(inplace=True)
  (7): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (8): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (9): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (10): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (11): ReLU(inplace=True)
  (12): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (13): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (14): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (15): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (16): ReLU(inplace=True)
  (17): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (18): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (19): Conv2d(64, 128, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1), bias=False)
  (20): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (21): ReLU(inplace=True)
  (22): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (23): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (24): Conv2d(64, 128, kernel_size=(1, 1), stride=(2, 2), bias=False)
  (25): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (26): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (27): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (28): ReLU(inplace=True)
  (29): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (30): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (31): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (32): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (33): ReLU(inplace=True)
  (34): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (35): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (36): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (37): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (38): ReLU(inplace=True)
  (39): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (40): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
), Sequential(
  (0): Conv2d(128, 256, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1), bias=False)
  (1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (2): ReLU(inplace=True)
  (3): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (4): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (5): Conv2d(128, 256, kernel_size=(1, 1), stride=(2, 2), bias=False)
  (6): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (7): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (8): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (9): ReLU(inplace=True)
  (10): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (11): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (12): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (13): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (14): ReLU(inplace=True)
  (15): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (16): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (17): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (18): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (19): ReLU(inplace=True)
  (20): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (21): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (22): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (23): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (24): ReLU(inplace=True)
  (25): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (26): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (27): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (28): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (29): ReLU(inplace=True)
  (30): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (31): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (32): Conv2d(256, 512, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1), bias=False)
  (33): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (34): ReLU(inplace=True)
  (35): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (36): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (37): Conv2d(256, 512, kernel_size=(1, 1), stride=(2, 2), bias=False)
  (38): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (39): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (40): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (41): ReLU(inplace=True)
  (42): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (43): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (44): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (45): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (46): ReLU(inplace=True)
  (47): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (48): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
), Sequential(
  (0): AdaptiveAvgPool2d(output_size=1)
  (1): AdaptiveMaxPool2d(output_size=1)
  (2): Flatten()
  (3): BatchNorm1d(1024, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (4): Dropout(p=0.25, inplace=False)
  (5): Linear(in_features=1024, out_features=512, bias=True)
  (6): ReLU(inplace=True)
  (7): BatchNorm1d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (8): Dropout(p=0.5, inplace=False)
  (9): Linear(in_features=512, out_features=102, bias=True)
)], add_time=True, silent=False)
```

```
learn.show_results(rows=4,figsize=(8,9))
```

![png](/assets/output_48_0.png)

This step is important since it shows which images we have correctly classified and which we did not

```
learn.unfreeze()
```

Unfreezes entire model, sets every layer group to train.

```
lrs= slice(lr/400,lr/4)
```

```
learn.fit_one_cycle(12,lrs,pct_start=0.8)
```

```
learn.save('stage-2')
```

As you can see accuracy has increased compared to stage 1 so save this

```
learn.show_results(ds_type=DatasetType.Valid, rows=4,figsize=(8,9))
```

![png](/assets/output_56_0.png)

```
learn.export()
```

```
src2 = (ImageList.from_folder(path)
       .split_by_list(trnList, tstList)
       .label_from_df()
       )
data2 = (src2.transform(get_transforms(), size=size)
        .databunch(bs=bs)
        .normalize(imagenet_stats))

learn2 = cnn_learner(data2, models.resnet34, metrics=metrics)
learn2.load('stage-2');
```

```
preds,y,losses = learn2.get_preds(with_loss=True)
accuracy(preds,y)
```

```
tensor(0.8452)
```

```
len(trn), len(val),len(tst)
```

```
(1020, 1020, 6149)
```

```
bs = 8
size = src_size
metrics=accuracy
```

```
src3 = (ImageList.from_df(df=trn.append(tst, ignore_index=True), path=path)
       .split_by_rand_pct(valid_pct=0.2, seed=42)
       .label_from_df()
       )
data3 = (src3.transform(get_transforms(), size=size)
        .databunch(bs=bs)
        .normalize(imagenet_stats))

learn = cnn_learner(data3, models.resnet34, metrics=metrics)
```

```
learn.load('stage-2')
```

```
Learner(data=ImageDataBunch;

Train: LabelList (5736 items)
x: ImageList
Image (3, 500, 500),Image (3, 500, 500),Image (3, 500, 500),Image (3, 500, 500),Image (3, 500, 500)
y: CategoryList
purple_coneflower,spear_thistle,sword_lily,bishop_of_llandaff,mallow
Path: /root/.fastai/data/oxford-102-flowers;

Valid: LabelList (1433 items)
x: ImageList
Image (3, 500, 500),Image (3, 500, 500),Image (3, 500, 500),Image (3, 500, 500),Image (3, 500, 500)
y: CategoryList
pink-yellow_dahlia?,daffodil,purple_coneflower,watercress,bolero_deep_blue
Path: /root/.fastai/data/oxford-102-flowers;

Test: None, model=Sequential(
  (0): Sequential(
    (0): Conv2d(3, 64, kernel_size=(7, 7), stride=(2, 2), padding=(3, 3), bias=False)
    (1): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
    (2): ReLU(inplace=True)
    (3): MaxPool2d(kernel_size=3, stride=2, padding=1, dilation=1, ceil_mode=False)
    (4): Sequential(
      (0): BasicBlock(
        (conv1): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (1): BasicBlock(
        (conv1): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (2): BasicBlock(
        (conv1): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
    )
    (5): Sequential(
      (0): BasicBlock(
        (conv1): Conv2d(64, 128, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (downsample): Sequential(
          (0): Conv2d(64, 128, kernel_size=(1, 1), stride=(2, 2), bias=False)
          (1): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        )
      )
      (1): BasicBlock(
        (conv1): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (2): BasicBlock(
        (conv1): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (3): BasicBlock(
        (conv1): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
    )
    (6): Sequential(
      (0): BasicBlock(
        (conv1): Conv2d(128, 256, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (downsample): Sequential(
          (0): Conv2d(128, 256, kernel_size=(1, 1), stride=(2, 2), bias=False)
          (1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        )
      )
      (1): BasicBlock(
        (conv1): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (2): BasicBlock(
        (conv1): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (3): BasicBlock(
        (conv1): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (4): BasicBlock(
        (conv1): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (5): BasicBlock(
        (conv1): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
    )
    (7): Sequential(
      (0): BasicBlock(
        (conv1): Conv2d(256, 512, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (downsample): Sequential(
          (0): Conv2d(256, 512, kernel_size=(1, 1), stride=(2, 2), bias=False)
          (1): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        )
      )
      (1): BasicBlock(
        (conv1): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (2): BasicBlock(
        (conv1): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (conv2): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
    )
  )
  (1): Sequential(
    (0): AdaptiveConcatPool2d(
      (ap): AdaptiveAvgPool2d(output_size=1)
      (mp): AdaptiveMaxPool2d(output_size=1)
    )
    (1): Flatten()
    (2): BatchNorm1d(1024, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
    (3): Dropout(p=0.25, inplace=False)
    (4): Linear(in_features=1024, out_features=512, bias=True)
    (5): ReLU(inplace=True)
    (6): BatchNorm1d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
    (7): Dropout(p=0.5, inplace=False)
    (8): Linear(in_features=512, out_features=102, bias=True)
  )
), opt_func=functools.partial(<class 'torch.optim.adam.Adam'>, betas=(0.9, 0.99)), loss_func=FlattenedLoss of CrossEntropyLoss(), metrics=[<function accuracy at 0x7fcf35abed90>], true_wd=True, bn_wd=True, wd=0.01, train_bn=True, path=PosixPath('/root/.fastai/data/oxford-102-flowers'), model_dir='models', callback_fns=[functools.partial(<class 'fastai.basic_train.Recorder'>, add_time=True, silent=False)], callbacks=[], layer_groups=[Sequential(
  (0): Conv2d(3, 64, kernel_size=(7, 7), stride=(2, 2), padding=(3, 3), bias=False)
  (1): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (2): ReLU(inplace=True)
  (3): MaxPool2d(kernel_size=3, stride=2, padding=1, dilation=1, ceil_mode=False)
  (4): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (5): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (6): ReLU(inplace=True)
  (7): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (8): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (9): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (10): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (11): ReLU(inplace=True)
  (12): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (13): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (14): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (15): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (16): ReLU(inplace=True)
  (17): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (18): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (19): Conv2d(64, 128, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1), bias=False)
  (20): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (21): ReLU(inplace=True)
  (22): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (23): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (24): Conv2d(64, 128, kernel_size=(1, 1), stride=(2, 2), bias=False)
  (25): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (26): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (27): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (28): ReLU(inplace=True)
  (29): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (30): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (31): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (32): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (33): ReLU(inplace=True)
  (34): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (35): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (36): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (37): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (38): ReLU(inplace=True)
  (39): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (40): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
), Sequential(
  (0): Conv2d(128, 256, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1), bias=False)
  (1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (2): ReLU(inplace=True)
  (3): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (4): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (5): Conv2d(128, 256, kernel_size=(1, 1), stride=(2, 2), bias=False)
  (6): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (7): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (8): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (9): ReLU(inplace=True)
  (10): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (11): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (12): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (13): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (14): ReLU(inplace=True)
  (15): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (16): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (17): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (18): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (19): ReLU(inplace=True)
  (20): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (21): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (22): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (23): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (24): ReLU(inplace=True)
  (25): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (26): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (27): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (28): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (29): ReLU(inplace=True)
  (30): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (31): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (32): Conv2d(256, 512, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1), bias=False)
  (33): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (34): ReLU(inplace=True)
  (35): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (36): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (37): Conv2d(256, 512, kernel_size=(1, 1), stride=(2, 2), bias=False)
  (38): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (39): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (40): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (41): ReLU(inplace=True)
  (42): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (43): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (44): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (45): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (46): ReLU(inplace=True)
  (47): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (48): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
), Sequential(
  (0): AdaptiveAvgPool2d(output_size=1)
  (1): AdaptiveMaxPool2d(output_size=1)
  (2): Flatten()
  (3): BatchNorm1d(1024, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (4): Dropout(p=0.25, inplace=False)
  (5): Linear(in_features=1024, out_features=512, bias=True)
  (6): ReLU(inplace=True)
  (7): BatchNorm1d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (8): Dropout(p=0.5, inplace=False)
  (9): Linear(in_features=512, out_features=102, bias=True)
)], add_time=True, silent=False)
```

```
learn.unfreeze()
```

```
lr_find(learn)
learn.recorder.plot()



LR Finder is complete, type {learner_name}.recorder.plot() to see the graph.
```

![png](/assets/output_65_2.png)

```
lr=5e-4
```

```
lrs=slice(1e-5,lr/10)
```

```
learn.fit_one_cycle(10,lrs)
```

```
epoch	train_loss	valid_loss	accuracy	time0	1.384226	0.477209	0.879274	04:341	0.818306	0.230950	0.943475	04:352	0.518546	0.167983	0.956036	04:353	0.387305	0.140578	0.968597	04:364	0.300006	0.115997	0.972087	04:335	0.240830	0.093787	0.981158	04:356	0.187486	0.090038	0.977669	04:377	0.109384	0.084203	0.983252	04:408	0.143494	0.085302	0.981158	04:379	0.151969	0.083969	0.981158	04:33
```

```
learn.save('stage-3')
```

```
learn.export()
```

```
src2 = (ImageList.from_folder(path)
       .split_by_list(trnList, valList)
       .label_from_df()
       )
data2 = (src2.transform(get_transforms(), size=size)
        .databunch(bs=bs)
        .normalize(imagenet_stats))

learn2 = cnn_learner(data2, models.resnet34, metrics=metrics)
learn2.load('stage-3');
```

```
preds,y,losses = learn2.get_preds(with_loss=True)
accuracy(preds,y)
```

```
tensor(0.9784)
```

I got accuracy of 97.84%
