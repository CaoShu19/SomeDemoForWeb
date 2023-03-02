<template>
<div class="card edit-field">
    <div class="card-body">
        <div class="form-floating">
        
        <textarea v-model="content" class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>

        <button @click="post_a_post" type="button" class="btn btn-primary btn-sm">发布</button>

        </div>
    </div>
</div>
</template>

<script>
import { ref } from 'vue';
import $ from 'jquery';
import { useStore } from 'vuex';

export default{
    name:"UserProfileWrite",
    setup(props,context){
        const store = useStore();
        let content = ref("");
        
        const post_a_post =()=>{

            $.ajax({
                url:"https://app165.acapp.acwing.com.cn/myspace/post/",
                type:"POST",
                data:{
                    content:content.value,
                },
                headers:{
                    'Authorization':"Bearer "+ store.state.user.access,
                },
                success(resp){
                    if(resp.result === "success"){
                        context.emit('post_a_post',content.value);
                        content.value = "";
                    }
                }
            })

            console.log(content.value);
            
        }

        return {
            content,
            post_a_post,
        }
    }
}
</script>

<style scoped>
.edit-field{
    margin-top: 12px;
}
button{
    width: 100%;
    margin-top: 12px;
}
</style>