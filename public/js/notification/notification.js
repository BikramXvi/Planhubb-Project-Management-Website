// notifications.js
import emailjs from "https://cdn.jsdelivr.net/npm/emailjs-com@3.2.0/dist/email.min.js";

// Initialize EmailJS with your public key
emailjs.init("TU_jBfFsk5CG4vGBd"); // replace with your actual Public Key

/**
 * Send email for task assignment
 */
export function emailTaskAssigned(task) {
  let params = {
    task_title: task.title,
    to_email: task.assigned,   // must be email string, not UID
    user_name: "User",         // you can replace with actual name if available
    task_deadline: task.deadline || "N/A"
  };

  emailjs.send("service_nh1amy6", "template_dozfo8s", params)
    .then(
      res => { console.log("✅ Task email sent!", res); },
      err => { console.error("❌ Failed to send task email", err); }
    );
}

/**
 * Send email for project assignment
 */
export function emailProjectAssigned(project) {
  let params = {
    project_name: project.name,
    to_email: project.assigned,  // must be email string
    user_name: "User",
    project_deadline: project.deadline || "N/A"
  };

  emailjs.send("service_nh1amy6", "template_dozfo8s", params)
    .then(
      res => { console.log("✅ Project email sent!", res); },
      err => { console.error("❌ Failed to send project email", err); }
    );
}
