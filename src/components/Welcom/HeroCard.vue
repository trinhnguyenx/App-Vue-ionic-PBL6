<template>
    <ion-card class="hero-card-container">
        <span class="hero-card-title">{{ heroCard.title }}</span>
        <img class="hero-card-image" :src="heroCard.urlImage" alt="" />
    </ion-card>
</template>

<script lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle },
    props: {
        heroCard: {
            type: Object,
            required: true
        }
    }
});
</script>

<style scoped scss>
.hero-card-container {
    box-shadow: none;
    padding: 0;
    margin: 0;
    position: relative;
    width: 156px;
    border-radius: 8px;
    cursor: pointer;
    opacity: 0.6;

    .hero-card-image {
        border-radius: 8px;
        border: 1px solid #ebebeb;
        width: 100%;
        height: 227px;
        object-fit: cover;
    }

    .hero-card-title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 18px;
        font-weight: 600;
        z-index: 1;
    }
}
</style>