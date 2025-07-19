import { domEvents } from "./index.js";

    const signUpOverlay = document.querySelector(".event-signup-overlay");
    const eventSignupBtns = document.querySelectorAll(".event-signup-btn");
    const formCloseBtn = document.getElementById("formCloseBtn")

window.addEventListener("DOMContentLoaded", () => {

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
    
});



const eventForm = document.getElementById("eventSignupForm");
if (eventForm){

    (function() {
        emailjs.init("mLa_Rh4awOcqOKIlm"); 
        })();
    eventForm.addEventListener('submit', function(e) {
    e.preventDefault();

    emailjs.sendForm('service_0o6fj29', 'template_ycidit5', this)
        .then(function(response) {
        alert('Successfully signed up for the workshop!');
        }, function(error) {
        alert('Signup failed. Please try again.');
        console.error('EmailJS error:', error);
        });

        signUpOverlay.style.display = "none";
        signUpOverlay.style.opacity = 0;
        document.getElementById("eventName").value = "";
    });

}

domEvents();