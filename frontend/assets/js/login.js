// Use global config if available
const STORAGE_KEYS = window.AppConfig?.STORAGE_KEYS || {
    TOKEN: 'ruralassist_token',
    USER_EMAIL: 'user_email',
    USER_NAME: 'ruralassist_name',
    LOGIN_REDIRECT: 'login_redirect_target',
    LOGGED_IN: 'ruralassist_logged_in'
};

const emailInput = document.getElementById("email");
const otpInput = document.getElementById("otp");
const sendOtpBtn = document.getElementById("send-otp-btn");
const verifyOtpBtn = document.getElementById("verify-otp-btn");
const resendOtpBtn = document.getElementById("resend-otp-btn");
const statusText = document.getElementById("login-status");

let otpSentTime = 0;
let resendTimer = null;

sendOtpBtn?.addEventListener("click", sendOTP);
verifyOtpBtn?.addEventListener("click", verifyOTP);
resendOtpBtn?.addEventListener("click", resendOTP);

// Enable Enter key for email input
emailInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendOTP();
});

// Enable Enter key for OTP input
otpInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") verifyOTP();
});

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOTP() {
    const email = emailInput.value.trim();

    // 1. Basic validation
    if (!email) {
        updateStatus("⚠️ Please enter your email first.", "warning");
        return;
    }

    const emailRegex = /^[\w\.-]+@[\w\.-]+\.[\w-]+$/;
    if (!emailRegex.test(email)) {
        updateStatus("❌ Please enter a valid email address.", "error");
        return;
    }

    sendOtpBtn.disabled = true;
    updateStatus("📧 Sending OTP...", "info");

    // 2. Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        // 3. Send OTP via EmailJS
        await emailjs.send(
            "service_5kfieij",      
            "template_izgz3l6",     
            {
                email: email,
                otp: otp
            }
        );

        // 4. Store OTP locally (valid for 5 minutes)
        localStorage.setItem("ruralassist_temp_otp", otp);
        localStorage.setItem("ruralassist_otp_time", Date.now().toString());

        updateStatus("✅ OTP sent successfully. Check your inbox or spam.", "success");

        // 5. Enable OTP verification UI
        otpInput.disabled = false;
        otpInput.focus();
        verifyOtpBtn.disabled = false;

        startResendTimer();

    } catch (err) {
        console.error("EmailJS send error:", err);
        updateStatus("❌ Failed to send OTP. Please try again.", "error");
        sendOtpBtn.disabled = false;
    }
}



async function verifyOTP() {
    const otp = otpInput.value.trim();
    const savedOtp = localStorage.getItem("ruralassist_temp_otp");
    const otpTime = localStorage.getItem("ruralassist_otp_time");

    if (!savedOtp || !otpTime) {
        updateStatus("❌ OTP expired. Please request again.", "error");
        return;
    }

    if (Date.now() - Number(otpTime) > 5 * 60 * 1000) {
        updateStatus("⏰ OTP expired. Please resend.", "error");
        return;
    }

    if (otp !== savedOtp) {
        updateStatus("❌ Incorrect OTP.", "error");
        return;
    }

    // ✅ SUCCESS
    updateStatus("✅ Login successful! Redirecting...", "success");

    // 🔐 Store login state
    localStorage.setItem(STORAGE_KEYS.LOGGED_IN, "true");
    localStorage.setItem(STORAGE_KEYS.USER_EMAIL, emailInput.value.trim());

    // 🧹 Clear OTP data
    localStorage.removeItem("ruralassist_temp_otp");
    localStorage.removeItem("ruralassist_otp_time");

    // Optional name prompt
    if (!localStorage.getItem(STORAGE_KEYS.USER_NAME)) {
        const name = prompt("Welcome! What's your name? (optional):");
        if (name && name.trim()) {
            localStorage.setItem(STORAGE_KEYS.USER_NAME, name.trim());
        }
    }

    // Redirect
    setTimeout(() => {
        window.location.href = "index.html";
    }, 600);
}


async function resendOTP() {
    sendOTP(); // reuse EmailJS logic
}


function startResendTimer() {
    if (resendOtpBtn) resendOtpBtn.disabled = true;
    
    let countdown = 30;
    if (resendOtpBtn) {
        resendOtpBtn.textContent = `Resend OTP (${countdown}s)`;
    }
    
    resendTimer = setInterval(() => {
        countdown--;
        if (resendOtpBtn) {
            resendOtpBtn.textContent = `Resend OTP (${countdown}s)`;
        }
        
        if (countdown <= 0) {
            clearInterval(resendTimer);
            if (resendOtpBtn) {
                resendOtpBtn.disabled = false;
                resendOtpBtn.textContent = "Resend OTP";
            }
        }
    }, 1000);
}

function updateStatus(message, type = "info") {
    if (!statusText) return;
    
    statusText.textContent = message;
    statusText.className = `status-text status-${type}`;
    
    // Auto-clear non-error messages after 5 seconds
    if (type !== "error") {
        setTimeout(() => {
            if (statusText.textContent === message) {
                statusText.textContent = "";
            }
        }, 5000);
    }
}

// Log login activity to profile
// async function logLoginActivity(email) {
//     const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
//     if (!token) return;

//     try {
//         await fetch(`${AppConfig.API_BASE_URL}/profile/activity`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`
//             },
//             body: JSON.stringify({
//                 type: "login",
//                 description: `Logged in via OTP`
//             })
//         });
//     } catch (e) {
//         // Silent fail for analytics
//     }
// }
