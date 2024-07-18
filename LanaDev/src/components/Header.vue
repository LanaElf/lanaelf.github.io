<template>
    <div id="start" class="bg-rose-100">
        <div class="bg-rose-radial
                    flex
                    justify-center
                    items-center
                    flex-col
                    p-16
                    rounded-br-50">
            <div class="flex justify-center">
                <img class="w-72" src="/src/assets/images/angel.png">
            </div>
            <div class="flex
                        justify-center
                        text-white
                        font-semibold
                        ubuntu-mono-font
                        text-2xl
                        leading-2
                        pt-7
                        max-md:text-xl
                        flex-col
                        w-305
                        max-md:w-64 ">
                <div class="text-typing-1">
                    Привет! Меня зовут Лана.
                </div>
                <div class="text-typing-2 w-0">
                    Я - фронтенд разработчик.
                </div>
            </div>
        </div>
    </div>
    <div class="bg-rose-radial flex relative">
        <div class="w-48 h-56 bg-white absolute right-0"></div>
        <nav class="rounded-tl-50
                    rounded-br-50
                    h-28
                    max-sm:h-auto
                    max-sm:min-h-28
                    bg-rose-100
                    flex
                    flex-wrap
                    py-6
                    px-10
                    w-full
                    justify-center
                    gap-6
                    text-white
                    font-bold
                    text-lg
                    items-center
                    z-10 ">
            <a href="#skills" class="bg-rose-400 rounded-2xl px-3 py-1 hover-light">Навыки</a>
            <a href="#experience" class="bg-rose-400 rounded-2xl px-3 py-1 hover-light">Опыт</a>
            <a href="#code-example" class="bg-rose-400 rounded-2xl px-3 py-1 hover-light">Пример кода</a>
            <a href="#about-me" class="bg-rose-400 rounded-2xl px-3 py-1 hover-light">Обо мне</a>
            <a href="#contacts" class="bg-rose-400 rounded-2xl px-3 py-1 hover-light">Контакты</a>
        </nav>
    </div>

    <div class="bg-rose-100 flex">
        <div class="rounded-tl-50
                    h-24
                   bg-white
                    flex
                    w-full
                    border-solid border-b-2 border-white">
        </div>
    </div>
</template>

<style>
.bg-rose-radial {
    background-image: radial-gradient(circle, rgba(251,113,133,1) 50%, rgba(253,164,175,0.7) 100%);
}
.rounded-br-50 {
    border-bottom-right-radius: 100px;
}
.rounded-tl-50 {
    border-top-left-radius: 100px;
}
.text-typing-1,
.text-typing-2 {
    white-space:nowrap;
    overflow:hidden;
}
.text-typing-1 {
    animation: typing 2s steps(25, end) forwards, border-disappearing 2.2s steps(1, end);
}
.text-typing-2 {
    animation: border-appearing 2s steps(1, end) forwards, typing 2s steps(25, end) forwards;
    animation-delay: 2.2s;
}

.w-305 {
    width: 305px;
}

@keyframes border-disappearing {
    from { border-right: .15em solid rgba(254,205,211,1); }
    to { border-right: .15em solid rgba(254,205,211,0); }
}

@keyframes border-appearing {
    from { border-right: .15em solid rgba(254,205,211,1); }
    to { border-right: .15em solid rgba(254,205,211,1); }
}

@keyframes typing{
    from { width: 0 }
    to { width: 100% }
}

.hover-text-light {
    transition: 0.3s
}

.hover-text-light:hover {
    text-shadow: 0 0 3px #fff, 0 0 4px #fff, 0 0 5px #fff, 0 0 6px #fff, 0 0 7px #fff, 0 0 8px #fff ;
}
</style>