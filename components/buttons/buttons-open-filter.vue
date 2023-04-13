<template>
	<div @click="clickButtonFilter"
	     class="button button--filter-top">
		{{  stateButtonFilter == true ? 'Расширенный фильтр' : 'Закрыть фильтр' }}
	</div>
</template>
<script>
export default{
    data(){
        return{
         stateButtonFilter: true
        }
    },
    methods:{
        clickButtonFilter(){
            this.stateButtonFilter = !this.stateButtonFilter
          this.$emit('click')
        }
    }
}
    
</script>