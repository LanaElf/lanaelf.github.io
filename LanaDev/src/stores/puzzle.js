import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePuzzleStore = defineStore('puzzle', () => {
    const puzzle = ref({
        picDir: '/src/assets/images/puzzlePictures/',
        pictures: [
            'angel.jpg',
            'human.jpg',
            'lyra.jpg',
            'bezzubik.png',
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
            'kartina-maslom-more-schastya.jpg',
            'kenji-yamamura-photographer-5756.jpg',
            'kinkade-maui-gardens.jpg',
            'kinkade.jpg',
            'scale_1200.jpeg',
            'Spring.jpeg',
            'tumblr.gif',
        ]
    });

    const getRandomPicture = () => {
        return puzzle.pictures[Math.floor(Math.random() * puzzle.pictures.length)];
    };

    return {
        puzzle,
        getRandomPicture
    };
});
//{
//    state: () => {
//        return {
//            pictures: [
//                {path: '@/assets/images/angel.png'}
//            ]
//        }
//    },
//    actions: {
//        getRandomPicture() {
//            const randomIndex = Math.floor(Math.random() * array.length);
//            return this.state.pictures[randomIndex];
//        }
//    }
//}