import axios from 'https://cdn.jsdelivr.net/npm/axios@1.5.1/+esm'
document.addEventListener('DOMContentLoaded', function() { 
       
    //post data into crudcrud
    async function postData(data){
        try {
            let response = await axios.post('https://crudcrud.com/api/c50c9920afd14c1a9c2af15377ec5dbf/notes',{note:data});
            console.log(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    async function getSingleEntry(note){
        try {
            let response = await axios.get('https://crudcrud.com/api/c50c9920afd14c1a9c2af15377ec5dbf/notes');
            const matchingId = response.data.find(item => item.note === note);
            return matchingId._id;
            
        } catch (error) {
            console.log(error);
        }
    }

    //delete from crudcrud
    async function deleteData(note){
        let id = await getSingleEntry(note);
        try {
            let response = await axios.delete(`https://crudcrud.com/api/c50c9920afd14c1a9c2af15377ec5dbf/notes/${id}`);
            console.log(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    //edit(put)
    async function editData(id,newNote){

        try {
            let response = await axios.patch(`https://crudcrud.com/api/c50c9920afd14c1a9c2af15377ec5dbf/notes/${id}`,{note:newNote})
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    //access elements
    const addNotesBtn = document.getElementById('add-btn');
    const addNoteInput = document.getElementById('add-task');

    //click event listner on + button
    addNotesBtn.addEventListener("click",async ()=>{
        let noteAdded = addNoteInput.value;
        if (noteAdded==''){
            alert('No task is added ')
        }else{
            await postData(noteAdded);
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

    async function modifyNote(e){
        if(e.target.class == 'deletenote'){

            const div = e.target.parentElement;
            let value = div.firstChild.value;
            await deleteData(value);
            parentDiv.removeChild(div);

        }
        if(e.target.class == 'editnote'){
            const div = e.target.parentElement;

            let id = await getSingleEntry(div.firstChild.value);

            if(div.firstChild.disabled){
                div.firstChild.disabled = false;
            }

            let newValue = div.firstChild.value;
            console.log(newValue);

            let innerDiv = document.getElementById('innerdiv');
            let confirmBtn = document.createElement("button");
            confirmBtn.appendChild(document.createTextNode("confirm edit"))
            innerDiv.appendChild(confirmBtn);

            confirmBtn.addEventListener("click",async()=>{
                div.firstChild.disabled = true;
                await editData(id,div.firstChild.value);
                innerDiv.removeChild(confirmBtn);
            })
        }           
    }

    //get all saved notes from crudcrud backend
    async function displaySavedNotes(){
        try {
            let response = await axios.get('https://crudcrud.com/api/c50c9920afd14c1a9c2af15377ec5dbf/notes');
            let length = Object.keys(response.data).length;
            
            for(let i=0;i<length;i++){
                let noteData = response.data[i].note;
                addNote(noteData);
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    window.addEventListener("load",()=>{
        displaySavedNotes();
    })
})

