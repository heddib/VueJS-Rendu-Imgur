<template>
  <div class="card mb-4">
    <div class="overlayer">
      <i @click="addToFavorites" :class="[this.addedToFavorites ? 'fa-heart-broken' : 'fa-heart', 'fav', 'fa']"></i>
    </div>
    <video v-if="condition" :src="img_src" autoplay muted loop class="card-img-top img-fluid"></video>
    <img v-else :src="img_src" class="card-img-top img-fluid" />
    <div class="card-body">
      <h5 class="card-text">{{ title }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    condition: Boolean,
    img_src: String,
    title: String,
    id: String
  },
  computed: {
    addedToFavorites: function () {
      return this.$store.getters.getFavorite(this.id) != null
    }
  },
  methods: {
    addToFavorites: function () {
      this.$store.dispatch('toggleFavorite', this.id)
        .catch(err => console.log(err))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card:hover .overlayer {
  visibility: visible;
}

.card .overlayer {
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  text-align: center;
  visibility: hidden;
  z-index: 2;
}

.overlayer .fav {
  color: #fff;
  font-size: 73px;
  transition: 100ms ease-in-out;
}
.fav:hover {
  transform: scale(1.1);
}
</style>
