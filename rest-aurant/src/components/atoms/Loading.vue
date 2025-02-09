<template>
    <section>
        <div class="loader">
            <div class="upper ball"></div>
            <div class="right ball"></div>
            <div class="lower ball"></div>
            <div class="left ball"></div>
        </div>
    </section>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style lang="scss" scoped>
    section {
        height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .loader {
            height: 25px;
            width: 25px;
            position: relative;
        }
    }

    .loader .ball {
        position: absolute;
        height: 25px;
        width: 25px;
        border-radius: 50%;
    }

    .loader .upper {
        left: 0;
        top: -25px;
        @include card-background($card-background);
        animation: upper 1s infinite;
    }

    @keyframes upper {
        50%, 100% {
            top: 25px;
        }
    }

    .loader .right {
        bottom: 0;
        right: -25px;
        @include card-background($card-background);
        animation: right 1s infinite;
    }

    @keyframes right {
        50%, 100% {
            right: 25px;
        }
    }

    .loader .lower {
        bottom: -25;
        right: 0;
        @include card-background($card-background);
        animation: bottom 1s infinite;
    }

    @keyframes bottom {
        50%, 100% {
            bottom: 25px;
        }
    }

    .loader .left {
        left: -25;
        bottom: 0;
        @include card-background($card-background);
        animation: left 1s infinite;
    }

    @keyframes left {
        50%, 100% {
            left: 25px;
        }
    }
</style>