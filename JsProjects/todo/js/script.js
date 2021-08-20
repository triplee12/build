const addBtn = document.getElementById('add');

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){
    notes.forEach(note => {
        addNewNote(note);
    });
}

addBtn.addEventListener('click', () => {
    addNewNote();
});

function addNewNote(text = '') {
    const note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `
        <div class="tools">
            <button class="edit">
                <i class="fa fa-edit"></i>
            </button>
            <button class="delete">
                <i class="fa fa-trash"></i>
            </button>
        </div>
        <div class="main ${text ? '' : 'hidden'}"></div>
        <textarea class="${text ? 'hidden' : ''}"></textarea>
    `;

    
    const editBtn = note.querySelector('.edit');
    const delBtn = note.querySelector('.delete');

    const mainEl = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    textArea.value = text;
    textArea.innerHTML = marked(text);

    editBtn.addEventListener('click', () => {
        mainEl.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    delBtn.addEventListener('click', () => {
        note.remove();
        updateLS();
    });

    textArea.addEventListener('input', (e) => {
        const { value } = e.target;

        mainEl.innerHTML = marked(value);

        updateLS();
    });

    document.body.appendChild(note);
}

function updateLS() {
    const noteText = document.querySelectorAll('textarea');
    
    const notes = [];

    noteText.forEach(note => {
        notes.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}