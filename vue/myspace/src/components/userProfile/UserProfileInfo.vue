<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
            <div class="col-5">
                <img class="img-fluid" :src="user.photo">
            </div>
            <div class="col-7">
                <div class="username">{{ user.username }}</div>
                <div class="fans">粉丝:{{ user.followerCount }}</div>
                <button @click="follow" v-if="!user.is_followed" type="button" class="btn btn-secondary btn-sm">+关注</button>
                <button @click="unfollow" v-if="user.is_followed" type="button" class="btn btn-secondary btn-sm">+取消关注</button>
            </div>
        </div>
    </div>
</div>

</template>

<script>
// import { computed } from 'vue';
import store from '@/store';
import $ from 'jquery';
export default{
    name:"UserProfileInfo",
    props:{
        user:{
            type:Object,
            required:true,
        }
    },
    setup(props,context){
        const follow =()=>{
            $.ajax({
                url:"https://app165.acapp.acwing.com.cn/myspace/follow/",
                type:"POST",
                data:{
                    target_id:props.user.id,
                },
                headers:{
                    'Authorization':"Bearer "+ store.state.user.access,
                },
                success(resp){
                    if(resp.result === "success"){
                        context.emit('follow');
                    }
                }
            });
          
        };
        const unfollow =()=>{
            $.ajax({
                url:"https://app165.acapp.acwing.com.cn/myspace/follow/",
                type:"POST",
                data:{
                    target_id:props.user.id,
                },
                headers:{
                    'Authorization':"Bearer "+ store.state.user.access,
                },
                success(resp){
                    if(resp.result === "success"){
                        context.emit('unfollow');
                    }
                }
            });
        }

        return {
            follow,
            unfollow,
        }
    }
}
</script>

<style scoped>


.img{
    border-radius: 50%;
}
.username{
    font-weight: bold;
}
.fans{
    font-size: 12px;
    color: gray;
}
button{
    padding: 2px 4px;
    font-size: 12px;
}
</style>