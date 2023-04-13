<template>
	<div class="offer__page-title">
		<div class="offer__page-title__mark">
			{{offer.mark.title}}
		</div>
		<div class="offer__page-title__folder">
			{{offer.folder.title}}
		</div>
		<div class="offer__page-title__generation">
			{{offer.generation.name}},
		</div>
		<div class="offer__page-title__year">
			{{offer.year}} г.,
		</div>
		<div class="offer__page-title__run">
			с пробегом {{offer.run | numberFormat }} км
		</div>
	</div>
</template>

<script>
import filters from "@/mixins/filters";
export default {
	props: {
		offer: Object
	},
	mixins: [filters],
}
</script>