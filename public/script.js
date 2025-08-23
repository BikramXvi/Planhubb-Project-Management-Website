function sendTaskAssignedMail(event){
    event.preventDefault(); // stop form reload
    let params = {
        task_title: document.getElementById("taskTitle").value,
        to_email: document.getElementById("taskAssigned").value,
        user_name: "User",
        task_deadline: document.getElementById("taskDeadline").value
    };

    emailjs.send("service_nh1amy6","template_dozfo8s",params)
    .then(
      res => { alert("✅ Email sent successfully!"); console.log(res); },
      err => { alert("❌ Failed to send email"); console.error(err); }
    );
}

function sendProjectAssignedMail(event){
    event.preventDefault(); // stop form reload
    let params = {
        project_title: document.getElementById("projectName").value,
        to_email: document.getElementById("projectTeam").value,
        user_name: "User",
        project_deadline: document.getElementById("projectDeadline").value
    };
x
    emailjs.send("service_nh1amy6","template_7p7tkak",params)
    .then(
      res => { alert("✅ Email sent successfully!"); console.log(res); },
      err => { alert("❌ Failed to send email"); console.error(err); }
    );
}

