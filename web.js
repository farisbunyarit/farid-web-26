// Toggle the mobile navigation menu
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navbar = document.querySelector('.navbar');

hamburgerMenu.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

// Scroll to top button functionality
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
};

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
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
        alert('Please enter a valid name with letters only.');
        return false;
    }

    // تحقق من البريد الإلكتروني (يجب أن يكون من نطاق @ftu.ac.th)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@ftu\.ac\.th$/;
    if (!email || !emailRegex.test(email)) {
        alert('Please enter a valid email with the domain @ftu.ac.th.');
        return false;
    }

    // تحقق من رقم الهاتف (يجب أن يكون مكونًا من 10 أرقام فقط)
    const phoneRegex = /^\d{10}$/;
    if (!phone || !phoneRegex.test(phone)) {
        alert('Phone number must be 10 digits.');
        return false;
    }

    // تحقق من كلمة السر (يجب أن تحتوي على أحرف كبيرة وصغيرة وأرقام ورموز خاصة)
    const secretwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!secretword || !secretwordRegex.test(secretword)) {
        alert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
        return false;
    }

    // تحقق من الرسالة (يجب ألا تكون فارغة)
    if (!message) {
        alert('Please enter a message.');
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
    document.getElementById('contactForm').submit();
}

// دالة لتنظيف المدخلات (Sanitize)
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input; // تحويل المدخلات إلى نص عادي لإزالة أي أكواد ضارة
    return div.innerHTML;
}

// إضافة حدث التحقق عند إرسال النموذج
document.getElementById('contactForm').addEventListener('submit', validateForm);

let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

// دالة للتحرك بين الشرائح (الصور)
function moveSlide(step) {
    // إزالة الصورة الحالية من العرض
    slides[currentSlide].classList.remove('active');

    // تحديث رقم الشريحة الحالية بناءً على الخطوة
    currentSlide = (currentSlide + step + totalSlides) % totalSlides;

    // إضافة الكلاس "active" للصورة الجديدة
    slides[currentSlide].classList.add('active');
}

// تعيين التبديل التلقائي بين الشرائح (كل 3 ثواني)
setInterval(() => moveSlide(1), 3000);

// إضافة أحداث للأزرار بعد تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.prev').addEventListener('click', () => moveSlide(-1));
    document.querySelector('.next').addEventListener('click', () => moveSlide(1));
});

// دالة لحساب عدد الزوار
function countVisitors() {
    // جلب عدد الزيارات المخزنة في localStorage (إذا كانت موجودة)
    let visitorCount = localStorage.getItem('visitorCount');

    // إذا لم يكن هناك عدد زيارات سابق (الزيارة الأولى)، سننشئ قيمة جديدة
    if (!visitorCount) {
        visitorCount = 1; // أول زيارة
    } else {
        visitorCount = parseInt(visitorCount) + 1; // إذا كان هناك زيارات سابقة، نزيد العدد
    }

    // حفظ العدد الجديد في localStorage
    localStorage.setItem('visitorCount', visitorCount);

    // تحديث العنصر في الصفحة لعرض عدد الزوار
    document.getElementById('visitor-number').textContent = visitorCount;
}

// استدعاء الدالة لحساب الزيارات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', countVisitors);



