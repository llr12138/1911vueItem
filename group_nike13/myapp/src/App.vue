<template>
  <div class="container">
    <router-view />
    <router-view name="footer" />
  </div>
</template>

<style lang="scss">
@import '@/lib/reset.scss';

html, body, .container, .detail {
  @include rect(100%, 100%);
}
.container, .detail {
  @include flexbox();
  @include flex-direction(column);
  .box {
    @include flex();
    @include rect(100%, auto);
    @include overflow();
    @include flexbox();
    @include flex-direction(column);
    .header {
      @include rect(100%, 0.44rem);
      @include background-color(#fff);
      border-bottom:0.01rem solid #ccc;
      img{
        margin-top: .12rem;
        margin-left:.2rem
      }
    }
    .content {
      @include flex();
      @include rect(92%, auto);
      @include overflow();
      margin: auto;
    }
  }
  .footer {
    @include rect(100%, 0.5rem);
    @include background-color(#fff);
    margin-top: 1px;
    border-top: 1px solid rgb(155, 155, 155);
    ul {
      @include rect(100%, 100%);
      @include flexbox();
      li {
        @include flex();
        @include rect(auto, 100%);
        @include flexbox();
        @include flex-direction(column);
        @include justify-content();
        @include align-items();
        @include color(#fff);
        position: relative;
        span{
          background-color: black;
          border-radius: 50%;
          padding:0 5px;
          position: absolute;
          right:25%;
          top: 10%;
          font-size: 12px;
        }
        p{
          i{
            font-size: 20px;
            color: rgb(155, 155, 155);
          }
        }
        &.router-link-exact-active {
          p{
            i{
              font-size: 24px;
              @include color(rgb(0, 0, 0));
            }
          }
        }
      }
    }
  }
}
</style>
