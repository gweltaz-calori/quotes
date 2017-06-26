<template>
	<div class="floating-particles">
        <img class="particle delay a " src="../../assets/particles/particle.svg" alt="">
        <img class="particle delay b" src="../../assets/particles/particle3.svg" alt="">
        <img class="particle delay c" src="../../assets/particles/particle2.svg" alt="">
        <img class="particle delay d" src="../../assets/particles/particle4.svg" alt="">
        <img class="particle delay e" src="../../assets/particles/particle5.svg" alt="">
        <img class="particle delay f" src="../../assets/particles/particle6.svg" alt="">
        <img class="particle delay g" src="../../assets/particles/particle7.svg" alt="">
    </div>
</template>
<script>
	export default {

	}
</script>
<style scoped>
	@keyframes floating {
    from {transform: translate3d(0,-2px,0);}
    to {transform: translate3d(0,2px,0);}
}
.floating-particles
{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	pointer-events: none;
}
.particle {
	position: absolute;
	animation-name: floating;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
}
.particle.a {
	top: 62px;
	left: 52px;
}
.particle.b {
	top: 70px;
	left: 129px;
}
.particle.c {
	top: 164px;
	left: 73px;
}
.particle.d {
	top: 69px;
	left: 277px;
}
.particle.e {
	top: 133px;
	left: 298px;
}
.particle.f {
	bottom: 126px;
	left: 129px;
}
.particle.g {
	bottom: 201px;
    right: 50px;
}
.delay.a {
	animation-delay: 0.2s;
}
.delay.b {
	animation-delay: 0.3s;
}
.delay.c {
	animation-delay: 0.4s;
}
.delay.d {
	animation-delay: 0.5s;
}
.delay.e {
	animation-delay: 0.6s;
}
.delay.f {
	animation-delay: 0.7s;
}
.delay.g {
	animation-delay: 0.8s;
}
</style>