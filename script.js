document.addEventListener('DOMContentLoaded', function() {  

    //access elements
    const addNotesBtn = document.getElementById('add-btn');
    const addNoteInput = document.getElementById('add-task');

    //click event listner on + button
    addNotesBtn.addEventListener("click", ()=>{
        let noteAdded = addNoteInput.value;
        if (noteAdded==''){
            alert('No task is added ')
        }else{
            addNote(noteAdded);
            addNoteInput.value = '';
        }        
    })

    //adding note to UI
    function addNote(note){
        
        const mainDiv = document.getElementById('new-tasks');

        const divInner = document.createElement('div');
        const inputField1 = document.createElement('input');        
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        divInner.id = "innerdiv";
        inputField1.class = 'addednote';
        inputField1.id = 'addednoteid';
        inputField1.value = note;
        inputField1.disabled = true;
        editBtn.class = 'editnote';
        deleteBtn.class = 'deletenote';

        let textNode = document.createTextNode(note);
        inputField1.appendChild(textNode);

        editBtn.appendChild(document.createTextNode("edit"));
        deleteBtn.appendChild(document.createTextNode("delete"));

        divInner.appendChild(inputField1);        
        divInner.appendChild(editBtn);
        divInner.appendChild(deleteBtn);

        mainDiv.appendChild(divInner);
    }

    //deleting and editing note
    let parentDiv = document.getElementById('new-tasks');
    parentDiv.addEventListener("click",modifyNote)

    function modifyNote(e){
        if(e.target.class == 'deletenote'){

            const div = e.target.parentElement;
            let value = div.firstChild.value;
            parentDiv.removeChild(div);

        }
        if(e.target.class == 'editnote'){
            console.log('edit')
            const div = e.target.parentElement;

            if(div.firstChild.disabled){
                div.firstChild.disabled = false;
            }

            let newValue = div.firstChild.value;
            console.log(newValue);

            let innerDiv = document.getElementById('innerdiv');
            let confirmBtn = document.createElement("button");
            confirmBtn.appendChild(document.createTextNode("confirm edit"))
            innerDiv.appendChild(confirmBtn);

            confirmBtn.addEventListener("click",()=>{
                div.firstChild.disabled = true;
                innerDiv.removeChild(confirmBtn);
            })
        }           
    }

    window.addEventListener("load",()=>{
        // displaySavedNotes();
    })
})

