<template>
  <div>
    <Header />
    <Body />
    <Footer class="fixed-bottom"/>
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Body,
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
* {
  font-family: 'Roboto', sans-serif;
  box-sizing: border-box;
  font-size: 20px;
}
body {
  margin: 0;
}
</style>
