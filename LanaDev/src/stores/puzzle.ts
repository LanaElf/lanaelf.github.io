import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

export const usePuzzleStore: any = defineStore('puzzle', () => {
    const puzzle: Ref<{picDir: string, pictures: Array<string>}> = ref({
        picDir: '/src/assets/images/puzzlePictures/',
        pictures: [
            'Adorable.gif',
            'angel.jpg',
            'human.jpg',
            'cute.gif',
            'IMG_20220917_013847_364.jpg',
            'IMG_20220925_093947_641.jpg',
            'IMG_20230324_115237_951.jpg',
            'IMG_20230705_163405_155.jpg',
            'IMG_20230808_135702_684.jpg',
            'IMG_20230808_135834_626.jpg',
            'IMG_20230913_102818_147.jpg',
            'IMG_20230926_204716_810.jpg',
            'IMG_20240318_095558_229.jpg',
            'IMG_20240424_013619_702.jpg',
            'bezzubik.png',
            'kartina-maslom-more-schastya.jpg',
            'kenji-yamamura-photographer-5756.jpg',
            'kinkade-maui-gardens.jpg',
            'kinkade.jpg',
            'lyra.jpg',
            'scale_1200.jpeg',
            'Spring.jpeg',
            'tumblr.gif',
        ]
    });

    return {
        puzzle
    };
});
