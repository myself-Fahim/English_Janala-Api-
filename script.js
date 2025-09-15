
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
    if(prev_btn !== 0) {
        const prev_btn_color = document.getElementById(`${prev_btn}`);
        prev_btn_color.classList.remove('btn-solid')
        prev_btn_color.classList.add('btn-outline')
    }
    prev_btn = btn_no;
    const btnColor = document.getElementById(`${btn_no}`);
    btnColor.classList.remove('btn-outline');
    btnColor.classList.add('btn-solid');
    fetch(`https://openapi.programming-hero.com/api/level/${btn_no}`)
        .then(res => res.json())
        .then(data => loadData(data.data))


    const wordSec = document.getElementById('word-sec');
    loadData = (data) => {
        wordSec.innerHTML = '';
        data.forEach(element => {
            const wordDiv = document.createElement('div');
            wordDiv.innerHTML=`
               <div class="card bg-base-100 shadow-sm h-full">
                    <div class="card-body">
                        <h1 class="text-center font-bold text-[1.2rem]">${element.word}</h1>
                        <p class="text-center my-[16px] text-[0.8rem]">Meaning /Pronounciation</p>
                        <h1 class="text-center bangla_font  text-[1.1rem]">${element.meaning}/ ${element.pronunciation}</h1>
                        <div class="card-actions justify-between mt-[20px] px-3">
                          <i class="fa-solid fa-circle-info"></i>
                          <i class="fa-solid fa-volume-high"></i>
                        </div>
                    </div>
                </div>
            `
            wordSec.appendChild(wordDiv);
        })
    }

}



