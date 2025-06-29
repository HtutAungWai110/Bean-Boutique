import { domEvents } from "./index.js";

window.addEventListener("DOMContentLoaded", () => {
    const signUpOverlay = document.querySelector(".event-signup-overlay");
    const eventSignupBtns = document.querySelectorAll(".event-signup-btn");
    const formCloseBtn = document.getElementById("formCloseBtn")
    if (eventSignupBtns){
        eventSignupBtns.forEach(btn => {
        btn.addEventListener("click", (e) =>{
            const eventData = e.target.dataset.event;
            signUpOverlay.style.display = "block";
            signUpOverlay.style.opacity = 1;
            document.getElementById("eventName").value = eventData;
        } )
        })
    }
    if (formCloseBtn){
        formCloseBtn.addEventListener("click", () => {
        const signUpOverlay = document.querySelector(".event-signup-overlay");
        signUpOverlay.style.display = "none";
        signUpOverlay.style.opacity = 0;
        document.getElementById("eventName").value = "";

        });
    }

    const viewPlansBtn = document.querySelector("[data-viewPlan]");
    const planBox = document.querySelector("[data-subscriptionBox]")
    if (viewPlansBtn){
        viewPlansBtn.addEventListener("click", () => {
            planBox.scrollIntoView({ behavior: "smooth" });
        })
    }
    
})


domEvents();