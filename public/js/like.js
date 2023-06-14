
function like(id) {
    const likebtn = document.getElementById('like-btn' + id);
    if (likebtn.classList.contains("active")) {
        likebtn.classList.remove("active");
        likebtn.style.color = "#000";
        likebtn.style.background = "#fff";
        console.log('dislike article')

    } else {
        likebtn.classList.add("active");
        likebtn.style.color = "#fff";
        likebtn.style.background = "#f23a2e";
        console.log('like article')

    }
}

function react(id) {
    const likebtn = document.getElementById('like-btn' + id);
    likebtn.style.color = "#fff";
    likebtn.style.background = "#f23a2e";
}
function unreact(id) {
    const likebtn = document.getElementById('like-btn' + id);
    if (!likebtn.classList.contains("active")) {
        likebtn.style.color = "#000";
        likebtn.style.background = "#fff";
    }
}