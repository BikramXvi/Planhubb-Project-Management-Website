import { createTeam, updateTeam, deleteTeam, onTeamsChange } from "./firestore.js";

const teamsGrid = document.querySelector(".teams-grid");
const newTeamBtn = document.getElementById("newTeamBtn");
const teamModal = document.getElementById("teamModal");
const closeModal = document.getElementById("closeModal");
const createTeamForm = document.getElementById("createTeamForm");
const addMemberBtn = document.getElementById("addMemberBtn");
const membersContainer = document.getElementById("membersContainer");

// -------------------- Modal Open/Close --------------------
newTeamBtn.addEventListener("click", () => openTeamModal());
closeModal.addEventListener("click", () => closeTeamModal());
window.addEventListener("click", e => { if (e.target === teamModal) closeTeamModal(); });

function openTeamModal(team = null) {
    teamModal.style.display = "flex";
    membersContainer.innerHTML = "";
    if (team) {
        document.getElementById("teamName").value = team.teamName;
        team.members.forEach(addMemberRow);
        createTeamForm.dataset.editId = team.id;
    } else {
        createTeamForm.reset();
        delete createTeamForm.dataset.editId;
    }
}

function closeTeamModal() {
    teamModal.style.display = "none";
}

// -------------------- Add Member Row --------------------
addMemberBtn.addEventListener("click", () => addMemberRow());

function addMemberRow(memberData = {}) {
    const row = document.createElement("div");
    row.className = "member-row";
    row.innerHTML = `
        <input type="text" class="form-control member-name" placeholder="Name" value="${memberData.name || ""}" required>
        <input type="email" class="form-control member-email" placeholder="Email" value="${memberData.email || ""}" required>
        <input type="text" class="form-control member-phone" placeholder="Phone" value="${memberData.phone || ""}">
        <input type="text" class="form-control member-address" placeholder="Address" value="${memberData.address || ""}">
        <button type="button" class="remove-member">Remove</button>
    `;
    row.querySelector(".remove-member").addEventListener("click", () => row.remove());
    membersContainer.appendChild(row);
}

// -------------------- Form Submit --------------------
createTeamForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const teamName = document.getElementById("teamName").value.trim();
    const members = Array.from(membersContainer.querySelectorAll(".member-row")).map(row => ({
        name: row.querySelector(".member-name").value.trim(),
        email: row.querySelector(".member-email").value.trim(),
        phone: row.querySelector(".member-phone").value.trim(),
        address: row.querySelector(".member-address").value.trim()
    })).filter(m => m.name && m.email);

    const editId = createTeamForm.dataset.editId;
    if (editId) {
        await updateTeam(editId, { teamName, members });
    } else {
        await createTeam({ teamName, members });
    }
    closeTeamModal();
});

// -------------------- Render Teams --------------------
function renderTeam(team) {
    const card = document.createElement("div");
    card.className = "team-card";
    card.innerHTML = `
        <h3>${team.teamName}</h3>
        <p>Members: ${team.members.map(m => m.name).join(", ")}</p>
        <div class="project-actions">
            <button class="btn btn-outline edit-btn">Edit</button>
            <button class="btn btn-contrast delete-btn">Delete</button>
        </div>
    `;

    card.querySelector(".edit-btn").addEventListener("click", e => {
        e.stopPropagation();
        openTeamModal(team);
    });

    card.querySelector(".delete-btn").addEventListener("click", async e => {
        e.stopPropagation();
        if (confirm("Delete this team?")) {
            await deleteTeam(team.id);
        }
    });

    teamsGrid.appendChild(card);
}

// -------------------- Firestore Listener --------------------
onTeamsChange(teams => {
    teamsGrid.innerHTML = "";
    teams.forEach(team => renderTeam(team));
});
