let members = [];
let tasks = [];

// Fungsi untuk menambahkan anggota
function addMember() {
    const memberInput = document.getElementById('memberInput');
    const memberName = memberInput.value.trim();
    if (memberName !== '') {
        members.push(memberName);
        updateMemberSelects();
        displayMembers();
        memberInput.value = '';
    }
}

// Fungsi untuk memperbarui daftar anggota di dropdown
function updateMemberSelects() {
    const memberSelectAddTask = document.getElementById('memberSelectAddTask');
    const memberSelectListTask = document.getElementById('memberSelectListTask');
    
    memberSelectAddTask.innerHTML = '<option value="">Select Member</option>';
    memberSelectListTask.innerHTML = '<option value="">Select Member</option>';
    
    members.forEach((member, index) => {
        const option = `<option value="${index}">${member}</option>`;
        memberSelectAddTask.innerHTML += option;
        memberSelectListTask.innerHTML += option;
    });
}

// Fungsi untuk menampilkan daftar anggota
function displayMembers() {
    const memberList = document.getElementById('memberList');
    memberList.innerHTML = members.map((member, index) => `
        <tr>
            <td class="py-2 px-4 border">${index + 1}</td>
            <td class="py-2 px-4 border">${member}</td>
            <td class="py-2 px-4 border">
                <button onclick="editMember(${index})" class="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-400">Edit</button>
                <button onclick="deleteMember(${index})" class="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-400 ml-2">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Fungsi untuk mengedit anggota
function editMember(index) {
    const newMemberName = prompt('Enter new member name:', members[index]);
    if (newMemberName !== null && newMemberName.trim() !== '') {
        members[index] = newMemberName.trim();
        updateMemberSelects();
        displayMembers();
    }
}

// Fungsi untuk menghapus anggota
function deleteMember(index) {
    if (confirm('Are you sure you want to delete this member?')) {
        members.splice(index, 1);
        updateMemberSelects();
        displayMembers();
    }
}

// Fungsi untuk menambahkan tugas
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const memberSelect = document.getElementById('memberSelectAddTask');
    const taskName = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const memberIndex = memberSelect.value;
    
    if (taskName !== '' && dueDate !== '' && memberIndex !== '') {
        tasks.push({ memberIndex, taskName, dueDate, completed: false });
        taskInput.value = '';
        dueDateInput.value = '';
        displayTasks();
    }
}

// Fungsi untuk menampilkan tugas
function displayTasks() {
    const taskList = document.getElementById('taskList');
    const selectedMemberIndex = document.getElementById('memberSelectListTask').value;
    
    if (selectedMemberIndex !== '') {
        let memberTasks = tasks.filter(task => task.memberIndex === selectedMemberIndex);
        
        memberTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        
        taskList.innerHTML = memberTasks.map((task, index) => `
            <tr>
                <td class="py-2 px-4 border">${index + 1}</td>
                <td class="py-2 px-4 border">${task.taskName}</td>
                <td class="py-2 px-4 border">${task.dueDate}</td>
                <td class="py-2 px-4 border text-center">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskStatus(${tasks.indexOf(task)})" class="form-checkbox h-5 w-5 text-blue-600">
                    <span class="${task.completed ? 'text-green-600' : 'text-gray-600'} ml-2">${task.completed ? 'Completed' : 'Pending'}</span>
                </td>
                <td class="py-2 px-4 border">
                    <button onclick="editTask(${tasks.indexOf(task)})" class="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-400">Edit</button>
                    <button onclick="deleteTask(${tasks.indexOf(task)})" class="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-400 ml-2">Delete</button>
                </td>
            </tr>
        `).join('');
    } else {
        taskList.innerHTML = '';
    }
}

// Fungsi untuk mengubah status tugas
function toggleTaskStatus(taskIndex) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    displayTasks();
}

// Fungsi untuk mengedit tugas
function editTask(taskIndex) {
    const task = tasks[taskIndex];
    const newTaskName = prompt('Enter new task name:', task.taskName);
    const newDueDate = prompt('Enter new due date (YYYY-MM-DD):', task.dueDate);
    
    if (newTaskName !== null && newDueDate !== null) {
        task.taskName = newTaskName.trim();
        task.dueDate = newDueDate.trim();
        displayTasks();
    }
}

// Fungsi untuk menghapus tugas
function deleteTask(taskIndex) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(taskIndex, 1);
        displayTasks();
    }
}

// Fungsi untuk menampilkan section yang aktif
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    const activeSection = document.getElementById(sectionId);
    activeSection.style.display = 'block';
    setTimeout(() => {
        activeSection.classList.add('active');
    }, 10);
}

// Inisialisasi tampilan section saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('nav').classList.add('active');
    showSection('listMember');
});
