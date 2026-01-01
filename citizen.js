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
