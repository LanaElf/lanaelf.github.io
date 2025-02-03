<script setup lang="ts">
//@ts-expect-error
import { usePuzzleStore } from '/src/stores/puzzle'

const puzzleStore = usePuzzleStore();

const puzzlePicturePaths: Array<string> = [];

const difficulties: Array<string> = [ 'Easy', 'Normal', 'Hard' ];

const puzzle: {
    choosenPicturePath: string,
    choosenDifficulty: string,
    containerWidth: number,
    containerHeight: number,
    rotationAngles: Array<number>,
} = {
    choosenPicturePath: '',
    choosenDifficulty: 'Easy',
    containerWidth: 0,
    containerHeight: 0,
    rotationAngles: [0, 45, 90, 135, 180, 225, 270],
};

puzzleStore.puzzle.pictures.forEach( (picture: string) => {
    puzzlePicturePaths.push(puzzleStore.puzzle.picDir+picture);
});

function choosePicture(picturePath: string) {
    puzzle.choosenPicturePath = picturePath;

    const choosenPicture = document.getElementById('choosenPicture') as HTMLElement;

    choosenPicture.innerHTML = `
        <img class="puzzle-container" src=${picturePath}>
        <div class="congrats">Победа!</div>`;

    choosenPicture.style.display = "block";

    const puzzleContainer = choosenPicture.querySelector('.puzzle-container') as HTMLElement;

    puzzle.containerWidth = puzzleContainer.offsetWidth;
    puzzle.containerHeight = puzzleContainer.offsetHeight;

    chooseDifficulty(puzzle.choosenDifficulty);
};

function chooseDifficulty(difficulty: string) {
    puzzle.choosenDifficulty = difficulty;

    const difficultyButtons: NodeListOf<HTMLElement> = document.querySelectorAll('.difficulty');

    difficultyButtons.forEach((button: HTMLElement) => {
        button.style.background = 'rgb(251 113 133)';
    })

    const choosenDifficultyEl = document.getElementById(puzzle.choosenDifficulty) as HTMLElement;

    choosenDifficultyEl.style.background = 'rgb(244 63 94)';

    if ( puzzle.choosenDifficulty && puzzle.choosenPicturePath ) {
        const difficultyOptions: {
            detailsCount: number,
            detailsInRow: number,
            detailsPosition: Array<string>,
        } = {
            detailsCount: 0,
            detailsInRow: 0,
            detailsPosition: [],
        };

        function setOptions(detailsCount: number, detailsInRow: number, detailsPosition: Array<string>) {
            difficultyOptions.detailsCount = detailsCount;
            difficultyOptions.detailsInRow = detailsInRow;
            difficultyOptions.detailsPosition = detailsPosition;
        };

        switch (difficulty) {
            case 'Easy':
                setOptions(9, 3, [
                   '0 0',
                   '50% 0',
                   '100% 0',
                   '0', '50%',
                   '100%',
                   '0 100%',
                   '50% 100%',
                   '100% 100%'
                ]);

                break;

            case 'Normal':
                setOptions(16, 4, [
                    '0 0',
                    'calc(100% / 3) 0',
                    'calc(100% / 3 *2) 0',
                    '100% 0',
                    '0 calc(100% / 3)',
                    'calc(100% / 3) calc(100% / 3)',
                    'calc(100% / 3 *2) calc(100% / 3)',
                    '100% calc(100% / 3)',
                    '0 calc(100% / 3 *2)',
                    'calc(100% / 3) calc(100% / 3 *2)',
                    'calc(100% / 3 *2) calc(100% / 3 *2)',
                    '100% calc(100% / 3 *2)',
                    '0 100%',
                    'calc(100% / 3) 100%',
                    'calc(100% / 3 *2) 100%',
                    '100% 100%',
                ]);

                break;

            case 'Hard':
                setOptions(25, 5, [
                    '0 0',
                    'calc(100% / 4) 0',
                    'calc(100% / 4 *2) 0',
                    'calc(100% / 4 *3) 0',
                    '100% 0',
                    '0 calc(100% / 4)',
                    'calc(100% / 4) calc(100% / 4)',
                    'calc(100% / 4 *2) calc(100% / 4)',
                    'calc(100% / 4 *3) calc(100% / 4)',
                    '100% calc(100% / 4)',
                    '0 calc(100% / 4*2)',
                    'calc(100% / 4) calc(100% / 4*2)',
                    'calc(100% / 4 *2) calc(100% / 4*2)',
                    'calc(100% / 4 *3) calc(100% / 4*2)',
                    '100% calc(100% / 4*2)',
                    '0 calc(100% / 4*3)',
                    'calc(100% / 4) calc(100% / 4*3)',
                    'calc(100% / 4 *2) calc(100% / 4*3)',
                    'calc(100% / 4 *3) calc(100% / 4*3)',
                    '100% calc(100% / 4*3)',
                    '0 100%',
                    'calc(100% / 4) 100%',
                    'calc(100% / 4 *2) 100%',
                    'calc(100% / 4 *3) 100%',
                    '100% 100%'
                ]);

                break;
        };

        drawPazzle(difficultyOptions);
    }

};

function drawPazzle(difficultyOptions: {
        detailsCount: number,
        detailsInRow: number,
        detailsPosition: Array<string>,
    }) {
    const container = document.createElement('div');

    container.style.width = puzzle.containerWidth+'px';
    container.style.height = puzzle.containerHeight+'px';
    container.style.marginTop = '45px';
    container.style.marginBottom = '45px';
    container.classList.add('puzzle-container');

    for (let i = 0; i < difficultyOptions.detailsPosition.length; i++) {
        const detail = document.createElement('div') as HTMLElement;

        detail.style.width = puzzle.containerWidth/difficultyOptions.detailsInRow+'px';
        detail.style.height = puzzle.containerHeight/difficultyOptions.detailsInRow+'px';
        detail.style.backgroundImage = 'url('+puzzle.choosenPicturePath+')';
        detail.style.backgroundSize = puzzle.containerWidth + 'px ' + puzzle.containerHeight + 'px';
        detail.style.backgroundPosition = difficultyOptions.detailsPosition[i];
        detail.classList.add('puzzle-detail');

        const rotationAngle = puzzle.rotationAngles[Math.floor(Math.random() * puzzle.rotationAngles.length)];

        detail.style.transform = 'rotate(' + rotationAngle + 'deg)';
        detail.dataset.number = i.toString();

        const rotationButton = document.createElement('img');

        rotationButton.src = '/src/assets/images/rotation.png';
        rotationButton.classList.add('detail-rotation-button');
        detail.appendChild(rotationButton);

        container.appendChild(detail);
    }

    const choosenPictureEl = document.getElementById('choosenPicture') as HTMLElement;
    const puzzleContainer = choosenPictureEl.querySelector('.puzzle-container') as HTMLElement;

    puzzleContainer.replaceWith(container);

    const puzzleDetails: NodeListOf<HTMLElement> = choosenPictureEl.querySelectorAll('.puzzle-detail');
    const rightRotations = new Set();
    const conrgats = choosenPictureEl.querySelector('.congrats') as HTMLElement;

    conrgats.addEventListener('click', () => {
        choosenPictureEl.style.display = 'none';
    })

    checkDetailsRotation();

    puzzleDetails.forEach((detail: HTMLElement) => {
        detail.addEventListener('click', () => {
            const newAngleArray: Array<string> = detail.style.transform.match(/\d+/) as RegExpMatchArray;
            const newAngleString: string = newAngleArray.toString();
            let newAngle: number = parseInt(newAngleString);
            newAngle += 45;
            detail.style.transform = 'rotate(' + newAngle + 'deg)';
            checkDetailsRotation();
        })
    })


    function checkDetailsRotation() {
        puzzleDetails.forEach((detail: HTMLElement) => {
            const angleArray: Array<string> = detail.style.transform.match(/\d+/) as RegExpMatchArray;
            const angleString: string = angleArray.toString();
            const angle: number = parseInt(angleString);
            const puzzleContainer = choosenPictureEl.querySelector('.puzzle-container') as HTMLElement;
            puzzleContainer.style.borderRadius = '20px';

            if (angle === 0 || angle % 360 === 0) {
                rightRotations.add(detail.dataset.number);

                if (rightRotations.size === difficultyOptions.detailsCount) {
                    rightRotations.clear();
                    puzzleContainer.style.overflow = 'hidden';
                    puzzleContainer.style.boxShadow = '0 0 20px #fff';
                    setTimeout(() => {conrgats.style.display = 'flex'}, 1500);
                }
            } else {
                conrgats.style.display = 'none';
                puzzleContainer.style.overflow = 'unset';
                puzzleContainer.style.boxShadow = 'unset';
            }

        })
    }
}


</script>

<template>
    <div class="max-lg:w-full max-lg:px-10 max-sm:px-5 flex justify-center items-center flex-col w-960 m-auto">
        <div id="skills" class="main-block text-indents">
            <div class="text-rose-400 flex justify-center font-semibold text-xl pb-5">Навыки</div>
            <div class="font-semibold text-lg">Жесткие:</div>
            <div>HTML5</div>
            <div>CSS3</div>
            <div>Адаптивная вёрстка</div>
            <div>Tailwind</div>
            <div>JavaScript</div>
            <div>TypeScript</div>
            <div>Vue</div>
            <div>Pinia</div>
            <div>Vite</div>
            <div>Git</div>
            <div>Английский язык (B1, письменный)</div>

            <div class="font-semibold text-lg mt-5">Мягкие:</div>
            <div>Работа в команде</div>
            <div>Эффективное общение</div>
            <div>Ответственность</div>
            <div>Инициативность</div>
            <div>Самодисциплина</div>
        </div>

        <div id="experience" class="main-block text-indents pt-28">
            <div class="text-rose-400 flex justify-center font-semibold text-xl pb-5">Опыт</div>

            <div class="font-semibold text-m">1 год 4 месяца коммерческого опыта</div>

            <p>
                Участвую в разработке фронтенда маркетплейса для турбизнеса и других проектов в команде, адаптивно верстаю, пишу различный функцонал на JS/TS, взаимодействую с бекендом, составляю запросы к базе данных.
            </p>
            <p>
                Написала <a class="text-violet-500 font-semibold" href="http://mlp-best-fics.cw53615.tw1.ru/" target="_blank">пет-проект</a> на Vue - небольшая библиотека тематической литературы с сортировкой по жанрам, персонажам, с несколькими темами. Он писался больше года назад, и сейчас, пожалуй, я бы оформила код иначе, но он работает. А этот сайт написан на Vue + TypeScript + Pinia + Taliwind, собран на Vite (вообще, я думаю, что Vue избыточен для такого малюсенького сайта, но писать сайт с HMR так приятно...).
            </p>
        </div>

        <div id="code-example" class="main-block text-indents pt-28">
            <div class="text-rose-400 flex justify-center font-semibold text-xl pb-5">Пример кода</div>
            <p>
                Для демонстрации некоторых моих навыков я написала мини-игру.
            </p>
            <p>
                Выбранная картинка "делится" на количество частей, зависимое от выбранной сложности. Детали представляют собой блоки с бэкграундом-выбранной картинкой, спозиционированным в зависимости от расположения детали, повернутые на рандомный угол (с шагом в 45 градусов). Нужно вращать детали, пока картинка не соберется.
            </p>

            <p class="text-center">
                А чтобы получить ссылку на код этого сайта на GitHub - нужно выиграть.
                <br>Шутка. Вот <a href="https://github.com/LanaElf/lanaelf.github.io/tree/main/LanaDev" target="_blank" class="text-violet-600 font-semibold">ссылка</a>.
            </p>

            <div class="bg-rose-100 p-10 max-md:p-5 max-sm:p-3 my-10 rounded-2xl w-full flex flex-col items-center relative">
                <div class="flex justify-center text-lg font-semibold pb-5">Выбери картинку</div>
                <div class="w-full overflow-x-auto relative h-40 max-sm:h-auto rose-scrollbar">
                    <ul class="flex max-sm:flex-wrap gap-3 justify-center pictures-container absolute max-sm:relative" id="array-rendering">
                        <li v-for="picturePath in puzzlePicturePaths">
                            <img @click=choosePicture(picturePath) :src=picturePath class="rounded-2xl max-w-32 max-h-32 cursor-pointer">
                        </li>
                    </ul>
                </div>
                <div class="flex justify-center text-lg font-semibold mt-10 pb-5">Выбери уровень сложности</div>
                <div class="flex gap-5">
                    <button v-for="difficulty in difficulties"
                            class="bg-rose-400 text-white font-semibold rounded-2xl py-1 px-3 hover-up relative difficulty" :id=difficulty
                            @click=chooseDifficulty(difficulty)>
                        {{ difficulty }}
                    </button>
                </div>
                <div id="choosenPicture" class="rounded-2xl mt-10 relative"></div>

            </div>
        </div>

        <div id="about-me" class="main-block text-indents pt-28">
            <div class="text-rose-400 flex justify-center font-semibold text-xl pb-5">Обо мне</div>
            <p>
                Я получила высшее образование в Финансовом Универститете при Правительстве РФ по направлению "менеджмент и маркетинг".
                Это было интересно, я узнала как работает бизнес и рынок.
                Но я не чувствовала к этой сфере того, что называется "душа лежит".
                Позже ко мне пришло увлечение программированием.
            </p>

            <p>
                На 4-м курсе во время стажировки в студии рекламы мне попалась задача - создать макет сайта. Хотя это была задача скорее по дизайну и проектированию UI, но все же, из всех задач, что мне прежде встречались,
                она оказалась для меня самой интересной. Мне нравилось думать о том, каким должен быть сайт и почему он должен быть именно таким.
            </p>
            <p>
                Я начала изучать фронтенд, сделала несколько заказов на фрилансе, около 4х месяцев поработала в штате интернет-магазина. Затем стала мамой и в развитии профессиональных навыков пришлось сделать перерыв. Когда дочь подросла - я снова погрузилась во фронтенд.
            </p>
            <p>
                Последний год работаю в веб-студии. Активно участвую в разработке маркетплейса для туристического бизнеса и других проектов.
            </p>
            <p>
                Написала пару вещей на Vue (этот сайт и <a class="text-violet-500 font-semibold" href="http://mlp-best-fics.cw53615.tw1.ru/" target="_blank">еще один</a>). Очень люблю писать код, изучаю новые технологии во фронтенде и стремлюсь добиться высокого уровня профессионализма, включая и хард-, и софт-скиллы.
            </p>
        </div>
    </div>
</template>

<style>
.text-indents p {
    text-indent: 3em;
}
.main-block {
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
    flex-direction: column;
    font-size: 16px;
    color: #525252;
    font-family: "Ubuntu Mono", monospace;
}
.hover-up:hover {
    box-shadow: 0 5px 5px #ccc;
    bottom: 5px;
}
.puzzle-container {
    display: flex;
    flex-wrap: wrap;
    max-height: 500px;
}
.puzzle-detail {
    cursor: grab;
    position: relative;
}
.detail-rotation-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    filter: invert() drop-shadow(0 0 3px rgb(251 113 133)) drop-shadow(0 0 4px rgb(251 113 133)) drop-shadow(0 0 5px rgb(251 113 133));
    opacity: 0;
    transition: 0.3s;
    cursor: pointer;
}
.puzzle-detail:hover .detail-rotation-button {
    opacity: 1;
}
.activeDifficulty {
    background-color: rgb(244 63 94);
}
.pictures-container {
    max-height: 250px;
    overflow-y: auto;
    scrollbar-color: rgb(251 113 133) #fff;
    scrollbar-width: thin;
}
.rose-scrollbar {
    scrollbar-color: rgb(251 113 133) #fff;
    scrollbar-width: thin;
}
.w-960 {
    width: 960px;
}
.congrats {
    display: none;
    background: url('/src/assets/images/heart.png');
    background-size: contain;
    color: #fff;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    cursor: pointer;
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: .5s ease-in 0s infinite alternate congrats;
    filter: drop-shadow(0 0 10px #fff) drop-shadow(0 0 5px rgb(251 113 133));

}

@keyframes congrats{
    from {
        width: 100px;
        height: 100px;
    }

    to {
        width: 130px;
        height: 130px;
    }
}
</style>