function showTransaction() {
    const checker = document.getElementById("checker");

    checker.innerHTML = `
        <h2>💳 Check a Transaction</h2>

        <p class="checker-intro">
            Answer a few simple questions. Suraksha AI will
            check for warning signs before you send money.
        </p>

        <div class="form-container">

            <label>Transaction Amount (₹)</label>
            <input type="number" id="amount" placeholder="Example: 50000">

            <label>Is this a new beneficiary?</label>
            <select id="newBeneficiary">
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>

            <label>Are you using a new device?</label>
            <select id="newDevice">
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>

            <label>Is the location unusual?</label>
            <select id="unusualLocation">
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>

            <label>Is someone pressuring you to transfer money?</label>
            <select id="urgency">
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>

            <label>Is this your first transaction with this person?</label>
            <select id="firstTransfer">
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>

            <button onclick="checkTransaction()">
                🔍 Analyze Transaction
            </button>

        </div>

        <div id="transactionResult"></div>
    `;

    checker.scrollIntoView({
        behavior: "smooth"
    });
}


function checkTransaction() {

    const amount =
        Number(document.getElementById("amount").value) || 0;

    const newBeneficiary =
        document.getElementById("newBeneficiary").value;

    const newDevice =
        document.getElementById("newDevice").value;

    const unusualLocation =
        document.getElementById("unusualLocation").value;

    const urgency =
        document.getElementById("urgency").value;

    const firstTransfer =
        document.getElementById("firstTransfer").value;


    let score = 0;
    let reasons = [];


    // Transaction amount
    if (amount >= 25000) {
        score += 20;
        reasons.push("Large transaction amount");
    }


    // New beneficiary
    if (newBeneficiary === "yes") {
        score += 20;
        reasons.push("New beneficiary");
    }


    // New device
    if (newDevice === "yes") {
        score += 15;
        reasons.push("New device detected");
    }


    // Unusual location
    if (unusualLocation === "yes") {
        score += 15;
        reasons.push("Unusual location");
    }


    // Social engineering / urgency
    if (urgency === "yes") {
        score += 20;
        reasons.push("Pressure or urgency detected");
    }


    // First-time transfer
    if (firstTransfer === "yes") {
        score += 10;
        reasons.push("First-time transfer");
    }


    let level;
    let icon;
    let message;


    if (score >= 61) {

        level = "HIGH RISK";
        icon = "🚨";

        message =
            "Stop and verify this transaction before sending money.";

    } else if (score >= 31) {

        level = "MEDIUM RISK";
        icon = "⚠️";

        message =
            "Please verify the recipient and transaction details.";

    } else {

        level = "LOW RISK";
        icon = "✅";

        message =
            "No major warning signals were detected. Continue only if you recognize the recipient.";
    }


    const result =
        document.getElementById("transactionResult");


    result.innerHTML = `

        <div class="risk-result">

            <div class="risk-icon">
                ${icon}
            </div>

            <h2>${level}</h2>

            <div class="risk-score">
                Risk Score: ${score}/100
            </div>

            <p>
                ${message}
            </p>

            ${
                reasons.length > 0
                ?
                `
                <h3>Why are we concerned?</h3>

                <ul>
                    ${reasons.map(reason => `<li>${reason}</li>`).join("")}
                </ul>
                `
                :
                `
                <p>
                    No significant warning signs were found.
                </p>
                `
            }

            ${
                score >= 61
                ?
                `
                <button onclick="alert('Demo action: Transaction stopped for verification.')">
                    🛑 Stop Transaction
                </button>

                <button onclick="alert('Demo action: Trusted contact notification sent.')">
                    👨‍👩‍👧 Contact Trusted Person
                </button>
                `
                :
                ""
            }

        </div>
    `;
}


function showScamChecker() {

    const checker =
        document.getElementById("checker");

    checker.innerHTML = `

        <h2>📩 Check a Suspicious Message</h2>

        <p class="checker-intro">
            Paste an SMS, WhatsApp message or email below.
            Suraksha AI will look for common scam warning signs.
        </p>

        <div class="form-container">

            <label>Suspicious message</label>

            <textarea
                id="scamMessage"
                rows="7"
                placeholder="Paste the suspicious message here..."
            ></textarea>

            <button onclick="checkScamMessage()">
                🔍 Analyze Message
            </button>

        </div>

        <div id="scamResult"></div>
    `;

    checker.scrollIntoView({
        behavior: "smooth"
    });
}


function checkScamMessage() {

    const message =
        document.getElementById("scamMessage").value
        .toLowerCase();


    if (!message.trim()) {

        document.getElementById("scamResult").innerHTML = `

            <div class="risk-result">

                <h2>⚠️ Please enter a message</h2>

                <p>
                    Paste the suspicious SMS, WhatsApp message
                    or email you want to analyze.
                </p>

            </div>
        `;

        return;
    }


    let score = 0;
    let reasons = [];


    const patterns = [

        {
            words: ["urgent", "immediately", "now"],
            points: 20,
            reason: "Urgency or pressure"
        },

        {
            words: ["blocked", "suspended", "closed"],
            points: 20,
            reason: "Account threat"
        },

        {
            words: ["otp", "one time password"],
            points: 25,
            reason: "OTP request"
        },

        {
            words: ["pin", "password", "cvv"],
            points: 25,
            reason: "Request for sensitive information"
        },

        {
            words: ["click", "link", "verify"],
            points: 15,
            reason: "Suspicious verification link"
        },

        {
            words: ["prize", "winner", "reward", "refund"],
            points: 15,
            reason: "Unexpected reward or refund"
        },

        {
            words: ["kyc"],
            points: 15,
            reason: "KYC-related request"
        }
    ];


    patterns.forEach(pattern => {

        const found =
            pattern.words.some(word =>
                message.includes(word)
            );

        if (found) {

            score += pattern.points;
            reasons.push(pattern.reason);

        }

    });


    score = Math.min(score, 100);


    let level;
    let icon;
    let messageText;


    if (score >= 61) {

        level = "HIGH RISK";
        icon = "🚨";

        messageText =
            "This message contains multiple scam warning signs. Do not click links or share sensitive information.";

    } else if (score >= 31) {

        level = "SUSPICIOUS";
        icon = "⚠️";

        messageText =
            "Be careful. Verify the message through an official banking channel.";

    } else {

        level = "LOW RISK";
        icon = "✅";

        messageText =
            "No major scam indicators were detected. Still avoid sharing confidential banking information.";
    }


    document.getElementById("scamResult").innerHTML = `

        <div class="risk-result">

            <div class="risk-icon">
                ${icon}
            </div>

            <h2>${level}</h2>

            <div class="risk-score">
                Risk Score: ${score}/100
            </div>

            <p>
                ${messageText}
            </p>

            ${
                reasons.length > 0
                ?
                `
                <h3>Warning signs detected</h3>

                <ul>
                    ${reasons.map(reason => `<li>${reason}</li>`).join("")}
                </ul>
                `
                :
                ""
            }

            <div class="safety-box">

                <strong>Remember:</strong>

                <p>
                    Never share your OTP, PIN, password or CVV
                    with anyone.
                </p>

            </div>

        </div>
    `;
}
