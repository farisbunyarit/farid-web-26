let productClicks = JSON.parse(localStorage.getItem('productClicks')) || {};

function increaseClickCount(productCard) {
    const productId = productCard.querySelector('h3').textContent;

    if (!productClicks[productId]) {
        productClicks[productId] = 0;
    }

    productClicks[productId]++;
    localStorage.setItem('productClicks', JSON.stringify(productClicks));

    highlightTopProducts();
}

function highlightTopProducts() {
    const sortedProducts = Object.entries(productClicks).sort((a, b) => b[1] - a[1]);
    const top3 = sortedProducts.slice(0, 3).map(item => item[0]);

    const allCards = document.querySelectorAll('.product-card');

    allCards.forEach(card => {
        const title = card.querySelector('h3').textContent;

        if (top3.includes(title)) {
            card.classList.add('highlight');
        } else {
            card.classList.remove('highlight');
        }
    });
}

window.addEventListener('DOMContentLoaded', highlightTopProducts);

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("demo");
    let captionText = document.getElementById("caption");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    captionText.innerHTML = dots[slideIndex - 1].alt;
}

// Toggle the mobile navigation menu
const hamburgerMenu = document.querySelector(".hamburger-menu");
const navbar = document.querySelector(".navbar");

hamburgerMenu.addEventListener("click", () => {
    navbar.classList.toggle("active");
});

// Scroll to top button functionality
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function () {
    if (
        document.body.scrollTop > 300 ||
        document.documentElement.scrollTop > 300
    ) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});
// دالة للتحقق من المدخلات
function validateForm(event) {
    // إيقاف إرسال النموذج الافتراضي
    event.preventDefault();

    // الحصول على المدخلات
    const name = document.querySelector('input[name="name"]').value;
    const subject = document.querySelector('input[name="subject"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const secretword = document.querySelector('input[name="secretword"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    // تحقق من الاسم (يجب أن يحتوي على حروف فقط)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!name || !nameRegex.test(name)) {
        alert("Please enter a valid name with letters only.");
        return false;
    }

    // تحقق من البريد الإلكتروني (يجب أن يكون من نطاق @ftu.ac.th)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@ftu\.ac\.th$/;
    if (!email || !emailRegex.test(email)) {
        alert("Please enter a valid email with the domain @ftu.ac.th.");
        return false;
    }

    // تحقق من رقم الهاتف (يجب أن يكون مكونًا من 10 أرقام فقط)
    const phoneRegex = /^\d{10}$/;
    if (!phone || !phoneRegex.test(phone)) {
        alert("Phone number must be 10 digits.");
        return false;
    }

    // تحقق من كلمة السر (يجب أن تحتوي على أحرف كبيرة وصغيرة وأرقام ورموز خاصة)
    const secretwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!secretword || !secretwordRegex.test(secretword)) {
        alert(
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
        return false;
    }

    // تحقق من الرسالة (يجب ألا تكون فارغة)
    if (!message) {
        alert("Please enter a message.");
        return false;
    }

    // إذا كانت المدخلات صحيحة، تنظيف المدخلات وإرسال النموذج
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPhone = sanitizeInput(phone);
    const sanitizedSecretword = sanitizeInput(secretword);
    const sanitizedMessage = sanitizeInput(message);

    console.log("Form Submitted Successfully!");
    console.log("Name:", sanitizedName);
    console.log("Email:", sanitizedEmail);
    console.log("Phone:", sanitizedPhone);
    console.log("Secret Word:", sanitizedSecretword);
    console.log("Message:", sanitizedMessage);

    // بعد التحقق والتأكد من صحة المدخلات، يمكن إرسال النموذج
    document.getElementById("contactForm").submit();
}

// دالة لتنظيف المدخلات (Sanitize)
function sanitizeInput(input) {
    const div = document.createElement("div");
    div.textContent = input; // تحويل المدخلات إلى نص عادي لإزالة أي أكواد ضارة
    return div.innerHTML;
}

// إضافة حدث التحقق عند إرسال النموذج
document.getElementById("contactForm").addEventListener("submit", validateForm);

// البحث في المنتجات
function searchProducts() {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        const title = product.querySelector('h3').textContent.toLowerCase();
        const description = product.querySelector('p').textContent.toLowerCase();

        // إخفاء المنتجات التي لا تحتوي على النص المدخل
        if (title.includes(searchQuery) || description.includes(searchQuery)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}





