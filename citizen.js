const issues = [
    { status: "active", votes: 97 },
    { status: "resolved", votes: 96 },
    { status: "active", votes: 94 },
    { status: "resolved", votes: 45 }
];

const totalIssues = issues.length;
const resolvedIssues = issues.filter(issue => issue.status === "resolved").length;
const totalVotes = issues.reduce((sum, issue) => sum + issue.votes, 0);

document.getElementById("totalIssues").innerText = totalIssues;
document.getElementById("resolvedIssues").innerText = resolvedIssues;
document.getElementById("totalVotes").innerText = totalVotes;


document.addEventListener("DOMContentLoaded", () => {
    const problems = JSON.parse(localStorage.getItem("problems")) || [];

    const problemList = document.getElementById("problemList");
    const totalIssues = document.getElementById("totalIssues");
    const resolvedIssues = document.getElementById("resolvedIssues");
    const totalVotes = document.getElementById("totalVotes");

    totalIssues.innerText = problems.length;
    resolvedIssues.innerText = problems.filter(p => p.status === "resolved").length;
    totalVotes.innerText = problems.reduce((sum, p) => sum + p.votes, 0);

    problemList.innerHTML = "";

    if (problems.length === 0) {
        problemList.innerHTML = "<p>No problems reported yet.</p>";
        return;
    }

    problems.forEach((p, index) => {
        const card = document.createElement("div");
        card.className = "problem-card";

        card.innerHTML = `
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <p><strong>Location:</strong> ${p.location}</p>
            <p><strong>Date:</strong> ${p.date}</p>
            <p><strong>Status:</strong> ${p.status}</p>
            <p><strong>Votes:</strong> ${p.votes}</p>
        `;

        problemList.appendChild(card);
    });
});
