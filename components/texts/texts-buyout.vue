<template>
	<div class="text_wrapper">
		<p class="text__p">
			Наш автоцентр профессионально занимается выкупом автомобилей в любом состоянии за короткий срок.
Обращение к нашим услугам поможет вам избежать рисков махинаций с потерей средств, позволит быстро и законно продать свой автомобиль. 

Этапы выкупа автомобиля:

<ul class="text__ul">
	<li>
		1. Заполнение заявки.
Вы оставляете заявку на сайте или сообщаете данные по телефону.
	</li>
	<li>
		2. Оценка состояния транспортного средства с учетом стоимости ремонтных работ. 
Наши оценщики быстро и качественно проведут визуальный и технический осмотр состояния автомобиля. Оценка производится бесплатно. Цена за выкуп авто озвучивается на этом этапе.
	</li>
	<li>
		3. Оформление документов.
Наши специалисты самостоятельно оформят все необходимые документы, избавив вас от бумажной волокиты и возможных ошибок при подготовке документов. 
	</li>
	<li>
		4. Выплата денежных средств.
Незамедлительно произведём денежный расчет наличными, на банковский счёт либо на карту.
	</li>
</ul>

		</p>
		<!-- <p class="text__p">
			{{ settings.dealer_title }} предлагает выкуп вашего автомобиля с пробегом любой марки и в любом состоянии с
			бесплатной оценкой
			в удобном для вас месте и времени. В нашем автоцентре работают опытные специалисты оценки. Они быстро и
			качественно осмотрят машину и огласят точную сумму покупки.
		</p>
		<p class="text__p">
			Вам не придется ждать неделю, оформлять целую кипу документов и получать деньги по частям. Наши юристы сами
			составят все необходимые документы и Вы сможете получить деньги на руки в тот же день. Чтобы узнать больше о
			выкупе вашего автомобиля Вы можете оставить заявку на нашем сайте, либо позвонить по телефону.
		</p> -->
	
	</div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
	computed: {
		...mapGetters({
			settings: 'settings/settings'
		})
	}
}
</script>