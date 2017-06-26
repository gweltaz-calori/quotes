<template>
    <div id="app" :style="bodyDimensions">
        <floating-particles></floating-particles>
        <transition :duration="300" name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
        <button @click="emitSocket">socket</button>
    </div>
</template>

<script>
import FloatingParticles from './components/web/FloatingParticles'
import './css/raleway.css'
import io from 'socket.io-client';
const socket = io('http://localhost:8085');

    export default {
        name: 'app',
        components : {
            FloatingParticles
        },
        data() {
            return {
                bodyDimensions : {
                    height: "",
                    width : ""
                }
            }
        },
        methods : {
            emitSocket() {
                socket.emit('hello', { message: 'ah' });
            },
            resizeBody() {
                this.bodyDimensions.width = (document.body.clientWidth || document.documentElement.offsetWidth || window.innerWidth)+'px';
                this.bodyDimensions.height = (document.body.clientHeight || document.documentElement.offsetHeight || window.innerHeight)+'px';
            },
            toggleFullScreen() {

                let doc = window.document;
                let docEl = doc.documentElement;

                let requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
            
                if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
                    requestFullScreen.call(docEl);
                }
            }
        },
        mounted: function () {
            window.addEventListener('resize', this.resizeBody)
            //window.addEventListener('click',this.toggleFullScreen)
            this.resizeBody();
            
            
        },
        beforeDestroy: function () {
            window.removeEventListener('resize', this.resizeBody)
            //window.removeEventListener('click',this.toggleFullScreen)
        }
    }
</script>

<style>
* {
    -webkit-tap-highlight-color: transparent;
    user-select:none;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
}
span {
    font-family: "Raleway";
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
html,body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
}
#app {
    
    display: flex;
    background: linear-gradient(152.27deg, #787BE3 58.04%, #919EEA 97.28%);
}

.message {
    font-size: 25px;
    color: white;
    text-align: center;
    margin-top: 85px;
    padding: 20px 66px;

}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
.opacity-enter-active,.opacity-leave-active {
    transition: all 1s;
}
.opacity-leave,.opacity-enter-to {
    opacity: 1;
}
.opacity-leave-to,.opacity-enter {
    opacity: 0;
}
</style>
