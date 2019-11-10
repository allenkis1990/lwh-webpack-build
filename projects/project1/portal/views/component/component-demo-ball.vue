<template>
    <div>

        <Ball :target="target1"
              ref="ball1"
              v-model="init1"></Ball>
        <Ball :target="target2"
              ref="ball2"
              v-model="init2"></Ball>


        <div>
            <button @click="getCurDiatance('init1')">获取球1的当前位置</button>
            <button @click="stopBall('ball1')">停止球1移动</button>
            <button @click="moveBall('ball1')">继续移动球1</button>
        </div>


        <div>
            <button @click="getCurDiatance('init2')">获取球2的当前位置</button>
            <button @click="stopBall('ball2')">停止球2移动</button>
            <button @click="moveBall('ball2')">继续移动球2</button>
        </div>

    </div>
</template>

<script>
    import Ball from '@portal/views/component/components/component-ball.vue'
    export default {
        data(){
            return {
                target1:1500,
                init1:200,
                target2:1500,
                init2:200
            }
        },
        mounted(){

        },
        methods: {
            getCurDiatance(init){
                console.log(this[init]);
            },
            stopBall(ball){
                let refs = this.$refs[ball]
                refs.stopBall()
            },
            moveBall(ball){
                let refs = this.$refs[ball]
                refs.move()
            }
        },
        components:{
            Ball
        }
    }
</script>
<style>
    body, html {
        width: 100%;
        height: 100%;
    }
</style>
