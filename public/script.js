emailjs.init("TU_jBfFsk5CG4vGBd"); // your public key

const projectForm = document.getElementById("createProjectForm");
projectForm.addEventListener("submit", sendProjectAssignedMail);

function sendTaskAssignedMail(event) {
    event.preventDefault(); // stop form reload

    const emails = document.getElementById("taskAssigned").value
                   .split(",")
                   .map(email => email.trim())
                   .filter(Boolean);

    if (emails.length === 0) return alert("❌ No valid email addresses provided!");

    const params = {
        task_title: document.getElementById("taskTitle").value,
        user_name: "User",
        task_deadline: document.getElementById("taskDeadline").value
    };

    // Create an array of promises for each recipient
    const emailPromises = emails.map(to_email =>
        emailjs.send("service_nh1amy6", "template_dozfo8s", { ...params, to_email })
    );

    // Wait for all promises to complete
    Promise.allSettled(emailPromises).then(results => {
        const successCount = results.filter(r => r.status === "fulfilled").length;
        const failCount = results.filter(r => r.status === "rejected").length;

        if (successCount > 0) {
            alert(`✅ Task emails sent successfully to ${successCount} recipient(s)!`);
        }
        if (failCount > 0) {
            alert(`❌ Failed to send task emails to ${failCount} recipient(s). Check console for details.`);
            console.error(results.filter(r => r.status === "rejected"));
        }
    });
}


function sendProjectAssignedMail(event) {
    event.preventDefault();

    const emails = document.getElementById("projectTeam").value
                   .split(",")
                   .map(email => email.trim())
                   .filter(Boolean);

    if (emails.length === 0) return alert("❌ No valid email addresses provided!");

    const params = {
        project_title: document.getElementById("projectName").value,
        user_name: "User",
        project_deadline: document.getElementById("projectDeadline").value
    };

    // Create an array of promises for each email
    const emailPromises = emails.map(to_email => 
        emailjs.send("service_nh1amy6", "template_7p7tkak", { ...params, to_email })
    );

    // Wait for all promises to resolve
    Promise.allSettled(emailPromises).then(results => {
        const successCount = results.filter(r => r.status === "fulfilled").length;
        const failCount = results.filter(r => r.status === "rejected").length;

        if (successCount > 0) {
            alert(`✅ Emails sent successfully to ${successCount} recipient(s)!`);
        }
        if (failCount > 0) {
            alert(`❌ Failed to send emails to ${failCount} recipient(s). Check console for details.`);
            console.error(results.filter(r => r.status === "rejected"));
        }
    });
}

