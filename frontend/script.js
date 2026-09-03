/* =====================================================
   SURAKSHA AI
   Intelligent Financial Fraud Protection MVP
   ===================================================== */


/* =====================================================
   TRANSACTION CHECKER
   ===================================================== */

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

            <input
                type="number"
                id="amount"
                placeholder="Example: 50000"
            >


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


            <label>
                Is someone pressuring you to transfer money?
            </label>

            <select id="urgency">

                <option value="no">No</option>

                <option value="yes">Yes</option>

            </select>


            <label>
                Is this your first transaction with this person?
            </label>

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



/* =====================================================
   TRANSACTION RISK ENGINE
   ===================================================== */

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



    /* Large transaction */

    if (amount >= 25000) {

        score += 20;

        reasons.push(
            "Large transaction amount"
        );

    }



    /* New beneficiary */

    if (newBeneficiary === "yes") {

        score += 20;

        reasons.push(
            "New beneficiary"
        );

    }



    /* New device */

    if (newDevice === "yes") {

        score += 15;

        reasons.push(
            "New device detected"
        );

    }



    /* Unusual location */

    if (unusualLocation === "yes") {

        score += 15;

        reasons.push(
            "Unusual location"
        );

    }



    /* Social engineering */

    if (urgency === "yes") {

        score += 20;

        reasons.push(
            "Pressure or urgency detected"
        );

    }



    /* First transfer */

    if (firstTransfer === "yes") {

        score += 10;

        reasons.push(
            "First-time transfer"
        );

    }


    score = Math.min(score, 100);


    let level;
    let icon;
    let message;
    let explanation;
    let recommendation;



    /* HIGH RISK */

    if (score >= 61) {

        level = "HIGH RISK";

        icon = "🚨";

        message =
            "Stop and verify this transaction before sending money.";

        explanation =
            "Multiple unusual signals were detected. " +
            "The combination of a large or unfamiliar transaction, " +
            "new access conditions, or social pressure can indicate " +
            "fraud or social engineering.";

        recommendation =
            "Do not transfer the money yet. Verify the recipient " +
            "using a trusted channel and contact your bank if you " +
            "are unsure.";

    }



    /* MEDIUM RISK */

    else if (score >= 31) {

        level = "MEDIUM RISK";

        icon = "⚠️";

        message =
            "Please verify the recipient and transaction details.";

        explanation =
            "Some unusual characteristics were detected. " +
            "This does not automatically mean the transaction is " +
            "fraudulent, but additional verification is recommended.";

        recommendation =
            "Confirm the recipient's identity and review the " +
            "transaction details before continuing.";

    }



    /* LOW RISK */

    else {

        level = "LOW RISK";

        icon = "✅";

        message =
            "No major warning signals were detected.";

        explanation =
            "The transaction does not currently show many of " +
            "the warning signals monitored by Suraksha AI.";

        recommendation =
            "Continue only if you recognize the recipient and " +
            "the transaction is expected.";

    }



    const result =
        document.getElementById("transactionResult");



    result.innerHTML = `

        <div class="risk-result">

            <div class="risk-icon">
                ${icon}
            </div>


            <h2>
                ${level}
            </h2>


            <div class="risk-score">
                Risk Score: ${score}/100
            </div>


            <p>
                ${message}
            </p>



            <h3>
                🤖 Why did Suraksha AI flag this?
            </h3>

            <p>
                ${explanation}
            </p>



            ${
                reasons.length > 0
                ?
                `

                <h3>
                    🔎 Warning Signals
                </h3>

                <ul>

                    ${reasons
                        .map(reason => `<li>${reason}</li>`)
                        .join("")}

                </ul>

                `
                :
                ""
            }



            <div class="safety-box">

                <strong>
                    🛡️ Recommended Action
                </strong>

                <p>
                    ${recommendation}
                </p>

            </div>



            ${
                score >= 61
                ?
                `

                <button
                    onclick="stopTransaction()"
                >
                    🛑 Stop Transaction
                </button>


                <button
                    onclick="contactTrustedPerson()"
                >
                    👨‍👩‍👧 Contact Trusted Person
                </button>

                `
                :
                ""
            }

        </div>

    `;
}



/* =====================================================
   DEMO SAFETY ACTIONS
   ===================================================== */

function stopTransaction() {

    alert(
        "🛑 DEMO ACTION\n\n" +
        "Transaction protection activated.\n\n" +
        "In a real banking system, the transaction would " +
        "be temporarily held for verification."
    );

}


function contactTrustedPerson() {

    alert(
        "👨‍👩‍👧 DEMO ACTION\n\n" +
        "Trusted contact notification triggered.\n\n" +
        "In a real banking system, the customer's trusted " +
        "contact would receive an alert."
    );

}



/* =====================================================
   SCAM MESSAGE CHECKER
   ===================================================== */

function showScamChecker() {

    const checker =
        document.getElementById("checker");


    checker.innerHTML = `

        <h2>
            📩 Check a Suspicious Message
        </h2>


        <p class="checker-intro">

            Paste an SMS, WhatsApp message or email below.

            Suraksha AI will look for common scam
            warning signs.

        </p>


        <div class="form-container">

            <label>
                Suspicious message
            </label>


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



/* =====================================================
   SCAM MESSAGE RISK ENGINE
   ===================================================== */

function checkScamMessage() {

    const message =
        document
            .getElementById("scamMessage")
            .value
            .toLowerCase();


    if (!message.trim()) {

        document.getElementById("scamResult").innerHTML = `

            <div class="risk-result">

                <h2>
                    ⚠️ Please enter a message
                </h2>


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
            words: [
                "urgent",
                "immediately",
                "now",
                "hurry"
            ],

            points: 20,

            reason:
                "Urgency or pressure"
        },


        {
            words: [
                "blocked",
                "suspended",
                "closed",
                "deactivated"
            ],

            points: 20,

            reason:
                "Account threat"
        },


        {
            words: [
                "otp",
                "one time password"
            ],

            points: 25,

            reason:
                "OTP request"
        },


        {
            words: [
                "pin",
                "password",
                "cvv"
            ],

            points: 25,

            reason:
                "Request for sensitive information"
        },


        {
            words: [
                "click",
                "link",
                "verify",
                "open"
            ],

            points: 15,

            reason:
                "Suspicious verification link"
        },


        {
            words: [
                "prize",
                "winner",
                "reward",
                "refund"
            ],

            points: 15,

            reason:
                "Unexpected reward or refund"
        },


        {
            words: [
                "kyc"
            ],

            points: 15,

            reason:
                "KYC-related request"
        },


        {
            words: [
                "police",
                "arrest",
                "legal action",
                "court"
            ],

            points: 20,

            reason:
                "Fear or intimidation tactic"
        }

    ];



    patterns.forEach(pattern => {

        const found =
            pattern.words.some(
                word => message.includes(word)
            );


        if (found) {

            score += pattern.points;

            reasons.push(
                pattern.reason
            );

        }

    });



    score = Math.min(score, 100);



    let level;
    let icon;
    let messageText;
    let explanation;
    let recommendation;



    /* HIGH RISK */

    if (score >= 61) {

        level = "HIGH RISK";

        icon = "🚨";


        messageText =
            "This message contains multiple scam warning signs.";


        explanation =
            "The message uses patterns commonly associated " +
            "with phishing, impersonation, social engineering, " +
            "or attempts to obtain sensitive banking information.";


        recommendation =
            "Do not click links, share OTPs, PINs, passwords, " +
            "or send money. Verify the request through the " +
            "official banking application or website.";

    }



    /* MEDIUM RISK */

    else if (score >= 31) {

        level = "SUSPICIOUS";

        icon = "⚠️";


        messageText =
            "Be careful before responding to this message.";


        explanation =
            "The message contains one or more characteristics " +
            "that may be associated with financial scams.";


        recommendation =
            "Do not share confidential information. Verify " +
            "the sender independently before taking action.";

    }



    /* LOW RISK */

    else {

        level = "LOW RISK";

        icon = "✅";


        messageText =
            "No major scam indicators were detected.";


        explanation =
            "The message does not currently match many " +
            "of the scam patterns monitored by Suraksha AI.";


        recommendation =
            "Continue to remain cautious and never share " +
            "confidential banking credentials.";

    }



    document.getElementById("scamResult").innerHTML = `

        <div class="risk-result">


            <div class="risk-icon">
                ${icon}
            </div>


            <h2>
                ${level}
            </h2>


            <div class="risk-score">
                Risk Score: ${score}/100
            </div>


            <p>
                ${messageText}
            </p>



            <h3>
                🤖 AI Safety Explanation
            </h3>


            <p>
                ${explanation}
            </p>



            ${
                reasons.length > 0
                ?
                `

                <h3>
                    🔎 Warning Signs Detected
                </h3>


                <ul>

                    ${reasons
                        .map(reason => `<li>${reason}</li>`)
                        .join("")}

                </ul>

                `
                :
                ""
            }



            <div class="safety-box">

                <strong>
                    🛡️ What should you do?
                </strong>


                <p>
                    ${recommendation}
                </p>

            </div>


            <div class="safety-box">

                <strong>
                    🔐 Never share:
                </strong>


                <p>
                    OTP • PIN • Password • CVV
                </p>

            </div>
/* =====================================================
   SIMPLE SAFETY MODE
   Designed for senior citizens and first-time users
   ===================================================== */

function enableSafeMode() {

    document.body.classList.toggle("safe-mode");

    const safeModeEnabled =
        document.body.classList.contains("safe-mode");


    if (safeModeEnabled) {

        alert(
            "👴 Simple Safety Mode is ON\n\n" +
            "Suraksha AI will now use larger text " +
            "and simpler safety guidance."
        );

    } else {

        alert(
            "🛡️ Simple Safety Mode is OFF"
        );

    }

}

        </div>

    `;
}
