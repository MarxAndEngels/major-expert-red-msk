<template>
	<nuxt-link class="header__logo"
	           @click.native="$emit('click')"
	           :to="'/'">
		<img src="~/static/major.svg"
		     alt="logo">
	</nuxt-link>
</template>