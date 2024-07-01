<script setup>
import { usePuzzleStore } from '/src/stores/puzzle'

const puzzleStore = usePuzzleStore();

const puzzlePicturePaths = [];

const difficulties = [ 'Easy', 'Normal', 'Hard' ];

const puzzle = {
    choosenPicturePath: '',
    choosenDifficulty: 'Easy',
    containerWidth: 0,
    containerHeight: 0,
    rotationAngles: [0, 45, 90, 135, 180, 225, 270],
};

puzzleStore.puzzle.pictures.forEach( (picture) => {
    puzzlePicturePaths.push(puzzleStore.puzzle.picDir+picture);
});

function choosePicture(picturePath) {
    puzzle.choosenPicturePath = picturePath;
    const choosenPicture = document.getElementById('choosenPicture');

    choosenPicture.innerHTML = `
        <img class="puzzle-container" src=${picturePath}>
        <div class="congrats">Победа!</div>`;

    choosenPicture.style.display = "block";

    puzzle.containerWidth = document.querySelector('.puzzle-container').offsetWidth;
    puzzle.containerHeight = document.querySelector('.puzzle-container').offsetHeight;

    chooseDifficulty(puzzle.choosenDifficulty);
};

function chooseDifficulty(difficulty) {
    puzzle.choosenDifficulty = difficulty;

    document.querySelectorAll('.difficulty').forEach((button) => {
            button.style.background = 'rgb(251 113 133)';
        })

    document.getElementById(puzzle.choosenDifficulty).style.background = 'rgb(244 63 94)';

    if ( puzzle.choosenDifficulty && puzzle.choosenPicturePath ) {
        const difficultyOptions = {
            detailsCount: 0,
            detailsInRow: 0,
            detailsPosition: [],
        };

        function setOptions(detailsCount, detailsInRow, detailsPosition) {
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

function drawPazzle(difficultyOptions) {
    const container = document.createElement('div');
    container.style.width = puzzle.containerWidth+'px';
    container.style.height = puzzle.containerHeight+'px';
    container.style.marginTop = '45px';
    container.style.marginBottom = '45px';
    container.classList.add('puzzle-container');

    for (let i = 0; i < difficultyOptions.detailsPosition.length; i++) {
        const detail = document.createElement('div');
        detail.style.width = puzzle.containerWidth/difficultyOptions.detailsInRow+'px';
        detail.style.height = puzzle.containerHeight/difficultyOptions.detailsInRow+'px';
        detail.style.backgroundImage = 'url('+puzzle.choosenPicturePath+')';
        detail.style.backgroundSize = puzzle.containerWidth + 'px ' + puzzle.containerHeight + 'px';
        detail.style.backgroundPosition = difficultyOptions.detailsPosition[i];
        detail.classList.add('puzzle-detail');

        const rotationAngle = puzzle.rotationAngles[Math.floor(Math.random() * puzzle.rotationAngles.length)];
        detail.style.transform = 'rotate(' + rotationAngle + 'deg)';
        detail.dataset.number = [i];

        const rotationButton = document.createElement('img');
        rotationButton.src = '/src/assets/images/rotation.png';
        rotationButton.classList.add('detail-rotation-button');
        detail.appendChild(rotationButton);

        container.appendChild(detail);
    }

    const choosenPictureEl = document.getElementById('choosenPicture');
    choosenPictureEl.querySelector('.puzzle-container').replaceWith(container);

    const puzzleDetails = choosenPictureEl.querySelectorAll('.puzzle-detail');
    const rightRotations = new Set();
    const conrgats = choosenPictureEl.querySelector('.congrats')
    conrgats.addEventListener('click', () => {
        choosenPictureEl.style.display = 'none';
    })

    checkDetailsRotation();

    puzzleDetails.forEach((detail) => {
        detail.addEventListener('click', (evt) => {
            let newAngle = parseInt(detail.style.transform.match(/\d+/))
            newAngle += 45
            detail.style.transform = 'rotate(' + newAngle + 'deg)';
            checkDetailsRotation();
        })
    })


    function checkDetailsRotation() {
        puzzleDetails.forEach((detail) => {
            const angle = parseInt(detail.style.transform.match(/\d+/));
            const puzzleContainer = choosenPictureEl.querySelector('.puzzle-container');
            puzzleContainer.style.borderRadius = '20px';

            if (angle === 0 || angle % 360 === 0) {
                rightRotations.add(detail.dataset.number);

                if (rightRotations.size === difficultyOptions.detailsCount) {
                    console.log(rightRotations.size);

                    rightRotations.clear();
                    conrgats.style.display = 'flex';
                    puzzleContainer.style.overflow = 'hidden';
                    puzzleContainer.style.boxShadow = '(0 0 20px #fff)';
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
            <div>Английский язык (B2, письменный)</div>

            <div class="font-semibold text-lg mt-5">Мягкие:</div>
            <div>Работа в команде</div>
            <div>Эффективное общение</div>
            <div>Ответственность</div>
            <div>Инициативность</div>
            <div>Самодисциплина</div>
        </div>

        <div id="expirience" class="main-block text-indents pt-28">
            <div class="text-rose-400 flex justify-center font-semibold text-xl pb-5">Опыт</div>
                <div class="font-semibold text-m">~ 1 год коммерческого опыта</div>
                <p>Участвовала в разработке маркетплейса и других проектов в команде, верстала, писала различный функцонал на JS, в том числе библиотеки и модули, составляла запросы к базе данных.</p>
                <p>Написала небольшой <a class="text-violet-500 font-semibold" href="http://snowpitytime.cw53615.tw1.ru/">пет-проект</a> на Vue. А этот сайт написан на Vue + TS + Pinia + Taliwind за выходные, собран на Vite (в том числе - ради опыта работы с этими инструментами, ну и разрабатывать на Vue c HMR просто приятно).
            </p>
        </div>

        <div id="code-example" class="main-block text-indents pt-28">
            <div class="text-rose-400 flex justify-center font-semibold text-xl pb-5 ">Пример кода</div>

            <p>
                В качестве демонстрации некоторых моих навыков я решила написать мини-игру. Выбранная картинка "делится" на количество частей, зависимое от выбранной сложности. Детали представляют собой блоки с бэкграундом-выбранной картинкой, спозиционированным в зависимости от расположения детали, повернутые на рандомный угол (с шагом в 45 градусов). Нужно вращать детали, пока картинка не соберется.
            </p>

            <p class="text-center">
                А чтобы получить ссылку на код этого сайта на GitHub - нужно выиграть
                <br>(шутка, вот <a href="" class="text-violet-600 font-semibold">ссылка</a>)
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
                Я получила высшее образование в Финансовом Универститет при Правительстве РФ по направлению "менеджмент и маркетинг".
                Это было интересно, я узнала как работает бизнес и рынок.
                Но это не было той сферой, в которую мне бы хотелось грубоко погрузиться.
                Увлечение программированием пришло позже.
            </p>

            <p>
                На 4-м курсе во время стажировки в студии рекламы мне попалась задача - создать макет сайта. Хотя это была задача скорее по дизайну и проектированию UI, но все же, из всех задач, что мне прежде встречались,
                она оказалась для меня самой интересной. Мне нравилось думать о том, каким должен быть сайт и почему он должен быть именно таким.
            </p>
            <p>
                Я начала изучать фронтенд, сделала несколько заказов на фрилансе, около 4х месяцев поработала в штате интернет-магазина. Затем стала мамой и в развитии профессиональных навыков пришлось сделать перерыв. Когда дочь подросла - я снова погрузилась во фронтенд.
            </p>
            <p>
                Последние 9 месяцев работаю в веб-студии. Участвую в разработке маркетплейса для туристического бизнеса и других проектов.
            </p>
            <p>
                В свое удовольствие написала пару вещей на Vue (этот сайт и <a class="text-violet-500 font-semibold" href="http://snowpitytime.cw53615.tw1.ru/">еще один</a>). Очень люблю писать код, изучаю новые технологии во фронтенде и стремлюсь добиться высокого уровня профессионализма, включая и хард-, и софт-скиллы.
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
    font-size: 20px;
    cursor: pointer;
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: 0.5s ease-in 0s infinite alternate congrats;
    filter: drop-shadow(0 0 10px #fff) drop-shadow(0 0 5px rgb(251 113 133));

}

@keyframes congrats{
    from {
        width: 120px;
        height: 120px;
    }

    to {
        width: 150px;
        height: 150px;
    }
}
</style>