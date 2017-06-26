<template>
    <div id="app" :style="bodyDimensions">
        <floating-particles></floating-particles>
        <router-view></router-view>
    </div>
</template>

<script>
import FloatingParticles from './components/web/FloatingParticles'
import './css/raleway.css'
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
            window.addEventListener('click',this.toggleFullScreen)
            this.resizeBody();
            
        },
        beforeDestroy: function () {
            window.removeEventListener('resize', this.resizeBody)
            window.removeEventListener('click',this.toggleFullScreen)
        }
    }
</script>

<style>
* {
    -webkit-tap-highlight-color: transparent;
    user-select:none;
    box-sizing: border-box;
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
</style>
