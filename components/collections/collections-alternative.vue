<template>
    <div class="collection-alternative">
      <div class="collection-alternative_line">
        <div @click="itemCLick(item.queryId)" class="collection-alternative_item" v-for="(item,index) in collections" :key="index">
          <div class="collection-alternative_title">{{item.title}}</div>
          <img class="collection-alternative_image" :src="require('~/static/img/collections/'+ item.img +'.png')" :alt="item.title">
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import {mapGetters} from "vuex";

  export default {
    computed: {
		...mapGetters({
			catalogRoute: 'settings/catalogRoute',
		}),
    },
    data(){
      return{
        collections:[
          {
            title:'Седан',
            queryId:'2',
            set: 'sedan',
            img:'sedan'
          },
          // {
          //   title:'Внедорожник',
          //   queryId:'2',
          //   img:'allroad'
          // },
          {
            title:'Хэтчбэк',
            queryId:'3',
            set: 'hatchback',
            img:'hatchback'
          },
          {
            title:'Лифтбэк',
            queryId:'5',
            set: 'liftback',
            img:'liftback'
          },
          {
            title:'Универсал',
            queryId:'6',
            set: 'universal',
            img:'wagon'
          }
        ]
      }
    },
    methods:{
      itemCLick(set){
        this.$router.push({path: this.catalogRoute, query: {bodyType:set}})
      }
    }
  }
  </script>