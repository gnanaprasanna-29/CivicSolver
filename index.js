document.addEventListener("DOMContentLoaded", () => {

    const problems = JSON.parse(localStorage.getItem("problems")) || [];

    const activeEl = document.getElementById("homeActive");
    const resolvedEl = document.getElementById("homeResolved");
    const votesEl = document.getElementById("homeVotes");

    if (!activeEl || !resolvedEl || !votesEl) {
        console.warn("Home page stat elements not found");
        return;
    }

    const activeCount = problems.filter(p => p.status === "active").length;
    const resolvedCount = problems.filter(p => p.status === "resolved").length;
    const totalVotes = problems.reduce((sum, p) => sum + p.votes, 0);

    activeEl.innerText = activeCount;
    resolvedEl.innerText = resolvedCount;
    votesEl.innerText = totalVotes;
});


function openLoginOptions() {
    document.getElementById("loginModal").style.display = "flex";
}

function closeLoginOptions() {
    document.getElementById("loginModal").style.display = "none";
}

function goCitizenLogin() {
    window.location.href = "citizenlogin.html";
}

function goAdminLogin() {
    window.location.href = "adminlogin.html";
}
