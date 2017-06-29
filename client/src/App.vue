<template>
    <div id="app" :style="bodyDimensions">
        <floating-particles></floating-particles>
        <transition :duration="300" name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import {isMobile} from './utils/platform'
    import { mapGetters,mapActions } from 'vuex'
    import Cookies from 'js-cookie'
    import FloatingParticles from './components/common/FloatingParticles'
    import './css/raleway.css'
    import socket from './utils/socket'
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
            ...mapActions([
                'setInfos'
            ]),
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
            },
            onRoomDisconnected() {
                socket.on('room-disconnected',() => {
                    alert('Room has been disconnected');
                    this.setInfos({});
                    window.location.replace('/');

                })
            },
            setCookieInfos() {
                
                if(isMobile() && Object.keys(this.infos).length > 0)
                    Cookies.set('userinfos', this.infos);
                
            },
        },
        computed : {
            ...mapGetters([
                'infos',
            ])
        },
        mounted: function () {
            window.addEventListener('resize', this.resizeBody)
            window.addEventListener('beforeunload',this.setCookieInfos);
            //window.addEventListener('click',this.toggleFullScreen)
            this.resizeBody();
            this.onRoomDisconnected();
            
            
        },
        beforeDestroy: function () {
            window.removeEventListener('resize', this.resizeBody)
            window.removeEventListener('beforeunload',this.setCookieInfos);
            //window.removeEventListener('click',this.toggleFullScreen)
            
        },
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

.block {
    margin: 0 80px;
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


@media (max-device-width: 1217px), (max-width: 1217px) {
    .block { 
        margin: 0;
    }
}
</style>
