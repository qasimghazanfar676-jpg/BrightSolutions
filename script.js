// script.js - Complete Interactive Version with Working Dark Mode
document.addEventListener('DOMContentLoaded', () => {
  // ========== UTILITY FUNCTIONS ==========
  // Set copyright years
  const currentYear = new Date().getFullYear();
  ['year', 'year-2', 'year-3', 'year-4'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = currentYear;
  });

  // ========== DARK MODE / THEME TOGGLE ==========
  // Function to apply theme
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
    
    // Update all theme buttons
    ['theme-toggle', 'theme-toggle-2', 'theme-toggle-3', 'theme-toggle-4'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.setAttribute('aria-pressed', theme === 'dark');
        btn.textContent = theme === 'dark' ? '☀️' : '🌙';
        btn.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
      }
    });
  };

  // Check saved theme or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  // Theme toggle event listeners - SIMPLE VERSION
  document.querySelectorAll('[id^="theme-toggle"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  });

  // ========== MOBILE NAVIGATION ==========
  ['mobile-nav-toggle', 'mobile-nav-toggle-2', 'mobile-nav-toggle-3', 'mobile-nav-toggle-4'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', () => {
        let nav;
        switch(id) {
          case 'mobile-nav-toggle': nav = document.getElementById('main-nav'); break;
          case 'mobile-nav-toggle-2': nav = document.getElementById('main-nav-2'); break;
          case 'mobile-nav-toggle-3': nav = document.getElementById('main-nav-3'); break;
          case 'mobile-nav-toggle-4': nav = document.getElementById('main-nav-4'); break;
        }
        
        if (nav) {
          nav.classList.toggle('show');
          btn.classList.toggle('active');
          btn.innerHTML = nav.classList.contains('show') ? '✕' : '☰';
        }
      });
    }
  });

  // ========== ACCORDION FAQ ==========
  document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling;
      const isOpen = btn.classList.contains('active');
      
      // Close other accordions
      document.querySelectorAll('.accordion-btn').forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.classList.remove('active');
          const otherPanel = otherBtn.nextElementSibling;
          if (otherPanel && otherPanel.classList.contains('panel')) {
            otherPanel.style.maxHeight = null;
          }
        }
      });
      
      // Toggle current
      btn.classList.toggle('active');
      if (panel && panel.classList.contains('panel')) {
        if (isOpen) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      }
    });
  });

  // ========== VIDEO CALL FUNCTIONALITY ==========
  function startVideoCall() {
    // Create video call modal
    const videoCallModal = document.createElement('div');
    videoCallModal.className = 'modal show';
    videoCallModal.id = 'video-call-modal';
    videoCallModal.style.zIndex = '2001';
    
    videoCallModal.innerHTML = `
      <div class="modal-content video-call-modal" style="max-width: 800px;">
        <span class="modal-close video-call-close">&times;</span>
        <div class="video-call-header">
          <h3><i class="fas fa-video"></i> Video Call Consultation</h3>
          <div class="call-status">
            <span class="status-dot"></span>
            <span class="status-text">Connecting...</span>
          </div>
        </div>
        
        <div class="video-call-body">
          <div class="video-container">
            <div class="video-frame local-video">
              <div class="video-label">You</div>
              <div class="video-placeholder">
                <i class="fas fa-user-circle"></i>
                <p>Your camera will appear here</p>
              </div>
            </div>
            
            <div class="video-frame remote-video">
              <div class="video-label">Consultant</div>
              <div class="video-placeholder">
                <i class="fas fa-user-tie"></i>
                <p>Waiting for consultant to join...</p>
              </div>
            </div>
          </div>
          
          <div class="call-controls">
            <button class="call-control-btn mic-btn active">
              <i class="fas fa-microphone"></i>
              <span>Mute</span>
            </button>
            <button class="call-control-btn camera-btn active">
              <i class="fas fa-video"></i>
              <span>Video</span>
            </button>
            <button class="call-control-btn end-call-btn">
              <i class="fas fa-phone-slash"></i>
              <span>End Call</span>
            </button>
            <button class="call-control-btn share-btn">
              <i class="fas fa-share-square"></i>
              <span>Share</span>
            </button>
            <button class="call-control-btn chat-btn">
              <i class="fas fa-comment"></i>
              <span>Chat</span>
            </button>
          </div>
          
          <div class="chat-container" style="display: none;">
            <div class="chat-messages">
              <div class="message consultant">
                <div class="message-content">Hello! I'll be with you shortly.</div>
                <div class="message-time">Just now</div>
              </div>
            </div>
            <div class="chat-input">
              <input type="text" placeholder="Type your message..." class="chat-input-field">
              <button class="send-message-btn"><i class="fas fa-paper-plane"></i></button>
            </div>
          </div>
        </div>
        
        <div class="video-call-footer">
          <div class="call-info">
            <p><i class="fas fa-clock"></i> Call started: <span class="call-timer">00:00</span></p>
            <p><i class="fas fa-info-circle"></i> This is a demo video call simulation</p>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(videoCallModal);
    document.body.style.overflow = 'hidden';
    
    // Simulate call connection
    setTimeout(() => {
      const statusDot = videoCallModal.querySelector('.status-dot');
      const statusText = videoCallModal.querySelector('.status-text');
      if (statusDot && statusText) {
        statusDot.classList.add('connected');
        statusText.textContent = 'Connected';
      }
      
      // Simulate consultant joining
      setTimeout(() => {
        const remoteVideo = videoCallModal.querySelector('.remote-video .video-placeholder');
        if (remoteVideo) {
          remoteVideo.innerHTML = `
            <i class="fas fa-user-tie"></i>
            <p>Consultant connected</p>
            <div class="consultant-info">
              <strong>Alex Johnson</strong>
              <span>Senior Consultant</span>
            </div>
          `;
        }
      }, 2000);
    }, 1500);
    
    // Start call timer
    let seconds = 0;
    const timerElement = videoCallModal.querySelector('.call-timer');
    const timer = setInterval(() => {
      seconds++;
      const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
      const secs = (seconds % 60).toString().padStart(2, '0');
      if (timerElement) {
        timerElement.textContent = `${mins}:${secs}`;
      }
    }, 1000);
    
    // Add event listeners for video call controls
    videoCallModal.querySelector('.video-call-close')?.addEventListener('click', () => {
      clearInterval(timer);
      videoCallModal.remove();
      document.body.style.overflow = '';
    });
    
    videoCallModal.querySelector('.end-call-btn')?.addEventListener('click', () => {
      clearInterval(timer);
      alert('📞 Call ended. Thank you for your consultation!');
      videoCallModal.remove();
      document.body.style.overflow = '';
    });
    
    // Mic toggle
    videoCallModal.querySelector('.mic-btn')?.addEventListener('click', function() {
      this.classList.toggle('active');
      const icon = this.querySelector('i');
      const text = this.querySelector('span');
      if (this.classList.contains('active')) {
        icon.className = 'fas fa-microphone';
        text.textContent = 'Mute';
      } else {
        icon.className = 'fas fa-microphone-slash';
        text.textContent = 'Unmute';
      }
    });
    
    // Camera toggle
    videoCallModal.querySelector('.camera-btn')?.addEventListener('click', function() {
      this.classList.toggle('active');
      const icon = this.querySelector('i');
      const text = this.querySelector('span');
      if (this.classList.contains('active')) {
        icon.className = 'fas fa-video';
        text.textContent = 'Video';
      } else {
        icon.className = 'fas fa-video-slash';
        text.textContent = 'Start Video';
      }
    });
    
    // Share screen
    videoCallModal.querySelector('.share-btn')?.addEventListener('click', function() {
      alert('🖥️ Screen sharing activated (demo)\nYour screen is now being shared with the consultant.');
    });
    
    // Chat toggle
    videoCallModal.querySelector('.chat-btn')?.addEventListener('click', function() {
      const chatContainer = videoCallModal.querySelector('.chat-container');
      if (chatContainer) {
        const isVisible = chatContainer.style.display !== 'none';
        chatContainer.style.display = isVisible ? 'none' : 'block';
        this.classList.toggle('active');
      }
    });
    
    // Send message
    videoCallModal.querySelector('.send-message-btn')?.addEventListener('click', function() {
      const input = videoCallModal.querySelector('.chat-input-field');
      const message = input?.value.trim();
      if (message) {
        const chatMessages = videoCallModal.querySelector('.chat-messages');
        if (chatMessages) {
          const messageDiv = document.createElement('div');
          messageDiv.className = 'message user';
          messageDiv.innerHTML = `
            <div class="message-content">${message}</div>
            <div class="message-time">Just now</div>
          `;
          chatMessages.appendChild(messageDiv);
          
          // Simulate reply
          setTimeout(() => {
            const replyDiv = document.createElement('div');
            replyDiv.className = 'message consultant';
            replyDiv.innerHTML = `
              <div class="message-content">Thanks for your message. Let me check that for you.</div>
              <div class="message-time">Just now</div>
            `;
            chatMessages.appendChild(replyDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
          }, 1000);
        }
        if (input) input.value = '';
      }
    });
    
    // Enter key for chat
    videoCallModal.querySelector('.chat-input-field')?.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        videoCallModal.querySelector('.send-message-btn')?.click();
      }
    });
  }

  // ========== VIDEO CALL BUTTONS ==========
  document.querySelectorAll('.btn').forEach(button => {
    // Check if it's a video call button
    const buttonText = button.textContent.toLowerCase();
    const icon = button.querySelector('i');
    const hasVideoIcon = icon && (icon.className.includes('video') || icon.className.includes('camera'));
    
    if ((buttonText.includes('video') || hasVideoIcon) && !button.classList.contains('processed-video')) {
      button.classList.add('processed-video');
      
      button.addEventListener('click', function(e) {
        // If it's in a booking option
        if (this.closest('.booking-option')) {
          const option = this.closest('.booking-option');
          const title = option.querySelector('h4').textContent;
          if (title.includes('Video')) {
            e.preventDefault();
            e.stopPropagation();
            startVideoCall();
          }
        }
        // If it's a standalone video call button
        else if (this.closest('.method-option')) {
          // Let radio button work normally
          return;
        }
      });
    }
  });

  // ========== BOOKING SYSTEM ==========
  // Home page booking buttons
  document.querySelectorAll('.book-now').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const appointmentType = button.dataset.type || 'General Consultation';
      openBookingModal(appointmentType);
    });
  });

  // "Book Consultation" button in hero section
  const heroBookBtn = document.querySelector('.hero-buttons .btn-secondary');
  if (heroBookBtn) {
    heroBookBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openBookingModal('General Consultation');
    });
  }

  // Quick booking options
  document.querySelectorAll('.booking-option .btn').forEach(button => {
    if (!button.classList.contains('book-now') && !button.classList.contains('processed-video')) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const option = button.closest('.booking-option');
        const title = option.querySelector('h4').textContent;
        
        // Check if it's Video Call option
        if (title.includes('Video')) {
          startVideoCall();
        } else {
          openBookingModal(title);
        }
      });
    }
  });

  // Function to open booking modal
  function openBookingModal(type) {
    const bookingModal = document.getElementById('booking-modal');
    if (bookingModal) {
      const bookingTypeInput = document.getElementById('booking-type');
      if (bookingTypeInput) bookingTypeInput.value = type;
      bookingModal.classList.add('show');
      document.body.style.overflow = 'hidden';
    } else {
      // Redirect to appointments page if modal doesn't exist
      window.location.href = 'appointments.html';
    }
  }

  // Close modals
  document.querySelectorAll('.modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      const modal = closeBtn.closest('.modal');
      if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  });

  // Close modal when clicking outside
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  });

  // Home page booking form
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = {
        type: document.getElementById('booking-type').value,
        name: document.getElementById('booking-name').value,
        email: document.getElementById('booking-email').value,
        date: document.getElementById('booking-date').value,
        time: document.getElementById('booking-time').value,
        notes: document.getElementById('booking-notes').value
      };
      
      // Show success message
      alert(`✅ Appointment booked successfully!\n\nDetails:\n• Type: ${formData.type}\n• Name: ${formData.name}\n• Email: ${formData.email}\n• Date: ${formData.date}\n• Time: ${formData.time}\n\nA confirmation will be sent to ${formData.email}`);
      
      // Close modal and reset
      const bookingModal = document.getElementById('booking-modal');
      if (bookingModal) bookingModal.classList.remove('show');
      document.body.style.overflow = '';
      bookingForm.reset();
    });
  }

  // Appointment page form
  const appointmentForm = document.getElementById('appointment-form');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = {
        service: document.getElementById('service-type').value,
        name: document.getElementById('appointment-name').value,
        email: document.getElementById('appointment-email').value,
        phone: document.getElementById('appointment-phone').value,
        date: document.getElementById('appointment-date').value,
        time: document.getElementById('appointment-time').value,
        duration: document.getElementById('appointment-duration').value,
        method: document.querySelector('input[name="method"]:checked')?.value || 'video',
        notes: document.getElementById('appointment-notes').value
      };
      
      // If video call was selected, offer to start immediately
      if (formData.method === 'video') {
        if (confirm('🎥 Would you like to start a video call now?\n\nYou can also schedule it for later.')) {
          startVideoCall();
          return; // Don't show confirmation modal if starting video call
        }
      }
      
      // Show confirmation modal
      const confirmationModal = document.getElementById('confirmation-modal');
      if (confirmationModal) {
        const detailsDiv = document.getElementById('appointment-details');
        if (detailsDiv) {
          detailsDiv.innerHTML = `
            <div class="confirmation-details">
              <p><strong>Service:</strong> ${getServiceName(formData.service)}</p>
              <p><strong>Name:</strong> ${formData.name}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              <p><strong>Date:</strong> ${formatDate(formData.date)}</p>
              <p><strong>Time:</strong> ${formData.time}</p>
              <p><strong>Method:</strong> ${getMethodName(formData.method)}</p>
            </div>
          `;
        }
        confirmationModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Reset form
        appointmentForm.reset();
      } else {
        alert(`✅ Appointment booked!\n\nCheck your email for confirmation.`);
      }
    });
  }

  // Close confirmation modal
  const closeConfirmationBtn = document.getElementById('close-confirmation');
  if (closeConfirmationBtn) {
    closeConfirmationBtn.addEventListener('click', () => {
      const confirmationModal = document.getElementById('confirmation-modal');
      if (confirmationModal) {
        confirmationModal.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  }

  // Add to calendar button
  const addToCalendarBtn = document.getElementById('add-to-calendar');
  if (addToCalendarBtn) {
    addToCalendarBtn.addEventListener('click', () => {
      alert('📅 Calendar event added!\n(Note: This is a demo feature)');
    });
  }

  // Helper functions
  function getServiceName(value) {
    const services = {
      'consultation': 'Free Consultation',
      'web': 'Website Development',
      'branding': 'Branding & Design',
      'social': 'Social Media Management',
      'seo': 'SEO Services',
      'maintenance': 'Website Maintenance'
    };
    return services[value] || value;
  }

  function getMethodName(value) {
    const methods = {
      'video': 'Video Call',
      'phone': 'Phone Call',
      'in-person': 'In Person'
    };
    return methods[value] || value;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  // ========== CONTACT FORM ==========
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = contactForm.querySelector('#name').value.trim();
      const email = contactForm.querySelector('#email').value.trim();
      const message = contactForm.querySelector('#message').value.trim();
      const status = document.getElementById('form-status');
      
      if (!name || !email || !message) {
        showFormStatus('Please fill out all required fields.', 'error');
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFormStatus('Please enter a valid email address.', 'error');
        return;
      }
      
      // Simulate success
      showFormStatus('✅ Thank you! Your message has been sent. We\'ll respond within 24 hours.', 'success');
      contactForm.reset();
      
      // Auto-clear message
      setTimeout(() => {
        if (status) status.textContent = '';
      }, 5000);
    });
  }
  
  function showFormStatus(message, type) {
    const status = document.getElementById('form-status');
    if (status) {
      status.textContent = message;
      status.style.color = type === 'error' ? 'var(--danger)' : 'var(--success)';
      status.style.fontWeight = '500';
      status.style.padding = 'var(--space-sm)';
      status.style.borderRadius = 'var(--radius-md)';
      status.style.backgroundColor = type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(74, 222, 128, 0.1)';
    }
  }

  // ========== GALLERY MODAL ==========
  const galleryModal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  const modalClose = document.getElementById('modal-close');
  
  document.querySelectorAll('.gallery-item').forEach(img => {
    img.addEventListener('click', () => {
      if (galleryModal && modalImg && modalCaption) {
        galleryModal.style.display = 'flex';
        modalImg.src = img.src;
        modalImg.alt = img.alt || 'Gallery image';
        modalCaption.textContent = img.alt || 'Image preview';
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      if (galleryModal) {
        galleryModal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }
  
  if (galleryModal) {
    galleryModal.addEventListener('click', (e) => {
      if (e.target === galleryModal) {
        galleryModal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }

  // ========== PROJECT ESTIMATOR ==========
  const calcBtn = document.getElementById('calc-btn');
  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      const bill = parseFloat(document.getElementById('bill').value) || 0;
      const tip = parseFloat(document.getElementById('tip').value) || 0;
      const result = document.getElementById('calc-result');
      
      if (bill <= 0) {
        result.textContent = 'Please enter a valid project base price.';
        result.style.color = 'var(--danger)';
        return;
      }
      
      const totalTip = (bill * (tip / 100));
      const total = bill + totalTip;
      
      result.innerHTML = `
        <strong>Project Cost Estimate:</strong><br>
        • Base Price: $${bill.toFixed(2)}<br>
        • Extra Features (${tip}%): $${totalTip.toFixed(2)}<br>
        • <strong>Total: $${total.toFixed(2)}</strong>
      `;
      result.style.color = 'var(--success)';
      result.style.fontWeight = '500';
      result.style.padding = 'var(--space-sm)';
      result.style.backgroundColor = 'rgba(74, 222, 128, 0.1)';
      result.style.borderRadius = 'var(--radius-md)';
      result.style.marginTop = 'var(--space-sm)';
    });
  }

  // ========== NEWSLETTER SUBSCRIPTION ==========
  const subscribeBtn = document.getElementById('subscribe-btn');
  if (subscribeBtn) {
    subscribeBtn.addEventListener('click', () => {
      const emailInput = document.getElementById('newsletter-email');
      const email = emailInput?.value.trim();
      
      if (!email) {
        alert('Please enter your email address.');
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // Simulate subscription
      alert(`✅ Thank you for subscribing!\n\nYou'll receive business tips and updates at ${email}.`);
      if (emailInput) emailInput.value = '';
    });
  }

  // ========== SOCIAL MEDIA LINKS ==========
  document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const icon = link.querySelector('i');
      if (icon) {
        const platform = icon.className.includes('facebook') ? 'Facebook' :
                        icon.className.includes('twitter') ? 'Twitter' :
                        icon.className.includes('instagram') ? 'Instagram' :
                        icon.className.includes('linkedin') ? 'LinkedIn' : 'Social Media';
        alert(`🔗 This would open ${platform} in a new window.\n(Link disabled for demo purposes.)`);
      }
    });
  });

  // ========== ANIMATED COUNTERS ==========
  const counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target') || counter.textContent.replace(/,/g, ''));
          const current = 0;
          
          const updateCounter = () => {
            const increment = target / 50;
            let currentCount = parseFloat(counter.textContent.replace(/,/g, '')) || 0;
            
            if (currentCount < target) {
              currentCount += increment;
              counter.textContent = Math.ceil(currentCount).toLocaleString();
              setTimeout(updateCounter, 30);
            } else {
              counter.textContent = target.toLocaleString();
            }
          };
          
          counter.textContent = '0';
          setTimeout(updateCounter, 300);
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
  }

  // ========== DROPDOWN MENUS ==========
  document.querySelectorAll('.dropdown').forEach(dropdown => {
    const dropbtn = dropdown.querySelector('.dropbtn');
    const content = dropdown.querySelector('.dropdown-content');
    
    if (dropbtn && content) {
      dropbtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = content.style.display === 'block';
        content.style.display = isOpen ? 'none' : 'block';
      });
      
      // Close when clicking outside
      document.addEventListener('click', () => {
        content.style.display = 'none';
      });
      
      // Keep open when clicking inside
      content.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  });

  // ========== DATE INPUTS ==========
  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(input => {
    input.min = today;
    
    // Set default to tomorrow if empty
    if (!input.value) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      input.value = tomorrow.toISOString().split('T')[0];
    }
  });

  // ========== ESCAPE KEY SUPPORT ==========
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Close all modals
      document.querySelectorAll('.modal.show').forEach(modal => {
        modal.classList.remove('show');
      });
      
      // Close gallery modal
      const galleryModal = document.getElementById('modal');
      if (galleryModal && galleryModal.style.display === 'flex') {
        galleryModal.style.display = 'none';
      }
      
      // Close video call modal
      const videoCallModal = document.getElementById('video-call-modal');
      if (videoCallModal) {
        videoCallModal.remove();
      }
      
      document.body.style.overflow = '';
    }
  });

  // ========== BUTTON CLICK EFFECTS ==========
  document.querySelectorAll('.btn').forEach(button => {
    if (!button.hasAttribute('data-click-effect')) {
      button.setAttribute('data-click-effect', 'true');
      
      button.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
      });
    }
  });
});