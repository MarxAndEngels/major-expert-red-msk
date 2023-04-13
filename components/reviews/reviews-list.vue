<template>
	<div>
		<ul v-if="reviews.length" class="reviews">
			<li class="reviews__item"
			    :class="{'reviews__item--active':videoShow === video.id.videoId}"
				@click="clickVideo(video.id.videoId)"
				v-if="index<=1"
			    v-for="(video,index) in reviews"
			    :key="video.id.videoId">
				<iframe v-if="videoShow === video.id.videoId"
				        class="featured__review-player"
				        width="100%"
				        height="100%"
				        :src="`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`"
				        frameborder="0"
				        allow="encrypted-media"
				        allowfullscreen />
				<div v-if="videoShow !== video.id.videoId" class="reviews__item-link">
					<img class="reviews__item-img lazyload"
					     :data-src="video.snippet.thumbnails.high.url"
					     :alt="video.snippet.title" />
				</div>
				<svg-icon v-if="videoShow !== video.id.videoId"
				          class="featured__play-icon"
				          name="icon-play" />
			</li>
		</ul>
		<div v-else class="skeleton skeleton--reviews">
			<div class="skeleton__reviews-item"></div>
			<div class="skeleton__reviews-item"></div>
			<div class="skeleton__reviews-item"></div>
			<div class="skeleton__reviews-item"></div>
		</div>
		<div v-if="showMore" @click="getMore" class="button button--more" > Показать больше </div>
	</div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			reviews: [],
			videoShow: null,
			nextPageToken: null,
			showMore: true
		};
	},
	props: {
		pageTitle: String
	},
	async mounted() {
		try {
			await this.getPlaylist(this.nextPageToken, this.activeToken);
		} catch (error) {
			console.log(error);
		}
	},
	
	computed: {
		...mapGetters({
			settings: "settings/settings"
		}),
		activeToken() {
			// return 'UCNnSNNsd9zCVERp1phyRcaw'
			return 'UCpnPWhwpVzw9V12W77_A4gg'
		}
	},
	methods: {
		getReviews(dealer, index) {
			this.reviews = [];
			this.showMore = true;
			this.getPlaylist(this.pageToken, this.activeToken);
		},
		async getPlaylist(pageToken, channelId) {
			let params = {
				"channelId": channelId,
				"mine": true,
				"maxResults": 8,
				"key": "AIzaSyBw7M2CPzyAtwX1ct9XQk5akiouCUQ9CJU",
				"part": "snippet",
				"order": "date",
				"pageToken": pageToken
			};
			try {
				let response = await this.$axios.get("https://www.googleapis.com/youtube/v3/search", {
					params: params
				});
				console.log(response.data)
				this.nextPageToken = response.data.nextPageToken ? response.data.nextPageToken : this.showMore = false;
				this.reviews.push(...response.data.items);
				return null
			} catch (error) {
				console.log(error);
			}
		},
		getMore() {
			this.getPlaylist(this.nextPageToken, this.activeToken);
		},
		clickVideo(id) {
			this.videoShow = id;
		}
	}
};
</script>
