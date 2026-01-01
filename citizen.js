document.addEventListener("DOMContentLoaded", () => {

    let problems = JSON.parse(localStorage.getItem("problems")) || [];

    const problemList = document.getElementById("problemList");
    const totalIssuesEl = document.getElementById("totalIssues");
    const resolvedIssuesEl = document.getElementById("resolvedIssues");
    const totalVotesEl = document.getElementById("totalVotes");

    function isResolved(status) {
        return status === "completed" || status === "rejected";
    }

    function updateStats() {
        totalIssuesEl.innerText = problems.length;
        resolvedIssuesEl.innerText = problems.filter(p => isResolved(p.status)).length;
        totalVotesEl.innerText = problems.reduce((sum, p) => sum + (p.votes || 0), 0);
    }

    function renderProblems() {
        problemList.innerHTML = "";

        if (problems.length === 0) {
            problemList.innerHTML = "<p>No problems reported yet.</p>";
            return;
        }

        problems.forEach((p, index) => {
            const card = document.createElement("div");
            card.className = "problem-card";

            const imageHTML = p.image
                ? `<img src="${p.image}" alt="Issue Image" class="problem-image">`
                : "";

            card.innerHTML = `
                <h3>${p.title}</h3>
                <p>${p.description}</p>
                <p><strong>Location:</strong> ${p.location}</p>
                <p><strong>Date:</strong> ${p.date}</p>
                ${imageHTML}
                <p><strong>Status:</strong> ${p.status}</p>
                <p>
                    <strong>Votes:</strong>
                    <span id="vote-count-${index}">${p.votes || 0}</span>
                </p>
                <button onclick="voteProblem(${index})">Vote</button>
            `;

            problemList.appendChild(card);
        });
    }

    window.voteProblem = function (index) {
        problems[index].votes = (problems[index].votes || 0) + 1;
        localStorage.setItem("problems", JSON.stringify(problems));

        document.getElementById(`vote-count-${index}`).innerText = problems[index].votes;
        updateStats();
    };

    updateStats();
    renderProblems();
});
