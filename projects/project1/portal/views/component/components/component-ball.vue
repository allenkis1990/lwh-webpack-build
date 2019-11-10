<template>
    <div>
        <div :id="uid" class="lwh-ball"></div>
    </div>
</template>

<script>

    export default {
        props:{
            target:{
                type:Number
            },
            value:{
                type:Number
            }
        },

        data(){
            return {
                uid:'lwh-ball'+new Date().getTime(),
                moveTarget:this.target,
                moveinit:this.value
            }
        },
        mounted(){
            let _this = this
            this.timer = null
//            console.log(this.moveTarget);
//            console.log(this.moveinit);
            let ball = document.querySelector(`#${this.uid}`)
            this.initBallPosition(ball)


            _this.timer =  window.requestAnimationFrame(function(){
                _this.move(ball)
            })

        },
        methods: {
            stopBall(){
                this.clearTimer()
            },
            initBallPosition(ball){
                ball.style.marginLeft = this.moveinit +'px'
            },
            clearTimer(){
                window.cancelAnimationFrame(this.timer)
                this.timer = null
            },
            move(ball){
                if(!ball){
                    ball = document.querySelector(`#${this.uid}`)
                }
                this.clearTimer()
                let _this = this
                if(_this.moveinit>=_this.moveTarget){
                    //超出target就等于target
                    _this.moveinit = _this.moveTarget
                    _this.$emit('input',_this.moveinit)
                    _this.clearTimer()
                    return false
                }
                _this.moveinit = _this.value
                _this.moveinit += 3
                ball.style.marginLeft = _this.moveinit +'px'
                _this.$emit('input',_this.moveinit)
                _this.timer = window.requestAnimationFrame(function(){
                    _this.move(ball)
                })
            }
        },
        watch:{

        }
    }
</script>
<style lang="less">
    @baseColor: red;
    .lwh-ball{background:@baseColor;width:200px;height:200px;border-radius:100px;}
</style>
