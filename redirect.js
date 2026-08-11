/* ============================================================
   VIP SPIDER CLUB
   REDIRECT.JS — FINAL VERSION
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* --------------------------------------------------------
       SETTINGS
    -------------------------------------------------------- */

    const TELEGRAM_URL = "https://t.me/VIPspiderclub";

    const REDIRECT_SECONDS = 3;


    /* --------------------------------------------------------
       ELEMENTS
    -------------------------------------------------------- */

    const countdownElement =
        document.getElementById("countdown");

    const progressBar =
        document.querySelector(".progress-bar");

    const telegramButton =
        document.getElementById("telegramButton");


    /* --------------------------------------------------------
       STATE
    -------------------------------------------------------- */

    let secondsLeft = REDIRECT_SECONDS;

    let hasRedirected = false;

    let timer = null;


    /* --------------------------------------------------------
       REDIRECT FUNCTION
    -------------------------------------------------------- */

    function redirectToTelegram() {

        if (hasRedirected) {
            return;
        }

        hasRedirected = true;

        if (timer) {
            clearInterval(timer);
        }

        /*
         * Replace the current page instead of creating
         * another browser-history entry.
         */

        window.location.replace(TELEGRAM_URL);
    }


    /* --------------------------------------------------------
       COUNTDOWN UI
    -------------------------------------------------------- */

    function updateCountdown() {

        if (countdownElement) {

            countdownElement.textContent =
                secondsLeft;
        }


        /*
         * Progress bar:
         *
         * 3 seconds = 0%
         * 2 seconds = 33%
         * 1 second  = 66%
         * 0 seconds = 100%
         */

        if (progressBar) {

            const elapsed =
                REDIRECT_SECONDS - secondsLeft;

            const percentage =
                Math.min(
                    100,
                    Math.max(
                        0,
                        (elapsed / REDIRECT_SECONDS) * 100
                    )
                );

            progressBar.style.width =
                `${percentage}%`;
        }
    }


    /* --------------------------------------------------------
       INITIAL STATE
    -------------------------------------------------------- */

    updateCountdown();


    /* --------------------------------------------------------
       START COUNTDOWN
    -------------------------------------------------------- */

    timer = setInterval(() => {

        secondsLeft--;

        updateCountdown();


        if (secondsLeft <= 0) {

            clearInterval(timer);

            /*
             * Small delay allows the user to see
             * the final "0" state.
             */

            setTimeout(() => {

                redirectToTelegram();

            }, 100);

        }

    }, 1000);


    /* --------------------------------------------------------
       MANUAL TELEGRAM BUTTON
       -------------------------------------------------------- */

    if (telegramButton) {

        telegramButton.addEventListener(
            "click",
            () => {

                /*
                 * Stop automatic redirect because
                 * the user already clicked the button.
                 */

                if (timer) {
                    clearInterval(timer);
                }

                hasRedirected = true;

            }
        );

    }


    /* --------------------------------------------------------
       KEYBOARD ACCESSIBILITY
       -------------------------------------------------------- */

    document.addEventListener(
        "keydown",
        (event) => {

            /*
             * Pressing Enter or Space while the page
             * is focused can open Telegram.
             */

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                const active =
                    document.activeElement;

                if (
                    active &&
                    active.tagName === "A"
                ) {
                    return;
                }
            }

        }
    );


    /* --------------------------------------------------------
       SAFETY CLEANUP
    -------------------------------------------------------- */

    window.addEventListener(
        "pagehide",
        () => {

            if (timer) {

                clearInterval(timer);

            }

        }
    );

});