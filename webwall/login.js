// Function to get the value of a specific cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Main logic
async function checkLogin() {
    const loginCookie = getCookie("login");

    // Redirect if the login cookie doesn't exist
    if (!loginCookie) {
        window.location.href = "https://jacobtctc.github.io/webwall/login";
        return;
    }

    // Fetch valid login codes from login.lo
    try {
        const response = await fetch("login.lo");
        if (!response.ok) throw new Error("Failed to load login.lo");

        const codes = await response.text();
        const codeList = codes.split(/\r?\n/); // Split by newlines into an array

        // Redirect if login code isn't found in login.lo
        if (!codeList.includes(loginCookie)) {
            window.location.href = "https://jacobtctc.github.io/webwall/login";
        }
    } catch (error) {
        console.error("Error checking login:", error);
        // Redirect in case of any error during fetch
        window.location.href = "https://jacobtctc.github.io/webwall/login";
    }
}

// Run the check on page load
checkLogin();
