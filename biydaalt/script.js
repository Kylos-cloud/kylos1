/* ======================
   GLOBAL STATE
====================== */
let students = [];
let chart;

/* ======================
   LOAD SAVED DATA
====================== */
window.onload = () => {
    students = JSON.parse(localStorage.getItem("students")) || [];

    // Restore dark mode
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark");
    }

    renderTable();
    renderChart();
};

/* ======================
   SAVE HELPER
====================== */
function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}

/* ======================
   RANDOM DATA
====================== */
const randomNames = [
    "John Doe", "Jane Smith", "Michael Brown", "Emily Davis",
    "Chris Wilson", "Sarah Johnson", "David Lee", "Anna White",
    "James Miller", "Linda Taylor"
];

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ======================
   SUBJECT GENERATION
====================== */
function generateSubjects() {
    const count = subjectCount.value;
    subjectsForm.innerHTML = "";

    if (count <= 0) {
        showError("Enter a valid subject count");
        return;
    }

    clearError();

    for (let i = 0; i < count; i++) {
        subjectsForm.innerHTML += `
        <div class="row">
            <input placeholder="Subject" class="subject">
            <input type="number" placeholder="Credit" class="credit" min="1">
            <input type="number" placeholder="Score" class="score" min="0" max="100">
        </div>`;
    }
}

/* ======================
   GPA SCALE (CORRECT)
====================== */
function getGrade(score) {
    if (score >= 95) return 4.0;
    if (score >= 90) return 3.7;
    if (score >= 87) return 3.3;
    if (score >= 83) return 3.0;
    if (score >= 80) return 2.7;
    if (score >= 77) return 2.3;
    if (score >= 73) return 2.0;
    if (score >= 70) return 1.7;
    if (score >= 65) return 1.3;
    if (score >= 60) return 1.0;
    return 0.0;
}

/* ======================
   CALCULATE GPA
====================== */
function calculateGPA() {
    if (!studentName.value || !studentId.value) {
        showError("Student name and ID are required");
        return;
    }

    const credits = document.querySelectorAll(".credit");
    const scores = document.querySelectorAll(".score");

    let totalCredits = 0;
    let totalPoints = 0;

    for (let i = 0; i < scores.length; i++) {
        if (credits[i].value === "" ||scores[i].value === "" || Number(credits[i].value) <= 0 || Number(scores[i].value) < 0) {
        showError("Please enter valid credits and scores");
        return;
        }


        const c = Number(credits[i].value);
        const s = Number(scores[i].value);

        totalCredits += c;
        totalPoints += c * getGrade(s);
    }

    const gpa = Math.round((totalPoints / totalCredits) * 100) / 100;

    students.push({
        name: studentName.value,
        id: studentId.value,
        gpa: gpa.toFixed(2)
    });

    saveStudents();
    renderTable();
    renderChart();
    clearError();

    // Clear form
    subjectsForm.innerHTML = "";
    subjectCount.value = "";
    studentName.value = "";
    studentId.value = "";
}

/* ======================
   TABLE
====================== */
function renderTable() {
    studentTable.innerHTML = "";
    const searchText = search.value.toLowerCase();

    students
        .filter(s =>
            s.name.toLowerCase().includes(searchText) ||
            s.id.toLowerCase().includes(searchText)
        )
        .forEach((s, i) => {
            studentTable.innerHTML += `
            <tr>
                <td>${s.name}</td>
                <td>${s.id}</td>
                <td><strong>${s.gpa}</strong></td>
                <td>
                    <button onclick="deleteStudent(${i})">Delete</button>
                </td>
            </tr>`;
        });
}

function deleteStudent(index) {
    students.splice(index, 1);
    saveStudents();
    renderTable();
    renderChart();
}

/* ======================
   CHART
====================== */
function renderChart() {
    const ctx = document.getElementById("gpaChart");
    if (!ctx) return;

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: students.map(s => s.name),
            datasets: [{
                label: "GPA",
                data: students.map(s => s.gpa),
                backgroundColor: 'rgba(90, 103, 216, 0.8)',
                borderColor: 'rgba(90, 103, 216, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 4
                }
            }
        }
    });
}

/* ======================
   EXPORT
====================== */
function exportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Student GPA Report", 10, 10);

    students.forEach((s, i) => {
        doc.text(
            `${s.name} | ${s.id} | GPA: ${s.gpa}`,
            10,
            20 + i * 10
        );
    });

    doc.save("gpa_report.pdf");
}

function exportExcel() {
    let csv = "Name,ID,GPA\n";
    students.forEach(s => {
        csv += `${s.name},${s.id},${s.gpa}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "gpa_report.csv";
    a.click();
}

/* ======================
   DARK MODE (SAVED)
====================== */
function toggleDarkMode() {
    document.body.classList.toggle("dark");
    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark")
    );
}

/* ======================
   ERRORS
====================== */
function showError(msg) {
    errorMsg.textContent = msg;
}

function clearError() {
    errorMsg.textContent = "";
}

/* ======================
   RANDOM STUDENTS
====================== */
function generateRandomStudents(count = 5) {
    for (let i = 0; i < count; i++) {

        let subjectCount = random(3, 6);
        let totalCredits = 0;
        let totalPoints = 0;

        for (let j = 0; j < subjectCount; j++) {
            let credit = random(1, 4);
            let score = random(50, 100);

            totalCredits += credit;
            totalPoints += credit * getGrade(score);
        }

        let gpa = Math.round((totalPoints / totalCredits) * 100) / 100;

        students.push({
            name: randomNames[random(0, randomNames.length - 1)],
            id: "STU" + random(1000, 9999),
            gpa: gpa.toFixed(2)
        });
    }

    saveStudents();
    renderTable();
    renderChart();
}