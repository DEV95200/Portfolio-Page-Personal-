// Mobile Burger Menu
const burgerMenu = document.getElementById('burgerMenu');
const navLinks = document.getElementById('navLinks');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !burgerMenu.contains(e.target)) {
        burgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Smooth Scrolling (enhanced)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// CV Modal
const cvModal = document.getElementById('cvModal');
const openCvModal = document.getElementById('openCvModal');
const closeCvModal = document.getElementById('closeCvModal');

openCvModal.addEventListener('click', () => {
    cvModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeCvModal.addEventListener('click', () => {
    cvModal.classList.remove('active');
    document.body.style.overflow = '';
});

// Close modal when clicking outside
cvModal.addEventListener('click', (e) => {
    if (e.target === cvModal) {
        cvModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cvModal.classList.contains('active')) {
        cvModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Motivation Letter Generator
const motivationForm = document.getElementById('motivationForm');
const motivationOutput = document.getElementById('motivationOutput');
const letterContent = document.getElementById('letterContent');
const copyLetter = document.getElementById('copyLetter');
const resetForm = document.getElementById('resetForm');

motivationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const companyName = document.getElementById('companyName').value;
    const position = document.getElementById('position').value;
    const experience = document.getElementById('experience').value;
    const motivation = document.getElementById('motivation').value;
    
    // Get current date
    const today = new Date();
    const dateStr = today.toLocaleDateString('fr-FR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Generate letter
    const letter = `${dateStr}

Objet : Candidature pour le poste de ${position}

Madame, Monsieur,

Je me permets de vous adresser ma candidature pour le poste de ${position} au sein de ${companyName}.

Actuellement étudiant en BUT Métiers du Multimédia et de l'Internet, je suis passionné par le développement web et la création d'expériences numériques innovantes. 

${experience}

${motivation}

C'est pourquoi je suis convaincu que ${companyName} représente l'opportunité idéale pour continuer à développer mes compétences et contribuer à vos projets avec enthousiasme et professionnalisme.

Je reste à votre disposition pour un entretien au cours duquel je pourrais vous exposer plus en détail mes motivations et mes compétences.

Dans l'attente de votre réponse, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

[Votre Nom]`;
    
    // Display letter
    letterContent.textContent = letter;
    motivationForm.style.display = 'none';
    motivationOutput.style.display = 'block';
});

// Copy letter to clipboard
copyLetter.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(letterContent.textContent);
        
        // Visual feedback
        const originalText = copyLetter.textContent;
        copyLetter.textContent = 'Copié !';
        copyLetter.style.backgroundColor = '#22c55e';
        
        setTimeout(() => {
            copyLetter.textContent = originalText;
            copyLetter.style.backgroundColor = '';
        }, 2000);
    } catch (err) {
        console.error('Erreur lors de la copie:', err);
        alert('Erreur lors de la copie dans le presse-papier');
    }
});

// Reset form
resetForm.addEventListener('click', () => {
    motivationForm.reset();
    motivationForm.style.display = 'block';
    motivationOutput.style.display = 'none';
});

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // In a real application, you would send this data to a server
    console.log('Contact Form Submitted:', { name, email, message });
    
    // Show success message
    alert(`Merci ${name} ! Votre message a été envoyé avec succès.\n\nNote: Dans un environnement de production, ce formulaire serait connecté à un serveur pour traiter l'envoi des emails.`);
    
    // Reset form
    contactForm.reset();
});

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinksAll.forEach(link => {
                link.classList.remove('active-link');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active-link');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Add scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.card, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
