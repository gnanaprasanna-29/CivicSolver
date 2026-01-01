document.addEventListener("DOMContentLoaded", () => {

    let problems = JSON.parse(localStorage.getItem("problems")) || [];

    const tableBody = document.getElementById("adminProblemTable");

    const totalEl = document.getElementById("adminTotal");
    const activeEl = document.getElementById("adminActive");
    const resolvedEl = document.getElementById("adminResolved");
    const votesEl = document.getElementById("adminVotes");

    function isResolved(status) {
        return status === "completed" || status === "rejected";
    }

    function updateStats() {
        totalEl.innerText = problems.length;
        activeEl.innerText = problems.filter(p => !isResolved(p.status)).length;
        resolvedEl.innerText = problems.filter(p => isResolved(p.status)).length;
        votesEl.innerText = problems.reduce((sum, p) => sum + (p.votes || 0), 0);
    }

    function renderTable() {
        tableBody.innerHTML = "";

        if (problems.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align:center;">No issues reported yet</td>
                </tr>
            `;
            return;
        }

        problems.forEach((p, index) => {
            const row = document.createElement("tr");

            const imageCell = p.image
                ? `<img src="${p.image}" alt="Issue Image" width="60" height="40" style="object-fit:cover;">`
                : "No Image";

            row.innerHTML = `
                <td>${p.title}</td>
                <td>${p.description}</td>
                <td>${p.location}</td>
                <td>${p.date}</td>
                <td>${p.votes || 0}</td>
                <td>${imageCell}</td>
                <td>
                    <select onchange="updateStatus(${index}, this.value)">
                        <option value="pending" ${p.status === "pending" ? "selected" : ""}>Pending</option>
                        <option value="reviewing" ${p.status === "reviewing" ? "selected" : ""}>Reviewing</option>
                        <option value="completed" ${p.status === "completed" ? "selected" : ""}>Completed</option>
                        <option value="rejected" ${p.status === "rejected" ? "selected" : ""}>Rejected</option>
                    </select>
                </td>
            `;

            tableBody.appendChild(row);
        });
    }

    window.updateStatus = function(index, newStatus) {
        problems[index].status = newStatus;
        localStorage.setItem("problems", JSON.stringify(problems));
        renderTable();
        updateStats();
    };

    updateStats();
    renderTable();
});
