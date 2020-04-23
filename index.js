const form = document.querySelector('form');
const input = document.querySelector('input');
const noteList = document.querySelector('ul');


function renderTask(taskObject) {
    const taskItem = document.createElement('li');
    const createData = document.createElement('span');
    const editInput = document.createElement('input');
    const taskItemContent = document.createElement('label');
    const taskItemBtnEdit = document.createElement('button');
    const taskItemBtnComplete = document.createElement('button');
    const taskItemBtnRemove = document.createElement('button');
    const taskItemBtnSave = document.createElement('button');
    const taskItemBtnCancel = document.createElement('button');
   
    editInput.type = 'text';

    
    createData.classList.add('dateForm');
    taskItem.classList.add('note-list__item');
    taskItemBtnEdit.classList.add('edit');
    taskItemBtnComplete.classList.add('complete');
    taskItemBtnRemove.classList.add('remove');
    taskItemBtnSave.classList.add('save');
    taskItemBtnCancel.classList.add('cancel');

    taskItemContent.innerText = taskObject.value;
    taskItemBtnEdit.innerText = 'Edit';
    taskItemBtnComplete.innerText = 'Complete';
    taskItemBtnRemove.innerText = 'Remove';
    taskItemBtnSave.innerText = 'Save';
    taskItemBtnCancel.innerText = 'Cancel';

    taskItem.setAttribute('data-id', taskObject.id);

    taskItem.appendChild(createData);
    taskItem.appendChild(editInput);
    taskItem.appendChild(taskItemContent);
    taskItem.appendChild(taskItemBtnComplete);
    taskItem.appendChild(taskItemBtnRemove);
    taskItem.appendChild(taskItemBtnEdit);
    taskItem.appendChild(taskItemBtnSave);
    taskItem.appendChild(taskItemBtnCancel);

    taskItem.querySelector('.save').hidden = true;
    taskItem.querySelector('.cancel').hidden = true;
    taskItem.querySelector('input').hidden = true;

    if (taskObject.completed) {
        taskItem.classList.add('note-list__item--completed');
        taskItemBtnEdit.disabled = true;
        taskItemBtnComplete.disabled = true;
    }
    return taskItem;
}

let taskList = [];

form.addEventListener('submit', e => {
    e.preventDefault();

    if (input.value.trim()) {
        const task = {
            value: input.value,
            completed: false,
            id: String(new Date).slice(16,24)
        };

        taskList.unshift(task);
        noteList.prepend(renderTask(task));
    }

    input.value = '';
});

function cancelEdition(elementObject) {
    elementObject.querySelector('.edit').remove();
    elementObject.querySelector('.save').remove();
    elementObject.querySelector('.cancel').remove();
  }

function showButton(elementObject) {
    elementObject.querySelector('.complete').hidden = true;
    elementObject.querySelector('.remove').hidden = true;
    elementObject.querySelector('label').hidden = true;
    elementObject.querySelector('.edit').hidden = true;
    elementObject.querySelector('.save').hidden = false;
    elementObject.querySelector('.cancel').hidden = false;
  }

noteList.addEventListener('click', e => {
    const element = e.target;
    const itemIden = currentIden => taskList.find(task => task.iden === currentIden);
    const targetClassName = element.className;
    let currentId;
    let currentIden;
 

    if (targetClassName === 'complete' || targetClassName === 'remove') {
        currentId = element.closest('li').getAttribute('data-id');
    }

    if (targetClassName === 'complete') {
        taskList.find(task => task.id === currentId).completed = true;
        itemIden(currentIden).checked = true;
        noteList.innerHTML = '';

        taskList.forEach(task => {
            noteList.append(renderTask(task));
        });

    } else if (targetClassName === 'remove') {
        noteList.innerHTML = '';

        taskList = taskList.filter(task => task.id !== currentId);

        taskList.forEach(task => {
            noteList.append(renderTask(task));
        });
    } else  if (targetClassName === 'edit' || targetClassName === 'save' || targetClassName === 'cancel') {
        
        const taskItem = element.closest('li');
        taskItem.querySelector('input').hidden = false;
        
        showButton(taskItem);
        if (element.closest('li').classList.contains('edit')) {
            itemIden(currentIden).value = element.closest('li').querySelector('input').value;
            noteList.innerHTML = '';
            taskList.forEach(task => {
                noteList.append(renderTask(task));
            });
        } else {
            element.closest('li').querySelector('input').value = itemIden(currentIden).value;
        }
        element.closest('li').classList.toggle('edit');
    }

form.addEventListener('submit', e => {
    e.preventDefault();

           
    input.value = '';
});
});