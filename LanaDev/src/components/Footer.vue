<script setup>
function copy(text) {
    navigator.clipboard.writeText(text).then(function() {
        alert('Текст успешно скопирован в буфер обмена');
    }, function(err) {
        alert('Произошла ошибка при копировании текста: ', err);
    });
}
</script>
<template>
    <div class="bg-rose-radial flex">
        <div class="rounded-br-50
                    h-24
                   bg-white
                    flex
                    w-full
                    justify-center
                    gap-10
                    items-center
                    border-solid border-t-2 border-white">
        </div>
    </div>

    <div id="contacts" class="bg-white flex">
        <div class="rounded-tl-50
                   bg-rose-radial
                    flex
                    w-full
                    justify-center
                    text-white
                    font-bold
                    text-lg
                    items-center
                    flex-col
                    p-10">
            <div>Телеграм: <a href="https://t.me/elf_lana">@elf_lana</a></div>
            <div>Почта: <a href="javascript@void" @click="copy('elf_lana@vk.com')">elf_lana@vk.com</a></div>
    </div>
    </div>
</template>