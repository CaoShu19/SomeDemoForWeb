<template>
    <ContentBase>
      <div class="row">
        <div class="col-3">
          <UserProfileInfo @follow = "follow" @unfollow = "unfollow" :user="user"></UserProfileInfo>
          <UserProfileWrite v-if="is_me" @post_a_post="post_a_post"></UserProfileWrite>
        </div>
        <div class="col-9">
          <UserProfilePosts :user="user" :posts="posts" @delete_a_post="delete_a_post"></UserProfilePosts>
        </div>
      </div>
    </ContentBase>
  </template>
  
  <script>
  import ContentBase from '../components/ContentBase.vue'
  import UserProfileInfo from '@/components/userProfile/UserProfileInfo.vue';
  import UserProfileWrite from '@/components/userProfile/UserProfileWrite.vue';
  import UserProfilePosts from '@/components/userProfile/UserProfilePosts.vue';
  import { reactive } from 'vue';
  import { useRoute } from 'vue-router';
  import $ from 'jquery'
  import { useStore } from 'vuex';
  import { computed } from 'vue';

  export default {
    name: "UserProfileView",
    components: {
      ContentBase,
      UserProfileInfo,
      UserProfilePosts,
      UserProfileWrite,
    },
    //打开页面的时候执行setup函数，最后返回我们的页面用的数据
    setup(){
      //通过路由路径获得路径上的参数
      const route = useRoute();
      const userId = parseInt(route.params.userId);
      const user = reactive({});
      const posts = reactive({});
      const store = useStore();

      
      $.ajax({
        url:"https://app165.acapp.acwing.com.cn/myspace/getinfo/",
        type:"GET",
        data:{
          user_id : userId,
        },
        headers:{
          'Authorization':"Bearer "+ store.state.user.access,
        },
        success(resp){
          user.id = resp.id;
          user.username = resp.username;
          user.photo = resp.photo;
          user.followerCount = resp.followerCount;
          user.is_followed = resp.is_followed;
        }
      })
      $.ajax({  
        url:"https://app165.acapp.acwing.com.cn/myspace/post/",
        type:"GET",
        data:{
          user_id : userId,
        },
        headers:{
          'Authorization':"Bearer "+ store.state.user.access,
        },
        success(resp){
          console.log(resp);
          posts.count = resp.length;
          posts.posts = resp;
        }
      })
      const follow =()=>{
        if(user.is_followed) return;
        user.is_followed = true;
        user.followerCount ++;
      }
      const unfollow =()=>{
        if(!user.is_followed) return;
        user.is_followed = false;
        user.followerCount --;
      }

      const post_a_post = (content) =>{
        posts.count++;
        posts.posts.unshift({
            id:posts.count,
            userId:1,
            content:content,
        })
      }
      
      const delete_a_post = post_id =>{
        posts.posts = posts.posts.filter(post => post.id !== post_id);
        posts.count =  posts.posts.length;

      }
      
      const is_me = computed(()=>userId === store.state.user.id);

      return {
        user:user,
        follow,
        unfollow,
        posts,
        post_a_post,
        is_me,
        delete_a_post,
      }
    }
  };
  </script>
  
  
  <style scoped>
  
  </style>