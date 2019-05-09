<template>
  <div class="container imageContainer">
    <div v-if="allBuilding === 0" class="img-wrapper" v-for="(item, index) in image_list" :key="index">
      <div class="img_block">
        <el-image class="img" lazy :src=item.url fit="fill" :title="item.belongTo" @click.native="clickImage(item.belongTo, item.url)"></el-image>
      </div>
      <div class="item-name" @click="clickImage(item.belongTo, item.url)">{{item.name}}</div>
    </div>
    <div v-if="allBuilding === 1" style="width: 100%;">
      <div class="back-button">
        <el-button type="success" icon="el-icon-arrow-left" circle @click="allBuilding = 0"></el-button>
      </div>

      <el-row :gutter="20">
        <el-col :span="18">
          <el-carousel @change="currentImageCard" trigger="click" height="480px" :autoplay=false :loop=true indicator-position="outside">
            <el-carousel-item v-for="(item, index) in single_building_img" :key="index">
              <el-image class="" :src=item.url fit="fill"></el-image>
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <el-col :span="6">
          <div class="image-info">
            <p>
              <span class="start">图片内容：</span>{{current_image.name}}</p>
            <p>
              <span class="start">所属建筑群：</span>{{current_image.belongTo}}</p>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import {getImageList, getImageListByName} from '~/services/api.js'
export default {
  head: {
    title: 'Building | 侨乡建筑'
  },
  data() {
    return {
      allBuilding: 0,
      image_list: [],
      single_building_img: [],
      current_image: {}
    }
  },
  async mounted() {
    try {
      this.get_image_list()
    } catch (e) {
      // console.log(e.message)
    }
  },

  methods: {
    async get_image_list() {
      try {
        let data = await getImageList()
        this.image_list = data.data
        // console.log(this.image_list)
      } catch (e) {
        console.log(e.message)
      }
    },
    clickImage(building_name, img_url) {
      this.allBuilding = 1
      let current_img = {}
      this.single_building_img = []
      for (let img_index = 0; img_index < this.image_list.length; img_index++) {
        if (this.image_list[img_index].belongTo == building_name) {
          if (this.image_list[img_index].url == img_url) {
            current_img = this.image_list[img_index]
          } else {
            this.single_building_img.push(this.image_list[img_index])
          }
        }
      }
      // let current image at first
      this.single_building_img.unshift(current_img)
    },
    currentImageCard(current_index, pre_index) {
      // console.log(current_index)
      this.current_image = this.single_building_img[current_index]
      // console.log(this.current_image)
    }
  }
}
</script>

<style>
.imageContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.img-wrapper {
  width: 31%;
}
.img_block {
  width: 100%;
  height: 220px;
  overflow: hidden;
}
.img {
  width: 100%;
}
.item-name {
  font-weight: bold;
  font-size: 1rem;
  font-family: 'Microsoft YaHei UI', 'sans-serif';
  padding: 5px 0 20px 0;
  text-align: center;
}
.image-carousel {
  margin: auto auto;
  text-align: center;
}
.image-carousel image {
  margin: 0 auto;
}
.image-info {
  min-height: 350px;
  border: 1px solid darkgreen;
  border-radius: 40px;
  padding-top: 30px;
  padding-left: 20px;
  line-height: 50px;
}
.back-button {
  margin: 0 0 2rem 0;
}
.start {
  font-size: 20px;
  font-weight: bolder;
  color: darkgreen;
}
</style>
