

const showSpinner = (status) => {
    if (status) {
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('word-sec').classList.add('hidden')
    }
    else {
        document.getElementById('word-sec').classList.remove('hidden')
        document.getElementById('spinner').classList.add('hidden');
    }
}

const showSpinnerModelBox = (status) => {
    if (status) {
        document.getElementById('spinner2').classList.remove('hidden');
        document.getElementById('total-model-box').classList.add('hidden')
    }
    else {
        document.getElementById('total-model-box').classList.remove('hidden')
        document.getElementById('spinner2').classList.add('hidden');
    }
}




fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(data => lessonsArray(data.data));


let prev_btn = 0;
const lessonsArray = (data) => {
    const lessonSec = document.getElementById('lesson-list');
    lessonSec.innerHTML = '';
    data.forEach(element => {
        const lesson = document.createElement('div');
        lesson.innerHTML = `
                    <button id="${element.level_no}" onclick = "lesson_btn(${element.level_no})" class="btn btn-outline btn-primary">
                        <i class="fa-solid fa-book-open-reader"></i>
                        Lesson-${element.level_no}
                    </button>
        `
        lessonSec.appendChild(lesson);
    });
}


const lesson_btn = (btn_no) => {
    if (prev_btn !== 0) {
        const prev_btn_color = document.getElementById(`${prev_btn}`);
        prev_btn_color.classList.remove('btn-solid')
        prev_btn_color.classList.add('btn-outline')
    }
    prev_btn = btn_no;
    const btnColor = document.getElementById(`${btn_no}`);
    btnColor.classList.remove('btn-outline');
    btnColor.classList.add('btn-solid');
    showSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/level/${btn_no}`)
        .then(res => res.json())
        .then(data => loadData(data.data))


    const wordSec = document.getElementById('word-sec');
    wordSec.innerHTML = '';
    loadData = (data) => {

        if (data.length == 0) {
            const showMsg = document.createElement('div');
            showMsg.classList.add("col-span-full");
            showMsg.innerHTML = `
            <div class="mx-auto">
                 <img class= "mx-auto" src="./assets/alert-error.png" alt="">
                 <p class="bangla_font text-center my-5">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                 <h1 class="bangla_font text-center text-4xl font-bold">নেক্সট Lesson এ যান</h1>
            </div>
            `
            wordSec.appendChild(showMsg);
            showSpinner(false);
        }
        else {
            data.forEach(element => {
                const wordDiv = document.createElement('div');
                wordDiv.innerHTML = `
               <div class="card bg-base-100 shadow-sm h-full">
                    <div class="card-body">
                        <h1 class="text-center font-bold text-[1.2rem]">${element.word ? element.word : "Not Found"}</h1>
                        <p class="text-center my-[16px] text-[0.8rem]">Meaning /Pronounciation</p>
                        <h1 class="text-center bangla_font  text-[1.1rem]">${element.meaning ? element.meaning : "Not Found"}/ ${element.pronunciation ? element.pronunciation : "Not Found"}</h1>
                        <div class="card-actions justify-between mt-[20px] px-3">

                        <button id = "word-btn-id" onclick="word_details_btn(${element.id})" class ="btn">
                           <i class="fa-solid fa-circle-info"></i>
                        </button>
                         <button class="btn">
                            <i class="fa-solid fa-volume-high"></i>
                         </button> 
                          
                        </div>
                    </div>
                </div>
            `
                wordSec.appendChild(wordDiv);
                showSpinner(false);
            })
        }

    }

}

const word_details_btn = (cardId) => {

  
    fetch(`https://openapi.programming-hero.com/api/word/${cardId}`)
        .then(res => res.json())
        .then(data => LoadedData(data.data));
    const LoadedData = (obj) => {
     
        const modalOutsideDiv = document.getElementById('modal-outside-div');
        const modalBox = document.createElement('div');
        modalBox.innerHTML = ''
        modalBox.classList.add('modal-box');
        modalBox.innerHTML = `
                <div id = "total-model-box"> 
                    <div>
                        <h1 class="text-2xl font-bold">${obj.word ? obj.word : 'Not Found'} (<i
                                class="fa-solid fa-microphone-lines"></i>:${obj.pronunciation ? obj.pronunciation: 'Not Found'})</h1>
                        <div class="my-5">
                            <h1 class="mb-2 font-semibold">Meaning</h1>
                            <p class="bangla_font">${obj.meaning ? obj.meaning : 'Not Found'}</p>
                        </div>

                         <div class="my-5">
                            <h1 class="mb-2 font-semibold">Example</h1>
                            <p>${obj.sentence ? obj.sentence : "Not Found"}</p>
                        </div>

                        <div id = "synonyms-sec">
                            <h1 class="bangla_font mb-2 font-semibold">সমার্থক শব্দ গুলো</h1>
                        </div>
                    </div>

                    <div class="mt-5">
                        <label for="my_modal_6" class="btn btn-primary rounded-[10px]">Complete Learning</label>
                    </div>
                </div>
        `


        const synonymsSec = modalBox.querySelector('#synonyms-sec');
        const synonyms = obj.synonyms;
        if (synonyms.length == 0) {
            const btn = document.createElement('button');
            btn.innerText = 'Not Found';
            synonymsSec.appendChild(btn);
        }
        else {
            const synonymsDiv = document.createElement('div');
            synonymsDiv.classList.add("flex", "flex-wrap", "gap-2");
            synonyms.forEach(element => {
                const Btn = document.createElement('button');
                Btn.classList.add('btn');
                Btn.innerText = element;
                synonymsDiv.appendChild(Btn);
            })
            synonymsSec.append(synonymsDiv);
        }
        modalOutsideDiv.appendChild(modalBox);
        showSpinnerModelBox(false)

    }
    document.getElementById('my_modal_6').checked = true;

}







